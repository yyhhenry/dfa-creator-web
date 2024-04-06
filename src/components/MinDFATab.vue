<script setup lang="ts">
import { minimize_dfa, nfa2dfa, reg2nfa } from 'dfa-creator';
import { computed } from 'vue';
import { ElButton, ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { rustError, Ok } from 'luoluo-rust-error';
import { isError } from '@/utils/types';
import { FlexBox, HeaderText } from '@yyhhenry/element-extra';
import MdBox from './MdBox.vue';
import { regExamples } from '@/utils/examples';

const dfa = useStorage('dfac-min', '');
const throttledDFA = refThrottled(dfa, 500);
const safeMinDfa = rustError(minimize_dfa, isError);
const minDfa = computed(() => {
  const dfa = throttledDFA.value;
  return dfa === '' ? Ok(['', '']) : safeMinDfa(dfa);
});
</script>
<template>
  <ElInput v-model="dfa" placeholder="Enter DFA JSON" type="textarea" autosize />
  <FlexBox>
    <HeaderText>
      <span :style="{ marginRight: '20px' }">Examples</span>
      <ElButton
        v-for="example in regExamples"
        :key="example"
        @click="dfa = nfa2dfa(reg2nfa(example))[0]"
        round
      >
        {{ example }}
      </ElButton>
    </HeaderText>
  </FlexBox>

  <MdBox v-if="minDfa.ok && minDfa.v[1]" :content="minDfa.v[1]"> </MdBox>

  <MdBox v-if="minDfa.ok && minDfa.v[0]" :content="minDfa.v[0]" :lang="'json'" copyable>
    <template #header>JSON</template>
  </MdBox>

  <HeaderText v-if="!minDfa.ok">
    {{ minDfa.e.message }}
  </HeaderText>
</template>
