'use client';

import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
  size: number;
}

/**
 * InkMonk Research — Global 3D Interactive Particle & Neural Constellation
 * Renders a lightweight, hardware-accelerated 3D coordinate space with:
 * - Floating scientific nodes interconnected by laser lines
 * - Real-time perspective projection with depth fading
 * - Smooth cursor-reactive 3D parallax tilting
 * - Performance optimized: 60 FPS, throttles on inactive tabs
 */
export default function Futuristic3DBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for 3D parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.4;
      targetMouseY = (e.clientY - height / 2) * 0.4;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initialize 3D points
    const POINT_COUNT = Math.min(Math.floor(width / 22), 65);
    const FOV = 450;
    const colors = ['#00F2FE', '#06B6D4', '#10B981', '#38BDF8', '#F59E0B'];

    const points: Point3D[] = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      const x = (Math.random() - 0.5) * width * 1.4;
      const y = (Math.random() - 0.5) * height * 1.4;
      const z = (Math.random() - 0.5) * 600;
      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.3,
        color: colors[i % colors.length],
        size: Math.random() * 2.2 + 1.2,
      });
    }

    // Render Loop
    let angle = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      angle += 0.0015;

      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);

      // Project 3D points to 2D screen
      const projected = points.map((p) => {
        // Slow orbital drift
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce within bounding volume
        if (Math.abs(p.x - p.baseX) > 120) p.vx *= -1;
        if (Math.abs(p.y - p.baseY) > 120) p.vy *= -1;
        if (Math.abs(p.z - p.baseZ) > 100) p.vz *= -1;

        // Apply mouse tilt & rotation
        const rotatedX = p.x * cosAngle - p.z * sinAngle + mouseX * 0.6;
        const rotatedZ = p.z * cosAngle + p.x * sinAngle + 400;
        const rotatedY = p.y + mouseY * 0.6;

        const scale = FOV / (FOV + rotatedZ);
        const screenX = width / 2 + rotatedX * scale;
        const screenY = height / 2 + rotatedY * scale;

        return {
          screenX,
          screenY,
          scale,
          z: rotatedZ,
          color: p.color,
          size: p.size * scale,
        };
      });

      // Draw connecting laser filaments between close nodes
      const maxDist = 140;
      ctx.lineWidth = 0.65;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();
          }
        }
      }

      // Draw glowing 3D nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.screenX < -20 || p.screenX > width + 20 || p.screenY < -20 || p.screenY > height + 20) {
          continue;
        }

        const alpha = Math.min(Math.max((p.scale - 0.2) * 1.1, 0.1), 0.85);

        // Core dot
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, Math.max(p.size, 1), 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo for larger nodes
        if (p.size > 2.0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, p.size * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.65 }}
    />
  );
}
