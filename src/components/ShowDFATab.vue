<script setup lang="ts">
import { safeMinDfa, safeNfa2dfa, safeReg2nfa, safeShowDfa, safeTestDfa } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { ElInput, ElMessage } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { type TestViewMap } from '@/utils/types';
import { FlexBox } from '@yyhhenry/element-extra';
import { Select, Close } from '@element-plus/icons-vue';
import MdGroup from './MdGroup.vue';
import ExamplesBox from './ExamplesBox.vue';

const dfa = useStorage('dfac-show-dfa', '');
const str = useStorage('dfac-show-dfa-str', '');
const throttledDFA = refThrottled(dfa, 500);
const throttledStr = refThrottled(str, 500);
const putRegExample = (reg: string) => {
  safeReg2nfa(reg)
    .andThen(safeNfa2dfa)
    .map(([dfa]) => dfa)
    .andThen(safeMinDfa)
    .match(
      ([dfaJson]) => {
        dfa.value = dfaJson;
      },
      (e) => {
        ElMessage.error(e.message);
      },
    );
};
const view = computed(() => {
  const dfa = throttledDFA.value;
  const str = throttledStr.value;
  if (dfa === '') {
    return {};
  }
  return safeShowDfa(dfa).match<TestViewMap>(
    (mermaid) =>
      safeTestDfa(dfa, str).match<TestViewMap>(
        (accepted) => ({
          mermaid: {
            title: 'DFA',
            content: mermaid,
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
    <ElInput v-model="dfa" placeholder="Enter DFA JSON" type="textarea" autosize />
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
