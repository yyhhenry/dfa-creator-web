<script setup lang="ts">
import { computed } from 'vue';
import { refDebounced, useStorage } from '@vueuse/core';
import { minimizeDfa, regexToDfa } from 'dfa-creator';
import { safeDfaFromJson } from '@/utils/safe-dfac';

const input = useStorage('dfac-min', '');
const dfaJson = refDebounced(input, 500);
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
    (e) => ({ err: e.message })
  );
});
</script>
<template>
  <v-text-field label="DFA JSON" v-model="input" clearable></v-text-field>
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <ViewMapView :view="view" />
</template>
