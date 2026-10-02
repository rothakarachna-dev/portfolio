import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

const LINKS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'about' },
  { id: 'skills', label: 'Skills', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'projects' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

export default function Nav({ onToggleTheme }) {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const navRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const a = navRef.current.querySelector(`[href="#${active}"]`);
      if (a) setPill({ x: a.offsetLeft, w: a.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <header>
      <nav ref={navRef} className={`nav links${scrolled ? ' scrolled' : ''}`} aria-label="Main">
        <span className="ind" aria-hidden="true" style={{ width: pill.w, transform: `translateX(${pill.x}px)` }} />
        {LINKS.map(({ id, label, icon }) => (
          <a key={id} href={`#${id}`} aria-label={label} aria-current={active === id ? 'true' : undefined}>
            <Icon name={icon} /><span>{label}</span>
          </a>
        ))}
      </nav>
      <button className="theme" onClick={onToggleTheme} aria-label="Toggle dark mode">◐</button>
    </header>
  );
}
