<script setup lang="ts">
import { type ViewMap } from '@/utils/types';
import MdBox from './MdBox.vue';
import { HeaderText } from '@yyhhenry/element-extra';
defineProps<{
  view: ViewMap;
}>();
</script>
<template>
  <MdBox v-if="view.mermaid" :content="view.mermaid.content" :lang="'mermaid'">
    <template #header>{{ view.mermaid.title }}</template>
  </MdBox>

  <MdBox v-if="view.md" :content="view.md"> </MdBox>

  <MdBox v-if="view.json" :content="view.json" :lang="'json'" copyable>
    <template #header>JSON</template>
  </MdBox>

  <HeaderText v-if="view.err"> {{ view.err }} </HeaderText>
</template>
