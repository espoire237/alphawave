import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/en.json';
import fr from './locales/fr/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    debug: true,
  });

export default i18n;