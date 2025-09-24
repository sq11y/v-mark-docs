<template>
  <ButtonDocumentation />
</template>

<script lang="ts" setup>
  import ButtonDocumentation from "./components/Button.md";
</script>

<style>
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

  h1,
  h2 {
    line-height: 1.2;
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
