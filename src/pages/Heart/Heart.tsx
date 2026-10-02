import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";

import { DecorativeLine } from "@/components/common/DecorativeLine/DecorativeLine";
import { HeartAnimation } from "@/components/heart/HeartAnimation/HeartAnimation";
import { Header } from "@/components/layout/Header/Header";
import { MusicPlayer } from "@/components/music/MusicPlayer/MusicPlayer";

export function Heart() {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-8 px-5 pt-6 pb-8 lg:flex-row lg:gap-16 lg:p-8">
        <section
          aria-label="Coração"
          className="flex w-full flex-col items-center justify-center lg:flex-1"
        >
          <div className="flex flex-col items-center gap-1 text-center font-mono text-[10px] leading-normal tracking-[0.2em] lg:text-xs">
            <span>ALGUMAS MÚSICAS</span>
            <span>TAMBÉM DIZEM O QUE EU SINTO</span>
          </div>

          <div className="mt-6 flex h-60 w-full max-w-90 items-center justify-center lg:h-80 lg:w-105 lg:max-w-none">
            <HeartAnimation />
          </div>

          <div className="mt-5 flex items-center gap-2.5 whitespace-nowrap font-mono text-[10px] tracking-[0.2em] lg:gap-3 lg:text-xs">
            <DecorativeLine className="w-7 lg:w-9" />
            <span>É SEMPRE VOCÊ</span>
            <DecorativeLine className="w-7 lg:w-9" />
          </div>
        </section>

        <MusicPlayer />
      </main>

      <footer className="flex justify-center pt-2 pb-6 lg:pb-8">
        <nav>
          <NavLink
            to="/"
            className="flex h-12 w-35 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-5 py-3 font-sans text-sm font-medium text-text transition-all duration-180 ease-out hover:-translate-y-px hover:bg-surface hover:shadow-[0_6px_20px_rgba(255,255,255,0.04)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary active:scale-[0.98] active:bg-surface-active"
          >
            <ArrowLeft size={18} strokeWidth={2} />
            <span>Voltar</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
}
