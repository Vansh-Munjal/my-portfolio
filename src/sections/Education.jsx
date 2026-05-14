import { useEffect, useRef } from 'react';
import { education } from '../data/portfolio';

const colorMap = {
  gold: { accent: '#f0c060', bg: 'rgba(240,192,96,0.07)', border: 'rgba(240,192,96,0.2)' },
  blue: { accent: '#60a5fa', bg: 'rgba(96,165,250,0.07)', border: 'rgba(96,165,250,0.2)' },
};

function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

function TimelineCard({ item, index }) {
  const ref = useReveal(index * 130);
  const c = colorMap[item.color || 'gold'];

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateX(-20px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
        display: 'flex', gap: '20px', alignItems: 'flex-start',
        marginBottom: '24px',
      }}
    >
      {/* Icon column */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '6px' }}>
        <div style={{
          width: '46px', height: '46px',
          background: c.bg, border: `1px solid ${c.border}`,
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', flexShrink: 0,
        }}>
          {item.icon}
        </div>
        {index < education.length - 1 && (
          <div style={{
            width: '1px', flex: 1, marginTop: '10px', minHeight: '36px',
            background: `linear-gradient(to bottom, ${c.accent}50, transparent)`,
          }} />
        )}
      </div>

      {/* Card */}
      <div
        className="edu-card"
        style={{
          flex: 1,
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
          willChange: 'transform',
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, ${c.accent}, transparent)`,
        }} />

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.62rem', color: c.accent,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: '10px',
          display: 'flex', alignItems: 'center', gap: '7px',
        }}>
          <div style={{ width: '5px', height: '5px', background: c.accent, borderRadius: '50%' }} />
          {item.period}
        </div>

        <h3 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.05rem', fontWeight: 700,
          color: 'var(--text)', marginBottom: '5px',
        }}>
          {item.degree}
        </h3>

        <div style={{
          fontSize: '0.86rem', color: c.accent,
          fontWeight: 500, marginBottom: '10px',
        }}>
          {item.school}
        </div>

        <p style={{ fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
          {item.detail}
        </p>

        {item.badge && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            marginTop: '14px', padding: '4px 12px',
            background: 'rgba(240,192,96,0.08)',
            border: '1px solid rgba(240,192,96,0.22)',
            borderRadius: '100px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--gold)',
          }}>
            🏆 {item.badge}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
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

  const achievements = [
    { icon: '🏆', label: "Dean's List", detail: '2× consecutive semesters' },
    { icon: '⭐', label: '9.2 CGPA', detail: 'B.Tech Computer Science' },
    { icon: '🚀', label: '6+ Projects', detail: 'Full-Stack & AI/ML' },
    { icon: '💻', label: 'Open Source', detail: 'Active on GitHub' },
  ];

  return (
    <section id="education" style={{ padding: '96px 0', background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-6">

        <div ref={titleRef} style={{
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          marginBottom: '48px',
        }}>
          <div className="section-eyebrow" style={{ marginBottom: '14px' }}>Background</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
            fontWeight: 800, color: 'var(--text)', lineHeight: 1.1,
          }}>
            Academic <span className="gradient-text">Journey</span>
          </h2>
          <p style={{
            marginTop: '14px', fontSize: '0.92rem',
            color: 'var(--text-muted)', maxWidth: '460px', lineHeight: 1.7,
          }}>
            A foundation built on consistent academic excellence and a deep passion for computer science.
          </p>
        </div>

        <div style={{ maxWidth: '680px' }}>
          {education.map((item, i) => (
            <TimelineCard key={item.school} item={item} index={i} />
          ))}
        </div>

        {/* Achievements grid */}
        <div style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '14px',
          paddingTop: '40px',
          borderTop: '1px solid var(--border)',
        }}>
          {achievements.map((ach) => (
            <div key={ach.label} className="ach-card" style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '12px', padding: '18px',
              display: 'flex', flexDirection: 'column', gap: '5px',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
              willChange: 'transform',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{ach.icon}</span>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
                {ach.label}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                {ach.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .edu-card:hover {
          border-color: rgba(240,192,96,0.2) !important;
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.2);
        }
        .ach-card:hover {
          border-color: rgba(240,192,96,0.2) !important;
          transform: translateY(-3px);
        }
        [data-theme="light"] .edu-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
      `}</style>
    </section>
  );
}
