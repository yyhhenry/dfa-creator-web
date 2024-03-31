<script setup lang="ts">
import { PageLayout, FlexCard, SwitchDark, HeaderText } from 'luoluo-vue-components';
import { websiteName } from '@/utils/website-name';
import Reg2NFATab from './components/Reg2NFATab.vue';
import MdBox from './components/MdBox.vue';
import { ElTabPane, ElTabs } from 'element-plus';
const infoMd = `
> **特别鸣谢：编译原理宋老师**

Rust source [dfa-creator](https://github.com/yyhhenry/dfa-creator).

Rust release [dfac](https://github.com/yyhhenry/dfa-creator/releases/latest).

TypeScript library [dfa-creator](https://npmjs.com/package/dfa-creator).
`.trimStart();
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
      <MdBox :content="infoMd"> </MdBox>
    </FlexCard>
    <FlexCard>
      <ElTabs type="border-card">
        <ElTabPane label="Reg2NFA">
          <Reg2NFATab />
        </ElTabPane>
      </ElTabs>
    </FlexCard>
    <!-- Extra Scroll -->
    <div style="height: 40vh"></div>
  </PageLayout>
</template>
