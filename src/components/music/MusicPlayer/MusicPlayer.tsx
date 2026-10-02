import { Lyrics } from "@/components/music/Lyrics/Lyrics";
import { PlayerControls } from "@/components/music/PlayerControls/PlayerControls";
import { ProgressBar } from "@/components/music/ProgressBar/ProgressBar";
import { lyrics } from "@/data/lyrics";
import { followYou } from "@/data/track";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useLyricsSync } from "@/hooks/useLyricsSync";

const SKIP_SECONDS = 10;

export function MusicPlayer() {
  const { isPlaying, currentTime, duration, hasError, toggle, seek, skip } =
    useAudioPlayer(followYou.src);

  const activeIndex = useLyricsSync(lyrics, currentTime);

  return (
    <section
      aria-label="Player de música"
      className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-surface p-5 lg:w-160 lg:shrink-0 lg:rounded-[20px] lg:p-6"
    >
      <div className="grid grid-cols-[96px_1fr] content-center gap-x-4 gap-y-3 p-3 lg:h-55 lg:grid-cols-[120px_1fr] lg:gap-x-5 lg:gap-y-2 lg:p-5">
        <img
          src={followYou.artwork}
          alt={`Capa do álbum de ${followYou.title}`}
          className="size-24 rounded-xl object-cover lg:row-span-3 lg:size-30"
        />

        <div className="flex min-w-0 flex-col justify-center">
          <h2 className="truncate text-lg font-semibold">{followYou.title}</h2>
          <p className="truncate text-[13px] text-text-muted">
            {followYou.artist}
          </p>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <PlayerControls
            isPlaying={isPlaying}
            disabled={hasError}
            onToggle={toggle}
            onRewind={() => skip(-SKIP_SECONDS)}
            onForward={() => skip(SKIP_SECONDS)}
          />
        </div>

        {hasError && (
          <p role="alert" className="col-span-2 text-center text-xs text-text-subtle">
            Não consegui carregar a música.
            {import.meta.env.DEV && ` Confira se existe public${followYou.src}.`}
          </p>
        )}
      </div>

      <Lyrics lines={lyrics} activeIndex={activeIndex} />
    </section>
  );
}
