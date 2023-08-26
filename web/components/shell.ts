import {
  PageShell,
  importGoogleFont,
  inlineJS,
  inlineSASS,
} from "page-compiler";

export default async (title: string, body: string, lang: string) =>
  new PageShell({
    head: /* html */ `
      <script src="https://js.stripe.com/v3/"></script>
      ${await importGoogleFont("Work Sans", [{ weight: 300 }, { weight: 500 }])}
      ${await inlineSASS("components/shell.sass")}
    `,
  }).render(
    title,
    /* html */ `
      ${body}
      <div id="page-footer">
        <div id="page-footer-inner">
          <a href="/">Nederlands</a>
          <a href="/en">English</a>
        </div>
      </div>
      ${await inlineJS("scripts/shell.js")}
    `,
    {
      author: "Iannis de Zwart",
      description: "Donation page",
      keywords: [""],
    },
    lang
  );
