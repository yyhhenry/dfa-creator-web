import { useCheckedStorage } from './storage';
import { computed } from 'vue';
import { z } from 'zod';

const themeList = ['system', 'light', 'dark'] as const;

const DTheme = z.enum(themeList);

export const theme = useCheckedStorage('theme', DTheme, 'system');

export function themeIconOf(theme: (typeof themeList)[number]) {
  switch (theme) {
    case 'light':
      return 'mdi-white-balance-sunny';
    case 'dark':
      return 'mdi-weather-night';
    default:
      return 'mdi-theme-light-dark';
  }
}

export const themeIcon = computed(() => themeIconOf(theme.value));

export function switchTheme() {
  theme.value =
    themeList[(themeList.indexOf(theme.value) + 1) % themeList.length];
}
