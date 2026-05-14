import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Skip cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      // Dot follows exactly — direct style for zero latency
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    };

    // Ring lerps in RAF — lightweight
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      const { mx, my, rx, ry } = pos.current;
      const nx = lerp(rx, mx, 0.11);
      const ny = lerp(ry, my, 0.11);
      pos.current.rx = nx;
      pos.current.ry = ny;
      ring.style.left = nx + 'px';
      ring.style.top = ny + 'px';
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    document.addEventListener('mousemove', onMove, { passive: true });

    // Hover enlargement via event delegation (cheap)
    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        document.body.classList.add('cursor-hover');
      }
    };
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        document.body.classList.remove('cursor-hover');
      }
    };
    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
