<script setup lang="ts">
import { safeReg2nfa, safeShowNfa, safeTestNfa } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { ElInput, ElMessage } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { FlexBox } from '@yyhhenry/element-extra';
import { Select, Close } from '@element-plus/icons-vue';
import ExamplesBox from './ExamplesBox.vue';
import MdGroup from './MdGroup.vue';
import type { TestViewMap } from '@/utils/types';

const nfa = useStorage('dfac-show-nfa', '');
const str = useStorage('dfac-show-nfa-str', '');
const throttledNFA = refThrottled(nfa, 500);
const throttledStr = refThrottled(str, 500);
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
  const str = throttledStr.value;
  if (nfa === '') {
    return {};
  }
  return safeShowNfa(nfa).match<TestViewMap>(
    (mermaid) =>
      safeTestNfa(nfa, str).match<TestViewMap>(
        (accepted) => ({
          mermaid: {
            content: mermaid,
            title: 'NFA',
          },
          accepted,
        }),
        (e) => ({ err: e.message }),
      ),
    (e) => ({ err: e.message }),
  );
});
</script>
<template>
  <FlexBox>
    <ElInput v-model="nfa" placeholder="Enter NFA JSON" type="textarea" autosize />
  </FlexBox>
  <FlexBox>
    <ElInput
      v-model="str"
      :size="'large'"
      placeholder="Enter string to test"
      :prefix-icon="view.accepted ? Select : Close"
      :style="{ fontSize: '2em' }"
      :input-style="{ fontSize: '0.5em' }"
    >
    </ElInput>
  </FlexBox>
  <ExamplesBox @put="putRegExample"></ExamplesBox>
  <MdGroup :view="view" />
</template>
