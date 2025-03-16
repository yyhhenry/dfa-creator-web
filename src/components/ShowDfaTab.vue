<script setup lang="ts">
import { computed } from 'vue';
import { refDebounced, useStorage } from '@vueuse/core';
import { type TestViewMap } from '@/utils/view-map-types';
import ExamplesBox from './ExamplesBox.vue';
import { dfaToMermaid, regexToMinDfa, testDfa } from 'dfa-creator';
import { safeDfaFromJson } from '@/utils/safe-dfac';
import { escapeStr } from '@/utils/escape';
import ViewMapView from './ViewMapView.vue';
import { Result } from 'neverthrow';

const dfaInput = useStorage('dfac-show-dfa', '');
const strInput = useStorage('dfac-show-dfa-str', '');
const dfaJson = refDebounced(dfaInput, 500);
const str = refDebounced(strInput, 500);
const putRegExample = (reg: string) => {
  dfaInput.value = JSON.stringify(regexToMinDfa(reg));
};
const view = computed<TestViewMap>(() => {
  if (dfaJson.value === '') {
    return {};
  }
  return Result.combine([
    escapeStr(str.value),
    safeDfaFromJson(dfaJson.value),
  ]).match(
    ([escaped, nfa]) => ({
      mermaid: {
        title: 'NFA',
        content: dfaToMermaid(nfa),
      },
      accepted: testDfa(nfa, escaped),
    }),
    (e) => ({ err: e.message })
  );
});
</script>
<template>
  <v-text-field label="DFA JSON" v-model="dfaInput" clearable></v-text-field>
  <v-text-field
    label="String To Test"
    v-model="strInput"
    :prepend-inner-icon="view.accepted ? 'mdi-check-all' : 'mdi-close-thick'"
    clearable
  ></v-text-field>
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <ViewMapView :view="view" />
</template>
