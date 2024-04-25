<script setup lang="ts">
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import MdGroup from './MdGroup.vue';
import ExamplesBox from './ExamplesBox.vue';
import { minimizeDfa, regexToDfa } from 'dfa-creator';
import { safeDfaFromJson } from '@/utils/safe-dfac';

const input = useStorage('dfac-min', '');
const dfaJson = refThrottled(input, 500);
const putRegExample = (reg: string) => {
  input.value = JSON.stringify(regexToDfa(reg));
};

interface ViewMap {
  md?: string;
  json?: string;
  err?: string;
}
const view = computed(() => {
  if (dfaJson.value === '') {
    return {};
  }
  const dfa = safeDfaFromJson(dfaJson.value).map(minimizeDfa);
  return dfa.match<ViewMap>(
    ({ minDfa, markdown: md }) => ({ md, json: JSON.stringify(minDfa) }),
    (e) => ({ err: e.message }),
  );
});
</script>
<template>
  <ElInput v-model="input" placeholder="Enter DFA JSON" type="textarea" autosize />
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <MdGroup :view="view" />
</template>
