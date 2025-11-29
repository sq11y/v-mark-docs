import type { Config } from "v-mark-docs";

export default {
  metaRenderer(meta, title) {
    return `
      <h3>${title}</h3>
      <pre><code>${JSON.stringify(meta, null, 2)}</code></pre>
    `;
  },
} satisfies Config;
