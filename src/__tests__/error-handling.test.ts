// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ApiError, compile, parseInput } from "@api";

describe("error handling", () => {
  it("invalid input fails", () => {
    const g = compile(`
      @@grammar :: Test
      start := 'a'
    `);
    assert.throws(() => parseInput(g, "b"), ApiError);
  });

  it("partial match fails", () => {
    const g = compile(`
      @@grammar :: Test
      start := 'a' 'b'
    `);
    assert.throws(() => parseInput(g, "a"), ApiError);
  });

  it("empty input fails when required", () => {
    const g = compile(`
      @@grammar :: Test
      start := 'a'
    `);
    assert.throws(() => parseInput(g, ""), ApiError);
  });
});
