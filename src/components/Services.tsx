'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Smartphone, Layers, Brain, Zap, Settings, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Globe size={28} />,
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with the latest technologies. Fast, accessible, and SEO-optimized.',
    color: '#2563EB',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Android App Development',
    description: 'Native Android applications with clean UI/UX, smooth performance, and robust backend integration using modern Android development practices.',
    color: '#10B981',
    tags: ['Android Studio', 'Kotlin', 'Java'],
  },
  {
    icon: <Layers size={28} />,
    title: 'Full Stack Development',
    description: 'End-to-end application development from frontend design to backend APIs, database design, and cloud deployment.',
    color: '#7C3AED',
    tags: ['MERN Stack', 'Node.js', 'Firebase'],
  },
  {
    icon: <Brain size={28} />,
    title: 'AI-Powered Solutions',
    description: 'Intelligent systems integrating machine learning models, NLP, computer vision, and generative AI into practical applications.',
    color: '#38BDF8',
    tags: ['Python', 'TensorFlow', 'LLMs'],
  },
  {
    icon: <Zap size={28} />,
    title: 'API Integration',
    description: 'Seamless integration of third-party APIs, RESTful services, and microservices architecture to extend application capabilities.',
    color: '#F59E0B',
    tags: ['REST APIs', 'GraphQL', 'Webhooks'],
  },
  {
    icon: <Settings size={28} />,
    title: 'Business Automation',
    description: 'Streamline business processes with custom automation solutions, workflow optimization, and AI-powered tools to boost efficiency.',
    color: '#EC4899',
    tags: ['Process Automation', 'Scripting', 'AI Tools'],
  },
];

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" style={{ background: 'var(--bg-secondary)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Services</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-1.5px',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 16,
          }}>
            What I Can <span className="gradient-text">Build For You</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
            From concept to deployment — I deliver end-to-end digital solutions tailored to your needs.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="service-card"
              style={{ cursor: 'default' }}
              whileHover={{ y: -6 }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: `${service.color}20`,
                border: `1px solid ${service.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: service.color, marginBottom: 20,
              }}>
                {service.icon}
              </div>

              <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
                {service.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 20 }}>
                {service.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {service.tags.map(t => (
                  <span key={t} style={{
                    padding: '4px 10px', borderRadius: 100,
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                    fontSize: 11, fontWeight: 600, color: service.color,
                  }}>{t}</span>
                ))}
              </div>

              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 600, color: service.color,
                  textDecoration: 'none', transition: 'gap 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '10px'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '6px'; }}
              >
                Get In Touch <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

