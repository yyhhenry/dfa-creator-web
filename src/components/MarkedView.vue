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

<style lang="scss">
.marked-view {
  & > * {
    margin: 0.5em 0;
  }
  ol,
  ul {
    padding-left: 1.5em;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    border-top: 1.5pt solid grey;
    border-bottom: 1.5pt solid grey;
    th,
    td {
      padding: 0.5em 1em;
    }
    th {
      border-bottom: 1pt solid grey;
      padding: 0.5em;
    }
  }
}
</style>
