import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Maximize2, Sparkles } from 'lucide-react';
import { images } from '../data';

export function Hero({ go }) { const scanRef = useRef(null); useEffect(() => { const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 800; if (isTouchDevice()) return undefined; let timer; const moveWheel = () => { if (!scanRef.current) return; const mobile = window.innerWidth <= 800; const x = mobile ? 30 + Math.random() * 40 : 31 + Math.random() * 43; const y = mobile ? 24 + Math.random() * 42 : 30 + Math.random() * 38; const rotation = -18 + Math.random() * 36; const scale = mobile ? .7 + Math.random() * .16 : .78 + Math.random() * .16; scanRef.current.style.left = `${x}%`; scanRef.current.style.top = `${y}%`; scanRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`; timer = window.setTimeout(moveWheel, 1600 + Math.random() * 900); }; moveWheel(); return () => window.clearTimeout(timer); }, []); return <section id="inicio" className="hero"><div className="hero-grid" /><div className="hero-orbit" /><div className="hero-rings" aria-hidden="true"><i /><i /><i /><i /></div><div className="hero-traces" aria-hidden="true"><i /><i /><i /></div><div className="hero-pulse" aria-hidden="true" /><div className="hero-scan" ref={scanRef} aria-hidden="true"><div className="scan-disc"><i /><i /><i /><i /><i /><i /><i /><i /><b className="wheel-hub" /></div><b>AP / 014</b></div><div className="hero-copy reveal"><p className="eyebrow"><span /> Estética automotiva desde 2014</p><h1>Vista o seu<br /><em>movimento.</em></h1><p className="hero-lead">Envelopamento e personalização para quem não aceita passar despercebido.</p><div className="hero-actions"><button className="button button-gold" onClick={() => go('trabalhos')}><span>Explorar projetos</span><ArrowRight size={17} /></button><button className="button button-line" onClick={() => go('contato')}><span>Solicitar orçamento</span></button></div></div><div className="hero-image reveal reveal-delay"><div className="image-frame"><img src={images[0]} alt="Projeto automotivo Arcanjo Películas" /></div><div className="hero-stamp"><span>AP</span><small>DETAIL<br />DRIVEN</small></div></div><div className="hero-meta"><span>01 / 06</span><span className="scroll-prompt"><ArrowDown size={15} /> Scroll para explorar</span><span>São Paulo · BR</span></div></section> }

export function About({ go }) { return <section id="sobre" className="section about"><div className="section-kicker reveal"><span>02</span><b>O manifesto</b></div><div className="about-layout"><div className="about-title reveal"><p className="eyebrow">Arcanjo Películas</p><h2>Não é só<br /><em>aparência.</em></h2></div><div className="about-copy reveal reveal-delay"><p className="large-copy">É a sensação de entrar no carro e saber que ele não se parece com nenhum outro.</p><p>Unimos técnica, repertório e obsessão por detalhe para transformar veículos em extensões de quem os dirige. Cada aplicação é um projeto autoral, feito para durar na memória.</p><button className="text-link" onClick={() => go('contato')}>Comece sua transformação <ArrowRight size={16} /></button></div><div className="manifesto-card reveal" tabIndex="0"><div className="manifesto-flip"><div className="manifesto-face manifesto-front"><span className="manifesto-label">Arcanjo / 02</span><div className="logo-glow" /><img src="/logo.webp" alt="Logo Arcanjo Películas" /><span className="manifesto-hint">Passe para revelar</span></div><div className="manifesto-face manifesto-back"><span className="manifesto-label">A sua vez</span><strong>Pronto para<br /><em>transformar?</em></strong><p>Seu projeto começa com uma boa conversa.</p><button className="manifesto-cta" onClick={() => go('contato')}>Falar com a equipe <ArrowRight size={16} /></button></div></div></div></div></section> }

export function WorkCarousel() {
  const cardColors = ['218,164,65', '244,201,107', '190,139,45', '255,226,157', '218,164,65', '174,122,31', '244,201,107', '190,139,45', '255,226,157', '218,164,65'];
  const cylinderRef = useRef(null);

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!cylinderRef.current || shouldReduceMotion) return undefined;

    let rafId = null;
    let startTime = null;
    const duration = 24000;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = (timestamp - startTime) % duration;
      const angle = (elapsed / duration) * 360;
      cylinderRef.current.style.transform = `perspective(1800px) rotateX(-10deg) rotateY(${angle}deg)`;
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return <section id="trabalhos" className="section works"><div className="section-head reveal"><div><div className="section-kicker"><span>04</span><b>Projetos em destaque</b></div><h2>Feito para<br /><em>ser visto.</em></h2></div><p>Uma seleção de transformações que carregam a nossa assinatura.</p></div><div className="cylinder-stage reveal" aria-label="Projetos em destaque em carrossel 3D contínuo"><div ref={cylinderRef} className="cylinder-inner" style={{ '--quantity': images.length }}>{images.map((src, index) => <button className="cylinder-card" key={src} type="button" disabled aria-label={`Projeto ${index + 1}`} tabIndex={-1} style={{ '--index': index, '--color-card': cardColors[index] }}><img src={src} alt={`Projeto ${index + 1}`} loading="lazy" /></button>)}</div></div></section>;
}

export function Gallery({ onOpen }) { return <section id="galeria" className="section gallery"><div className="section-head reveal"><div><div className="section-kicker"><span>05</span><b>Arquivo visual</b></div><h2>Detalhes que<br /><em>falam alto.</em></h2></div><p>Texturas, reflexos e recortes. A matéria-prima da nossa linguagem.</p></div><div className="gallery-grid">{images.slice(2, 8).map((src, index) => <button className={`gallery-item item-${index + 1} reveal`} key={src} onClick={() => onOpen(src)}><img src={src} alt={`Detalhe de projeto ${index + 3}`} loading="lazy" /><span><Maximize2 size={16} /> ampliar</span></button>)}</div></section> }

export function SecondCarousel({ onOpen }) {
  const rail = [...images, ...images];
  const stripRef = useRef(null);

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!stripRef.current || shouldReduceMotion) return undefined;

    let rafId = null;
    let startTime = null;
    const duration = 28000;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = (timestamp - startTime) % duration;
      const progress = elapsed / duration;
      const totalWidth = stripRef.current.scrollWidth / 2;
      const offset = totalWidth * progress;
      stripRef.current.style.transform = `translate3d(-${offset}px, 0, 0)`;
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return <section id="curadoria" className="marquee-section"><div className="marquee-top"><span><Sparkles size={14} /> Curadoria Arcanjo</span><b>Movimento contínuo</b></div><div className="strip-window"><div ref={stripRef} className="strip">{rail.map((src, i) => <button className="strip-card" key={`${src}-${i}`} onClick={() => onOpen(src)} aria-label={`Ampliar projeto ${(i % images.length) + 1}`}><img src={src} alt="Projeto de acabamento automotivo" loading="lazy" /></button>)}</div></div></section>;
}

export function ClickSpark() { const [sparks, setSparks] = useState([]); useEffect(() => { const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 800; if (isTouchDevice()) return undefined; const handler = (event) => { const id = Date.now() + Math.random(); setSparks((items) => [...items.slice(-12), { id, x: event.clientX, y: event.clientY }]); setTimeout(() => setSparks((items) => items.filter((item) => item.id !== id)), 650); }; window.addEventListener('pointerdown', handler); return () => window.removeEventListener('pointerdown', handler); }, []); return <div className="spark-layer">{sparks.map((spark) => <span key={spark.id} className="click-spark" style={{ left: spark.x, top: spark.y }}>{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--r': `${i * 45}deg` }} />)}</span>)}</div> }
