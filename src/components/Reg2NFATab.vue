<script setup lang="ts">
import { reg2nfa, nfa2mermaid } from 'dfa-creator';
import { computed } from 'vue';
import { ElButton, ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { rustError, Ok } from 'luoluo-rust-error';
import { isError } from '@/utils/types';
import { FlexBox, HeaderText } from 'luoluo-vue-components';
import MdBox from './MdBox.vue';

const regex = useStorage('dfac-regex', '');
const debouncedRegex = refThrottled(regex, 500);
const safeReg2nfa = rustError(reg2nfa, isError);
const nfa = computed(() => {
  const reg = debouncedRegex.value;
  return reg === '' ? Ok('') : safeReg2nfa(reg);
});
const safeShowNfa = rustError(nfa2mermaid, isError);
const mermaid = computed(() => {
  if (!nfa.value?.ok) {
    return Ok('');
  }
  return safeShowNfa(nfa.value.v);
});
const examples = ['(a|b)*aab', 'a(b|c)*d', 'a*|b*', '1(1010*|1(010)*1)*0'];
</script>
<template>
  <ElInput v-model="regex" placeholder="Enter a regular expression" :type="'danger'" />
  <FlexBox>
    <HeaderText>
      <span :style="{ marginRight: '20px' }">Examples</span>
      <ElButton v-for="example in examples" :key="example" @click="regex = example" round>
        {{ example }}
      </ElButton>
    </HeaderText>
  </FlexBox>

  <MdBox v-if="mermaid.ok" :content="mermaid.v" :lang="'mermaid'">
    <template #header>NFA</template>
  </MdBox>

  <HeaderText v-if="!mermaid.ok">
    {{ mermaid.e.message }}
  </HeaderText>

  <MdBox v-if="nfa.ok" :content="nfa.v" :lang="'json'" copyable>
    <template #header>JSON</template>
  </MdBox>

  <HeaderText v-if="!nfa.ok">
    {{ nfa.e.message }}
  </HeaderText>
</template>
