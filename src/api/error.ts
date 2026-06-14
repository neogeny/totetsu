// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import { TSemekwesError } from "@error";

export class ApiError extends TSemekwesError {
  constructor(
    msg: string,
    public readonly cause?: unknown,
  ) {
    super(msg, { cause: cause });
    this.name = "ApiError";
  }
}
