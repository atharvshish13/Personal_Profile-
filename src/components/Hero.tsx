'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Globe, ArrowDown, Download, ChevronRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

const roles = [
  'Full Stack Developer',
  'AI & ML Student',
  'React Developer',
  'Android Developer',
  'Problem Solver',
  'Tech Innovator',
];

const socialLinks = [
  { icon: Globe, href: 'https://www.atharvshish.in', label: 'Website' },
  { icon: GithubIcon, href: 'https://github.com/atharvshish13', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/atharvshishbarwat13022007', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/atharvshish_7615_', label: 'Instagram' },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Subtle interactive background particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }> = [];
    const colors = ['#2563EB', '#7C3AED', '#38BDF8', '#60A5FA'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#2563EB';
            ctx.globalAlpha = (1 - dist / 110) * 0.08;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Smooth typing effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? current.slice(0, displayText.length - 1)
            : current.slice(0, displayText.length + 1)
        );
      }, isDeleting ? 45 : 75);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Parallax tracking
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: '#050505',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {/* Canvas for fine digital particles */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      {/* Subtle fine tech grid */}
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.35 }} />

      {/* Atmospheric lighting glows */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(124,58,237,0.1) 50%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main split-screen hero container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1240,
          margin: '0 auto',
          padding: '130px 24px 80px',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 50,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* LEFT SIDE: Brand & Editorial details */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 16 }}
          >
            <div className="section-label">HELLO, I&apos;M</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: 16 }}
          >
            <h1
              style={{
                fontSize: 'clamp(44px, 6.2vw, 78px)',
                fontWeight: 900,
                lineHeight: 0.96,
                letterSpacing: '-2px',
                color: '#FFFFFF',
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              ATHARVSHISH
            </h1>
            <h1
              className="gradient-text"
              style={{
                fontSize: 'clamp(44px, 6.2vw, 78px)',
                fontWeight: 900,
                lineHeight: 0.96,
                letterSpacing: '-2px',
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              BARWAT
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: '#E2E8F0',
              marginBottom: 10,
            }}
          >
            Full Stack Developer | AI &amp; ML Student
          </motion.div>

          {/* Animated dynamic roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: 'var(--muted)',
              marginBottom: 20,
              minHeight: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: 'var(--muted)' }}>Expertise:</span>
            <span style={{ color: '#38BDF8', fontWeight: 600 }}>
              {displayText}
              <span className="type-cursor">|</span>
            </span>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: '#94A3B8',
              maxWidth: 520,
              marginBottom: 16,
            }}
          >
            I build modern digital experiences, intelligent applications, and innovative software
            solutions that connect technology with real-world impact.
          </motion.p>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#38BDF8',
              textTransform: 'uppercase',
              marginBottom: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #2563EB, #38BDF8)' }} />
            Dream. Build. Create The Future.
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}
          >
            <a
              href="#projects"
              className="btn-primary"
              onClick={e => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore My Work</span> <ChevronRight size={16} />
            </a>
            <a href="/Atharvshish_Barwat_Resume.pdf" download className="btn-secondary">
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onClick={e => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Let&apos;s Connect
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: 12 }}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94A3B8',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(56,189,248,0.6)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#38BDF8';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37,99,235,0.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE: Real Cinematic Profile Photograph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        >
          {/* Subtle rotating cybernetic glow ring */}
          <div
            style={{
              position: 'absolute',
              width: 460,
              height: 460,
              borderRadius: '50%',
              border: '1px dashed rgba(56,189,248,0.22)',
              animation: 'spin-slow 35s linear infinite',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              borderRadius: '50%',
              border: '1px solid rgba(124,58,237,0.18)',
              animation: 'spin-slow 28s linear infinite reverse',
              pointerEvents: 'none',
            }}
          />

          {/* Deep blue/cyan rim glow */}
          <div
            style={{
              position: 'absolute',
              width: 340,
              height: 380,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(56,189,248,0.18) 50%, transparent 75%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          {/* Portrait Container with photographic grading & rim lighting */}
          <div
            style={{
              position: 'relative',
              width: 390,
              height: 500,
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow:
                '0 0 50px rgba(37,99,235,0.35), 0 0 100px rgba(56,189,248,0.18), 0 30px 60px rgba(0,0,0,0.85)',
              border: '1px solid rgba(56,189,248,0.25)',
              background: '#0a0a0a',
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Atharvshish Barwat — Full Stack Developer & AI ML Student"
              fill
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center 15%',
              }}
            />

            {/* Seamless cinematic gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.2) 30%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />

            {/* Cyan rim light accent */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                boxShadow: 'inset 0 0 35px rgba(56,189,248,0.2)',
                pointerEvents: 'none',
              }}
            />

            {/* Real status indicator badge on photo */}
            <div
              style={{
                position: 'absolute',
                bottom: 18,
                left: 18,
                right: 18,
                padding: '12px 16px',
                borderRadius: 14,
                background: 'rgba(5,5,5,0.8)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Atharvshish Barwat</div>
                <div style={{ fontSize: 11, color: '#38BDF8', fontWeight: 500 }}>
                  CSE (AI &amp; ML) · B.Tech
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 100,
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#10B981',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#10B981',
                    boxShadow: '0 0 8px #10B981',
                  }}
                />
                Available
              </div>
            </div>
          </div>

          {/* Floating interactive cyber cards */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '12%',
              right: '-6%',
              background: 'rgba(10,15,30,0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56,189,248,0.3)',
              borderRadius: 14,
              padding: '10px 16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>⚡</span>
            <div>
              <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Focus</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#38BDF8' }}>Full Stack &amp; AI</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '22%',
              left: '-8%',
              background: 'rgba(15,10,30,0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 14,
              padding: '10px 16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 16 }}>🤖</span>
            <div>
              <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Models</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#C084FC' }}>LLMs &amp; Transformers</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic scroll down cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          color: '#64748B',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Explore</span>
        <ArrowDown size={14} color="#38BDF8" />
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding-top: 110px !important;
          }
          .hero-grid > div:last-child {
            margin-top: 30px;
          }
          .hero-grid > div:first-child > div:last-of-type {
            justify-content: center;
          }
          .hero-grid > div:first-child > div:nth-last-of-type(2) {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
