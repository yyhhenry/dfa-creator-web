<script setup lang="ts">
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { type TestViewMap } from '@/utils/types';
import { FlexBox } from '@yyhhenry/element-extra';
import { Select, Close } from '@element-plus/icons-vue';
import MdGroup from './MdGroup.vue';
import ExamplesBox from './ExamplesBox.vue';
import { dfaToMermaid, regexToMinDfa, testDfa } from 'dfa-creator';
import { safeDfaFromJson } from '@/utils/safe-dfac';
import { escapeStr } from '@/utils/escape';
import { Result } from 'neverthrow';

const dfaInput = useStorage('dfac-show-dfa', '');
const strInput = useStorage('dfac-show-dfa-str', '');
const dfaJson = refThrottled(dfaInput, 500);
const str = refThrottled(strInput, 500);
const putRegExample = (reg: string) => {
  dfaInput.value = JSON.stringify(regexToMinDfa(reg));
};
const view = computed(() => {
  if (dfaJson.value === '') {
    return {};
  }
  const escaped = escapeStr(str.value);
  const dfa = safeDfaFromJson(dfaJson.value);
  return Result.combine([escaped, dfa]).match<TestViewMap>(
    ([str, dfa]) => ({
      mermaid: {
        title: 'DFA',
        content: dfaToMermaid(dfa),
      },
      accepted: testDfa(dfa, str),
    }),
    (e) => ({ err: e.message }),
  );
});
</script>
<template>
  <FlexBox>
    <ElInput v-model="dfaInput" placeholder="Enter DFA JSON" type="textarea" autosize />
  </FlexBox>
  <FlexBox>
    <ElInput
      v-model="strInput"
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
