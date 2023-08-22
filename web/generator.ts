import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { compilePages, enableDebug } from "page-compiler";
import donateOnceCompleted from "./pages/donate-once-completed";
import donateOnceIdeal from "./pages/donate-once-ideal";
import donateOncePaypal from "./pages/donate-once-paypal";
import index from "./pages/index";
import privacyPolicy from "./pages/privacy-policy";
import { Tr, createTr, defaultLang, trLangs } from "./translations/tr";

enableDebug();

interface Page {
  html: string;
  path: string;
}

const translate = (
  defaultLang: string,
  trLangs: string[],
  pages: { pageCompiler: (tr: Tr) => Promise<string>; path: string }[]
) => {
  const out: (() => Promise<Page>)[] = [];

  const defaultTr = createTr(defaultLang);

  for (const page of pages) {
    out.push(async () => ({
      html: await page.pageCompiler(defaultTr),
      path: page.path,
    }));
  }

  for (const lang of trLangs) {
    const tr = createTr(lang);

    for (const page of pages) {
      out.push(async () => ({
        html: await page.pageCompiler(tr),
        path: `/${lang}${page.path}`,
      }));
    }
  }

  return out;
};

(async () => {
  const pages = [
    {
      pageCompiler: index,
      path: "/index.html",
    },
    {
      pageCompiler: donateOnceIdeal,
      path: "/donate/once/ideal/index.html",
    },
    {
      pageCompiler: donateOncePaypal,
      path: "/donate/once/paypal/index.html",
    },
    {
      pageCompiler: donateOnceCompleted,
      path: "/donate/once/completed/index.html",
    },
    {
      pageCompiler: privacyPolicy,
      path: "/privacy-policy/index.html",
    },
    // TODO:
    // {
    //   pageCompiler: donateMonthlySepa,
    //   path: "/donate/monthly/sepa/index.html",
    // },
    // TODO:
    // {
    //   pageCompiler: donateMonthlyCompleted,
    //   path: "/donate/monthly/completed/index.html",
    // },
  ];

  compilePages(translate(defaultLang, trLangs, pages));
})();
