import VueI18n from 'vue-i18n';
import locale from '@opentiny/vue-locale'; // tiny-vue的国际化
import en from './en-US';
import cn from './zh-CN';
import Vue from 'vue';

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zhCN' },
  { label: 'English', value: 'enUS' },
];

Vue.use(VueI18n);

let _i18n: VueI18n;

export const useI18n = () => _i18n;

export default (i18n: any) => {
  return locale.initI18n({
    i18n,
    VueI18n,
    messages: {
      enUS: en,
      zhCN: cn,
    },
  } as any)
}
