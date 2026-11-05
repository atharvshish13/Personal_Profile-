'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    label: 'Programming Languages',
    color: '#2563EB',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'Java', icon: '☕' },
      { name: 'JavaScript', icon: '📜' },
      { name: 'C', icon: '⚙️' },
    ],
  },
  {
    label: 'Frontend',
    color: '#38BDF8',
    skills: [
      { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3', icon: '🎨' },
      { name: 'JavaScript', icon: '📜' },
      { name: 'React.js', icon: '⚛️' },
    ],
  },
  {
    label: 'Backend',
    color: '#7C3AED',
    skills: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'REST APIs', icon: '🔗' },
    ],
  },
  {
    label: 'Database & Cloud',
    color: '#F59E0B',
    skills: [
      { name: 'Firebase', icon: '🔥' },
      { name: 'Google Cloud', icon: '☁️' },
    ],
  },
  {
    label: 'Tools & IDEs',
    color: '#10B981',
    skills: [
      { name: 'Git', icon: '🔧' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'Android Studio', icon: '📱' },
      { name: 'VS Code', icon: '💻' },
    ],
  },
  {
    label: 'Specializations',
    color: '#EC4899',
    skills: [
      { name: 'Full Stack Dev', icon: '🏗️' },
      { name: 'MERN Stack', icon: '📦' },
      { name: 'AI / ML', icon: '🤖' },
      { name: 'Cloud Computing', icon: '☁️' },
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Technical Skills</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-1.5px',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Tools I Work With
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 16, maxWidth: 500, margin: '16px auto 0', fontSize: 15 }}>
            A curated collection of technologies and tools I use to build digital products.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 20, padding: '28px',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s ease',
              }}
            >
              {/* Background glow */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 120, height: 120,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${cat.color}18 0%, transparent 70%)`,
                transform: 'translate(30%, -30%)',
              }} />

              <div style={{ marginBottom: 20 }}>
                <div style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: 100,
                  background: `${cat.color}20`, border: `1px solid ${cat.color}40`,
                  fontSize: 11, fontWeight: 700, color: cat.color,
                  letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8,
                }}>{cat.label}</div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {cat.skills.map(skill => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '8px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10, fontSize: 13, fontWeight: 500,
                      color: 'var(--text)', cursor: 'default',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${cat.color}60`;
                      (e.currentTarget as HTMLDivElement).style.background = `${cat.color}18`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

