'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const projects = [
  {
    id: 1,
    title: 'Shri Multy Service',
    category: 'Web & Mobile',
    tags: ['Web', 'Mobile'],
    description: 'Official business website and Android application developed to improve customer engagement, business accessibility, and operations.',
    fullDescription: 'Developed comprehensive digital solutions for Shri Multy Service including an official responsive business website and a customer engagement Android application. The project improved business visibility, customer communication, and operational efficiency through modern web technologies.',
    tech: ['React.js', 'Firebase', 'Node.js', 'Android'],
    github: 'https://github.com/atharvshish13/Shrimultyservices.co.in',
    status: 'Completed',
    statusColor: '#10B981',
    featured: true,
    emoji: '🏢',
  },
  {
    id: 2,
    title: 'Campus Nest',
    category: 'Web App',
    tags: ['Web'],
    description: 'Smart Academic Guidance & Student Support Platform designed to improve campus accessibility, academic guidance, communication, and student services.',
    fullDescription: 'A student-focused platform designed to improve campus accessibility, academic guidance, communication, and student support services. Campus Nest centralizes academic resources, campus navigation, and student communication channels in one unified platform.',
    tech: ['React.js', 'Node.js', 'Firebase'],
    github: null,
    status: 'Completed',
    statusColor: '#10B981',
    featured: true,
    emoji: '🎓',
  },
  {
    id: 3,
    title: 'Drishti Setu',
    category: 'AI / ML',
    tags: ['AI', 'ML'],
    description: 'AI-Powered Landslide Detection System focused on intelligent landslide detection and early identification of potential environmental risks.',
    fullDescription: 'An AI-based environmental monitoring project focused on intelligent landslide detection. Drishti Setu uses computer vision and machine learning models to analyze terrain data and environmental indicators to identify potential landslide risks before they occur, enabling early warning systems.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'AI/ML'],
    github: null,
    status: 'Completed',
    statusColor: '#10B981',
    featured: true,
    emoji: '🛡️',
  },
  {
    id: 4,
    title: 'MJ Assistant',
    category: 'AI / ML',
    tags: ['AI', 'ML'],
    description: 'AI-Powered Personal Assistant integrating AI models, voice interaction, wake-word activation, and automation capabilities.',
    fullDescription: 'A personal desktop assistant that integrates advanced AI models for natural conversation, voice interaction with wake-word activation, and automation of routine tasks. MJ Assistant can process commands, answer queries, control system functions, and automate workflows intelligently.',
    tech: ['Python', 'AI Models', 'Speech Recognition', 'Automation'],
    github: null,
    status: 'In Development',
    statusColor: '#F59E0B',
    featured: false,
    emoji: '🤖',
  },
];

const filters = ['All', 'Web', 'Mobile', 'AI', 'ML'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 }}
        >
          <div className="section-label">Featured Projects</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-1.5px',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 32,
          }}>
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>

          {/* Filter buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="project-card"
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                {/* Project header image area */}
                <div style={{
                  height: 180,
                  background: `linear-gradient(135deg, #0a0a1a, #0f1535)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.1))',
                  }} />
                  <span style={{ fontSize: 64, zIndex: 1 }}>{project.emoji}</span>
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    padding: '4px 10px', borderRadius: 100,
                    background: `${project.statusColor}20`,
                    border: `1px solid ${project.statusColor}40`,
                    fontSize: 11, fontWeight: 600, color: project.statusColor,
                  }}>{project.status}</div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {project.category}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{project.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)', marginBottom: 20 }}>{project.description}</p>

                  {/* Tech stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {project.tech.map(t => (
                      <span key={t} style={{
                        padding: '4px 10px', borderRadius: 100,
                        background: 'rgba(37,99,235,0.1)',
                        border: '1px solid rgba(37,99,235,0.2)',
                        fontSize: 11, fontWeight: 500, color: '#38BDF8',
                      }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ color: 'var(--muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                        aria-label="GitHub"
                      >
                        <GithubIcon size={18} />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      style={{
                        marginLeft: 'auto',
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 13, fontWeight: 600, color: 'var(--accent)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'rgba(255,255,255,0.08)', border: 'none',
                  borderRadius: 8, width: 32, height: 32, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--muted)',
                }}
              >
                <X size={16} />
              </button>

              <span style={{ fontSize: 56, display: 'block', marginBottom: 20 }}>{selectedProject.emoji}</span>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                {selectedProject.category}
              </div>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>
                {selectedProject.title}
              </h3>
              <span style={{
                display: 'inline-block', padding: '5px 14px', borderRadius: 100,
                background: `${selectedProject.statusColor}20`,
                border: `1px solid ${selectedProject.statusColor}40`,
                fontSize: 12, fontWeight: 600, color: selectedProject.statusColor, marginBottom: 20,
              }}>{selectedProject.status}</span>

              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 24 }}>
                {selectedProject.fullDescription}
              </p>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>
                  Technology Stack
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {selectedProject.tech.map(t => (
                    <span key={t} style={{
                      padding: '6px 14px', borderRadius: 100,
                      background: 'rgba(37,99,235,0.1)',
                      border: '1px solid rgba(37,99,235,0.3)',
                      fontSize: 13, fontWeight: 500, color: '#38BDF8',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <GithubIcon size={16} /> <span>View on GitHub</span> <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
