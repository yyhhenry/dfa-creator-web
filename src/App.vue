<script setup lang="ts">
import { PageLayout, FlexCard, SwitchDark, HeaderText } from 'luoluo-vue-components';
import { websiteName } from '@/utils/website-name';
</script>
<template>
  <PageLayout>
    <template #header> {{ websiteName }} </template>
    <template #header-extra>
      <SwitchDark />
    </template>
    <FlexCard>
      <template #header>
        <HeaderText>Info</HeaderText>
      </template>
      <div>特别鸣谢：编译原理宋老师</div>
    </FlexCard>
    <FlexCard>
      <template name="header"> Convert </template>
      <div>Unimplemented</div>
    </FlexCard>
  </PageLayout>
</template>
