import { useEffect, useRef } from "react";

interface Particle {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
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

    const particleCount = 5000;
    const animationDuration = 5000;
    const pauseDuration = 1500;
    const cycleDuration = animationDuration + pauseDuration;

    let animationFrameId: number;
    let startTime: number | null = null;

    const particles: Particle[] = [];

    function random(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function createHeartPoint(t: number, scale: number) {
      const x = 16 * Math.sin(t) ** 3;

      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      return {
        x: x * scale,
        y: -y * scale,
      };
    }

    function createParticles() {
      particles.length = 0;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const centerX = width / 2;
      const centerY = height / 2;

      const scale = Math.min(width, height) / 36;

      for (let i = 0; i < particleCount; i++) {
        const t = (Math.PI * 2 * i) / particleCount;

        const heartPoint = createHeartPoint(t, scale);

        particles.push({
          startX: random(0, width),
          startY: random(0, height),
          targetX: centerX + heartPoint.x,
          targetY: centerY + heartPoint.y,
          size: random(1, 3),
        });
      }
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      createParticles();
    }

    function easeOut(progress: number) {
      return 1 - Math.pow(1 - progress, 3);
    }

    function drawParticle(x: number, y: number, size: number, opacity: number) {
      ctx.beginPath();

      ctx.fillStyle = `rgba(240, 90, 104, ${opacity})`;

      ctx.arc(x, y, size, 0, Math.PI * 2);

      ctx.fill();
    }

    function animate(timestamp: number) {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      if (elapsed >= cycleDuration) {
        startTime = timestamp;
      }

      const cycleElapsed = timestamp - startTime;

      const rawProgress = Math.min(cycleElapsed / animationDuration, 1);

      const progress = easeOut(rawProgress);

      const rect = canvas.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);

      for (const particle of particles) {
        const x =
          particle.startX + (particle.targetX - particle.startX) * progress;

        const y =
          particle.startY + (particle.targetY - particle.startY) * progress;

        const opacity = 0.15 + progress * 0.85;

        drawParticle(x, y, particle.size, opacity);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
  );
}
