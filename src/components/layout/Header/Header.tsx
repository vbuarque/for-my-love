import { HeartIcon } from "lucide-react";

import { DecorativeLine } from "@/components/common/DecorativeLine/DecorativeLine";

export function Header() {
  return (
    <header className="flex h-14 w-full items-center gap-4 px-5 lg:px-8">
      <div className="flex shrink-0 items-center gap-2">
        <HeartIcon className="size-4 shrink-0 text-primary lg:size-5" />

        <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.24em] lg:text-[13px]">
          PARA VOCÊ
        </span>
      </div>

      <DecorativeLine fullWidth />

      <p className="shrink-0 whitespace-nowrap font-display text-lg lg:text-xl">
        Eu Te <span className="text-primary">Amo</span>
      </p>
    </header>
  );
}
