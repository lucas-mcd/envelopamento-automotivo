import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';

const links = [['Início', 'inicio'], ['Sobre', 'sobre'], ['Serviços', 'servicos'], ['Trabalhos', 'trabalhos'], ['Contato', 'contato']];

export default function Navbar({ theme, onTheme, active }) {
  const [open, setOpen] = useState(false);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };
  useEffect(() => { document.body.classList.toggle('menu-open', open); return () => document.body.classList.remove('menu-open'); }, [open]);
  return <header className={`navbar ${active !== 'inicio' ? 'scrolled' : ''}`}>
    <button className="brand" onClick={() => go('inicio')} aria-label="Voltar ao início"><span className="brand-mark">A</span><span>ARCANJO<small>PELÍCULAS</small></span></button>
    <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Navegação principal">
      {links.map(([label, id]) => <button className={active === id ? 'active' : ''} key={id} onClick={() => go(id)}>{label}</button>)}
      <button className="nav-quote" onClick={() => go('contato')}>Orçamento <ArrowUpRight size={15} /></button>
    </nav>
    <div className="nav-actions"><button className="theme-toggle" onClick={onTheme} aria-label={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`}><span>{theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}</span><i /></button><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button></div>
  </header>;
}
