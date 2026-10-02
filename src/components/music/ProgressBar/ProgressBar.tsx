import type { CSSProperties } from "react";

import { formatTime } from "@/utils/formatTime";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps) {
  const ready = duration > 0;
  const safeTime = Math.min(currentTime, duration);
  const percent = ready ? (safeTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-0.5">
      <input
        type="range"
        className="player-range"
        min={0}
        max={ready ? duration : 0}
        step={0.1}
        value={ready ? safeTime : 0}
        disabled={!ready}
        onChange={(event) => onSeek(Number(event.target.value))}
        aria-label="Progresso da música"
        aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
        style={{ "--progress": `${percent}%` } as CSSProperties}
      />

      <div className="flex justify-between font-sans text-xs tabular-nums text-text-subtle">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
