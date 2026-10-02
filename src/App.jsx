import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Section from './components/Section.jsx';
import Project from './components/Project.jsx';
import Icon from './components/Icon.jsx';
import { profile, stats, skills, projects } from './data.js';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  });
  useEffect(() => {
    if (!theme) return;
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);
  return () => {
    const current = theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(current === 'dark' ? 'light' : 'dark');
  };
}

export default function App() {
  const toggleTheme = useTheme();

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Nav onToggleTheme={toggleTheme} />

      <main>
        <section id="home" className="hero wrap">
          <div className="avatar-wrap">
            <img className="avatar" src={profile.photo} alt={`Photo of ${profile.name}`} width="400" height="400" fetchPriority="high" />
          </div>
          <div className="hero-text">
            <h1>{profile.name}</h1>
            <p className="lead">{profile.intro}</p>
            <div className="actions">
              <a className="btn" href="#projects">View My Projects</a>
              <a className="btn btn-ghost" href="#contact">Contact Me</a>
            </div>
          </div>
        </section>

        <Section id="about" title="About me">
          <div className="about">
            <div>{profile.about.map((p, i) => <p key={i}>{p}</p>)}</div>
            <ul className="stats">
              {stats.map((s) => <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>)}
            </ul>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid4">
            {skills.map((group) => (
              <div className="card" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="pills">{group.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="note">To add a skill, add it to a list in src/data.js.</p>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid2">
            {projects.map((p, i) => <Project key={i} project={p} />)}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="contact-panel">
            <h3>Let us build something together</h3>
            <p>Looking for an intern, a junior developer or a freelance collaborator? I would love to hear from you.</p>
            <a className="btn btn-light" href={`mailto:${profile.email}`}>{profile.email}</a>
            <p className="where">Based in Phnom Penh, Cambodia</p>
            <div className="social">
              <a href={profile.github}>GitHub</a>
              <a href={profile.linkedin}>LinkedIn</a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <div className="social">
          <a href={profile.github} aria-label="GitHub"><Icon name="github" /></a>
          <a href={profile.linkedin} aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
        </div>
        <a className="top" href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}