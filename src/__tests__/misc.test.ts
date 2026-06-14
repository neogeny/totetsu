// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parse } from "@api";
import { asjson } from "@util/asjson";

describe("misc", () => {
  it("mapping with named captures", () => {
    const grammar = `@@whitespace :: /\\s+/
start = key:key value:value ;
key = /\\w+/ ;
value = /\\w+/ ;`;
    const result = parse(grammar, "foo bar");
    const j = asjson(result) as Record<string, unknown>;
    assert.equal(j.key, "foo");
    assert.equal(j.value, "bar");
  });
});
