import { useMemo } from "react";

import type { LyricLine } from "@/types/lyrics";
import { findActiveLineIndex } from "@/utils/findActiveLineIndex";

/** Descobre qual linha da letra deve estar destacada neste instante. */
export function useLyricsSync(lines: LyricLine[], currentTime: number) {
  return useMemo(
    () => findActiveLineIndex(lines, currentTime),
    [lines, currentTime],
  );
}
