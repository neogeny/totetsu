// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

import { TSemekwesError } from "@error";

export class LinkError extends TSemekwesError {
  constructor(msg: string, options?: ErrorOptions) {
    super(msg, options);
    this.name = "LinkError";
  }
}

export class LeftRecursionError extends TSemekwesError {
  // Brand the class to ensure detection even across bundles
  get __isLeftRecursionError(): boolean {
    return true;
  }

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "LeftRecursionError";
  }

  static isLeftRecursionError(error: unknown): error is LeftRecursionError {
    return (
      error instanceof LeftRecursionError ||
      (!!error && (error as any).__isLeftRecursionError === true)
    );
  }
}
