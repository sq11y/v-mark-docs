> [!NOTE]
> This is really something I made for myself to help with documentation, so it has a lot of limitations and quirks since I've only accounted for how I use it specifically. But maybe it's useful for you - if so - please feel free to make issues and pull requests! 😊

# v-mark-docs

`v-mark-docs` uses [markdown-it](https://github.com/markdown-it/markdown-it) and [@mdit-vue/plugin-sfc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-sfc) to turn markdown files into [**Vue** components](https://vuejs.org/guide/scaling-up/sfc.html) and custom `docs` blocks written in markdown into HTML.

## Quick start

### Install

```
npm i v-mark-docs
```

### Add to `vite.config.ts`

```ts
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import customBlockPlguin from "v-custom-block";

export default defineConfig({
  // Allow import of `.md` files as SFC
  vue({ include: [/\.vue$/, /\.md$/] }),

  // Allow docs blocks inside components
  customBlockPlugin("docs"),
})
```

### Copy `docs` folder from the example

Copy the `docs` folder from the example project! Every markdown file you want to include as a route requires a `title` and `slug` property in it's [frontmatter](#frontmatter).

### Plugins

You can customize the markdown-it instance using the `setup` and `highlight` options - but there are some plugins added by default:

- [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark)
- [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#header-link)

### Frontmatter

You can then access the `frontmatter` through the injected value.

Other `markdown-it` packages **do not have access to this variable** - so for example if using a `$frontmatter` variable inside a heading tag - you should specify the id for the title so that [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) doesn't end up with weird looking links.

```md
---
title: "Title"
slug: "/title"
description: "Description"
---

<script setup>
  import { inject } from 'vue';

  const fm = inject('frontmatter');
</script>

# {{ fm.title }}

{{ fm.description }}
```

## Run the example

```
// Build v-mark-docs
npm run build

// Move into example folder
cd example

// Run the documentation project
npm run docs
```
