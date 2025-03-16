import { ref, watchEffect } from 'vue';

export const globalSnackbar = ref<{
  msg: string;
  color?: 'info' | 'success' | 'error';
  until?: number;
}>();

watchEffect(() => {
  const until = globalSnackbar.value?.until;
  if (until !== undefined) {
    setTimeout(
      () => {
        if (globalSnackbar.value?.until === until) {
          globalSnackbar.value = undefined;
        }
      },
      Math.max(0, until - Date.now()),
    );
  }
});

export const defaultTimeout = 2000;

export function showSnackbar(
  msg: string,
  color?: 'info' | 'success' | 'error',
  timeout: number = defaultTimeout,
) {
  const now = Date.now();
  globalSnackbar.value = { msg, color, until: now + timeout };
}

export class GSnackbar {
  static info(msg: string, timeout: number = defaultTimeout) {
    showSnackbar(msg, 'info', timeout);
    console.log('[GSnackbar] info:', msg);
  }
  static success(msg: string, timeout: number = defaultTimeout) {
    showSnackbar(msg, 'success', timeout);
    console.log('[GSnackbar] success:', msg);
  }
  static error(msg: string, timeout: number = defaultTimeout) {
    showSnackbar(msg, 'error', timeout);
    console.error('[GSnackbar] error:', msg);
  }
}
