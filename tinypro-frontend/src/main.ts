import Vue from "vue";
import { PiniaVuePlugin } from "pinia";
import initI18 from '@/locale';

import App from "./App.vue";
import router from "./router";

import '@/assets/style/global.less';
import { pinia } from "./stores/pinia";
import 'echarts4/map/js/china.js';
import chinaMap from './assets/chaina.json';
// import * as echarts4 from 'echarts4';
import {registerMap} from 'echarts';
import Breadcrumb from "@/components/breadcrumb/index.vue";

registerMap('china', chinaMap as any);

Vue.use(PiniaVuePlugin);
Vue.component('Breadcrumb',Breadcrumb)

new Vue({
  router,
  pinia,
  render: (h) => h(App),
  i18n: initI18({locale: 'zhCN'}),
}).$mount("#app");