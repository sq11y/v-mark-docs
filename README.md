# v-mark-docs

> [!NOTE]
> This is really just something I made for myself to help document component libraries, so it probably has a lot of limitations and quirks since I've only accounted for how I use it. But maybe it's useful for you - if so - please feel free to make issues and pull requests 😊

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
import docs from "v-mark-docs;

export default defineConfig({
  // Allow import of `.md` files as SFC
  vue({ include: [/\.vue$/, /\.md$/] }),
  docs(),
})
```

## Options

```ts
export interface PluginOptions {
  /**
   * If the docs for a component should
   * be made available on it as `__docs`.
   */
  exposeDocs?: boolean;

  /**
   * Additional markdown-it setup.
   */
  setup?: PluginSimple;

  /**
   * The highlight option for `markdown-it`.
   *
   * @param md The markdown instance
   * @param code The code snippet
   * @param lang The language for the code snippet
   * @param attrs The potential attributes provided by `markdown-it-attrs`
   */
  highlight?: (md: MarkdownIt, code: string, lang: string, attrs: string) => string;

  meta?: {
    /**
     * The path to the tsconfig that should be used for
     * the automatic vue component documentation.
     */
    tsconfigPath: string;

    /**
     * The function used to render the
     * documentation of a vue component.
     *
     * @param meta The component meta data (a stripped down result from `vue-component-meta`)
     * @param title The title specified for the component
     */
    renderer: (meta?: ComponentMeta, title?: string) => string;
  };
}
```

### Plugins

You can customize the markdown-it instance using the `setup` and `highlight` options - but there are some plugins added by default:

- [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark)
- [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#header-link)

#### Documentation for components

> [!WARNING]
> Requires Typescript.

If you add the `meta` option you get additional markdown syntax available to add documentation for components using [vue-component-meta](https://www.npmjs.com/package/vue-component-meta) - `[?<title>]: <path>.vue`.

This option requires the relevant `tsconfig.json` file for the components, and a `renderer` function. The `renderer` function gets passed a modified version of the result from [vue-component-meta](https://www.npmjs.com/package/vue-component-meta) and the title provided - you can return HTML directly or the markup for a global component (like in the example below).

> [!IMPORTANT]
> All descriptions in the result (properties with the name `description`) are HTML strings - they have been run through [markdown-it](https://github.com/markdown-it/markdown-it).

```ts
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import docs from "v-mark-docs";

export default defineConfig({
  // Allow import of `.md` files as SFC
  vue({ include: [/\.vue$/, /\.md$/] }),

  docs({
    meta: {
      tsConfigPath: fileURLToPath(new URL("./tsconfig.app.json", import.meta.url)),

      // `ComponentDocumentation` would have to be a
      // global component in this example
      renderer(meta, title) {
        return `
          <ComponentDocumentation
            :meta='${JSON.stringify(meta)}'
            title='${title}'
          />
        `
      }
    }
  }),
})
```

## Example

The example only supports dev mode and requires the full project structure as the npm dependency is a relative path.

```
// Build v-mark-docs
npm run build

// Move into example folder
cd example

// Run the project
npm run dev
```
