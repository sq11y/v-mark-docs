import type { MarkdownSfcBlocks } from "@mdit-vue/plugin-sfc";
import type { createChecker } from "vue-component-meta";

export type Checker = ReturnType<typeof createChecker>;

export interface MarkdownItEnv {
  sfcBlocks?: MarkdownSfcBlocks;
  path: string;
  checker?: Checker;
}

export type Renderer = (
  meta: ComponentMeta | undefined,
  title: string,
  env: MarkdownItEnv,
) => string;

export interface ComponentMeta {
  description?: string;

  modelValues: PropertyMeta[];
  props: PropertyMeta[];
  events: EventMeta[];
  slots: SlotMeta[];
}

export interface Tag {
  name: string;
  text?: string;
}

export interface PropertyMeta {
  name: string;
  type: string;
  tags: Tag[];
  required: boolean;
  default?: string;
  description?: string;
  deprecated?: string | true;
}

export interface EventMeta {
  name: string;
  type?: string;
  tags: Tag[];
  description?: string;
  deprecated?: string | true;
}

export interface SlotMeta {
  name: string;
  type: string;
  description?: string;
  deprecated?: string | true;
}
