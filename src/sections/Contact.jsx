import { useEffect, useRef } from 'react';
import { Mail, Phone, GitFork, Globe, ArrowRight, MapPin } from 'lucide-react';
import { personal } from '../data/portfolio';

const contactItems = [
  { id: 'contact-email',    icon: Mail,    label: 'Email',    value: personal.email,                          href: `mailto:${personal.email}`,                      color: 'gold',   hex: '#f0c060' },
  { id: 'contact-phone',    icon: Phone,   label: 'Phone',    value: personal.phone,                          href: `tel:${personal.phone.replace(/\s/g, '')}`,       color: 'teal',   hex: '#34d399' },
  { id: 'contact-linkedin', icon: Globe,   label: 'LinkedIn', value: personal.linkedinHandle,                 href: personal.linkedin,  external: true,               color: 'blue',   hex: '#60a5fa' },
  { id: 'contact-github',   icon: GitFork, label: 'GitHub',   value: `github.com/${personal.githubHandle}`,  href: personal.github,    external: true,               color: 'purple', hex: '#a78bfa' },
];

function ContactRow({ item, index }) {
  const ref = useRef(null);
  const Icon = item.icon;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        }, index * 90);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <a
      ref={ref}
      href={item.href}
      id={item.id}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      className={`contact-row contact-row-${item.color}`}
      style={{
        opacity: 0,
        transform: 'translateX(-16px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease, background-color 0.2s ease, border-color 0.2s ease',
        display: 'flex', alignItems: 'center', gap: '18px',
        padding: '18px 22px',
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        textDecoration: 'none',
        cursor: 'none',
        willChange: 'transform',
      }}
    >
      <div className={`contact-icon-box contact-icon-${item.color}`} style={{
        width: '42px', height: '42px',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        color: item.hex,
      }}>
        <Icon size={17} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem', textTransform: 'uppercase',
          letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '3px',
        }}>
          {item.label}
        </div>
        <div style={{
          fontSize: '0.88rem', color: 'var(--text)',
          fontWeight: 500, overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {item.value}
        </div>
      </div>

      <ArrowRight size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} className="contact-arrow" />
    </a>
  );
}

export default function Contact() {
  const leftRef = useRef(null);

  useEffect(() => {
    const el = leftRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'; el.style.transform = 'translateY(0)';
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" style={{ padding: '96px 0', background: 'var(--bg)' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(240,192,96,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="contact-grid">

          {/* Left */}
          <div ref={leftRef} style={{
            opacity: 0, transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <div className="section-eyebrow" style={{ marginBottom: '14px' }}>Get In Touch</div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(1.9rem, 3vw, 2.7rem)',
              fontWeight: 800, color: 'var(--text)', lineHeight: 1.15, marginBottom: '18px',
            }}>
              Let's build something{' '}
              <span className="gradient-text">great</span> together
            </h2>

            <p style={{
              fontSize: '0.92rem', lineHeight: 1.8,
              color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '370px',
            }}>
              Interested in collaborating, hiring, or just having a conversation about tech? I'm always open to new opportunities.
            </p>

            {/* Availability */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              padding: '9px 18px',
              background: 'rgba(52,211,153,0.06)',
              border: '1px solid rgba(52,211,153,0.2)',
              borderRadius: '100px', marginBottom: '24px',
            }}>
              <div className="avail-dot" />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem', color: 'var(--teal)', letterSpacing: '0.1em',
              }}>
                Currently available for projects
              </span>
            </div>

            {/* Location */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '36px',
            }}>
              <MapPin size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span>India · Open to Remote / Relocation</span>
            </div>

            {/* CTA */}
            <a
              href={`mailto:${personal.email}`}
              id="cta-email"
              className="contact-cta"
            >
              <Mail size={16} />
              Say Hello 👋
            </a>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {contactItems.map((item, i) => (
              <ContactRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          gap: 72px; align-items: start;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        /* Contact row hover via CSS */
        .contact-row:hover {
          transform: translateX(5px) !important;
        }
        .contact-row-gold:hover   { background: rgba(240,192,96,0.05) !important; border-color: rgba(240,192,96,0.25) !important; }
        .contact-row-teal:hover   { background: rgba(52,211,153,0.05) !important; border-color: rgba(52,211,153,0.25) !important; }
        .contact-row-blue:hover   { background: rgba(96,165,250,0.05) !important; border-color: rgba(96,165,250,0.25) !important; }
        .contact-row-purple:hover { background: rgba(167,139,250,0.05)!important; border-color: rgba(167,139,250,0.25)!important; }
        .contact-row:hover .contact-arrow { color: var(--gold); }

        /* Icon boxes */
        .contact-icon-gold   { background: rgba(240,192,96,0.1);  border: 1px solid rgba(240,192,96,0.2); }
        .contact-icon-teal   { background: rgba(52,211,153,0.1);  border: 1px solid rgba(52,211,153,0.2); }
        .contact-icon-blue   { background: rgba(96,165,250,0.1);  border: 1px solid rgba(96,165,250,0.2); }
        .contact-icon-purple { background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.2); }

        /* CTA button */
        .contact-cta {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 28px;
          background: var(--gold); color: #07080f;
          border-radius: 10px; font-family: 'Inter', sans-serif;
          font-size: 0.88rem; font-weight: 700; text-decoration: none;
          cursor: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          will-change: transform;
        }
        .contact-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(240,192,96,0.3);
        }
        [data-theme="light"] .contact-cta { color: #1a1100; }
      `}</style>
    </section>
  );
}
