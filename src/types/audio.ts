export interface Track {
  id: string;
  title: string;
  artist: string;
  /** Caminho da capa (arquivo dentro de /public). */
  artwork: string;
  /** Caminho do áudio (arquivo dentro de /public). */
  src: string;
}
