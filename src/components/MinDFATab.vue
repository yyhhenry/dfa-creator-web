<script setup lang="ts">
import { safeMinDfa, safeNfa2dfa, safeReg2nfa } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { ElInput, ElMessage } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import MdGroup from './MdGroup.vue';
import ExamplesBox from './ExamplesBox.vue';

const dfa = useStorage('dfac-min', '');
const throttledDFA = refThrottled(dfa, 500);
const putRegExample = (reg: string) => {
  safeReg2nfa(reg)
    .andThen(safeNfa2dfa)
    .match(
      ([dfaJson]) => {
        dfa.value = dfaJson;
      },
      (e) => {
        ElMessage.error(e.message);
      },
    );
};

interface ViewMap {
  md?: string;
  json?: string;
  err?: string;
}
const view = computed(() => {
  const dfa = throttledDFA.value;
  if (dfa === '') {
    return {};
  }
  return safeMinDfa(dfa).match<ViewMap>(
    ([json, md]) => ({ json, md }),
    (e) => ({ err: e.message }),
  );
});
</script>
<template>
  <ElInput v-model="dfa" placeholder="Enter DFA JSON" type="textarea" autosize />
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <MdGroup :view="view" />
</template>
