import { PageShell, importGoogleFont } from "page-compiler";

export default async (title: string, body: string) =>
  new PageShell({
    head: /* html */ `
      <script src="https://js.stripe.com/v3/"></script>
      ${await importGoogleFont("Work Sans", [{ weight: 300 }, { weight: 500 }])}
    `,
  }).render(title, body, {
    author: "Iannis de Zwart",
    description: "Payment page ",
    keywords: [""],
  });
