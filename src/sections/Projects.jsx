import { useState, useEffect, useRef } from 'react';
import { GitFork, ExternalLink, Filter } from 'lucide-react';
import { projects, filterCategories } from '../data/portfolio';

function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

function ProjectCard({ project, index }) {
  const ref = useReveal((index % 3) * 90);

  return (
    <div
      ref={ref}
      className="project-card"
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        transition: 'opacity 0.65s ease, transform 0.35s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease',
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        willChange: 'transform',
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%', height: '190px',
        overflow: 'hidden', position: 'relative',
        background: 'var(--bg)',
      }}>
        <img
          src={project.image}
          alt={project.title}
          className="project-img"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'filter 0.4s ease, transform 0.4s ease',
            willChange: 'transform',
          }}
          loading="lazy"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(7,8,15,0.75) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.62rem', letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.5)',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(6px)',
          padding: '3px 9px', borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          {project.id}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <h3 className="project-title" style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.1rem', fontWeight: 700,
          color: 'var(--text)',
          transition: 'color 0.2s ease',
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '0.84rem', lineHeight: 1.65,
          color: 'var(--text-muted)', flex: 1,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              padding: '3px 9px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem', color: 'var(--text-muted)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{
          display: 'flex', gap: '12px',
          marginTop: '4px', paddingTop: '14px',
          borderTop: '1px solid var(--border)',
        }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-${project.id}`}
            className="project-link"
          >
            <GitFork size={13} />
            Source
          </a>
          <span style={{ color: 'var(--border)', fontSize: '0.8rem' }}>·</span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <ExternalLink size={13} />
            View
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const titleRef = useReveal(0);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" style={{ padding: '96px 0', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} style={{
          opacity: 0, transform: 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          marginBottom: '40px',
        }}>
          <div className="section-eyebrow" style={{ marginBottom: '14px' }}>Work</div>
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
          }}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
              fontWeight: 800, color: 'var(--text)', lineHeight: 1.1,
            }}>
              Featured <span className="gradient-text">Projects</span>
            </h2>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
              {filterCategories.map((cat) => (
                <button
                  key={cat.key}
                  id={`filter-${cat.key}`}
                  onClick={() => setActiveFilter(cat.key)}
                  className={`filter-btn ${activeFilter === cat.key ? 'filter-btn-active' : ''}`}
                >
                  {cat.key === 'all' && <Filter size={11} />}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '20px',
        }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://github.com/Vansh-Munjal"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-github"
            className="github-cta"
          >
            <GitFork size={15} />
            View All on GitHub
          </a>
        </div>
      </div>

      <style>{`
        /* Project card hover */
        .project-card:hover {
          border-color: rgba(240,192,96,0.2);
          box-shadow: 0 20px 48px rgba(0,0,0,0.3);
          transform: translateY(-5px) !important;
        }
        .project-card:hover .project-img {
          filter: saturate(1) brightness(1.05);
          transform: scale(1.04);
        }
        .project-card:hover .project-title { color: var(--gold); }

        [data-theme="light"] .project-card:hover {
          border-color: rgba(196,124,0,0.25);
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        }
        [data-theme="light"] .project-card:hover .project-title { color: var(--gold); }

        /* Filter buttons */
        .filter-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.77rem; font-weight: 500;
          color: var(--text-muted);
          cursor: none;
          transition: all 0.2s ease;
          letter-spacing: 0.02em;
        }
        .filter-btn:hover { border-color: var(--border-hover); color: var(--text); }
        .filter-btn-active {
          background: var(--gold) !important;
          border-color: var(--gold) !important;
          color: #07080f !important;
        }

        /* Project links */
        .project-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem; color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.07em; text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .project-link:hover { color: var(--gold); }

        /* GitHub CTA */
        .github-cta {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 28px;
          background: transparent;
          border: 1px solid rgba(240,192,96,0.2);
          border-radius: '8px';
          font-family: 'Inter', sans-serif;
          font-size: 0.87rem; font-weight: 500;
          color: var(--gold); text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          border-radius: 8px;
          will-change: transform;
        }
        .github-cta:hover {
          background: rgba(240,192,96,0.06);
          transform: translateY(-2px);
          border-color: rgba(240,192,96,0.35);
        }
        [data-theme="light"] .github-cta { border-color: rgba(196,124,0,0.25); color: var(--gold); }
      `}</style>
    </section>
  );
}
