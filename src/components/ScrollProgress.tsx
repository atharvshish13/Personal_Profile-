'use client';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0,
        height: 2, zIndex: 10001,
        background: 'linear-gradient(90deg, #2563EB, #7C3AED, #38BDF8)',
        width: `${progress}%`,
        transition: 'width 0.05s linear',
        transformOrigin: 'left',
      }}
    />
  );
}

