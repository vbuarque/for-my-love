import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Controla um <audio> "invisível" (HTMLAudioElement) e expõe o estado
 * que a interface precisa: tocando?, tempo atual, duração e erro.
 */
export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Cria o elemento de áudio e liga os eventos dele ao estado do React.
  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleDuration = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleDuration);
    audio.addEventListener("durationchange", handleDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleDuration);
      audio.removeEventListener("durationchange", handleDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [src]);

  // "timeupdate" dispara só ~4x por segundo, pouco para a letra karaokê.
  // Enquanto toca, lemos o tempo a cada frame (mas só atualizamos o estado
  // quando mudou de verdade, para não renderizar à toa).
  useEffect(() => {
    if (!isPlaying) return;

    let frameId = 0;

    const tick = () => {
      const audio = audioRef.current;

      if (audio) {
        const time = audio.currentTime;
        setCurrentTime((previous) =>
          Math.abs(previous - time) >= 0.05 ? time : previous,
        );
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // Se o play() falhar (arquivo ausente, por exemplo), o evento "error"
      // do elemento já cuida de avisar a interface.
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const max = Number.isFinite(audio.duration) ? audio.duration : time;
    const clamped = Math.min(Math.max(time, 0), max);

    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  const skip = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      seek(audio.currentTime + seconds);
    },
    [seek],
  );

  return { isPlaying, currentTime, duration, hasError, toggle, seek, skip };
}
