<script setup lang="ts">
import { safeNfaFromJson } from '@/utils/safe-dfac';
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { FlexBox } from '@yyhhenry/element-extra';
import { Select, Close } from '@element-plus/icons-vue';
import ExamplesBox from './ExamplesBox.vue';
import MdGroup from './MdGroup.vue';
import type { TestViewMap } from '@/utils/types';
import { nfaToMermaid, regexToNfa, testNfa } from 'dfa-creator';
import { escapeStr } from '@/utils/escape';

const nfaInput = useStorage('dfac-show-nfa', '');
const strInput = useStorage('dfac-show-nfa-str', '');
const nfaJson = refThrottled(nfaInput, 500);
const str = refThrottled(strInput, 500);
const putRegExample = (reg: string) => {
  nfaInput.value = JSON.stringify(regexToNfa(reg));
};
const view = computed(() => {
  if (nfaJson.value === '') {
    return {};
  }
  const escaped = escapeStr(str.value);
  if (escaped.isErr()) {
    return { err: escaped.error.message };
  }
  const nfa = safeNfaFromJson(nfaJson.value);
  if (nfa.isErr()) {
    return { err: nfa.error.message };
  }
  const nfaV = nfa.unwrap();
  return {
    mermaid: {
      title: 'NFA',
      content: nfaToMermaid(nfaV),
    },
    accepted: testNfa(nfaV, escaped.unwrap()),
  } satisfies TestViewMap;
});
</script>
<template>
  <FlexBox>
    <ElInput
      v-model="nfaInput"
      placeholder="Enter NFA JSON"
      type="textarea"
      autosize
    />
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
