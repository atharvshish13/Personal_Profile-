'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: 'Projects Built', value: 4, suffix: '+', emoji: '🏗️', color: '#2563EB' },
  { label: 'Technologies Learned', value: 15, suffix: '+', emoji: '⚡', color: '#7C3AED' },
  { label: 'Certifications Earned', value: 6, suffix: '', emoji: '🏆', color: '#38BDF8' },
  { label: 'GitHub Contributions', value: 100, suffix: '+', emoji: '🐙', color: '#10B981' },
];

function CounterNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section style={{ background: 'var(--bg-secondary)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Achievements</div>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-1px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Numbers That <span className="gradient-text">Matter</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 20, padding: '36px 24px',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${stat.color}44`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${stat.color}22`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
              }} />
              <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>{stat.emoji}</span>
              <div style={{
                fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 900,
                fontFamily: "'Space Grotesk', sans-serif",
                background: `linear-gradient(135deg, ${stat.color}, #fff)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', lineHeight: 1,
              }}>
                <CounterNumber target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)', marginTop: 10 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

