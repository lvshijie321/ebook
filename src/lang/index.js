import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en'
import cn from './cn'
import { getLocale, setLocale } from "../utils/localStorage";

Vue.use(VueI18n)

const locale = getLocale()
!locale &&  setLocale('cn')
export default new VueI18n({
    locale,
    messages: {
      en,
      cn,
    },
})
