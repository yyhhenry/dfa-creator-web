<script setup lang="ts">
import { safeRegexToNfa } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { type ViewMap } from '@/utils/types';
import MdGroup from './MdGroup.vue';
import ExamplesBox from './ExamplesBox.vue';
import { nfaToMermaid } from 'dfa-creator';

const input = useStorage('dfac-r2n', '');
const regex = refThrottled(input, 500);
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
    (e) => ({ err: e.message }),
  );
});
</script>
<template>
  <ElInput v-model="input" placeholder="Enter a regular expression" />
  <ExamplesBox @put="(example) => (input = example)" />
  <MdGroup :view="view" />
</template>
