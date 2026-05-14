import { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      onComplete?.();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-logo">
        VM<span>.</span>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-inner" />
      </div>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginTop: '8px'
      }}>
        Initializing...
      </p>
    </div>
  );
}
