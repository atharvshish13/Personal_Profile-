'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, X, Search } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: 'MERN Full Stack Development',
    issuer: 'Certification Authority',
    category: 'Development',
    categoryColor: '#2563EB',
    description: 'Comprehensive certification covering MongoDB, Express.js, React.js, and Node.js for full-stack web development.',
    emoji: '🏗️',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
  },
  {
    id: 2,
    title: 'Python Full Stack Development',
    issuer: 'Certification Authority',
    category: 'Development',
    categoryColor: '#2563EB',
    description: 'Full-stack development certification using Python with Django/Flask frameworks and modern frontend technologies.',
    emoji: '🐍',
    skills: ['Python', 'Django', 'Flask', 'Frontend'],
  },
  {
    id: 3,
    title: 'Prompt Engineering Virtual Internship',
    issuer: 'AI Institute',
    category: 'AI / ML',
    categoryColor: '#7C3AED',
    description: 'Virtual internship focused on prompt engineering techniques, LLM interaction, and AI application development.',
    emoji: '✍️',
    skills: ['Prompt Engineering', 'LLMs', 'AI Applications', 'ChatGPT API'],
  },
  {
    id: 4,
    title: 'Transformers & BERT Certification',
    issuer: 'AI Research Institute',
    category: 'AI / ML',
    categoryColor: '#7C3AED',
    description: 'Advanced certification covering Transformer architecture, BERT models, fine-tuning, and NLP applications.',
    emoji: '🤖',
    skills: ['Transformers', 'BERT', 'NLP', 'Hugging Face'],
  },
  {
    id: 5,
    title: 'Introduction to Large Language Models',
    issuer: 'Google / Coursera',
    category: 'AI / ML',
    categoryColor: '#7C3AED',
    description: 'Foundational certification on LLM concepts, architectures, capabilities, and practical applications in AI.',
    emoji: '🧠',
    skills: ['LLMs', 'Generative AI', 'PaLM', 'Bard'],
  },
  {
    id: 6,
    title: 'Google Cloud Fundamentals',
    issuer: 'Google Cloud',
    category: 'Cloud',
    categoryColor: '#10B981',
    description: 'Foundational certification covering core Google Cloud services, architecture, and cloud computing principles.',
    emoji: '☁️',
    skills: ['Google Cloud', 'GCP', 'Cloud Architecture', 'BigQuery'],
  },
];

const categories = ['All', 'Development', 'AI / ML', 'Cloud'];

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<typeof certificates[0] | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [selected]);

  const filtered = certificates.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="certificates" style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 }}
        >
          <div className="section-label">Certifications</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-1.5px',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 32,
          }}>
            Credentials & <span className="gradient-text">Achievements</span>
          </h2>

          {/* Search + filter row */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 320 }}>
              <Search size={15} style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--muted)',
              }} />
              <input
                className="form-input"
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 40 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button key={c} className={`filter-btn ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>{c}</button>
              ))}
            </div>
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="cert-card"
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                onClick={() => setSelected(cert)}
                onKeyDown={event => {
                  if (event.target !== event.currentTarget) return;
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelected(cert);
                  }
                }}
              >
                <div style={{
                  height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, ${cert.categoryColor}15, ${cert.categoryColor}08)`,
                  borderBottom: '1px solid var(--border)', position: 'relative',
                }}>
                  <span style={{ fontSize: 48 }}>{cert.emoji}</span>
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    padding: '3px 10px', borderRadius: 100,
                    background: `${cert.categoryColor}20`,
                    border: `1px solid ${cert.categoryColor}40`,
                    fontSize: 11, fontWeight: 600, color: cert.categoryColor,
                  }}>{cert.category}</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Award size={18} color={cert.categoryColor} style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>{cert.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--muted)' }}>{cert.issuer}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-content"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-dialog-title"
              tabIndex={-1}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close certificate details"
                style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                  borderRadius: 8, width: 32, height: 32, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted)',
                }}
              >
                <X size={16} />
              </button>

              <span style={{ fontSize: 56, display: 'block', marginBottom: 20 }}>{selected.emoji}</span>
              <span style={{
                display: 'inline-block', padding: '4px 12px', borderRadius: 100, marginBottom: 16,
                background: `${selected.categoryColor}20`, border: `1px solid ${selected.categoryColor}40`,
                fontSize: 12, fontWeight: 600, color: selected.categoryColor,
              }}>{selected.category}</span>

              <h3 id="certificate-dialog-title" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{selected.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--accent)', marginBottom: 20, fontWeight: 500 }}>{selected.issuer}</p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 24 }}>{selected.description}</p>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>
                  Skills Covered
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {selected.skills.map(s => (
                    <span key={s} style={{
                      padding: '6px 14px', borderRadius: 100,
                      background: `${selected.categoryColor}15`,
                      border: `1px solid ${selected.categoryColor}30`,
                      fontSize: 13, fontWeight: 500, color: 'var(--text)',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
