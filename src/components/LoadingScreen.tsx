'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 15 + 6;
      });
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setVisible(false), 500);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#050505',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, gap: 24,
      transition: 'opacity 0.6s ease',
      opacity: progress >= 100 ? 0 : 1,
      pointerEvents: progress >= 100 ? 'none' : 'all',
      overflow: 'hidden',
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/bg-video.mp4"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.38,
          zIndex: 0,
          filter: 'contrast(1.15) brightness(0.85)',
        }}
      />

      {/* Dark gradient & atmospheric vignette over video */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.92) 80%, #050505 100%)',
        zIndex: 1,
      }} />

      {/* Atmospheric glow behind logo */}
      <div style={{
        position: 'absolute',
        width: 340,
        height: 340,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(56,189,248,0.2) 45%, transparent 70%)',
        filter: 'blur(55px)',
        zIndex: 2,
      }} />

      {/* Official Designer Logo */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}>
        <div style={{
          position: 'relative',
          width: 140,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 0 30px rgba(56,189,248,0.7))',
          animation: 'logoPulse 2s ease-in-out infinite',
        }}>
          <Image
            src="/logo-transparent.png"
            alt="Atharvshish Barwat Logo"
            width={140}
            height={100}
            priority
            style={{
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: 22, fontWeight: 900, color: '#ffffff',
            letterSpacing: '-0.5px', marginBottom: 6,
            fontFamily: "'Space Grotesk', sans-serif",
            textTransform: 'uppercase',
          }}>
            ATHARVSHISH BARWAT
          </div>
          <div style={{
            fontSize: 12,
            color: '#38BDF8',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Dream &bull; Build &bull; Create
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: 240,
          height: 3,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
          marginTop: 10,
          boxShadow: '0 0 20px rgba(37,99,235,0.5)',
        }}>
          <div style={{
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, #2563EB, #7C3AED, #38BDF8)',
            borderRadius: 2,
            transition: 'width 0.1s ease',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px rgba(56,189,248,0.4)); }
          50% { transform: scale(1.06); filter: drop-shadow(0 0 45px rgba(56,189,248,0.9)); }
        }
      `}</style>
    </div>
  );
}
