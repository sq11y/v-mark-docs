<script setup>
  import ButtonComponent from './Button.vue';
</script>

# Documentation example

An example show-casing `v-mark-docs`.

There are some markdown plugins supported by default.

- ==Marking text== with [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark). E.g. `==Marking text==`.
- Adding custom attributes with [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs). I used that to add the `id` attrs-example to this paragraph. E.g. `{#attrs-example}`. {#attrs-example}

And an extra markdown plugin you can enable through the options, documenting components with e.g. `[?Button]: ./Button.vue`.

```ts
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import markdown from "v-mark-docs";

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),

    markdown({
      meta: {
        tsconfigPath: fileURLToPath(new URL("./tsconfig.app.json", import.meta.url)),

        renderer: (meta, title) => `
          <h2>${title ?? "Untitled"}</h2>
          <pre><code>${JSON.stringify(meta, null, 2)}</code></pre>
        `,
      },
    }),
  ],
});
```

In this case we're just showing a simple title and `pre` tag with the meta data so the result below isn't beautiful, but you could get creative with it!

[?Button]: ./Button.vue

## Components

<ButtonComponent>
  This example button does nothing
</ButtonComponent>
