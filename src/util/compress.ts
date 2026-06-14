// Copyright (c) 2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0

export async function compress(input: string): Promise<Uint8Array> {
  const stream = new Blob([input]).stream();
  const compressedStream = stream.pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(compressedStream).arrayBuffer());
}

export async function decompress(buffer: Uint8Array): Promise<string> {
  const stream = new Blob([buffer]).stream();
  const decompressedStream = stream.pipeThrough(
    new DecompressionStream("gzip"),
  );
  return await new Response(decompressedStream).text();
}
