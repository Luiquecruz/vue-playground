import { createApp } from "vue";
import { createPinia } from  "pinia";
import App from "./App.vue";
import BoilerplatePlugin from "./plugins/BoilerplatePlugin";

const app = createApp(App);
const pinia = createPinia();

// Init App
app.use(BoilerplatePlugin)
app.use(pinia);
app.mount("#app");
