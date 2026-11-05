'use client';
import { Globe, Mail, Heart } from 'lucide-react';
import Image from 'next/image';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

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

const socials = [
  { icon: <GithubIcon size={18} />, href: 'https://github.com/atharvshish13', label: 'GitHub' },
  { icon: <LinkedinIcon size={18} />, href: 'https://linkedin.com/in/atharvshishbarwat13022007', label: 'LinkedIn' },
  { icon: <InstagramIcon size={18} />, href: 'https://www.instagram.com/atharvshish_7615_', label: 'Instagram' },
  { icon: <Globe size={18} />, href: 'https://www.atharvshish.in', label: 'Website' },
  { icon: <Mail size={18} />, href: 'mailto:atharvshish13@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#030303',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '70px 24px 36px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-grid">
          {/* Brand Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                position: 'relative',
                width: 48, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Image
                  src="/logo-transparent.png"
                  alt="Atharvshish Barwat Monogram Logo"
                  width={48}
                  height={36}
                  style={{
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#FFFFFF', letterSpacing: '-0.3px' }}>ATHARVSHISH BARWAT</div>
                <div style={{ fontSize: 12, color: '#38BDF8', fontWeight: 500, marginTop: 2 }}>Full Stack Developer | AI &amp; ML Student</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.8, maxWidth: 320 }}>
              &ldquo;Dream. Build. Create The Future.&rdquo;
            </p>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, maxWidth: 320, marginTop: 8 }}>
              Engineering modern digital experiences, intelligent applications, and scalable software solutions.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 20 }}>
              Navigation
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {navLinks.map(l => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', padding: 0,
                    fontSize: 14, color: '#94A3B8', fontFamily: 'inherit',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.target as HTMLButtonElement).style.color = '#38BDF8'; }}
                  onMouseLeave={e => { (e.target as HTMLButtonElement).style.color = '#94A3B8'; }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Presence */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 20 }}>
              Connect &amp; Socials
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontSize: 14, color: '#94A3B8', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#38BDF8';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
                  }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle separator */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

        {/* Footer legal & copyright */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#64748B' }}>
            © 2026 Atharvshish Barwat. All Rights Reserved.
          </span>
          <span style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
            Designed with precision &bull; Built with Next.js &amp; Tailwind
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
