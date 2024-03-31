<script setup lang="ts">
import { dfa2mermaid, minimize_dfa, nfa2dfa, reg2nfa, test_dfa } from 'dfa-creator';
import { computed } from 'vue';
import { ElButton, ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { rustError, Ok } from 'luoluo-rust-error';
import { isError } from '@/utils/types';
import { FlexBox, HeaderText } from 'luoluo-vue-components';
import MdBox from './MdBox.vue';
import { regExamples } from '@/utils/examples';
import { Select, Close } from '@element-plus/icons-vue';

const dfa = useStorage('dfac-show-dfa', '');
const str = useStorage('dfac-show-dfa-str', '');
const throttledDFA = refThrottled(dfa, 500);
const throttledStr = refThrottled(str, 500);
const safeShowDfa = rustError(dfa2mermaid, isError);
const safeTestDfa = rustError(test_dfa, isError);
const dfaMd = computed(() => {
  const dfa = throttledDFA.value;
  return dfa === '' ? Ok('') : safeShowDfa(dfa);
});
const testResult = computed(() => {
  const dfa = throttledDFA.value;
  const str = throttledStr.value;
  return dfa === '' ? Ok(false) : safeTestDfa(dfa, str);
});
</script>
<template>
  <FlexBox>
    <ElInput v-model="dfa" placeholder="Enter DFA JSON" type="textarea" />
  </FlexBox>
  <FlexBox>
    <ElInput
      v-model="str"
      :size="'large'"
      placeholder="Enter string to test"
      :prefix-icon="testResult.ok && testResult.v ? Select : Close"
      :style="{ fontSize: '2em' }"
      :input-style="{ fontSize: '0.7em' }"
    >
    </ElInput>
  </FlexBox>

  <FlexBox>
    <HeaderText>
      <span :style="{ marginRight: '20px' }">Examples</span>
      <ElButton
        v-for="example in regExamples"
        :key="example"
        @click="dfa = minimize_dfa(nfa2dfa(reg2nfa(example))[0])[0]"
        round
      >
        {{ example }}
      </ElButton>
    </HeaderText>
  </FlexBox>

  <MdBox v-if="dfaMd.ok && dfaMd.v" :content="dfaMd.v" :lang="'mermaid'"> </MdBox>

  <HeaderText v-if="!dfaMd.ok">
    {{ dfaMd.e.message }}
  </HeaderText>

  <HeaderText v-if="dfaMd.ok && !testResult.ok">
    {{ testResult.e.message }}
  </HeaderText>
</template>
