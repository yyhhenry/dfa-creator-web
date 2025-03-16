import { useDebounceFn, useStorage } from '@vueuse/core';
import { ZodType } from 'zod';
import { computed, ref, watch } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { Result } from 'neverthrow';

export function toError(e: unknown) {
  return e instanceof Error ? e : new Error(String(e));
}

export function useCheckedStorage<T>(
  key: string,
  helper: ZodType<T>,
  defaultValue: T,
) {
  const safeParse = Result.fromThrowable((data: string) => {
    return helper.parse(JSON.parse(data));
  });
  return useStorage<T>(key, cloneDeep(defaultValue), undefined, {
    serializer: {
      read: (text) => {
        return safeParse(text).match(
          (v) => v,
          (e) => {
            console.error(`Error parsing ${key}: ${e}`);
            return cloneDeep(defaultValue);
          },
        );
      },
      write: JSON.stringify,
    },
  });
}

export function useAutoSaving<T>(
  key: string,
  helper: ZodType<T>,
  defaultValue: T,
  afterSave?: () => void,
  ms = 1000,
  maxWait = 5000,
) {
  const storage = useCheckedStorage(key, helper, defaultValue);
  const value = ref<T>(storage.value);
  const save = () => {
    storage.value = value.value;
    afterSave?.();
  };
  const debouncedSave = useDebounceFn(save, ms, { maxWait });
  watch(() => value.value, debouncedSave, { deep: true });
  return { value, save };
}

export function useTaskState() {
  const state = ref(0);
  const task = ref<number>();
  const running = computed(() => task.value !== undefined);
  const newTask = () => {
    state.value++;
    task.value = state.value;
    return state.value;
  };
  const isAlive = (state: number) => task.value === state;
  const abort = () => {
    task.value = undefined;
  };
  const commit = (state: number) => {
    if (isAlive(state)) {
      abort();
    }
  };
  return { newTask, isAlive, abort, commit, running };
}
