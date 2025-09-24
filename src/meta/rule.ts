import type { RuleBlock } from "markdown-it/lib/parser_block.mjs";

export const rule: RuleBlock = (state, startLine, _, silent) => {
  const start = state.bMarks[startLine]! + state.tShift[startLine]!;
  const max = state.eMarks[startLine]!;

  /**
   * Expect the pattern `[?<title>]:`
   */
  if (start + 4 > max || state.src.charAt(start) !== "[" || state.src.charAt(start + 1) !== "?") {
    return false;
  }

  let pos = start + 2;

  while (pos < max) {
    if (state.src.charAt(pos) === " ") return false;
    if (state.src.charAt(pos) === "]") break;
    pos++;
  }

  if (pos === start + 2 || pos + 1 >= max || state.src.charAt(++pos) !== ":") {
    return false;
  }

  pos++;

  const title = state.src.slice(start + 2, pos - 2);

  if (silent) {
    return true;
  }

  /**
   * Expect the pattern `[?<title>]: <path>.vue`
   */
  const path = state.src.slice(pos, max);

  if (!path.endsWith("vue")) {
    return false;
  }

  const t = state.push("meta", "", 1);

  t.meta = {
    path,
    title,
  };

  state.line = startLine + 1;

  return true;
};
