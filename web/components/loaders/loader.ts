import { inlineSASSOnce } from "page-compiler";

type LoaderProps = {
  id?: string;
  defaultHidden?: boolean;
};

export default async (props: LoaderProps) => /* html */ `
  ${await inlineSASSOnce("components/loaders/loader.sass")}
  <div
      class="loader ${props.defaultHidden ? "hidden" : ""}"
      ${props.id ? `id="${props.id}"` : ""}>
    <div class="lds-spinner">
      ${/* html */ `<div></div>`.repeat(12)}
    </div>
  </div>
`;
