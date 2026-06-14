// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

export function toSingleLineJSON(prettyJson: string): string {
  const parsed = JSON.parse(prettyJson);
  return JSON.stringify(parsed);
}

export function toJSONLines(jsonBlocks: (object | string)[]): string {
  return jsonBlocks
    .map((block) => (typeof block === "string" ? block : JSON.stringify(block)))
    .join("\n");
}
