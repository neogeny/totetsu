// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { compile } from "@api";

describe("EBNF", () => {
  it("parsing", () => {
    const g = compile(`
      @@grammar :: EBNF

      start := expression $

      expression := expression '+' term | expression '-' term | term

      term := term '*' factor | term '/' factor | factor

      factor := '(' expression ')' | number

      number := /\\d+/
    `);
    assert.equal(g.name, "EBNF");
  });
});
