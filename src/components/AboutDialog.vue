<script setup lang="ts">
import { ref } from 'vue';

const aboutDialog = ref(false);
const aboutMd = `
> **特别鸣谢：编译原理宋老师**

Web tool to create and minimize DFA/NFA.

Rust library [dfa-creator](https://github.com/yyhhenry/dfa-creator) (Binary release [dfac](https://github.com/yyhhenry/dfa-creator/releases/latest)).

TypeScript library [dfa-creator](https://npmjs.com/package/dfa-creator).

Web demo [DFA Creator](https://dfac.pages.dev/) (Source [dfa-creator-web](https://github.com/yyhhenry/dfa-creator-web)).
`;
</script>
<template>
  <v-btn
    icon="mdi-information"
    title="About"
    @click="aboutDialog = true"
  ></v-btn>
  <v-dialog scrollable v-model="aboutDialog" :max-width="600">
    <v-card class="my-4">
      <v-card-title>
        <v-icon>mdi-information</v-icon>
        About DFA Creator
      </v-card-title>
      <v-card-text>
        <MarkedView :markdown="aboutMd" />
      </v-card-text>
      <v-card-actions>
        <v-btn size="large" @click="aboutDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
