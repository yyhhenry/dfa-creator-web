import '@yyhhenry/element-extra/dist/style.css';

import { createApp } from 'vue';
import App from './App.vue';
import { useColorMode, useTitle } from '@vueuse/core';
import { websiteName } from './utils/website-name';
import mermaid from 'mermaid';

useColorMode();
useTitle(websiteName);
mermaid.initialize({ startOnLoad: false });

createApp(App).mount('#app');
