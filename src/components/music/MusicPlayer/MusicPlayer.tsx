import {
  MusicPlayer as NyxMusicPlayer,
} from "../../ui/music-player";

import type { Track } from "../../ui/music-player";

const followYou: Track = {
  id: "follow-you",
  title: "Follow You",
  artist: "Bring Me The Horizon",
  artwork: "/images/album-cover.jpg",
  duration: 0,
  url: "/audio/follow-you.mp3",
};

export function MusicPlayer() {
  return (
    <NyxMusicPlayer
      currentTrack={followYou}
      autoPlay={false}
      showEqualizer={false}
      accentColor="#f05a68"
    />
  );
}