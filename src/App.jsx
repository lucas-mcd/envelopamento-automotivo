import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import { About, ClickSpark, Hero, SecondCarousel, WorkCarousel } from './components/Visuals';
import { Contact, ContactHub, Footer, Lightbox, Location, Services } from './components/Content';

const sceneIds = ['inicio', 'sobre', 'servicos', 'trabalhos', 'curadoria', 'contato', 'contatos', 'localizacao'];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('arcanjo-theme') || 'dark');
  const [active, setActive] = useState('inicio');
  const [lightbox, setLightbox] = useState(null);
  const sceneIndex = useRef(0);
  const wheelLocked = useRef(false);
  const animationFrame = useRef(null);
  const unlockTimer = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('arcanjo-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.add('scene-wheel');
    return () => document.documentElement.classList.remove('scene-wheel');
  }, []);

  useEffect(() => {
    const sections = sceneIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = sceneIds.indexOf(entry.target.id);
        setActive(entry.target.id);
        if (!wheelLocked.current && index >= 0) sceneIndex.current = index;
      });
    }, { rootMargin: '-30% 0px -55% 0px' });
    sections.forEach((section) => observer.observe(section));

    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
    }, { threshold: 0.12 });
    reveals.forEach((element) => revealObserver.observe(element));

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 800;
    if (isTouchDevice()) return undefined;

    const handleWheel = (event) => {
      if (wheelLocked.current) {
        event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();

      const direction = event.deltaY > 0 ? 1 : -1;
      const targetIndex = Math.min(sceneIds.length - 1, Math.max(0, sceneIndex.current + direction));
      if (targetIndex === sceneIndex.current) return;

      const target = document.getElementById(sceneIds[targetIndex]);
      if (!target) return;

      sceneIndex.current = targetIndex;
      wheelLocked.current = true;
      setActive(sceneIds[targetIndex]);
      const start = window.scrollY;
      const destination = target.getBoundingClientRect().top + start;
      const startedAt = performance.now();
      const duration = 700;
      const ease = (value) => 1 - ((1 - value) ** 3);
      const animate = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        window.scrollTo(0, start + ((destination - start) * ease(progress)));
        if (progress < 1) {
          animationFrame.current = window.requestAnimationFrame(animate);
          return;
        }
        window.scrollTo(0, destination);
        unlockTimer.current = window.setTimeout(() => {
          wheelLocked.current = false;
        }, 400);
      };
      animationFrame.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.cancelAnimationFrame(animationFrame.current);
      window.clearTimeout(unlockTimer.current);
      wheelLocked.current = false;
    };
  }, []);

  const go = (id) => {
    const index = sceneIds.indexOf(id);
    if (index >= 0) sceneIndex.current = index;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sceneNumber = Math.max(0, sceneIds.indexOf(active)) + 1;

  return <>
    <Navbar theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} active={active} />
    <div className="scene-counter" aria-label={`Cena ${sceneNumber} de ${sceneIds.length}`}>
      <strong>{String(sceneNumber).padStart(2, '0')}</strong>
      <span>/ {String(sceneIds.length).padStart(2, '0')}</span>
      <i style={{ '--scene-progress': `${(sceneNumber / sceneIds.length) * 100}%` }} />
    </div>
    <main>
      <Hero go={go} />
      <About go={go} />
      <Services />
      <WorkCarousel />
      <SecondCarousel onOpen={setLightbox} />
      <Contact />
      <ContactHub />
      <Location />
    </main>
    <Footer go={go} />
    <Lightbox src={lightbox} close={() => setLightbox(null)} />
    <ClickSpark />
  </>;
}
