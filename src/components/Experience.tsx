'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, ExternalLink } from 'lucide-react';

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const responsibilities = [
    'Designed and developed the official company website from concept to deployment.',
    'Developed a customer engagement mobile application to improve business accessibility.',
    'Managed the full software development lifecycle across multiple projects.',
    'Worked on business automation to streamline operational processes.',
    'Improved user experience and technical performance of digital products.',
    'Contributed to technical planning, architecture decisions, and implementation.',
  ];

  return (
    <section id="experience" style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label">Experience</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-1.5px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Professional
            <br /><span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 800 }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 2, background: 'linear-gradient(180deg, #2563EB, #7C3AED, transparent)',
            borderRadius: 1,
          }} />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ paddingLeft: 40, position: 'relative' }}
          >
            {/* Timeline dot */}
            <div style={{
              position: 'absolute', left: -6, top: 32,
              width: 14, height: 14, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
              boxShadow: '0 0 20px rgba(37,99,235,0.6)',
            }} />

            {/* Experience card */}
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 24, padding: '36px',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.4s ease',
            }}>
              {/* Background glow */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
                transform: 'translate(30%, -30%)',
              }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'linear-gradient(135deg, #2563EB22, #7C3AED22)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Briefcase size={24} color="#2563EB" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>
                      Full Stack Engineer & Technical Advisor
                    </h3>
                    <span style={{
                      padding: '4px 12px', borderRadius: 100,
                      background: 'rgba(16,185,129,0.15)',
                      border: '1px solid rgba(16,185,129,0.3)',
                      fontSize: 12, fontWeight: 600, color: '#10B981',
                    }}>Completed</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#38BDF8' }}>Shri Multy Service</span>
                    <span style={{ fontSize: 14, color: 'var(--muted)' }}>Amravati, Maharashtra</span>
                  </div>
                </div>
                <a
                  href="https://github.com/atharvshish13/Shrimultyservices.co.in"
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
                  aria-label="GitHub"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              {/* Responsibilities */}
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
                  color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16,
                }}>Key Responsibilities</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {responsibilities.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                      style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                    >
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#2563EB', flexShrink: 0, marginTop: 8,
                      }} />
                      <span style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
                {['React.js', 'Node.js', 'Firebase', 'Android', 'JavaScript'].map(tech => (
                  <span key={tech} style={{
                    padding: '5px 12px', borderRadius: 100,
                    background: 'rgba(37,99,235,0.1)',
                    border: '1px solid rgba(37,99,235,0.2)',
                    fontSize: 12, fontWeight: 500, color: '#38BDF8',
                  }}>{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

