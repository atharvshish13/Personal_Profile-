'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, width: 'calc(100% - 48px)', maxWidth: 1100,
          borderRadius: 16,
          background: scrolled
            ? theme === 'dark' ? 'rgba(5,5,5,0.9)' : 'rgba(255,255,255,0.9)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          transition: 'all 0.4s ease',
          padding: '12px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={e => { e.preventDefault(); scrollTo('#home'); }}
          whileHover={{ scale: 1.05 }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: 'white', letterSpacing: '-0.5px',
          }}>AB</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', letterSpacing: '-0.3px' }}>
            Atharvshish
          </span>
        </motion.a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '7px 14px', borderRadius: 8,
                fontSize: 13, fontWeight: 500,
                color: active === link.href.slice(1) ? 'var(--accent)' : 'var(--muted)',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if (active !== link.href.slice(1)) (e.target as HTMLButtonElement).style.color = 'var(--text)'; }}
              onMouseLeave={e => { if (active !== link.href.slice(1)) (e.target as HTMLButtonElement).style.color = 'var(--muted)'; }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--muted)', transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="/Atharvshish_Barwat_Resume.pdf"
            download
            className="hidden-mobile"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 8,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              color: 'white', textDecoration: 'none',
              fontSize: 13, fontWeight: 600, transition: 'all 0.2s ease',
            }}
          >
            <Download size={14} /> Resume
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile"
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, width: 36, height: 36,
              display: 'none', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text)',
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(5,5,5,0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 999, display: 'flex',
              flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 24,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 24, fontWeight: 600, color: 'var(--text)',
                  fontFamily: 'inherit', transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href="/Atharvshish_Barwat_Resume.pdf"
              download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 10,
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                color: 'white', textDecoration: 'none',
                fontSize: 16, fontWeight: 600,
              }}
            >
              <Download size={16} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}

