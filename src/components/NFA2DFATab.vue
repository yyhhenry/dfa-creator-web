<script setup lang="ts">
import { safeNfa2dfa, safeReg2nfa } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { ElInput, ElMessage } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { type ViewMap } from '@/utils/types';
import MdGroup from './MdGroup.vue';
import ExamplesBox from './ExamplesBox.vue';

const nfa = useStorage('dfac-n2d', '');
const throttledNFA = refThrottled(nfa, 500);
const putRegExample = (reg: string) => {
  safeReg2nfa(reg).match(
    (nfaJson) => {
      nfa.value = nfaJson;
    },
    (e) => {
      ElMessage.error(e.message);
    },
  );
};
const view = computed(() => {
  const nfa = throttledNFA.value;
  if (nfa === '') {
    return {};
  }
  return safeNfa2dfa(nfa).match<ViewMap>(
    ([json, md]) => ({ json, md }),
    (e) => ({ err: e.message }),
  );
});
</script>
<template>
  <ElInput v-model="nfa" placeholder="Enter NFA JSON" type="textarea" autosize />
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <MdGroup :view="view" />
</template>
