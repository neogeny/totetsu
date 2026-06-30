// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import type { Ctx } from "@context";
import { NodeTree, type TreeValue, treeFold } from "@trees";
import { asjson } from "../util/asjson";
import { computeLA } from "./analysis/lookahead";
import { BoxExp, type Exp, ExpKind, GroupExp, SeqExp } from "./exp.js";
import { CallExp } from "./call.js";
import { serializeRule } from "./json";
import { optimizeExp } from "./optimize.js";

export class Rule extends BoxExp {
  readonly kind = ExpKind.Rule;
  constructor(
    public name: string,
    public exp: Exp,
    public params: string[] = [],
    public kwParams: Map<string, string> = new Map(),
    public decorators: string[] = [],
    public base: string = "",
    public isName: boolean = false,
    public isTokn: boolean = false,
    public noMemo: boolean = false,
    public noStak: boolean = false,
    public isMemo: boolean = false,
    public isLrec: boolean = false,
  ) {
    super(exp);
  }

  computeLA() {
    computeLA(this.exp);
  }

  parse(ctx: Ctx): TreeValue {
    const tree = this.exp.parse(ctx);
    const folded = treeFold(tree);

    const [newTree, overridden] = ctx.applySemantics(
      folded,
      this.name,
      this.params,
    );
    if (overridden) {
      return newTree;
    }

    if (this.params.length === 0 || this.params[0] === "bool") {
      return folded;
    }

    return new NodeTree(this.params[0], folded);
  }

  override __json__(seen?: Set<object>): any {
    return asjson(serializeRule(this), seen);
  }

  isToken(): boolean {
    if (this.isTokn) return true;
    const first = this.name.replace(/^_+/, "")[0];
    return (
      first !== "" &&
      first === first.toUpperCase() &&
      first !== first.toLowerCase()
    );
  }

  isLeftRecursive(): boolean {
    return this.isLrec;
  }

  isMemoizable(): boolean {
    return this.isLrec || (this.isMemo && !this.noMemo);
  }

  shouldTrace(): boolean {
    return !this.noStak;
  }

  normalize(): void {
    // No-op in TS: defaults handled by constructor params
  }

  optimized(): Rule {
    let exp = optimizeExp(this.exp);

    let prev: Exp | null = null;
    while (exp !== prev) {
      prev = exp;

      if (exp instanceof SeqExp && exp.sequence.length === 1) {
        exp = exp.sequence[0];
        continue;
      }

      if (exp instanceof CallExp && exp.rule != null && exp.rule.params.length === 0) {
        exp = optimizeExp(exp.rule.exp);
        continue;
      }

      if (exp instanceof GroupExp) {
        exp = optimizeExp(exp.exp);
      }
    }

    return new Rule(
      this.name,
      exp,
      [...this.params],
      new Map(this.kwParams),
      [...this.decorators],
      this.base,
      this.isName,
      this.isTokn,
      this.noMemo,
      this.noStak,
      this.isMemo,
      this.isLrec,
    );
  }
}
