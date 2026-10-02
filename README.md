# Heart for my love ❤

Site-presente romântico: uma carta de abertura e uma página com um coração
de partículas, a música "Follow You" (Bring Me The Horizon) e a letra em
estilo karaokê.

**Stack:** Vite · React · TypeScript · Tailwind CSS v4 · React Router · Lucide

## Rodando

```bash
npm install     # na primeira vez (atualiza o package-lock.json)
npm run dev     # http://localhost:5173
```

Outros comandos: `npm run build`, `npm run type-check`, `npm run lint`.

## O que falta colocar (arquivos que não vêm no código)

1. **A música:** copie o MP3 para `public/audio/follow-you.mp3`.
2. **A letra sincronizada:** veja a seção abaixo.

A capa já está em `public/images/album-cover.jpg`.

## Sincronizando a letra (karaokê)

A letra fica em `src/data/lyrics.ts` como uma lista de `{ time, text }`
(`time` = segundo em que a linha começa). Para não marcar tudo de ouvido:

1. Com a música no lugar, rode `npm run dev` e abra
   <http://localhost:5173/sync> (essa página só existe em desenvolvimento).
2. Cole a letra na caixa, uma linha por linha.
3. Toque a música e aperte **Enter** (ou "Marcar") no instante em que cada
   linha começa. "Desfazer" e "−3s" ajudam a corrigir.
4. Clique em "Copiar resultado" e cole no lugar do array em
   `src/data/lyrics.ts`.

Enquanto o array estiver vazio, a caixa mostra "A LETRA APARECE AQUI".

## Estrutura

```
src/
├── components/
│   ├── common/    DecorativeLine, IconButton
│   ├── heart/     HeartAnimation (Canvas)
│   ├── layout/    Header
│   └── music/     MusicPlayer, PlayerControls, ProgressBar, Lyrics
├── data/          poem.ts, track.ts, lyrics.ts
├── hooks/         useAudioPlayer, useLyricsSync
├── pages/         Home, Heart, NotFound, SyncTool (dev)
├── routes/
├── types/
└── utils/         formatTime, findActiveLineIndex
```

As cores e fontes ficam em `src/index.css` (bloco `@theme`). Imports usam o
alias `@/` (= `src/`).

## Publicando

Depois de `npm run build`, publique a pasta `dist/`. Como o site tem rotas
(`/Heart`), configure na hospedagem o redirecionamento de qualquer caminho
para `index.html` (SPA fallback).
