> [!NOTE]
> This is really just something I made for myself to help document component libraries, so it probably has a lot of limitations and quirks since I've only accounted for how I use it. But maybe it's useful for you - if so - please feel free to make issues and pull requests 😊

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

### Add types for `.md` imports in `tsconfig.json`

_Coming soon_

## Options

@TODO

### Plugins

You can customize the markdown-it instance using the `setup` and `highlight` options - but there are some plugins added by default:

- [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark)
- [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#header-link)

### Frontmatter

You can acccess frontmatter data using the `$frontmatter` variable.

_Every markdown file you want to have included in the router requires a `title` and `slug`._

Other markdown-it packages do not have access to this variable - so for example if using a `$frontmatter` variable inside a title - you should specify the id for the title so that [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) doesn't end up with weird looking links - and [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) does not have access to the variables either.

```md
---
title: "Title"
slug: "/title"
description: "Description"
---

# {{ $frontmatter.title }} {#title}

{{ $frontmatter.description }}
```

### Routes

You can import an array of the routes available.

```ts
import { routes } from "v-mark-docs:routes";

/**
 * @example result
 *
 * [{
 *   path: "/title",
 *   title: "Title",
 *   component: TitleDocumentationComponent
 * }]
 */
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
