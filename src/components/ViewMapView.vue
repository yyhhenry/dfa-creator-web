<script setup lang="ts">
import { type ViewMap } from '@/utils/view-map-types';
import CodeView from './CodeView.vue';
import MarkedView from './MarkedView.vue';

defineProps<{
  view: ViewMap;
}>();
</script>
<template>
  <v-banner v-if="view.err" :text="view.err"></v-banner>
  <CodeView v-if="view.mermaid" :code="view.mermaid.content" :lang="'mermaid'">
  </CodeView>

  <MarkedView v-if="view.md" :markdown="view.md"> </MarkedView>

  <v-card variant="text" v-if="view.json">
    <v-card-title>JSON</v-card-title>
    <CodeView :code="view.json" :lang="'json'"></CodeView>
  </v-card>
</template>
