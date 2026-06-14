// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

export interface Heart {
  heartbeat(mark: number, total: number): void;
}

export class DeadHeart implements Heart {
  heartbeat(_mark: number, _total: number): void {}
}
