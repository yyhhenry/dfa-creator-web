<script setup lang="ts">
defineEmits<{
  (event: 'put', reg: string): void;
}>();
const regExamples = ['(a|b)*aab', '1(1010*|1(010)*1)*0', 'a((a|b)*|ab*a)*b'];
</script>
<template>
  <div class="d-flex align-center ga-3 pa-2">
    <div class="text-h5 mx-2">Examples:</div>
    <v-btn
      class="text-body-1"
      variant="outlined"
      v-for="example in regExamples"
      :key="example"
      @click="$emit('put', example)"
    >
      {{ example }}
    </v-btn>
  </div>
</template>
