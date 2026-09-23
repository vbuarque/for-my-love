import { NavLink } from "react-router";

import { DecorativeLine } from "@/components/common/DecorativeLine/DecorativeLine";
import { Heart, ArrowRight } from "lucide-react";

export function Home() {
  return (
    <div className="w-full flex justify-center items-center p-6">
      <main className="flex flex-col justify-center items-center gap-12 h-screen w-full max-w-155">
        <div className="flex flex-col justify-center items-center gap-4">
          <div>
            <Heart size={20} className="text-primary" />
          </div>
          <div className="flex w-72 items-center justify-center gap-3">
            <DecorativeLine fullWidth />

            <span className="whitespace-nowrap font-mono tracking-[3.84px]">
              PARA VOCÊ
            </span>

            <DecorativeLine fullWidth />
          </div>
          <div>
            <h1 className="font-display text-6xl ">
              Eu te <span className="text-primary">amo</span>
            </h1>
          </div>

          <div className="flex w-72 justify-center items-center gap-3">
            <DecorativeLine fullWidth />
          </div>
        </div>

        <div className="poem-scrollbar h-115 w-full overflow-y-auto rounded-2xl border border-border bg-surface p-8">
          <div className="font-sans text-text-muted text-base leading-[1.7]">
            <p>
              Eu pensei que precisaria me ausentar desta vida para conhecer o
              paraíso...
            </p>

            <p className="mt-6">
              Eu pensei que, para encontrar um amor que coubesse dentro do meu
              peito, eu precisaria pagar uma fortuna...
            </p>

            <p className="mt-6">
              Eu pensei que a minha essência, o meu cheiro, afastassem qualquer
              tipo de felicidade...
            </p>

            <p className="mt-6">
              Eu pensei que eu não merecesse um sorriso, muito menos um beijo e,
              impensavelmente, um “eu te amo”...
            </p>

            <p className="mt-6">
              Eu pensei que o meu lugar no mundo era fazer parte da estatística
              de pessoas que morrem sozinhas, deprimidas, raivosas, intolerantes
              a qualquer tipo de sentimento...
            </p>

            <p className="mt-6">
              Eu pensei que o meu lugar no mundo era esse, e que nada e ninguém
              fosse capaz ou quisesse me tirar dali...
            </p>

            <p className="mt-6">
              Eu nasci rodeado de amor, de pessoas que me amavam, e que
              trocariam a própria vida pela minha.
            </p>

            <p className="mt-6">Mas, no meio do caminho, eu me perdi.</p>

            <p className="mt-6">
              Eu bati com a cabeça em algum lugar e tive amnésia de
              amor-próprio.
            </p>

            <p className="mt-6">Vaguei perdido por anos,</p>

            <p className="mt-6">
              até que seus olhos iluminaram a minha existência e, finalmente,
              tive a minha memória de volta.
            </p>

            <p className="mt-6">Tive o meu amor de volta.</p>

            <p className="mt-6">
              E conheci o amor que foi destinado ao meu coração.
            </p>

            <p className="mt-6">Você! ❤️</p>
          </div>
        </div>

        <nav>
          <NavLink
            className="flex justify-center items-center gap-3 w-75 h-14 px-4 py-6 bg-primary text-default font-sans border-none rounded-full hover:bg-primary-hover hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(240,90,104,0.18)] focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-3 active:scale-[0.98] transition-all duration-180 ease-out"
            to="/Heart"
          >
            <span>Clique aqui</span>
            <span>
              <ArrowRight />
            </span>
          </NavLink>
        </nav>
      </main>
    </div>
  );
}
