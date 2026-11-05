'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setVisible(false), 400);
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
      transition: 'opacity 0.4s ease',
      opacity: progress >= 100 ? 0 : 1,
    }}>
      {/* Logo */}
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, fontWeight: 900, color: 'white',
        boxShadow: '0 0 40px rgba(37,99,235,0.4)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>AB</div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 18, fontWeight: 800, color: '#fff',
          letterSpacing: '-0.5px', marginBottom: 4,
          fontFamily: "'Space Grotesk', sans-serif",
        }}>ATHARVSHISH BARWAT</div>
        <div style={{ fontSize: 12, color: '#A1A1AA', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Dream. Build. Create.
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, #2563EB, #7C3AED, #38BDF8)',
          borderRadius: 1,
          transition: 'width 0.1s ease',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(37,99,235,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(56,189,248,0.6); }
        }
      `}</style>
    </div>
  );
}

