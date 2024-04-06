<script setup lang="ts">
import { reg2nfa, nfa2mermaid } from 'dfa-creator';
import { computed } from 'vue';
import { ElButton, ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { rustError, Ok } from 'luoluo-rust-error';
import { isError } from '@/utils/types';
import { FlexBox, HeaderText } from '@yyhhenry/element-extra';
import { regExamples } from '@/utils/examples';
import MdBox from './MdBox.vue';

const regex = useStorage('dfac-r2n', '');
const throttledRegex = refThrottled(regex, 500);
const safeReg2nfa = rustError(reg2nfa, isError);
const nfa = computed(() => {
  const reg = throttledRegex.value;
  return reg === '' ? Ok('') : safeReg2nfa(reg);
});
const safeShowNfa = rustError(nfa2mermaid, isError);
const mermaid = computed(() => {
  if (!nfa.value?.ok) {
    return Ok('');
  }
  const nfaJson = nfa.value.v;
  return nfaJson === '' ? Ok('') : safeShowNfa(nfaJson);
});
</script>
<template>
  <ElInput v-model="regex" placeholder="Enter a regular expression" />
  <FlexBox>
    <HeaderText>
      <span :style="{ marginRight: '20px' }">Examples</span>
      <ElButton v-for="example in regExamples" :key="example" @click="regex = example" round>
        {{ example }}
      </ElButton>
    </HeaderText>
  </FlexBox>

  <MdBox v-if="nfa.ok && nfa.v && mermaid.ok" :content="mermaid.v" :lang="'mermaid'">
    <template #header>NFA</template>
  </MdBox>

  <HeaderText v-if="nfa.ok && !mermaid.ok">
    {{ mermaid.e.message }}
  </HeaderText>

  <MdBox v-if="nfa.ok && nfa.v" :content="nfa.v" :lang="'json'" copyable>
    <template #header>JSON</template>
  </MdBox>

  <HeaderText v-if="!nfa.ok">
    {{ nfa.e.message }}
  </HeaderText>
</template>
