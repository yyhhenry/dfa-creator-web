<script setup lang="ts">
import { globalSnackbar } from '@/utils/global-snackbar';
</script>
<template>
  <v-snackbar
    v-if="globalSnackbar !== undefined"
    :model-value="true"
    location="top"
    :color="globalSnackbar.color"
  >
    {{ globalSnackbar.msg }}
  </v-snackbar>
</template>
