import { readFileSync } from "node:fs";

import { parse } from "@vue/compiler-sfc";

import type { Tag, Checker, ComponentMeta } from "./types.js";

export const generateComponentMeta = (
  url: string,
  checker: Checker,
  render: (description: string) => string,
): ComponentMeta => {
  const meta = checker.getComponentMeta(url);

  const content = readFileSync(url, "utf-8");

  /* prettier-ignore */
  const {
    descriptor: { customBlocks },
  } = parse(content, {
    sourceMap: false,
    ignoreEmpty: true,
  });

  const docs = customBlocks.find((i) => {
    return i.type === "docs" && i.lang === "md";
  });

  const maybeRender = (markdown?: string) => {
    return markdown ? render(markdown) : markdown;
  };

  const nonGlobalProps = meta.props.filter((prop) => !prop.global);

  /* prettier-ignore */
  const { modelValues: _modelValues = [], props: _props = [] } = Object.groupBy(nonGlobalProps, (p) => {
    return meta.events.some((event) => event.name === `update:${p.name}`)
      ? "modelValues"
      : "props";
  });

  const modelValues = _modelValues.map((mv) => ({
    name: mv.name,
    type: mv.type,
    tags: filterTags(mv.tags),
    required: mv.required,
    default: getDefault(mv),
    description: maybeRender(getDescription(mv)),
    deprecated: getDeprecated(mv.tags),
  }));

  const props = _props.map((p) => ({
    name: p.name,
    type: p.type,
    tags: filterTags(p.tags),
    required: p.required,
    default: getDefault(p),
    description: maybeRender(getDescription(p)),
    deprecated: getDeprecated(p.tags),
  }));

  const events = meta.events
    .filter((e) => !modelValues.find((prop) => `update:${prop.name}` === e.name))
    .map((e) => ({
      name: e.name,
      type: e.type,
      tags: filterTags(e.tags),
      description: maybeRender(getDescription(e)),
      deprecated: getDeprecated(e.tags),
    }));

  const slots = meta.slots.map((s) => ({
    name: s.name,
    type: s.type,
    description: maybeRender(getDescription(s)),
  }));

  return {
    modelValues,
    description: maybeRender(docs?.content),
    props,
    events,
    slots,
  };
};

const filterTags = (tags: Tag[]) => {
  return tags.filter((t) => !["default", "deprecated"].includes(t.name));
};

const getTagText = (tags: Tag[], tag: string) => {
  return tags.find(({ name }) => name === tag)?.text;
};

const getDescription = (meta: { tags?: Tag[]; description?: string }) => {
  return meta.description ?? getTagText(meta.tags ?? [], "Description") ?? undefined;
};

const getDefault = (meta: { tags: Tag[]; default?: string }) => {
  return meta.default ?? getTagText(meta.tags, "default") ?? undefined;
};

const getDeprecated = (tags: Tag[]): undefined | string | true => {
  const tag = tags.find(({ name }) => name === "deprecated");

  if (!tag) {
    return undefined;
  }

  /* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */
  return tag.text || true;
};
