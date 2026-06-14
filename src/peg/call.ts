// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import type { Ctx } from "@context";
import type { TreeValue } from "@trees";
import { Exp, ExpKind } from "./exp";
import { call } from "./parsing/call";
import type { Rule } from "./rule";

export class CallExp extends Exp {
  readonly kind = ExpKind.Call;

  constructor(
    public name: string,
    public rule: Rule | null = null,
  ) {
    super();
  }

  override parse(ctx: Ctx): TreeValue {
    return call(ctx, this.name, this.rule);
  }
}
