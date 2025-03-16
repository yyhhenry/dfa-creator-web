/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import mermaid from 'mermaid';

const app = createApp(App);

mermaid.initialize({ startOnLoad: false });

registerPlugins(app);

app.mount('#app');
