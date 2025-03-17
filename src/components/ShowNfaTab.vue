<script setup lang="ts">
import { safeNfaFromJson } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { refDebounced, useStorage } from '@vueuse/core';
import type { TestViewMap } from '@/utils/view-map-types';
import { nfaToMermaid, regexToNfa, testNfa } from 'dfa-creator';
import { escapeStr } from '@/utils/escape';
import { Result } from 'neverthrow';

const nfaInput = useStorage('dfac-show-nfa', '');
const strInput = useStorage('dfac-show-nfa-str', '');
const nfaJson = refDebounced(nfaInput, 500);
const str = refDebounced(strInput, 500);
const putRegExample = (reg: string) => {
  nfaInput.value = JSON.stringify(regexToNfa(reg));
};
const view = computed<TestViewMap>(() => {
  if (nfaJson.value === '') {
    return {};
  }
  return Result.combine([
    escapeStr(str.value),
    safeNfaFromJson(nfaJson.value),
  ]).match(
    ([escaped, nfa]) => ({
      mermaid: {
        title: 'NFA',
        content: nfaToMermaid(nfa),
      },
      accepted: testNfa(nfa, escaped),
    }),
    (e) => ({ err: e.message })
  );
});
</script>
<template>
  <v-text-field label="NFA JSON" v-model="nfaInput" clearable></v-text-field>
  <v-text-field
    label="String To Test"
    v-model="strInput"
    :prepend-inner-icon="view.accepted ? 'mdi-check-all' : 'mdi-close-thick'"
    clearable
  ></v-text-field>
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <ViewMapView :view="view" />
</template>
