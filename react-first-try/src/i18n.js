import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import {format as formatDate, formatDistance, formatRelative, isDate} from "date-fns";
import { ru, nl } from "date-fns/locale";
import moment from "moment"; // import all locales we need

const locales = { ru, nl };

i18n
  // Подключение бэкенда i18next
  .use(Backend)
  // Автоматическое определение языка 
  .use(LanguageDetector)
  // модуль инициализации
  .use (initReactI18next)
  .init({
    // Стандартный язык
    fallbackLng: 'en',
    debug: true,
    // Распознавание и кэширование языковых кук
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    interpolation: {
        escapeValue: false,

        format: (value, format, lng) => {
            if (isDate(value)) {
                const locale = locales[lng];
                    return formatDate(value, "P", { locale });
            }

            return value;
        }
    }

  })

export default i18n;