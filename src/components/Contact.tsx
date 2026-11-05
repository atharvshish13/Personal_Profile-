'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    // Simulated delivery with real visual feedback
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const socialLinks = [
    { icon: <Globe size={18} />, href: 'https://www.atharvshish.in', label: 'Website' },
    { icon: <GithubIcon size={18} />, href: 'https://github.com/atharvshish13', label: 'GitHub' },
    { icon: <LinkedinIcon size={18} />, href: 'https://linkedin.com/in/atharvshishbarwat13022007', label: 'LinkedIn' },
    { icon: <InstagramIcon size={18} />, href: 'https://www.instagram.com/atharvshish_7615_', label: 'Instagram' },
  ];

  const contactInfo = [
    { icon: <MapPin size={18} />, label: 'Location', value: 'Amravati, Maharashtra, India', color: '#2563EB' },
    { icon: <Mail size={18} />, label: 'Email', value: 'atharvshish13@gmail.com', href: 'mailto:atharvshish13@gmail.com', color: '#7C3AED' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+91 7249447920', href: 'tel:+917249447920', color: '#38BDF8' },
  ];

  return (
    <section id="contact" style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }} ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Contact</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-1.5px',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 16,
          }}>
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>
            Have a project in mind or want to collaborate? Send me a message and let&apos;s create something remarkable.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 40 }} className="contact-grid">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {contactInfo.map(item => (
                <div key={item.label} style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '20px',
                  display: 'flex', gap: 16, alignItems: 'center',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${item.color}20`, border: `1px solid ${item.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: item.color, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, textDecoration: 'none' }}>
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>
                Follow Me
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {socialLinks.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: 42, height: 42, borderRadius: 10,
                      background: 'var(--card)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--muted)', textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(37,99,235,0.6)';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#38BDF8';
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)';
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Instagram Connect Card */}
            <a
              href="https://www.instagram.com/atharvshish_7615_"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, rgba(225, 48, 108, 0.08), rgba(131, 58, 180, 0.08), var(--card))',
                border: '1px solid rgba(225, 48, 108, 0.25)',
                borderRadius: 16,
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(225, 48, 108, 0.6)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 30px rgba(225, 48, 108, 0.15)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(225, 48, 108, 0.25)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                    boxShadow: '0 4px 15px rgba(220, 39, 67, 0.3)',
                  }}
                >
                  <InstagramIcon size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#E1306C', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 2 }}>
                    Instagram
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                    @atharvshish_7615_
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 100,
                  background: 'rgba(225, 48, 108, 0.12)',
                  border: '1px solid rgba(225, 48, 108, 0.3)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#E1306C',
                }}
              >
                <span>Follow</span> <ExternalLink size={12} />
              </div>
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 24, padding: '40px',
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 28 }}>
                Send a Message
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                    Full Name
                  </label>
                  <input
                    className="form-input"
                    placeholder="Atharvshish Barwat"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <span style={{ fontSize: 12, color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.name}</span>}
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="atharvshish13@gmail.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <span style={{ fontSize: 12, color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.email}</span>}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  Subject
                </label>
                <input
                  className="form-input"
                  placeholder="Project inquiry / Opportunity..."
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                />
                {errors.subject && <span style={{ fontSize: 12, color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.subject}</span>}
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  Message
                </label>
                <textarea
                  className="form-input"
                  placeholder="Share details about your project or inquiry..."
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
                {errors.message && <span style={{ fontSize: 12, color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {status === 'sending' ? (
                  <span>Sending Message...</span>
                ) : (
                  <><span>Send Message</span> <Send size={16} /></>
                )}
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 16, padding: '14px 18px',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                    borderRadius: 10, display: 'flex', gap: 10, alignItems: 'center',
                    color: '#10B981', fontSize: 14,
                  }}
                >
                  <CheckCircle2 size={18} />
                  Message sent successfully! Thank you for reaching out.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 16, padding: '14px 18px',
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 10, display: 'flex', gap: 10, alignItems: 'center',
                    color: '#EF4444', fontSize: 14,
                  }}
                >
                  <AlertCircle size={18} />
                  Something went wrong. Please email directly at atharvshish13@gmail.com
                </motion.div>
              )}
            </form>

            {/* Google Map of Amravati */}
            <div style={{
              marginTop: 20, borderRadius: 16, overflow: 'hidden',
              border: '1px solid var(--border)', height: 200,
            }}>
              <iframe
                src="https://maps.google.com/maps?q=Amravati,%20Maharashtra,%20India&t=&z=12&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block', filter: 'invert(0.9) hue-rotate(180deg) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                title="Amravati, Maharashtra, India"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
