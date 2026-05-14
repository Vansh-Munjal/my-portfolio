import { useEffect, useState } from 'react';
import { GitFork, Globe, Mail, ArrowUpRight } from 'lucide-react';
import { personal } from '../data/portfolio';

const roles = [
  'Full-Stack Developer',
  'AI / ML Engineer',
  'FastAPI Specialist',
  'React Developer',
];

function TypewriterText() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text === '') {
      setDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, deleting ? 48 : 85);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <span style={{ color: 'var(--blue)' }}>
      {text}
      <span className="typewriter-cursor" />
    </span>
  );
}

/* Static particles — no JS loop, pure CSS animation */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 5 + (i * 8.5) % 90,
  y: 5 + (i * 11.3) % 85,
  size: (i % 2) + 1,
  delay: (i * 0.7).toFixed(1),
  duration: (8 + (i % 5)).toFixed(1),
}));

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const animStyle = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
  });

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Grid background — pure CSS, no JS */}
      <div className="hero-grid-bg" style={{ position: 'absolute', inset: 0 }} />

      {/* Soft radial glows — static, no animation */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 55% 50% at 72% 48%, rgba(96,165,250,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 20% 70%, rgba(240,192,96,0.04) 0%, transparent 65%)
        `,
      }} />

      {/* Lightweight particles — CSS animation only */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="float-anim"
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: 'rgba(240,192,96,0.35)',
              borderRadius: '50%',
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div
        className="max-w-6xl mx-auto px-6 w-full"
        style={{ paddingTop: '100px', paddingBottom: '80px' }}
      >
        <div className="hero-grid-layout">

          {/* ── LEFT: Text ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>

            {/* Available badge */}
            <div style={animStyle(0.1)}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.2)',
                borderRadius: '100px',
                padding: '6px 16px 6px 10px',
              }}>
                <div className="avail-dot" />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.68rem',
                  color: 'var(--teal)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Available for work
                </span>
              </div>
            </div>

            {/* Name */}
            <div style={animStyle(0.22)}>
              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                color: 'var(--text)',
              }}>
                Vansh<br />
                <span className="gradient-text">Munjal</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div style={{ ...animStyle(0.38), minHeight: '32px' }}>
              <p style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                fontWeight: 600,
              }}>
                <TypewriterText />
              </p>
            </div>

            {/* Description */}
            <div style={animStyle(0.52)}>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'var(--text-dim)',
                maxWidth: '500px',
              }}>
                {personal.tagline}
              </p>
            </div>

            {/* CTAs */}
            <div style={{ ...animStyle(0.65), display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={scrollToProjects}
                id="hero-view-projects"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 26px',
                  background: 'var(--gold)',
                  color: '#07080f',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'none',
                  letterSpacing: '0.02em',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  willChange: 'transform',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(240,192,96,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View Projects
                <ArrowUpRight size={15} />
              </button>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-github-link"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 26px',
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  cursor: 'none',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(240,192,96,0.35)';
                  e.currentTarget.style.background = 'rgba(240,192,96,0.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <GitFork size={15} />
                GitHub
              </a>
            </div>

            {/* Stats */}
            <div style={{ ...animStyle(0.8), display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
              {personal.stats.map((s) => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '1.9rem',
                    fontWeight: 800,
                    color: 'var(--text)',
                    lineHeight: 1,
                  }}>
                    {s.value}<span style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>{s.suffix}</span>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.62rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ ...animStyle(0.95), display: 'flex', gap: '10px' }}>
              {[
                { icon: GitFork, href: personal.github, label: 'GitHub', id: 'social-github' },
                { icon: Globe, href: personal.linkedin, label: 'LinkedIn', id: 'social-linkedin' },
                { icon: Mail, href: `mailto:${personal.email}`, label: 'Email', id: 'social-email' },
              ].map(({ icon: Icon, href, label, id }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  id={id}
                  aria-label={label}
                  style={{
                    width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
                    willChange: 'transform',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(240,192,96,0.3)';
                    e.currentTarget.style.color = 'var(--gold)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Profile visual ── */}
          <div style={{ ...animStyle(0.5), display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '300px', height: '360px' }}>

              {/* Orbit rings — GPU transform via className */}
              <div
                className="orbit"
                style={{
                  position: 'absolute',
                  inset: '-36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(240,192,96,0.12)',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-5px', left: '50%',
                  width: '9px', height: '9px',
                  background: 'var(--gold)',
                  borderRadius: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 10px rgba(240,192,96,0.5)',
                }} />
              </div>
              <div
                className="orbit-reverse"
                style={{
                  position: 'absolute',
                  inset: '-64px',
                  borderRadius: '50%',
                  border: '1px solid rgba(96,165,250,0.07)',
                }}
              >
                <div style={{
                  position: 'absolute',
                  bottom: '-4px', right: '28%',
                  width: '7px', height: '7px',
                  background: 'var(--blue)',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px rgba(96,165,250,0.5)',
                }} />
              </div>

              {/* Photo */}
              <div
                className="glow-gold"
                style={{
                  width: '100%', height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <img
                  src={personal.photo}
                  alt="Vansh Munjal"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.05) saturate(0.85)',
                    transition: 'filter 0.4s ease, transform 0.4s ease',
                    willChange: 'transform',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.filter = 'contrast(1) saturate(1)';
                    e.currentTarget.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.filter = 'contrast(1.05) saturate(0.85)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(7,8,15,0.5) 0%, transparent 55%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Floating tags */}
              {[
                { text: '⚡ FastAPI', top: '8%', right: '-22%', delay: '0s' },
                { text: '🧠 ML / AI', bottom: '28%', left: '-24%', delay: '2s' },
                { text: '⚛ React', bottom: '10%', right: '-20%', delay: '3.5s' },
              ].map((tag) => (
                <div
                  key={tag.text}
                  className="float-anim"
                  style={{
                    position: 'absolute',
                    top: tag.top, bottom: tag.bottom,
                    left: tag.left, right: tag.right,
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border)',
                    padding: '7px 13px',
                    borderRadius: '8px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    whiteSpace: 'nowrap',
                    animationDelay: tag.delay,
                    display: 'none', // shown by media query below
                  }}
                  className="float-anim hero-float-tag"
                />
              ))}

              {/* Gold corner accent */}
              <div style={{
                position: 'absolute',
                bottom: '-10px', right: '-10px',
                width: '56px', height: '56px',
                border: '2px solid rgba(240,192,96,0.35)',
                borderRadius: '8px',
                zIndex: -1,
              }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          ...animStyle(1.1),
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
          className="scroll-hint-wrapper"
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <div
            className="float-anim"
            style={{
              width: '1px', height: '44px',
              background: 'linear-gradient(to bottom, var(--gold), transparent)',
            }}
          />
        </div>
      </div>

      <style>{`
        .hero-grid-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 72px;
          align-items: center;
        }
        .hero-float-tag { display: block !important; }

        @media (max-width: 768px) {
          .hero-grid-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-float-tag { display: none !important; }
          .scroll-hint-wrapper { display: none !important; }
        }
      `}</style>
    </section>
  );
}
