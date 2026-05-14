import { GitFork, Globe, Mail, Heart } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '36px 0',
    }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
        }}>

          {/* Logo + copyright */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)',
                background: 'none', border: 'none', cursor: 'none',
                letterSpacing: '0.05em', marginBottom: '6px', display: 'block',
              }}
            >
              Vansh<span style={{ color: 'var(--gold)' }}>.</span>
            </button>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem', color: 'var(--text-muted)',
              letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              © {year} Vansh Munjal · Built with
              <Heart size={10} style={{ color: 'var(--gold)' }} fill="var(--gold)" />
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '24px' }} className="footer-nav">
            {['#about', '#skills', '#projects', '#education', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="footer-link"
              >
                {href.slice(1)}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { icon: GitFork, href: personal.github,    label: 'GitHub',   id: 'footer-github' },
              { icon: Globe,   href: personal.linkedin,  label: 'LinkedIn', id: 'footer-linkedin' },
              { icon: Mail,    href: `mailto:${personal.email}`, label: 'Email', id: 'footer-email' },
            ].map(({ icon: Icon, href, label, id }) => (
              <a
                key={label}
                href={href}
                id={id}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="footer-social"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.76rem; color: var(--text-muted);
          text-decoration: none; text-transform: capitalize;
          letter-spacing: 0.04em;
          transition: color 0.2s ease;
        }
        .footer-link:hover { color: var(--text); }

        .footer-social {
          width: '34px'; height: '34px';
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 8px; color: var(--text-muted);
          text-decoration: none;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
          will-change: transform;
        }
        .footer-social:hover {
          border-color: rgba(240,192,96,0.3);
          color: var(--gold);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .footer-nav { display: none !important; }
        }
      `}</style>
    </footer>
  );
}
