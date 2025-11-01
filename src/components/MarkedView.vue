<script setup lang="ts">
import { markedLex, markedParse } from '@/utils/markdown';
import { computed } from 'vue';

const props = defineProps<{
  markdown: string;
  /**
   * Disable the markdown parser to show plain text
   */
  disableParser?: boolean;
}>();

const tokens = computed(() => markedLex(props.markdown));
</script>
<template>
  <div v-if="!disableParser" class="marked-view">
    <template v-for="[idx, token] of tokens.entries()" :key="idx">
      <div v-if="token.type === 'code'">
        <CodeView :code="token.text" :lang="token.lang"></CodeView>
      </div>
      <div v-else v-html="markedParse(token)"></div>
    </template>
  </div>
  <div v-else>
    <p
      :style="{ whiteSpace: 'pre-wrap' }"
      class="my-2"
      v-for="[idx, line] of markdown.split('\n').entries()"
      :key="idx"
    >
      {{ line }}
    </p>
  </div>
</template>

<style>
/* Not scoped to allow styling of child elements */
.marked-view > * {
  margin: 0.5em 0;
}

.marked-view ol,
.marked-view ul {
  padding-left: 1.5em;
}

.marked-view table {
  border-collapse: collapse;
  border-spacing: 0;
  border-top: 1.5pt solid grey;
  border-bottom: 1.5pt solid grey;
}

.marked-view table th,
.marked-view table td {
  padding: 0.5em 1em;
}

.marked-view table th {
  border-bottom: 1pt solid grey;
  padding: 0.5em;
}
</style>
