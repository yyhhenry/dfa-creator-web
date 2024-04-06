<script setup lang="ts">
import { safeReg2nfa, safeShowNfa } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { type ViewMap } from '@/utils/types';
import MdGroup from './MdGroup.vue';
import ExamplesBox from './ExamplesBox.vue';

const regex = useStorage('dfac-r2n', '');
const throttledRegex = refThrottled(regex, 500);
const view = computed(() => {
  const reg = throttledRegex.value;
  if (reg === '') {
    return {};
  }
  return safeReg2nfa(reg).match<ViewMap>(
    (json) =>
      safeShowNfa(json).match<ViewMap>(
        (mermaid) => ({
          mermaid: {
            content: mermaid,
            title: 'NFA',
          },
          json,
        }),
        (e) => ({ err: e.message }),
      ),
    (e) => ({ err: e.message }),
  );
});
</script>
<template>
  <ElInput v-model="regex" placeholder="Enter a regular expression" />
  <ExamplesBox @put="(example) => (regex = example)" />
  <MdGroup :view="view" />
</template>
