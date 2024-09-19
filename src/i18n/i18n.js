import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// import EN_US from './locales/en/en.json'
// import PT_BR from './locales/pt-br/pt-br.json'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

// const resources = {
//   en: { translation: EN_US },
//   pt_br: { translation: PT_BR },
// };

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'pt',
    // debug: true,
    detection: {
      order: ['path', 'localStorage', 'htmlTag', 'cookie'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
