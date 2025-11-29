---
title: "Example"
slug: "/example"
---

<script setup>
  import { inject } from 'vue';

  const fm = inject('frontmatter');
</script>

# {{ fm.title }}

There are some markdown plugins enabled by default.

- ==Marking text== with [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark). E.g. `==Marking text==`.
- Adding custom attributes with [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs). I used that to add the `id` attrs-example to this paragraph. E.g. `{#attrs-example}`. {#attrs-example}
- Headings are turned into links using [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor?tab=readme-ov-file#header-link).
