import { ArrowRight, Heart } from "lucide-react";
import { NavLink } from "react-router";

import { DecorativeLine } from "@/components/common/DecorativeLine/DecorativeLine";
import { poem } from "@/data/poem";

export function Home() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center p-6">
      <main className="flex w-full max-w-155 flex-col items-center justify-center gap-8 py-6 md:gap-12">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <Heart className="size-4 text-primary md:size-5" />

          <div className="flex w-72 items-center justify-center gap-3">
            <DecorativeLine fullWidth />

            <span className="whitespace-nowrap font-mono text-xs tracking-[0.24em] md:text-[13px]">
              PARA VOCÊ
            </span>

            <DecorativeLine fullWidth />
          </div>

          <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">
            Eu te <span className="text-primary">amo</span>
          </h1>

          <div className="flex w-72 items-center justify-center gap-3 md:mt-1">
            <DecorativeLine fullWidth />
            <Heart className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
            <DecorativeLine fullWidth />
          </div>
        </div>

        <div
          role="region"
          aria-label="Poema"
          tabIndex={0}
          className="poem-scrollbar h-72 w-full overflow-y-auto rounded-2xl border border-border bg-surface p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:h-115 md:p-8"
        >
          <div className="space-y-6 font-sans text-base leading-[1.7] text-text-muted">
            {poem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <nav>
          <NavLink
            to="/Heart"
            className="flex h-14 w-full min-w-64 max-w-75 items-center justify-center gap-3 rounded-full border-none bg-primary px-8 font-sans text-base font-medium text-default transition-all duration-180 ease-out hover:-translate-y-px hover:bg-primary-hover hover:shadow-[0_6px_20px_rgba(240,90,104,0.18)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-text active:scale-[0.98] active:bg-primary-active"
          >
            <span>Clique aqui</span>
            <ArrowRight />
          </NavLink>
        </nav>
      </main>
    </div>
  );
}
