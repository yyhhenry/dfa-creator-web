import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { useColorMode, useTitle } from '@vueuse/core';
import { websiteName } from './utils/website-name';

useColorMode();

createApp(App).mount('#app');
useTitle(websiteName);
