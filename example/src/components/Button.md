---
title: "Button"
description: "An example show-casing documenting components with v-mark-docs."
slug: "/button"
---

<script setup>
  import ButtonComponent from './Button.vue';
</script>

# {{ $frontmatter.title }}

_{{ $frontmatter.description}}_

Alongside the default plugins - there is an extra markdown plugin you can enable through the options, documenting components with e.g. `[?Button]: ./Button.vue`.

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
          <h3>${title ?? "Untitled"}</h3>
          <pre><code>${JSON.stringify(meta, null, 2)}</code></pre>
        `,
      },
    }),
  ],
});
```

## Example

## Use the component in markdown

<ButtonComponent>
  This example button does nothing
</ButtonComponent>

## Document the API

In this example we're showing a H3 title and `pre` tag with the meta data so the result below isn't beautiful, but you could get creative with the display!

[? Button API]: ./Button.vue
