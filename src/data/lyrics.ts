import type { LyricLine } from "@/types/lyrics";

/**
 * Letra sincronizada da música (estilo karaokê).
 *
 * Cada item tem o segundo em que a linha começa e o texto dela, em ordem
 * crescente de tempo. Exemplo do formato:
 *
 *   { time: 12.5, text: "Primeira linha" },
 *   { time: 17.2, text: "Segunda linha" },
 *
 * Não precisa descobrir os tempos de ouvido: rode `npm run dev`, abra
 * http://localhost:5173/sync, cole a letra e marque cada linha enquanto a
 * música toca. A ferramenta gera este array pronto para colar aqui.
 *
 * Enquanto o array estiver vazio, a caixa de letras mostra uma mensagem
 * discreta no lugar.
 */
export const lyrics: LyricLine[] = [
  { time: 21.63, text: "My head is haunting me and my heart feels like a ghost" },
  { time: 27.15, text: "I need to feel something, 'cause I'm still so far from home" },
  { time: 31.99, text: "Cross your heart and hope to die" },
  { time: 34.54, text: "Promise me you'll never leave my side" },
  { time: 42.67, text: "Show me what I can't see when the spark in your eyes is gone" },
  { time: 48.18, text: "You've got me on my knees I'm your one-man cult" },
  { time: 53.39, text: "Cross my heart and hope to die" },
  { time: 56, text: "Promise you I'll never leave your side" },
  { time: 63.7, text: "'Cause I'm telling you, you're all I need" },
  { time: 69.02, text: "I promise you you're all I see" },
  { time: 74.28, text: "'Cause I'm telling you, you're all I need" },
  { time: 79.91, text: "I'll never leave" },
  { time: 83.24, text: "So, you can drag me through hell" },
  { time: 87.35, text: "If it meant I could hold your hand" },
  { time: 91.17, text: "I will follow you, 'cause I'm under your spell" },
  { time: 97.64, text: "And you can throw me to the flames" },
  { time: 102.01, text: "I will follow you, I will follow you" },
  { time: 117.68, text: "Come sink into me and let me breathe you in" },
  { time: 122.88, text: "I'll be your gravity, you be my oxygen" },
  { time: 127.83, text: "So dig two graves, 'cause when you die" },
  { time: 130.55, text: "I swear I'll be leaving by your side" },
  { time: 136.33, text: "So, you can drag me through hell" },
  { time: 140.52, text: "If it meant I could hold your hand" },
  { time: 144.55, text: "I will follow you, 'cause I'm under you spell" },
  { time: 151.09, text: "And you can throw me to the flames" },
  { time: 155.33, text: "I will follow you" },
  { time: 157.73, text: "So, you can drag me through hell" },
  { time: 161.87, text: "If it meant I could hold your hand" },
  { time: 165.86, text: "I will follow you, 'cause I'm under you spell" },
  { time: 172.5, text: "And you can throw me to the flames" },
  { time: 176.65, text: "I will follow you, I will follow you" },
  { time: 187.53, text: "I will follow you, I will follow you" },
  { time: 200.76, text: "So, you can drag me through hell" },
  { time: 204.9, text: "If it meant I could hold your hand" },
  { time: 209.26, text: "I will follow you, 'cause I'm under you spell" },
  { time: 215.16, text: "And you can throw me to the flames" },
  { time: 219.3, text: "I will follow you, I will follow you" },
];
