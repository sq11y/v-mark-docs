---
title: "Test"
slug: "/test"
---

<script setup>
  import { inject } from 'vue';

  const fm = inject('frontmatter');
</script>

# {{ fm.title }}

There are some markdown plugins tested.
