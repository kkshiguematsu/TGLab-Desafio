import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import esTranslation from './es/translation.json';
import enTranslation from './en/translation.json';
import ptTranslation from './pt/translation.json';

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'pt',
    fallbackLng: 'pt',
    resources: {
      en: {
        translation: enTranslation,
      },
      pt: {
        translation: ptTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });
