import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { personal } from '../data/portfolio';

const navLinks = [
  { href: '#about',     label: 'About' },
  { href: '#skills',    label: 'Skills' },
  { href: '#projects',  label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact',   label: 'Contact' },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const ids = navLinks.map(l => l.href.slice(1)).reverse();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          padding: scrolled ? '12px 0' : '22px 0',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'padding 0.35s ease, background 0.35s ease, border-color 0.35s ease',
        }}
      >
        <div className="max-w-6xl mx-auto px-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <button
            onClick={() => scrollTo('#about')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', cursor: 'none',
            }}
          >
            <div style={{
              width: '34px', height: '34px',
              background: 'rgba(240,192,96,0.1)',
              border: '1px solid rgba(240,192,96,0.22)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: '0.8rem',
              color: 'var(--gold)',
            }}>
              VM
            </div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: '0.9rem',
              color: 'var(--text)', letterSpacing: '0.05em',
            }}>
              Vansh<span style={{ color: 'var(--gold)' }}>.</span>
            </span>
          </button>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map(({ href, label }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem', fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                    position: 'relative',
                    padding: '4px 0',
                    transition: 'color 0.2s ease',
                  }}
                  className="nav-btn"
                >
                  {label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: '-1px', left: 0, right: 0,
                      height: '1px', background: 'var(--gold)',
                      borderRadius: '1px',
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* ── Dark/Light toggle ── */}
            <button
              id="theme-toggle"
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: darkMode ? 'rgba(240,192,96,0.08)' : 'rgba(0,0,0,0.06)',
                border: `1px solid ${darkMode ? 'rgba(240,192,96,0.2)' : 'rgba(0,0,0,0.12)'}`,
                borderRadius: '8px',
                color: darkMode ? '#f0c060' : '#6b5500',
                cursor: 'none',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
              className="theme-toggle-btn"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {/* Show sun in dark mode (to switch to light), moon in light mode (to switch to dark) */}
              {darkMode
                ? <Sun size={15} strokeWidth={2} />
                : <Moon size={15} strokeWidth={2} />
              }
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className="mobile-menu-btn desktop-hidden"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '270px', zIndex: 49,
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          padding: '72px 28px 28px',
          gap: '6px',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform',
        }}
      >
        {navLinks.map(({ href, label }) => (
          <button
            key={href}
            onClick={() => scrollTo(href)}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.25rem', fontWeight: 700,
              color: activeSection === href.slice(1) ? 'var(--gold)' : 'var(--text-dim)',
              background: 'none', border: 'none', cursor: 'pointer',
              textAlign: 'left', padding: '12px 0',
              borderBottom: '1px solid var(--border)',
              transition: 'color 0.2s ease',
            }}
          >
            {label}
          </button>
        ))}
        <div style={{ marginTop: '24px' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.66rem', color: 'var(--text-muted)', letterSpacing: '0.08em',
          }}>
            {personal.email}
          </p>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 48,
            background: 'rgba(0,0,0,0.45)',
          }}
        />
      )}

      <style>{`
        .desktop-nav { display: flex; }
        .desktop-hidden { display: flex; }
        .nav-btn:hover { color: var(--text) !important; }
        .theme-toggle-btn:hover { opacity: 0.8; transform: scale(1.08); }

        @media (min-width: 768px) {
          .desktop-hidden { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
