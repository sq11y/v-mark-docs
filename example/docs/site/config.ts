import type { Config } from "v-mark-docs";

export default {
  metaRenderer() {
    return `
          <details>
            <summary> i am working</summary>

            an d i am not!
          </details>
        `;
  },
} satisfies Config;
