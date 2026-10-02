import type { Track } from "@/types/audio";

const base = import.meta.env.BASE_URL;

export const followYou: Track = {
  id: "follow-you",
  title: "Follow You",
  artist: "Bring Me The Horizon",
  artwork: `${base}images/album-cover.jpg`,
  src: `${base}audio/follow-you.mp3`,
};
