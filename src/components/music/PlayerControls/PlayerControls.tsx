import type { ReactNode } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";

import { IconButton } from "@/components/common/IconButton/IconButton";

interface PlayerControlsProps {
  isPlaying: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onRewind: () => void;
  onForward: () => void;
}

function SkipIcon({ children }: { children: ReactNode }) {
  return (
    <span className="relative flex items-center justify-center">
      {children}
      <span className="absolute text-[8px] font-bold leading-none">10</span>
    </span>
  );
}

export function PlayerControls({
  isPlaying,
  disabled = false,
  onToggle,
  onRewind,
  onForward,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-5 lg:gap-6">
      <IconButton label="Voltar 10 segundos" disabled={disabled} onClick={onRewind}>
        <SkipIcon>
          <RotateCcw className="size-6" strokeWidth={1.5} />
        </SkipIcon>
      </IconButton>

      <IconButton
        label={isPlaying ? "Pausar" : "Tocar"}
        variant="solid"
        size="lg"
        disabled={disabled}
        onClick={onToggle}
      >
        {isPlaying ? (
          <Pause className="size-6 fill-current" />
        ) : (
          <Play className="ml-0.5 size-6 fill-current" />
        )}
      </IconButton>

      <IconButton label="Avançar 10 segundos" disabled={disabled} onClick={onForward}>
        <SkipIcon>
          <RotateCw className="size-6" strokeWidth={1.5} />
        </SkipIcon>
      </IconButton>
    </div>
  );
}
