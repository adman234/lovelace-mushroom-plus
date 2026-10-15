import { defineConfig, mergeConfig, Plugin } from "vite";
import baseConfig from "./vite.config";

const PLUS_REPOSITORY = "https://github.com/adman234/lovelace-mushroom-plus";

// Rename every Mushroom element (`mushroom-*` -> `mushroom-plus-*`) and card
// name so this bundle does not clash with the original Mushroom install.
function mushroomPlusRename(): Plugin {
  return {
    name: "mushroom-plus-rename",
    enforce: "pre",
    transform(code, id) {
      if (id.includes("node_modules")) return null;
      if (id.endsWith("package.json")) {
        return code.replace(
          /https:\/\/github\.com\/piitaya\/lovelace-mushroom/g,
          PLUS_REPOSITORY
        );
      }
      if (!id.includes("/src/")) return null;
      return code
        .replace(/\bmushroom-(?!plus-)(?=[a-z])/g, "mushroom-plus-")
        .replace(/"mushroom-"/g, '"mushroom-plus-"')
        .replace(/PREFIX_NAME = "mushroom"/, 'PREFIX_NAME = "mushroom-plus"')
        .replace(/name: "Mushroom /g, 'name: "Mushroom Plus ');
    },
  };
}

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [mushroomPlusRename()],
    build: {
      lib: {
        entry: "src/mushroom-plus.ts",
        formats: ["es"],
        fileName: () => "mushroom-plus.js",
      },
    },
  })
);
