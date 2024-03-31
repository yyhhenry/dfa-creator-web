<script setup lang="ts">
import { nfa2dfa, reg2nfa } from 'dfa-creator';
import { computed } from 'vue';
import { ElButton, ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { rustError, Ok } from 'luoluo-rust-error';
import { isError } from '@/utils/types';
import { FlexBox, HeaderText } from 'luoluo-vue-components';
import MdBox from './MdBox.vue';
import { regExamples } from '@/utils/examples';

const nfa = useStorage('dfac-n2d', '');
const throttledNFA = refThrottled(nfa, 500);
const safeNFA2DFA = rustError(nfa2dfa, isError);
const dfa = computed(() => {
  const nfa = throttledNFA.value;
  return nfa === '' ? Ok(['', '']) : safeNFA2DFA(nfa);
});
</script>
<template>
  <ElInput v-model="nfa" placeholder="Enter NFA JSON" type="textarea" autosize />
  <FlexBox>
    <HeaderText>
      <span :style="{ marginRight: '20px' }">Examples</span>
      <ElButton v-for="example in regExamples" :key="example" @click="nfa = reg2nfa(example)" round>
        {{ example }}
      </ElButton>
    </HeaderText>
  </FlexBox>

  <MdBox v-if="dfa.ok && dfa.v[1]" :content="dfa.v[1]"> </MdBox>

  <MdBox v-if="dfa.ok && dfa.v[0]" :content="dfa.v[0]" :lang="'json'" copyable>
    <template #header>JSON</template>
  </MdBox>

  <HeaderText v-if="!dfa.ok">
    {{ dfa.e.message }}
  </HeaderText>
</template>
