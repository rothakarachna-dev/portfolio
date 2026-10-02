import { useEffect, useRef } from 'react';

// Wraps a page section with a title and a fade in on scroll.
export default function Section({ id, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current.classList.add('in'); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className="wrap section reveal">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
