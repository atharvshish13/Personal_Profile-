'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
        dotRef.current.style.opacity = '1';
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = '1';
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      animId = requestAnimationFrame(animate);
    };

    const clickableSelector = 'a, button, input, textarea, select, [role="button"], .project-card, .cert-card';
    let activeTarget: Element | null = null;

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target.closest(clickableSelector) : null;
      if (target === activeTarget) return;
      activeTarget = target;

      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.6)';
        ringRef.current.style.borderColor = 'rgba(56, 189, 248, 0.9)';
        ringRef.current.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target.closest(clickableSelector) : null;
      const nextTarget = e.relatedTarget instanceof Element
        ? e.relatedTarget.closest(clickableSelector)
        : null;
      if (target === nextTarget || target !== activeTarget) return;

      activeTarget = nextTarget;
      if (!ringRef.current) return;

      ringRef.current.style.transform = nextTarget
        ? 'translate(-50%, -50%) scale(1.6)'
        : 'translate(-50%, -50%) scale(1)';
      ringRef.current.style.borderColor = nextTarget
        ? 'rgba(56, 189, 248, 0.9)'
        : 'rgba(56, 189, 248, 0.7)';
      ringRef.current.style.backgroundColor = nextTarget
        ? 'rgba(56, 189, 248, 0.08)'
        : 'transparent';
    };

    const onMouseLeaveWindow = () => {
      activeTarget = null;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow);

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
