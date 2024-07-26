import { ref } from 'vue';

export default function useLocale(that?: any) {
  const currentLocale = ref(that?.$i18n?.locale ?? localStorage.getItem('tiny-locale'));
  const changeLocale = (lang: string) => {
    that.$i18n.locale = lang;
    currentLocale.value = lang;
    localStorage.setItem('tiny-locale', lang);
  }
  return {
    currentLocale,
    changeLocale,
  };
}
