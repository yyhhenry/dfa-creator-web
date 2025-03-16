<script setup lang="ts">
import { safeNfaFromJson } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { refDebounced, useStorage } from '@vueuse/core';
import { type ViewMap } from '@/utils/view-map-types';
import ExamplesBox from './ExamplesBox.vue';
import { nfaToDfa, regexToNfa } from 'dfa-creator';
import ViewMapView from './ViewMapView.vue';

const input = useStorage('dfac-n2d', '');
const nfaJson = refDebounced(input, 500);
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
    (e) => ({ err: e.message })
  );
});
</script>
<template>
  <v-text-field label="NFA JSON" v-model="input" clearable></v-text-field>
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <ViewMapView :view="view" />
</template>
