import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationCyr from "./cyr/translation.json";
import translationRus from "./rus/translation.json";
import translationUzb from "./uzb/translation.json";

i18next.use(initReactI18next).init({
  lng: "rus",
  debug: true,
  resources: {
    rus: {
      translation: translationRus,
    },
    uzb: {
      translation: translationUzb,
    },
    cyr: {
      translation: translationCyr,
    },
  },
});
