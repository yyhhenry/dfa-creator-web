<script setup lang="ts">
import { PageLayout, FlexCard, SwitchDark, HeaderText } from 'luoluo-vue-components';
import { websiteName } from '@/utils/website-name';
import Reg2NFATab from './components/Reg2NFATab.vue';
import NFA2DFATab from './components/NFA2DFATab.vue';
import MinDFATab from './components/MinDFATab.vue';
import MdBox from './components/MdBox.vue';
import { ElTabPane, ElTabs } from 'element-plus';
import { useStorage } from '@vueuse/core';
const infoMd = `
> **特别鸣谢：编译原理宋老师**

Rust source [dfa-creator](https://github.com/yyhhenry/dfa-creator).

Rust release [dfac](https://github.com/yyhhenry/dfa-creator/releases/latest).

TypeScript library [dfa-creator](https://npmjs.com/package/dfa-creator).
`.trimStart();
const tab = useStorage('dfac-tab', '0');
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
      <ElTabs type="border-card" v-model="tab">
        <ElTabPane label="Reg2NFA" lazy>
          <Reg2NFATab />
        </ElTabPane>
        <ElTabPane label="NFA2DFA" lazy>
          <NFA2DFATab />
        </ElTabPane>
        <ElTabPane label="MinDFA" lazy>
          <MinDFATab />
        </ElTabPane>
      </ElTabs>
    </FlexCard>
    <!-- Extra Scroll -->
    <div style="height: 40vh"></div>
  </PageLayout>
</template>
