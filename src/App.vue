<script setup lang="ts">
import { PageLayout, FlexCard, FlexBox, SwitchDark, HeaderText } from '@yyhhenry/element-extra';
import { websiteName } from '@/utils/website-name';
import RegexToNfaTab from './components/RegexToNfaTab.vue';
import NfaToDfaTab from './components/NfaToDfaTab.vue';
import MinDfaTab from './components/MinDfaTab.vue';
import MdBox from './components/MdBox.vue';
import { ElTabPane, ElTabs } from 'element-plus';
import { useStorage } from '@vueuse/core';
import ShowDfaTab from './components/ShowDfaTab.vue';
import ShowNfaTab from './components/ShowNfaTab.vue';
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
        <ElTabPane label="Regex -> NFA" lazy>
          <RegexToNfaTab />
        </ElTabPane>
        <ElTabPane label="NFA -> DFA" lazy>
          <NfaToDfaTab />
        </ElTabPane>
        <ElTabPane label="Minimize DFA" lazy>
          <MinDfaTab />
        </ElTabPane>
        <ElTabPane label="Show DFA" lazy>
          <ShowDfaTab />
        </ElTabPane>
        <ElTabPane label="Show NFA" lazy>
          <ShowNfaTab />
        </ElTabPane>
      </ElTabs>
    </FlexBox>
    <!-- Extra Scroll -->
    <div style="height: 40vh"></div>
  </PageLayout>
</template>
