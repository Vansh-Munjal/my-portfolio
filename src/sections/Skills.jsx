import { useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';

const colorMap = {
  gold:   { chip: 'skill-chip-gold',   dot: '#f0c060', line: '#f0c060' },
  blue:   { chip: 'skill-chip-blue',   dot: '#60a5fa', line: '#60a5fa' },
  purple: { chip: 'skill-chip-purple', dot: '#a78bfa', line: '#a78bfa' },
  teal:   { chip: 'skill-chip-teal',   dot: '#34d399', line: '#34d399' },
};

function SkillGroup({ group, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const c = colorMap[group.color];

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* Color accent top bar */}
      <div style={{
        position: 'absolute', top: 0, left: '20px',
        width: '36px', height: '2px',
        background: c.line, borderRadius: '0 0 2px 2px',
      }} />

      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '0.9rem', fontWeight: 700,
        color: 'var(--text)',
        marginBottom: '14px',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <span style={{
          width: '6px', height: '6px',
          background: c.dot, borderRadius: '50%',
          boxShadow: `0 0 6px ${c.dot}`,
          display: 'inline-block', flexShrink: 0,
        }} />
        {group.category}
      </h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {group.items.map((item) => (
          <span key={item} className={`skill-chip ${c.chip}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" style={{ padding: '96px 0', background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-6">

        <div ref={titleRef} style={{
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          marginBottom: '48px',
        }}>
          <div className="section-eyebrow" style={{ marginBottom: '14px' }}>Expertise</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
            fontWeight: 800, color: 'var(--text)', lineHeight: 1.1,
          }}>
            Skills &amp; <span className="gradient-text">Specializations</span>
          </h2>
          <p style={{
            marginTop: '14px', fontSize: '0.92rem',
            color: 'var(--text-muted)', maxWidth: '460px', lineHeight: 1.7,
          }}>
            A curated toolkit built through hands-on projects, research, and continuous learning.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
        }}>
          {skills.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>

      {/* Chip color styles via <style> to avoid per-element JS */}
      <style>{`
        .skill-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.03em;
          border: 1px solid;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          cursor: default;
          will-change: transform;
        }
        .skill-chip:hover { transform: translateY(-2px); }

        .skill-chip-gold  { background: rgba(240,192,96,0.09); border-color: rgba(240,192,96,0.25); color: #f0c060; }
        .skill-chip-blue  { background: rgba(96,165,250,0.09); border-color: rgba(96,165,250,0.25); color: #60a5fa; }
        .skill-chip-purple{ background: rgba(167,139,250,0.09);border-color: rgba(167,139,250,0.25);color: #a78bfa; }
        .skill-chip-teal  { background: rgba(52,211,153,0.09); border-color: rgba(52,211,153,0.25); color: #34d399; }

        .skill-chip-gold:hover  { box-shadow: 0 0 16px rgba(240,192,96,0.2); }
        .skill-chip-blue:hover  { box-shadow: 0 0 16px rgba(96,165,250,0.2); }
        .skill-chip-purple:hover{ box-shadow: 0 0 16px rgba(167,139,250,0.2); }
        .skill-chip-teal:hover  { box-shadow: 0 0 16px rgba(52,211,153,0.2); }

        [data-theme="light"] .skill-chip-gold  { background: rgba(196,124,0,0.08); border-color: rgba(196,124,0,0.2); color: #c47c00; }
        [data-theme="light"] .skill-chip-blue  { background: rgba(37,99,235,0.08); border-color: rgba(37,99,235,0.2); color: #2563eb; }
        [data-theme="light"] .skill-chip-purple{ background: rgba(124,58,237,0.08);border-color: rgba(124,58,237,0.2);color: #7c3aed; }
        [data-theme="light"] .skill-chip-teal  { background: rgba(5,150,105,0.08); border-color: rgba(5,150,105,0.2); color: #059669; }
      `}</style>
    </section>
  );
}
