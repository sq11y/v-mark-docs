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
  title: string | undefined,
  env: MarkdownItEnv,
) => string;

export interface ComponentMeta {
  description?: string;
  props: PropertyMeta[];
  modelValues: PropertyMeta[];
  events: EventMeta[];
  slots: SlotMeta[];
}

export interface Tag {
  name: string;
  text?: string;
}

export interface PropertyMeta {
  name: string;
  tags: Tag[];
  required: boolean;
  type: string;
  description?: string;
  default?: string;
}

export interface EventMeta {
  name: string;
  tags: Tag[];
  type?: string;
  description?: string;
}

export interface SlotMeta {
  name: string;
  description?: string;
  type: string;
}
