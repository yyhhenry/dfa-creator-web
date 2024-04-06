<script setup lang="ts">
import { ElButton } from 'element-plus';
import { FlexBox, HeaderText } from '@yyhhenry/element-extra';
import { regExamples } from '@/utils/examples';
defineEmits<{
  (event: 'put', reg: string): void;
}>();
</script>
<template>
  <FlexBox>
    <HeaderText>
      <span :style="{ marginRight: '20px' }">Examples</span>
      <ElButton v-for="example in regExamples" :key="example" @click="$emit('put', example)" round>
        {{ example }}
      </ElButton>
    </HeaderText>
  </FlexBox>
</template>
