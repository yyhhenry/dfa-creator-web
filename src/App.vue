<script setup lang="ts">
import { PageLayout, FlexCard, FlexBox, SwitchDark, HeaderText } from '@yyhhenry/element-extra';
import { websiteName } from '@/utils/website-name';
import Reg2NFATab from './components/Reg2NFATab.vue';
import NFA2DFATab from './components/NFA2DFATab.vue';
import MinDFATab from './components/MinDFATab.vue';
import MdBox from './components/MdBox.vue';
import { ElTabPane, ElTabs } from 'element-plus';
import { useStorage } from '@vueuse/core';
import ShowDFATab from './components/ShowDFATab.vue';
import ShowNFATab from './components/ShowNFATab.vue';
const infoMd = `
> **特别鸣谢：编译原理宋老师**

Web tool to create and minimize DFA/NFA.

Rust library [dfa-creator](https://github.com/yyhhenry/dfa-creator) (Binary release [dfac](https://github.com/yyhhenry/dfa-creator/releases/latest)).

TypeScript library [dfa-creator](https://npmjs.com/package/dfa-creator).

Web demo [DFA Creator](https://dfac.pages.dev/) (Source [dfa-creator-web](https://github.com/yyhhenry/dfa-creator-web)).
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
    <FlexBox>
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
        <ElTabPane label="ShowDFA" lazy>
          <ShowDFATab />
        </ElTabPane>
        <ElTabPane label="ShowNFA" lazy>
          <ShowNFATab />
        </ElTabPane>
      </ElTabs>
    </FlexBox>
    <!-- Extra Scroll -->
    <div style="height: 40vh"></div>
  </PageLayout>
</template>
