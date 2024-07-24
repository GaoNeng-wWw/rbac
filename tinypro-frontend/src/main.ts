import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import initI18 from '@/locale';

import App from "./App.vue";
import router from "./router";

import '@/assets/style/global.less';
Vue.use(PiniaVuePlugin);
new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
  i18n: initI18({locale: 'zhCN'})
}).$mount("#app");
