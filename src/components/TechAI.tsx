'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const techStack = [
  { name: 'Python', color: '#3776AB', emoji: '🐍' },
  { name: 'Java', color: '#ED8B00', emoji: '☕' },
  { name: 'JavaScript', color: '#F7DF1E', emoji: '📜' },
  { name: 'React', color: '#61DAFB', emoji: '⚛️' },
  { name: 'Node.js', color: '#339933', emoji: '🟢' },
  { name: 'Firebase', color: '#FFCA28', emoji: '🔥' },
  { name: 'Git', color: '#F05032', emoji: '🔧' },
  { name: 'GitHub', color: '#fff', emoji: '🐙' },
  { name: 'Google Cloud', color: '#4285F4', emoji: '☁️' },
  { name: 'Android Studio', color: '#3DDC84', emoji: '📱' },
];

const aiFuture = [
  {
    emoji: '🧪',
    title: 'AI Projects',
    desc: 'Drishti Setu (Landslide Detection), MJ Assistant (AI Personal Assistant), and ongoing explorations in computer vision and NLP.',
    color: '#2563EB',
  },
  {
    emoji: '📚',
    title: 'ML Journey',
    desc: 'Deep Learning · Neural Networks · NLP · Transformers · BERT · Large Language Models · Generative AI.',
    color: '#7C3AED',
  },
  {
    emoji: '🚀',
    title: 'Future Goals',
    desc: 'Advanced AI applications · Intelligent automation · Cloud-based AI systems · Scalable intelligent software for real-world impact.',
    color: '#38BDF8',
  },
];

export default function TechAI() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* Tech Wall */}
      <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref1}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <div className="section-label" style={{ justifyContent: 'center' }}>Tech Stack</div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800,
              letterSpacing: '-1px', fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Technologies I <span className="gradient-text">Work With</span>
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: 16,
          }}>
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6, scale: 1.03 }}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 16, padding: '24px 16px',
                  textAlign: 'center', cursor: 'default',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${tech.color}50`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px ${tech.color}25`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: 36, display: 'block', marginBottom: 10 }}>{tech.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" style={{
        background: 'var(--bg-secondary)', padding: '100px 0',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }} ref={ref2}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <div className="section-label" style={{ justifyContent: 'center' }}>AI & The Future</div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 900,
              lineHeight: 1.05, letterSpacing: '-2px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              BUILDING THE FUTURE<br /><span className="gradient-text">WITH AI</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 500, margin: '20px auto 0' }}>
              Passionate about leveraging artificial intelligence to create intelligent systems that solve real-world problems.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {aiFuture.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 24, padding: '36px',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                }} />
                <div style={{
                  position: 'absolute', top: -60, right: -60,
                  width: 150, height: 150, borderRadius: '50%',
                  background: `radial-gradient(circle, ${item.color}15, transparent 70%)`,
                }} />
                <span style={{ fontSize: 44, display: 'block', marginBottom: 20 }}>{item.emoji}</span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

