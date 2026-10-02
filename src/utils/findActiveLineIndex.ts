import type { LyricLine } from "@/types/lyrics";

/**
 * Retorna o índice da última linha cujo `time` já passou (busca binária).
 * Devolve -1 quando a música ainda não chegou na primeira linha.
 * Pressupõe `lines` ordenado por `time`.
 */
export function findActiveLineIndex(
  lines: LyricLine[],
  currentTime: number,
): number {
  let low = 0;
  let high = lines.length - 1;
  let result = -1;

  while (low <= high) {
    const middle = (low + high) >> 1;

    if (lines[middle].time <= currentTime) {
      result = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return result;
}
