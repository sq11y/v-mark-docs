import { readFileSync } from "node:fs";

import { parse } from "@vue/compiler-sfc";

import type { Tag, Checker, ComponentMeta } from "./types.js";

const getTagText = (tags: Tag[] | undefined, tag: string) => {
  return tags?.find(({ name }) => name === tag)?.text;
};

const getDescription = (meta: { tags?: Tag[]; description?: string }) => {
  return meta.description ?? getTagText(meta.tags, "Description") ?? undefined;
};

const getDefault = (meta: { tags?: Tag[]; default?: string }) => {
  return meta.default ?? getTagText(meta.tags, "default") ?? undefined;
};

export const getComponentMeta = (
  url: string,
  checker: Checker,
  render: (description: string) => string,
): ComponentMeta => {
  const meta = checker.getComponentMeta(url);

  const content = readFileSync(url, "utf-8");

  /* prettier-ignore */
  const { descriptor: { customBlocks } } = parse(content, {
    sourceMap: false,
    ignoreEmpty: true,
  });

  const docs = customBlocks.find((i) => {
    return i.type === "docs" && i.lang === "md";
  });

  const maybeRender = (content?: string) => {
    return content ? render(content) : content;
  };

  const modelValues = meta.props
    .filter((prop) => !prop.global)
    .filter((prop) => meta.events.find((event) => event.name === `update:${prop.name}`))
    .map((prop) => ({
      name: prop.name,
      tags: prop.tags,
      required: prop.required,
      type: prop.type,
      description: maybeRender(getDescription(prop)),
      default: getDefault(prop),
    }));

  const props = meta.props
    .filter((prop) => !prop.global)
    .filter((prop) => !meta.events.find((event) => event.name === `update:${prop.name}`))
    .map((prop) => ({
      name: prop.name,
      tags: prop.tags,
      required: prop.required,
      type: prop.type,
      description: maybeRender(getDescription(prop)),
      default: getDefault(prop),
    }));

  const events = meta.events
    .filter((event) => !modelValues.find((prop) => `update:${prop.name}` === event.name))
    .map((event) => ({
      name: event.name,
      tags: event.tags,
      type: event.type,
      description: maybeRender(getDescription(event)),
    }));

  const slots = meta.slots.map((slot) => ({
    name: slot.name,
    description: maybeRender(getDescription(slot)),
    type: slot.type,
  }));

  return {
    modelValues,
    description: maybeRender(docs?.content),
    props,
    events,
    slots,
  };
};
