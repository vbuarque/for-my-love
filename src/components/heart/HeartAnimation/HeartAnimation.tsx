import { useEffect, useRef } from "react";

interface Particle {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
}

const PARTICLE_COUNT = 500;
const FORM_DURATION = 2000; // partículas voam até formar o coração
const HOLD_DURATION = 1500; // coração formado, batendo
const FADE_DURATION = 500; // some suavemente antes de recomeçar
const CYCLE_DURATION = FORM_DURATION + HOLD_DURATION + FADE_DURATION;
const BEAT_INTERVAL = 750;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function easeOut(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

/** Equação paramétrica clássica do coração. */
function createHeartPoint(t: number, scale: number) {
  const x = 16 * Math.sin(t) ** 3;
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  return { x: x * scale, y: -y * scale };
}

export function HeartAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext("2d");
    if (!context) return;

    const canvas = canvasElement;
    const ctx = context;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let cycleStart: number | null = null;

    function createParticles() {
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width / 36, height / 34);

      particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
        const t = (Math.PI * 2 * index) / PARTICLE_COUNT;
        const point = createHeartPoint(t, scale);

        return {
          startX: random(0, width),
          startY: random(0, height),
          targetX: centerX + point.x,
          // O desenho do coração é mais "pesado" embaixo; subimos um pouco
          // para ele ficar visualmente centralizado.
          targetY: centerY + point.y - 2.5 * scale,
          size: random(1, 3),
        };
      });
    }

    function draw(elapsed: number) {
      ctx.clearRect(0, 0, width, height);

      const formProgress = easeOut(Math.min(elapsed / FORM_DURATION, 1));
      const holdTime = Math.max(0, elapsed - FORM_DURATION);
      const fadeProgress = Math.max(
        0,
        (elapsed - FORM_DURATION - HOLD_DURATION) / FADE_DURATION,
      );

      // Batida: pico curtinho a cada BEAT_INTERVAL, só depois de formado.
      const beat = Math.abs(Math.sin((holdTime / BEAT_INTERVAL) * Math.PI)) ** 8;
      const pulse = 1 + 0.04 * beat * (elapsed >= FORM_DURATION ? 1 : 0);

      const opacity = (0.15 + formProgress * 0.85) * (1 - fadeProgress);
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.fillStyle = `rgba(240, 90, 104, ${opacity})`;
      ctx.beginPath();

      for (const particle of particles) {
        const baseX =
          particle.startX + (particle.targetX - particle.startX) * formProgress;
        const baseY =
          particle.startY + (particle.targetY - particle.startY) * formProgress;

        const x = centerX + (baseX - centerX) * pulse;
        const y = centerY + (baseY - centerY) * pulse;

        ctx.moveTo(x + particle.size, y);
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      }

      ctx.fill();
    }

    function animate(timestamp: number) {
      if (cycleStart === null) cycleStart = timestamp;

      if (timestamp - cycleStart >= CYCLE_DURATION) {
        cycleStart = timestamp;
        createParticles(); // novas posições aleatórias a cada volta
      }

      draw(timestamp - cycleStart);
      animationFrameId = requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const pixelRatio = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      createParticles();
    }

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full drop-shadow-[0_0_14px_rgba(240,90,104,0.35)]"
      aria-hidden="true"
    />
  );
}
