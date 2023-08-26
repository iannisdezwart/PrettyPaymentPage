import en from "./en.json";
import nl from "./nl.json";

export type Tr = (key: string) => string;

export const defaultLang = "nl";
export const trLangs = ["en"];

const translations = { en, nl };

const tr = (lang: string, key: string) => {
  try {
    return trHelper(lang, key);
  } catch (e) {
    if (lang == defaultLang) {
      console.error(e.message, `for key: ${key} in lang: ${lang}`);
      return "";
    }

    console.log(
      `Warning: missing translation for key: ${key} in lang: ${lang}`
    );
  }
};

const trHelper = (lang: string, key: string) => {
  const splitKey = key.split(".");

  let current = translations[lang];

  for (const key of splitKey) {
    current = current[key];

    if (current == null) {
      throw new Error("Translation not found");
    }
  }

  return current;
};

export const createTr = (lang: string) => (key: string) => tr(lang, key);
