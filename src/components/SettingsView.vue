<script setup lang="ts">
import { theme, themeIconOf } from '@/utils/theme';
</script>
<template>
  <v-card variant="text">
    <v-card-title>
      <v-icon>{{ themeIconOf(theme) }}</v-icon>
      Theme
    </v-card-title>
    <v-card-text>
      <v-radio-group inline v-model="theme">
        <v-radio value="dark" label="Dark"> </v-radio>
        <v-radio value="light" label="Light"> </v-radio>
        <v-radio value="system" label="System"> </v-radio>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>
