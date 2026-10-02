interface DecorativeLineProps {
  /** Ocupa o espaço que sobrar na linha flex (em vez de largura fixa). */
  fullWidth?: boolean;
  /** Classes extras — use para mudar a largura, ex.: "w-7 lg:w-9". */
  className?: string;
}

export function DecorativeLine({
  fullWidth = false,
  className = "",
}: DecorativeLineProps) {
  const width = fullWidth ? "min-w-0 flex-1" : "w-9 shrink-0";

  return (
    <div
      aria-hidden="true"
      className={`h-px rounded-full bg-text ${width} ${className}`}
    />
  );
}
