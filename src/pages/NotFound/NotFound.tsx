import { HeartCrack } from "lucide-react";
import { NavLink } from "react-router";

export function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6 text-center">
      <HeartCrack className="size-8 text-primary" strokeWidth={1.5} />

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-4xl">
          Página <span className="text-primary">não encontrada</span>
        </h1>
        <p className="font-mono text-xs tracking-[0.2em] text-text-muted">
          ESSE CAMINHO NÃO LEVA A LUGAR NENHUM
        </p>
      </div>

      <NavLink
        to="/"
        className="flex h-12 items-center justify-center rounded-full border border-border px-6 font-sans text-sm font-medium transition-all duration-180 ease-out hover:-translate-y-px hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
      >
        Voltar ao início
      </NavLink>
    </main>
  );
}
