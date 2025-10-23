<template>
  <nav>
    <ul>
      <template v-for="route of routes" :key="route.path">
        <li>
          <router-link v-if="route.frontMatter" :to="route.frontMatter.slug">
            {{ route.frontMatter.title }}
          </router-link>
        </li>
      </template>
    </ul>
  </nav>

  <RouterView />
</template>

<script lang="ts" setup>
  import { routes } from "v-mark-docs:routes";
</script>

<style>
  html {
    scrollbar-gutter: stable;
  }

  body {
    margin-block: 4rem;

    display: grid;
    place-content: center;

    max-inline-size: min(90vw, 50rem);
    margin-inline: auto;

    background-color: #fafafa;
    color: #333;

    font-family: sans-serif;
    font-size: 1.2rem;
    line-height: 1.5;
  }

  pre {
    padding: 2rem;

    white-space: pre-wrap;
    max-inline-size: 100%;

    background-color: #333;
    color: #fafafa;

    font-size: 0.9rem;
  }

  * {
    margin-block-start: 0.5em;
  }

  h1,
  h2 {
    line-height: 1.2;
    margin-block-start: 1.25em;
  }

  code:not(pre code) {
    padding: 0.125em 0.5em;
    background-color: #ddd;

    font-size: 1rem;
  }

  mark {
    padding: 0.125em;
    background-color: #ffe23d;

    font-size: 1rem;
  }

  li {
    margin-block: 0.5em;
  }
</style>
