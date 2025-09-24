/// <reference types="vite/client" />

declare module "*.md" {
  import { Component } from "vue";
  const markdown: Component;
  export default markdown;
}
