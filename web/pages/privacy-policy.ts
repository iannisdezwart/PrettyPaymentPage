import { inlineJS, inlineSASS, inlineSVG } from "page-compiler";
import shell from "../components/shell";
import { Tr } from "../translations/tr";

export default async (tr: Tr) =>
  shell(
    tr("privacyPolicy.title"),
    /* html */ `
      ${await inlineSASS("pages/privacy-policy.sass")}
      <div class="page">
        <div class="card">
          <div class="back-button" onclick="onPrivacyPolicyBackClicked()">
            ${inlineSVG("icons/back.svg")} Back
          </div>
          <div class="content" id="privacy-policy">
            ${await inlineJS("scripts/privacy-policy.js")}
            <!-- Privacy policy dynamically inserted here -->
          </div>
        </div>
      </div>
    `,
    tr("langCode")
  );
