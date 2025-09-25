import { readFileSync } from "node:fs";

import { parse } from "@vue/compiler-sfc";

import { PropertyMeta } from "vue-component-meta";

import type { Tag, Checker, ComponentMeta } from "./types.js";

export const generateComponentMeta = (
  url: string,
  checker: Checker,
  render: (description: string) => string,
): ComponentMeta => {
  const meta = checker.getComponentMeta(url);

  const _render = (markdown?: string) => (markdown ? render(markdown) : markdown);

  const nonGlobalProps = meta.props.filter((prop) => !prop.global);

  const { modelValues = [], props = [] } = Object.groupBy(nonGlobalProps, (p) => {
    return meta.events.some((event) => event.name === `update:${p.name}`) ? "modelValues" : "props";
  });

  const commonMapper = (p: Omit<PropertyMeta, "required" | "global" | "schema">) => ({
    name: p.name,
    type: p.type,
    tags: p.tags.filter((t) => !["default", "deprecated"].includes(t.name)),
    description: _render(getDescription(p)),
    deprecated: getDeprecated(p.tags),
  });

  const propMapper = (p: PropertyMeta) => ({
    ...commonMapper(p),

    required: p.required,
    default: p.default ?? getTagText(p.tags, "default"),
  });

  const content = readFileSync(url, "utf-8");

  const { descriptor } = parse(content, { sourceMap: false, ignoreEmpty: true });

  const docs = descriptor.customBlocks.find((i) => i.type === "docs" && i.lang === "md");

  return {
    description: _render(docs?.content),

    modelValues: modelValues.map((mv) => propMapper(mv)),
    props: props.map((p) => propMapper(p)),

    events: meta.events
      .filter((e) => !modelValues.find((mv) => `update:${mv.name}` === e.name))
      .map((e) => commonMapper(e)),

    slots: meta.slots.map((s) => ({
      name: s.name,
      type: s.type,
      description: _render(getDescription(s)),
    })),
  };
};

const getTagText = (tags: Tag[], tag: string) => {
  /* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */
  return tags.find(({ name }) => name === tag)?.text || undefined;
};

const getDescription = (meta: { tags?: Tag[]; description?: string }) => {
  return meta.description ?? getTagText(meta.tags ?? [], "Description");
};

const getDeprecated = (tags: Tag[]): undefined | string | true => {
  const tag = tags.find(({ name }) => name === "deprecated");

  /* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */
  return tag ? tag.text || true : undefined;
};
