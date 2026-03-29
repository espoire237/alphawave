import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import en from './locales/en/en.json';
import fr from './locales/fr/fr.json';

i18n
.use(initReactI18next)
  .use(Backend)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: localStorage.getItem('lang') || 'en', // persist last choice
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already handles XSS
    },
    Backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // path to translation files
    },
    debug:true,
  });

export default i18n;