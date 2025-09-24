import type { PluginOption } from "vite";

/**
 * Allows for a custom `<docs />` block,
 * and alternatively exposes it under `Component.__docs`.
 *
 * @param {boolean} expose If the block should be exposed - default `false`
 */
export default (expose = false): PluginOption => ({
  name: "docs",
  enforce: "pre",

  /**
   * @see https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue/README.md#example-for-transforming-custom-blocks
   */
  transform(code, id) {
    if (id.includes("vue&type=docs")) {
      if (!expose) {
        return "export default ComponentWithDocs => {}";
      }

      return `export default ComponentWithDocs => {
        ComponentWithDocs.__docs = ${JSON.stringify(code)}
      }`;
    }
  },
});
