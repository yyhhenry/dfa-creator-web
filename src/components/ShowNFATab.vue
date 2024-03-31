<script setup lang="ts">
import { nfa2mermaid, reg2nfa, test_nfa } from 'dfa-creator';
import { computed } from 'vue';
import { ElButton, ElInput } from 'element-plus';
import { refThrottled, useStorage } from '@vueuse/core';
import { rustError, Ok } from 'luoluo-rust-error';
import { isError } from '@/utils/types';
import { FlexBox, HeaderText } from 'luoluo-vue-components';
import MdBox from './MdBox.vue';
import { regExamples } from '@/utils/examples';
import { Select, Close } from '@element-plus/icons-vue';

const nfa = useStorage('dfac-show-nfa', '');
const str = useStorage('dfac-show-nfa-str', '');
const throttledNFA = refThrottled(nfa, 500);
const throttledStr = refThrottled(str, 500);
const safeShowNfa = rustError(nfa2mermaid, isError);
const safeTestNfa = rustError(test_nfa, isError);
const nfaMd = computed(() => {
  const nfa = throttledNFA.value;
  return nfa === '' ? Ok('') : safeShowNfa(nfa);
});
const testResult = computed(() => {
  const nfa = throttledNFA.value;
  const str = throttledStr.value;
  return nfa === '' ? Ok(false) : safeTestNfa(nfa, str);
});
</script>
<template>
  <FlexBox>
    <ElInput v-model="nfa" placeholder="Enter NFA JSON" type="textarea" />
  </FlexBox>
  <FlexBox>
    <ElInput
      v-model="str"
      :size="'large'"
      placeholder="Enter string to test"
      :prefix-icon="testResult.ok && testResult.v ? Select : Close"
      :style="{ fontSize: '2em' }"
      :input-style="{ fontSize: '0.5em' }"
    >
    </ElInput>
  </FlexBox>

  <FlexBox>
    <HeaderText>
      <span :style="{ marginRight: '20px' }">Examples</span>
      <ElButton v-for="example in regExamples" :key="example" @click="nfa = reg2nfa(example)" round>
        {{ example }}
      </ElButton>
    </HeaderText>
  </FlexBox>

  <MdBox v-if="nfaMd.ok && nfaMd.v" :content="nfaMd.v" :lang="'mermaid'"> </MdBox>

  <HeaderText v-if="!nfaMd.ok">
    {{ nfaMd.e.message }}
  </HeaderText>

  <HeaderText v-if="!testResult.ok">
    {{ testResult.e.message }}
  </HeaderText>
</template>
