// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import type { Grammar } from "../peg/grammar.js";
import tatsu from "../../grammar/tatsu.json" with { type: "json" };
import { loadGrammarFromJSON } from "./import.js";

let cached: Grammar | null = null;

export function bootGrammar(): Grammar {
  if (cached) return cached;
  const g = loadGrammarFromJSON(tatsu);
  g.initialize();
  cached = g;
  return g;
}
