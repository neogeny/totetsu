// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { compile } from "@api";
import { LinkError } from "@peg";

describe("error", () => {
  it("missing rule", () => {
    assert.throws(
      () =>
        compile(`
      @@grammar :: TestGrammar
      block = test
    `),
      LinkError,
    );
  });
});
