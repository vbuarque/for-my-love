import { DecorativeLine } from "../../components/common/DecorativeLine/DecorativeLine";
import { HeartAnimation } from "../../components/heart/HeartAnimation/HeartAnimation";
import { ArrowLeft, HeartIcon } from "lucide-react";
import { NavLink } from "react-router";
import { MusicPlayer } from "../../components/music/MusicPlayer/MusicPlayer";

export function Heart() {
  return (
    <div className="flex min-h-screen w-full flex-col px-6 pb-6">
      <header className="flex h-14 w-full items-center gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <HeartIcon
            size={20}
            className="shrink-0 text-primary"
          />

          <span className="whitespace-nowrap font-mono tracking-[3.84px]">
            PARA VOCÊ
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <DecorativeLine fullWidth />
        </div>

        <div className="shrink-0 whitespace-nowrap">
          <p className="font-display text-xl">
            Eu Te <span className="text-primary">Amo</span>
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center gap-16 py-8">
        <section className="flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center text-center font-mono text-xs tracking-[3.84px]">
            <span>ALGUMAS MÚSICAS</span>
            <span>TAMBÉM DIZEM O QUE EU SINTO</span>
          </div>

          <div className="flex h-80 w-105 items-center justify-center">
            <HeartAnimation />
          </div>

          <div className="mt-5 flex items-center gap-3 whitespace-nowrap font-mono text-xs tracking-[3.84px]">
            <DecorativeLine lineWidth={36} />

            <span>É SEMPRE VOCÊ</span>

            <DecorativeLine lineWidth={36} />
          </div>
        </section>

        <section className="flex w-160 shrink-0 flex-col rounded-2xl border border-border bg-surface p-6">
          <div className="h-55 w-full rounded-xl">
            <MusicPlayer />
          </div>

          <div className="mt-4 h-111 w-full overflow-hidden rounded-xl border border-border bg-bg p-6">
            {/* Lyrics */}
          </div>
        </section>
      </main>

      <footer className="flex justify-center pt-8">
        <nav>
          <NavLink
            to="/"
            className="flex h-12 w-35 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-5 py-3 font-sans text-sm font-medium text-text transition-all duration-180 ease-out hover:-translate-y-px hover:bg-surface hover:shadow-[0_6px_20px_rgba(255,255,255,0.04)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-3 active:scale-[0.98]"
          >
            <ArrowLeft size={18} strokeWidth={2} />
            <span>Voltar</span>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
}