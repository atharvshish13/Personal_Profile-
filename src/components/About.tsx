'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Code2, Cpu, Target } from 'lucide-react';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const bentoItems = [
    {
      col: 'span 7', row: 'span 2',
      icon: <GraduationCap size={22} />,
      label: 'Education',
      title: 'B.Tech in CSE (AI & ML)',
      content: 'Pursuing Bachelor of Technology in Computer Science Engineering, specializing in Artificial Intelligence & Machine Learning.',
      accent: '#2563EB',
    },
    {
      col: 'span 5', row: 'span 1',
      icon: <Code2 size={22} />,
      label: 'Technical Focus',
      title: 'Full Stack Developer',
      content: 'React, Node.js, Firebase, Android Development & REST APIs.',
      accent: '#7C3AED',
    },
    {
      col: 'span 5', row: 'span 1',
      icon: <Cpu size={22} />,
      label: 'Specialization',
      title: 'AI & Machine Learning',
      content: 'Deep Learning, NLP, Transformers, LLMs & Cloud AI systems.',
      accent: '#38BDF8',
    },
    {
      col: 'span 12', row: 'span 1',
      icon: <Target size={22} />,
      label: 'Career Goal',
      title: 'Dream. Build. Create The Future.',
      content: 'Building intelligent, scalable software solutions that bridge technology with real-world impact. Passionate about leveraging AI to solve meaningful problems.',
      accent: '#2563EB',
    },
  ];

  return (
    <section id="about" style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref}>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          style={{ marginBottom: 60 }}
        >
          <div className="section-label">About Me</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-1.5px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Building Technology.
            <br />
            <span className="gradient-text">Creating Possibilities.</span>
          </h2>
        </motion.div>

        {/* Two-column intro */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48 }} className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20 }}>
              I am a passionate <strong style={{ color: 'var(--text)' }}>Full Stack Developer</strong> and
              Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20 }}>
              I enjoy creating impactful digital solutions through web technologies, Android applications,
              cloud computing, and AI-powered systems.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)' }}>
              Currently pursuing B.Tech in Computer Science Engineering (AI & ML), while continuously
              improving my expertise in React, Node.js, software development, and artificial intelligence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 280 }}
          >
            <Image
              src="/hero-banner.jpg"
              alt="Atharvshish Barwat — Cinematic Portrait"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(5,5,5,0.4) 0%, transparent 60%)',
            }} />
            <div style={{
              position: 'absolute', bottom: 20, left: 20,
              background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(37,99,235,0.3)',
              borderRadius: 12, padding: '10px 16px',
              fontSize: 13, fontWeight: 600, color: '#38BDF8',
            }}>
              Full Stack Developer | AI & ML
            </div>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 16,
        }}>
          {bentoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                gridColumn: item.col,
                gridRow: item.row,
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 20, padding: '28px',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s ease',
              }}
              whileHover={{ y: -4, borderColor: `${item.accent}44` }}
            >
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 150, height: 150, borderRadius: '50%',
                background: `radial-gradient(circle, ${item.accent}18 0%, transparent 70%)`,
                transform: 'translate(30%, -30%)',
              }} />
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 44, height: 44, borderRadius: 12,
                background: `${item.accent}22`,
                color: item.accent, marginBottom: 16,
              }}>{item.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: item.accent, marginBottom: 8, textTransform: 'uppercase' }}>
                {item.label}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:last-child { min-height: 200px !important; }
        }
      `}</style>
    </section>
  );
}

