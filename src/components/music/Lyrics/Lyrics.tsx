import { useEffect, useRef } from "react";

import type { LyricLine } from "@/types/lyrics";

interface LyricsProps {
  lines: LyricLine[];
  /** Índice da linha que está sendo cantada (-1 = ainda não começou). */
  activeIndex: number;
}

function getLineStyle(index: number, activeIndex: number) {
  if (index === activeIndex) return "text-primary font-semibold";
  if (index === activeIndex + 1) return "text-text-muted";
  return "text-text-subtle";
}

export function Lyrics({ lines, activeIndex }: LyricsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Mantém a linha ativa no meio da caixa. Rolamos só a caixa (scrollTo),
  // nunca a página inteira.
  useEffect(() => {
    const container = containerRef.current;
    const line = lineRefs.current[activeIndex];
    if (!container || !line) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    container.scrollTo({
      top: line.offsetTop - container.clientHeight / 2 + line.clientHeight / 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Letra da música"
      className="poem-scrollbar relative h-51 w-full overflow-y-auto rounded-xl border border-border-subtle bg-surface-deep p-4 lg:h-111 lg:p-6"
    >
      {lines.length === 0 ? (
        <p className="flex h-full items-center justify-center text-center font-mono text-[10px] tracking-[0.2em] text-text-subtle lg:text-xs">
          A LETRA APARECE AQUI
        </p>
      ) : (
        <div className="flex flex-col gap-4 text-[15px] leading-[1.6] lg:text-lg">
          {lines.map((line, index) => (
            <p
              key={`${line.time}-${index}`}
              ref={(element) => {
                lineRefs.current[index] = element;
              }}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`transition-colors duration-300 ${getLineStyle(index, activeIndex)}`}
            >
              {line.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
