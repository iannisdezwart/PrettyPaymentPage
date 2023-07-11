import { compilePages } from "page-compiler";
import shell from "./components/shell";
import index from "./pages/index";

(async () => {
  compilePages([
    {
      html: await shell("Home", await index()),
      path: "/index.html",
    },
  ]);
})();
