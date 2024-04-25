<script setup lang="ts">
import { safeNfaFromJson } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { type ViewMap } from '@/utils/types';
import MdGroup from './MdGroup.vue';
import ExamplesBox from './ExamplesBox.vue';
import { nfaToDfa, regexToNfa } from 'dfa-creator';

const input = useStorage('dfac-n2d', '');
const nfaJson = refThrottled(input, 500);
const putRegExample = (reg: string) => {
  input.value = JSON.stringify(regexToNfa(reg));
};
const view = computed(() => {
  if (nfaJson.value === '') {
    return {};
  }
  const dfa = safeNfaFromJson(nfaJson.value).map(nfaToDfa);
  return dfa.match<ViewMap>(
    ({ dfa, markdown: md }) => ({ md, json: JSON.stringify(dfa) }),
    (e) => ({ err: e.message }),
  );
});
</script>
<template>
  <ElInput v-model="input" placeholder="Enter NFA JSON" type="textarea" autosize />
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <MdGroup :view="view" />
</template>
