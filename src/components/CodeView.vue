<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.min.css';
import { GSnackbar } from '@/utils/global-snackbar';
import mermaid from 'mermaid';

const props = defineProps<{
  code: string;
  lang: string;
}>();
const language = computed(() =>
  hljs.getLanguage(props.lang) ? props.lang : 'plaintext'
);
const highlighted = computed(
  () => hljs.highlight(props.code, { language: language.value }).value
);
const onCopy = async () => {
  await navigator.clipboard.writeText(props.code);
  GSnackbar.success('Copied code to clipboard');
};
const mermaidRef = ref<HTMLElement | null>(null);
const updateMermaid = async () => {
  const node = mermaidRef.value;
  if (!node) return;
  await mermaid.run({
    nodes: [node],
  });
};
onMounted(updateMermaid);
watch(() => mermaidRef.value, updateMermaid);
</script>
<template>
  <div class="hljs pa-2" style="border-radius: 1em">
    <div class="d-flex align-center">
      <span class="pa-2">{{ lang }}</span>
      <v-spacer></v-spacer>
      <v-btn variant="plain" icon="mdi-content-copy" @click="onCopy"></v-btn>
    </div>
    <v-divider></v-divider>
    <pre
      ref="mermaidRef"
      v-if="lang === 'mermaid'"
      class="d-flex justify-center"
      :key="code"
      >{{ code }}</pre
    >
    <pre
      v-else
    ><code :class="`language-${language}`" v-html="highlighted"></code></pre>
  </div>
</template>

<style scoped>
pre {
  padding: 0.5em;
  overflow-x: auto;
}
</style>
