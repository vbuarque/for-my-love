import { useCallback, useEffect, useMemo, useState } from "react";

import { followYou } from "@/data/track";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { formatTime } from "@/utils/formatTime";

// Ao apertar Enter você sempre reage um pouquinho depois de ouvir a linha;
// descontamos esse atraso para a letra não aparecer atrasada.
const REACTION_OFFSET = 0.25;

/**
 * Ferramenta de uso único (só aparece com `npm run dev`) para marcar o
 * tempo de cada linha da letra:
 *   1. cole a letra (uma linha por linha) na caixa;
 *   2. toque a música;
 *   3. aperte Enter (ou "Marcar") no instante em que cada linha começa;
 *   4. copie o resultado e cole em src/data/lyrics.ts.
 */
export function SyncTool() {
  const { isPlaying, currentTime, duration, hasError, toggle, seek, skip } =
    useAudioPlayer(followYou.src);

  const [rawLyrics, setRawLyrics] = useState("");
  const [stamps, setStamps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const lines = useMemo(
    () =>
      rawLyrics
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [rawLyrics],
  );

  const markNext = useCallback(() => {
    setStamps((previous) =>
      previous.length >= lines.length
        ? previous
        : [
            ...previous,
            Number(Math.max(0, currentTime - REACTION_OFFSET).toFixed(2)),
          ],
    );
  }, [lines.length, currentTime]);

  const undo = () => setStamps((previous) => previous.slice(0, -1));

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLTextAreaElement) return;

      if (event.key === "Enter") {
        event.preventDefault();
        markNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [markNext]);

  const output = [
    "export const lyrics: LyricLine[] = [",
    ...lines
      .slice(0, stamps.length)
      .map(
        (text, index) =>
          `  { time: ${stamps[index]}, text: ${JSON.stringify(text)} },`,
      ),
    "];",
  ].join("\n");

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const nextLine = lines[stamps.length];
  const buttonClass =
    "rounded-full border border-border px-4 py-2 text-sm hover:bg-surface-active disabled:opacity-40";

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-6 p-6">
      <h1 className="font-display text-3xl">
        Sincronizar <span className="text-primary">letra</span>
      </h1>

      {hasError && (
        <p role="alert" className="text-sm text-primary">
          Não achei o áudio. Coloque o arquivo em public{followYou.src}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={toggle} className={buttonClass}>
          {isPlaying ? "Pausar" : "Tocar"}
        </button>
        <button type="button" onClick={() => skip(-3)} className={buttonClass}>
          −3s
        </button>
        <button type="button" onClick={() => seek(0)} className={buttonClass}>
          Início
        </button>
        <span className="font-mono tabular-nums text-text-muted">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <textarea
        value={rawLyrics}
        onChange={(event) => {
          setRawLyrics(event.target.value);
          setStamps([]);
        }}
        placeholder="Cole aqui a letra, uma linha por linha..."
        className="h-40 rounded-xl border border-border bg-surface p-4 text-sm"
      />

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
        <p className="text-sm text-text-muted">
          {nextLine
            ? `Próxima linha (${stamps.length + 1}/${lines.length}):`
            : lines.length > 0
              ? "Todas as linhas foram marcadas!"
              : "Cole a letra acima para começar."}
        </p>
        {nextLine && <p className="text-xl text-primary">{nextLine}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={markNext}
            disabled={!nextLine}
            className="rounded-full bg-primary px-6 py-2 font-medium text-default hover:bg-primary-hover disabled:opacity-40"
          >
            Marcar (Enter)
          </button>
          <button
            type="button"
            onClick={undo}
            disabled={stamps.length === 0}
            className={buttonClass}
          >
            Desfazer
          </button>
        </div>
      </div>

      <textarea
        readOnly
        value={output}
        className="h-56 rounded-xl border border-border bg-surface-deep p-4 font-mono text-xs"
      />

      <button
        type="button"
        onClick={copyOutput}
        disabled={stamps.length === 0}
        className={`${buttonClass} self-start`}
      >
        {copied ? "Copiado!" : "Copiar resultado"}
      </button>
    </main>
  );
}
