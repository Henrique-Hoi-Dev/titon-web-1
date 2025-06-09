import i18n from 'i18next';
import enus from './locales/en/en.json';
import ptbr from './locales/pt/pt.json';
import es from './locales/es/es.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: { translation: ptbr },
  en: { translation: enus },
  es: { translation: es }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'pt',
    // debug: true,
    detection: {
      order: ['path', 'localStorage', 'htmlTag', 'cookie'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
