<script setup lang="ts">
import { safeRegexToNfa } from '../utils/safe-dfac';
import { computed } from 'vue';
import { refDebounced } from '@vueuse/core';
import { type ViewMap } from '@/utils/view-map-types';
import { nfaToMermaid } from 'dfa-creator';
import { useCheckedStorage } from '@/utils/storage';
import { z } from 'zod';

const input = useCheckedStorage('dfac-r2n', z.string(), '');
const regex = refDebounced(input, 500, { maxWait: 5000 });
const view = computed(() => {
  if (regex.value === '') {
    return {};
  }
  return safeRegexToNfa(regex.value).match<ViewMap>(
    (nfa) => ({
      json: JSON.stringify(nfa),
      mermaid: {
        title: 'NFA',
        content: nfaToMermaid(nfa),
      },
    }),
    (e) => ({ err: e.message })
  );
});
</script>
<template>
  <v-text-field label="Regex" v-model="input" clearable></v-text-field>
  <ExamplesBox @put="(reg) => (input = reg)" />
  <ViewMapView :view="view" />
</template>
