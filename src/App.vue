<script setup lang="ts">
import { z } from 'zod';
import { useCheckedStorage } from './utils/storage';
import { theme } from './utils/theme';
import { ref } from 'vue';

const settingsDrawer = ref(false);
const DTabValue = z.enum([
  'reg2nfa',
  'nfa2dfa',
  'min-dfa',
  'show-dfa',
  'show-nfa',
]);
const tab = useCheckedStorage('dfac-tab', DTabValue, 'reg2nfa');
</script>
<template>
  <v-app :theme="theme">
    <GlobalSnackbar />
    <v-app-bar title="DFA Creator">
      <template #append>
        <AboutDialog />
        <v-btn
          icon="mdi-cog"
          round
          @click="() => (settingsDrawer = !settingsDrawer)"
          title="Settings"
      /></template>
    </v-app-bar>
    <v-navigation-drawer
      :width="400"
      v-model="settingsDrawer"
      :location="'right'"
      temporary
    >
      <SettingsView />
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-card>
          <v-tabs v-model="tab">
            <v-tab value="reg2nfa" class="text-body-1">Regex -> NFA</v-tab>
            <v-tab value="nfa2dfa" class="text-body-1">NFA -> DFA</v-tab>
            <v-tab value="min-dfa" class="text-body-1">Minimize DFA</v-tab>
            <v-tab value="show-dfa" class="text-body-1">Show DFA</v-tab>
            <v-tab value="show-nfa" class="text-body-1">Show NFA</v-tab>
          </v-tabs>
          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="reg2nfa">
                <RegexToNfaTab />
              </v-tabs-window-item>
              <v-tabs-window-item value="nfa2dfa">
                <NfaToDfaTab />
              </v-tabs-window-item>
              <v-tabs-window-item value="min-dfa">
                <MinDfaTab />
              </v-tabs-window-item>
              <v-tabs-window-item value="show-dfa">
                <ShowDfaTab />
              </v-tabs-window-item>
              <v-tabs-window-item value="show-nfa">
                <ShowNfaTab />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
