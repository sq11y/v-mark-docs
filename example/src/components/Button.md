---
title: "Button"
description: "An example show-casing documenting components with v-mark-docs."
slug: "/button"
---

<script setup>
  import { inject } from 'vue';

  import ButtonComponent from './Button.vue';

  const fm = inject('frontmatter');
</script>

# {{ fm.title }}

_{{ fm.description}}_

## Preview of component

<ButtonComponent>
  This example button does nothing
</ButtonComponent>

## Document APIs

In this example we're showing a H3 title and `pre` tag with the meta data so the result below isn't beautiful, but you could get creative with it!

[? Button API]: ./Button.vue
