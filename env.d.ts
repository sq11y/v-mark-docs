declare module "*.md" {
  import { Component } from "vue";
  const markdown: Component;
  export default markdown;
}

declare module "typeach:routes" {
  const routes: {
    path: string;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    frontMatter?: Record<string, any>;
  }[];

  export { routes };
}
