<script setup lang="ts">
import { FlexBox, HeaderText } from '@yyhhenry/element-extra';
import { md } from '@/utils/md';
import mermaid from 'mermaid';
import { computed, onMounted, onUpdated } from 'vue';
import { v4 as uuid } from 'uuid';
import { ElButton, ElMessage } from 'element-plus';
import { CopyDocument } from '@element-plus/icons-vue';
const props = defineProps<{
  content: string;
  copyable?: boolean;
  lang?: string;
}>();
const slots = defineSlots<{
  header?: (_: unknown) => unknown;
}>();
const mdSrc = computed(() => {
  if (props.lang) {
    return `\`\`\`${props.lang}\n${props.content}\n\`\`\``;
  }
  return props.content;
});
const mdHtml = computed(() => md.render(mdSrc.value));
const id = 'md' + uuid();
const updateMermaid = async () => {
  await mermaid.run({
    querySelector: `#${id} pre.mermaid`,
  });
};
onMounted(updateMermaid);
onUpdated(updateMermaid);
const copy = async () => {
  await navigator.clipboard.writeText(props.content);
  ElMessage.success('Copied to clipboard');
};
</script>
<template>
  <FlexBox>
    <HeaderText>
      <slot v-if="slots.header" name="header"></slot>
      <ElButton
        v-if="copyable"
        :style="{ margin: '5px' }"
        :icon="CopyDocument"
        @click="copy"
        circle
      ></ElButton>
    </HeaderText>
    <div :id="id" :innerHTML="mdHtml" :class="'markdown-html'"></div>
  </FlexBox>
</template>

<style>
.markdown-html pre.mermaid[data-processed='true'] {
  background-color: none;
  display: flex;
  justify-content: center;
}
.markdown-html pre {
  padding: 15px;
  border-radius: 15px;
  margin: 5px;
  background-color: black;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
