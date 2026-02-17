import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────
// DONNÉES
// ─────────────────────────────────────────────

const projectsData = [
  { id: 1, category: 'affiche', title: 'Festival Nuits d\'Abidjan', sub: 'Affiche événementielle', tags: ['Print', 'Typographie'], year: '2025', color: '#FF4500', index: '01' },
  { id: 2, category: 'video', title: 'Showreel Créatif 2025', sub: 'Montage vidéo & motion', tags: ['Montage', 'After Effects'], year: '2025', color: '#C8A96E', index: '02', isVideo: true },
  { id: 3, category: 'identite', title: 'Brand Kofi Sneakers', sub: 'Identité visuelle complète', tags: ['Logo', 'Charte graphique'], year: '2024', color: '#FF4500', index: '03' },
  { id: 4, category: 'affiche', title: 'Concert Afrobeats Live', sub: 'Affiche & flyer', tags: ['Print', 'Couleur'], year: '2024', color: '#C8A96E', index: '04' },
  { id: 5, category: 'video', title: 'Pub TVC Telma Mobile', sub: 'Spot publicitaire 30s', tags: ['Montage', 'Étalonnage'], year: '2025', color: '#FF4500', index: '05' },
  { id: 6, category: 'social', title: 'Pack Réseaux — BakeryCI', sub: 'Contenu Instagram & Facebook', tags: ['Social media', 'Motion'], year: '2025', color: '#C8A96E', index: '06' },
  { id: 7, category: 'identite', title: 'Restaurant Wouri', sub: 'Menu, carte & identité', tags: ['Print', 'Logo'], year: '2024', color: '#FF4500', index: '07' },
  { id: 8, category: 'motion', title: 'Intro Motion — YouTubeur', sub: 'Générique animé 10s', tags: ['Motion design', 'After Effects'], year: '2025', color: '#C8A96E', index: '08' },
];

const filters = [
  { key: 'tous', label: 'Tout' },
  { key: 'affiche', label: 'Affiches' },
  { key: 'video', label: 'Vidéo' },
  { key: 'identite', label: 'Identité' },
  { key: 'social', label: 'Social' },
  { key: 'motion', label: 'Motion' },
];

const tools = [
  { name: 'Photoshop', abbr: 'PS' },
  { name: 'Illustrator', abbr: 'AI' },
  { name: 'Premiere Pro', abbr: 'PR' },
  { name: 'After Effects', abbr: 'AE' },
  { name: 'Figma', abbr: 'FG' },
  { name: 'InDesign', abbr: 'ID' },
  { name: 'Canva', abbr: 'CV' },
];

const steps = [
  { num: '01', title: 'Brief', desc: 'J\'écoute, je pose les bonnes questions. Comprendre votre univers avant de créer.' },
  { num: '02', title: 'Concept', desc: 'Moodboard, direction artistique, esquisses. On valide ensemble la vision.' },
  { num: '03', title: 'Création', desc: 'Je donne vie au concept avec précision, exigence et passion du détail.' },
  { num: '04', title: 'Livraison', desc: 'Fichiers finaux, sources, retours inclus. Vous repartez prêts à lancer.' },
];

const testimonials = [
  { name: 'Aminata D.', role: 'Directrice, EventCI', text: 'Mory a transformé notre festival avec des visuels à couper le souffle. Réactif, talentueux, professionnel.', initials: 'AD' },
  { name: 'Kofi A.', role: 'Fondateur, Kofi Sneakers', text: 'Notre identité de marque est maintenant méconnaissable — dans le bon sens. Un travail bluffant.', initials: 'KA' },
  { name: 'Sarah M.', role: 'Créatrice de contenu', text: 'Le pack réseaux sociaux a triplé mon engagement. Exactement ce que je voulais, même mieux.', initials: 'SM' },
];

const packs = [
  { name: 'Starter', price: '80 000', delai: '3–5 jours', desc: 'Pour démarrer avec un visuel fort', items: ['1 affiche ou flyer', '2 révisions', 'Fichiers HD', 'Format print + digital'], highlight: false },
  { name: 'Créatif', price: '200 000', delai: '7–10 jours', desc: 'Pour une présence cohérente et impactante', items: ['Identité visuelle (logo + charte)', 'Pack réseaux sociaux (10 visuels)', '3 révisions', 'Montage vidéo 30s inclus'], highlight: true },
  { name: 'Studio', price: 'Sur devis', delai: 'Personnalisé', desc: 'Pour les projets ambitieux et complets', items: ['Identité complète', 'Showreel / spot publicitaire', 'Motion design', 'Accompagnement long terme'], highlight: false },
];

// ─────────────────────────────────────────────
// CURSOR
// ─────────────────────────────────────────────

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const moveMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', moveMouse);
    raf.current = requestAnimationFrame(animate);

    const interactives = document.querySelectorAll('a, button, .project-row, .tool-tag');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => ringRef.current?.classList.add('cursor-big'));
      el.addEventListener('mouseleave', () => ringRef.current?.classList.remove('cursor-big'));
    });

    return () => {
      document.removeEventListener('mousemove', moveMouse);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="c-dot" />
      <div ref={ringRef} className="c-ring" />
    </>
  );
};

// ─────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ─────────────────────────────────────────────

const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.08 }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
};

// ─────────────────────────────────────────────
// TICKER TAPE
// ─────────────────────────────────────────────

const Ticker = () => {
  const items = ['GRAPHISME', 'MOTION DESIGN', 'IDENTITÉ VISUELLE', 'AFFICHES', 'VIDÉO', 'SOCIAL MEDIA', 'ABIDJAN'];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span className="ticker-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: '#work', label: 'Work' },
    { href: '#process', label: 'Process' },
    { href: '#about', label: About },
    { href: '#tarifs', label: 'Tarifs' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        MK<span>.</span>
      </a>

      <div className={`nav-menu ${menuOpen ? 'nav-menu--open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} className="nav-item" onClick={e => { e.preventDefault(); handleClick(l.href); }}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="nav-btn" onClick={e => { e.preventDefault(); handleClick('#contact'); }}>
          Travailler ensemble
        </a>
      </div>

      <button className={`nav-toggle ${menuOpen ? 'nav-toggle--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

const Hero = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    let raf;
    const handleMouse = (e) => {
      if (!titleRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      titleRef.current.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-grain" />
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
        <div className="hero-grid" />
      </div>

      <div className="hero-body">
        <div className="hero-badge reveal">
          <span className="pulse-dot" />
          <span>Disponible pour missions</span>
        </div>

        <div className="hero-title-wrap" ref={titleRef}>
          <h1 className="hero-h1">
            <span className="hero-h1__line reveal" style={{ '--delay': '0.1s' }}>MORY</span>
            <span className="hero-h1__line hero-h1__line--stroke reveal" style={{ '--delay': '0.25s' }}>KONÉ</span>
          </h1>
          <div className="hero-role reveal" style={{ '--delay': '0.4s' }}>
            <span>Graphiste</span>
            <span className="hero-role-sep">✦</span>
            <span>Créatif</span>
            <span className="hero-role-sep">✦</span>
            <span>Motion Designer</span>
          </div>
        </div>

        <p className="hero-desc reveal" style={{ '--delay': '0.55s' }}>
          Affiches qui marquent. Vidéos qui captivent.<br />
          Identités qui restent. Je transforme vos idées<br />
          en <em>visuels inoubliables.</em>
        </p>

        <div className="hero-ctas reveal" style={{ '--delay': '0.7s' }}>
          <a href="#work" className="btn-primary" onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Voir mon travail
            <span className="btn-arrow">→</span>
          </a>
          <a href="#contact" className="btn-ghost" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Me contacter
          </a>
        </div>

        <div className="hero-stats reveal" style={{ '--delay': '0.85s' }}>
          <div className="stat">
            <span className="stat-num counter" data-target="50" data-suffix="+">0+</span>
            <span className="stat-label">Projets réalisés</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num counter" data-target="30" data-suffix="+">0+</span>
            <span className="stat-label">Clients satisfaits</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num counter" data-target="4" data-suffix=" ans">0 ans</span>
            <span className="stat-label">D'expérience</span>
          </div>
        </div>
      </div>

      <div className="hero-visual reveal" style={{ '--delay': '0.3s' }}>
        <div className="hero-card hero-card--main">
          <div className="hero-card-inner">
            <div className="hc-badge">NEW</div>
            <div className="hc-title">Festival Nuits<br />d'Abidjan</div>
            <div className="hc-meta">2025 — Affiche</div>
            <div className="hc-color-bar" />
          </div>
        </div>
        <div className="hero-card hero-card--float">
          <div className="hcf-inner">
            <span>MOTION</span>
            <span>✦</span>
          </div>
        </div>
        <div className="hero-card hero-card--float2">
          <div className="hcf2-inner">
            <span className="hcf2-icon">🎬</span>
            <span className="hcf2-label">+50 projets</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// WORK / PORTFOLIO
// ─────────────────────────────────────────────

const Work = () => {
  const [active, setActive] = useState('tous');
  const [hovered, setHovered] = useState(null);

  const filtered = active === 'tous' ? projectsData : projectsData.filter(p => p.category === active);

  return (
    <section id="work" className="section work-section">
      <div className="section-header reveal">
        <div className="section-label">— Portfolio</div>
        <h2 className="section-title">
          MES <span className="text-accent">CRÉATIONS</span>
        </h2>
      </div>

      <div className="filters reveal">
        {filters.map(f => (
          <button
            key={f.key}
            className={`filter-btn ${active === f.key ? 'filter-btn--active' : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="projects-list">
        {filtered.map((p, i) => (
          <div
            key={p.id}
            className="project-row reveal"
            style={{ '--delay': `${i * 0.07}s` }}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="pr-index">{p.index}</div>
            <div className="pr-info">
              <h3 className="pr-title">{p.title}</h3>
              <p className="pr-sub">{p.sub}</p>
            </div>
            <div className="pr-tags">
              {p.tags.map(t => <span key={t} className="pr-tag">{t}</span>)}
            </div>
            <div className="pr-year">{p.year}</div>
            <div className={`pr-arrow ${hovered === p.id ? 'pr-arrow--active' : ''}`}>→</div>
            <div className="pr-hover-swatch" style={{ '--swatch': p.color }} />
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SHOWREEL
// ─────────────────────────────────────────────

const Showreel = () => (
  <section className="showreel-section">
    <div className="showreel-inner reveal">
      <div className="showreel-text">
        <div className="section-label">— Showreel</div>
        <h2 className="section-title">VOIR<br /><span className="text-accent">L'ACTION</span></h2>
        <p className="showreel-desc">
          Une sélection de mes meilleurs projets vidéo et motion design,<br />
          condensée en 2 minutes de pur créatif.
        </p>
        <a href="#contact" className="btn-primary" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
          Commander un projet <span className="btn-arrow">→</span>
        </a>
      </div>
      <div className="showreel-player">
        <div className="sr-frame">
          <div className="sr-play-btn">
            <div className="sr-play-icon">▶</div>
          </div>
          <div className="sr-overlay-text">SHOWREEL 2025</div>
          <div className="sr-scanlines" />
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// PROCESSUS
// ─────────────────────────────────────────────

const Process = () => (
  <section id="process" className="section process-section">
    <div className="section-header reveal">
      <div className="section-label">— Méthode</div>
      <h2 className="section-title">MON <span className="text-accent">PROCESS</span></h2>
    </div>

    <div className="process-grid">
      {steps.map((s, i) => (
        <div key={s.num} className="process-card reveal" style={{ '--delay': `${i * 0.12}s` }}>
          <div className="pc-num">{s.num}</div>
          <div className="pc-line" />
          <h3 className="pc-title">{s.title}</h3>
          <p className="pc-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// ─────────────────────────────────────────────
// OUTILS
// ─────────────────────────────────────────────

const Tools = () => (
  <section className="section tools-section">
    <div className="section-header reveal">
      <div className="section-label">— Stack créatif</div>
      <h2 className="section-title">MES <span className="text-accent">OUTILS</span></h2>
    </div>
    <div className="tools-row reveal">
      {tools.map(t => (
        <div key={t.name} className="tool-tag">
          <span className="tool-abbr">{t.abbr}</span>
          <span className="tool-name">{t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────

const About = () => (
  <section id="about" className="section about-section">
    <div className="about-grid">
      <div className="about-visual reveal">
        <div className="about-photo">
          <div className="about-photo-inner">
            <div className="ap-initials">MK</div>
            <div className="ap-label">MORY KONÉ</div>
          </div>
          <div className="ap-badge">
            <span>📍</span>
            <span>Abidjan, CI</span>
          </div>
        </div>
        <div className="about-quote reveal">
          <blockquote>"Le design n'est pas ce que ça<br/>ressemble — c'est comment ça fonctionne."</blockquote>
          <cite>— Mory Koné</cite>
        </div>
      </div>

      <div className="about-body">
        <div className="section-label reveal">— À propos</div>
        <h2 className="section-title reveal">CRÉATEUR<br /><span className="text-accent">D'UNIVERS</span></h2>
        <div className="about-text reveal">
          <p>Graphiste freelance basé à Abidjan, je crée des visuels qui racontent des histoires et laissent des empreintes. Avec plus de 4 ans d'expérience, j'ai travaillé pour des marques, des artistes, et des entrepreneurs qui veulent se démarquer.</p>
          <p>Mon approche mêle esthétique africaine contemporaine, typographie audacieuse et maîtrise technique. Chaque projet est une nouvelle aventure créative — je ne fais pas de template, je fais du sur-mesure.</p>
        </div>
        <div className="about-skills reveal">
          {['Direction artistique', 'Identité visuelle', 'Motion design', 'Montage vidéo', 'Print design', 'Social media'].map(s => (
            <span key={s} className="skill-chip">{s}</span>
          ))}
        </div>
        <a href="#contact" className="btn-primary reveal" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
          Travailler avec moi <span className="btn-arrow">→</span>
        </a>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

const Testimonials = () => {
  const [idx, setIdx] = useState(0);

  return (
    <section className="section testi-section">
      <div className="section-header reveal">
        <div className="section-label">— Témoignages</div>
        <h2 className="section-title">ILS ME <span className="text-accent">FONT CONFIANCE</span></h2>
      </div>

      <div className="testi-carousel reveal">
        <button className="testi-arrow testi-arrow--prev" onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}>←</button>

        <div className="testi-card">
          <div className="testi-stars">{'★'.repeat(5)}</div>
          <blockquote className="testi-text">"{testimonials[idx].text}"</blockquote>
          <div className="testi-author">
            <div className="testi-avatar">{testimonials[idx].initials}</div>
            <div>
              <strong>{testimonials[idx].name}</strong>
              <span>{testimonials[idx].role}</span>
            </div>
          </div>
        </div>

        <button className="testi-arrow testi-arrow--next" onClick={() => setIdx((idx + 1) % testimonials.length)}>→</button>
      </div>

      <div className="testi-dots reveal">
        {testimonials.map((_, i) => (
          <button key={i} className={`testi-dot ${i === idx ? 'testi-dot--active' : ''}`} onClick={() => setIdx(i)} />
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// TARIFS
// ─────────────────────────────────────────────

const Tarifs = () => (
  <section id="tarifs" className="section tarifs-section">
    <div className="section-header reveal">
      <div className="section-label">— Investissement</div>
      <h2 className="section-title">MES <span className="text-accent">OFFRES</span></h2>
      <p className="section-desc reveal">Des formules claires pour chaque besoin. Tous les prix sont en FCFA.</p>
    </div>

    <div className="packs-grid">
      {packs.map((p, i) => (
        <div key={p.name} className={`pack-card reveal ${p.highlight ? 'pack-card--hot' : ''}`} style={{ '--delay': `${i * 0.12}s` }}>
          {p.highlight && <div className="pack-hot-label">⭐ Le plus demandé</div>}
          <div className="pack-top">
            <h3 className="pack-name">{p.name}</h3>
            <div className="pack-price">
              {p.price}
              {p.price !== 'Sur devis' && <span>FCFA</span>}
            </div>
            <div className="pack-delay">⏱ {p.delai}</div>
            <p className="pack-desc">{p.desc}</p>
          </div>
          <ul className="pack-features">
            {p.items.map(item => (
              <li key={item}>
                <span className="pack-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a href="#contact" className="pack-cta" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Choisir ce pack <span>→</span>
          </a>
        </div>
      ))}
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────

const Contact = () => {
  const [form, setForm] = useState({ nom: '', email: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-grid">
        <div className="contact-left reveal">
          <div className="section-label">— Contact</div>
          <h2 className="section-title">PARLONS DE<br /><span className="text-accent">VOTRE PROJET</span></h2>
          <p className="contact-lead">Une idée, un projet, une question ?<br/>Je réponds sous 24h.</p>

          <div className="contact-links">
            <a href="mailto:mory.kone@email.com" className="contact-link">
              <span className="cl-icon">✉</span>
              <div>
                <span className="cl-label">Email</span>
                <span className="cl-val">mory.kone@email.com</span>
              </div>
            </a>
            <a href="https://wa.me/2250000000000" target="_blank" rel="noreferrer" className="contact-link">
              <span className="cl-icon">💬</span>
              <div>
                <span className="cl-label">WhatsApp</span>
                <span className="cl-val">Chat direct</span>
              </div>
            </a>
            <div className="contact-link">
              <span className="cl-icon">📍</span>
              <div>
                <span className="cl-label">Localisation</span>
                <span className="cl-val">Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>

          <div className="contact-socials">
            <a href="#" className="cs-link" aria-label="Instagram"><span>IG</span></a>
            <a href="#" className="cs-link" aria-label="Behance"><span>BE</span></a>
            <a href="#" className="cs-link" aria-label="LinkedIn"><span>LI</span></a>
            <a href="#" className="cs-link" aria-label="YouTube"><span>YT</span></a>
          </div>
        </div>

        <div className="contact-right reveal">
          {!sent ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label>Nom complet *</label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom" required />
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" required />
                </div>
              </div>
              <div className="form-field">
                <label>Service souhaité</label>
                <select name="service" value={form.service} onChange={handleChange}>
                  <option value="">Sélectionnez...</option>
                  <option>Affiche / Flyer</option>
                  <option>Identité visuelle</option>
                  <option>Montage vidéo</option>
                  <option>Motion design</option>
                  <option>Pack réseaux sociaux</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="form-field">
                <label>Votre projet *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Décrivez votre projet, vos délais, votre budget..." required />
              </div>
              <button type="submit" className="btn-primary full">
                Envoyer le message <span className="btn-arrow">→</span>
              </button>
            </form>
          ) : (
            <div className="form-success">
              <div className="fs-icon">✓</div>
              <h3>Message envoyé !</h3>
              <p>Je vous réponds dans les 24 heures.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-logo">MK<span>.</span></div>
      <p className="footer-copy">© 2025 Mory Koné — Tous droits réservés</p>
      <div className="footer-nav">
        <a href="#work">Work</a>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
// SCROLL TOP
// ─────────────────────────────────────────────

const ScrollTop = () => {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!vis) return null;
  return (
    <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      ↑
    </button>
  );
};

// ─────────────────────────────────────────────
// LOADER
// ─────────────────────────────────────────────

const Loader = () => (
  <div className="loader">
    <div className="loader-inner">
      <div className="loader-logo">MK<span>.</span></div>
      <div className="loader-bar"><div className="loader-fill" /></div>
      <p className="loader-label">CHARGEMENT</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// COUNTER HOOK
// ─────────────────────────────────────────────

const useCounters = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const dur = 1600;
          const step = target / (dur / 16);
          let cur = 0;
          const timer = setInterval(() => {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(timer); }
            el.textContent = Math.floor(cur) + suffix;
          }, 16);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.counter').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

const PortfolioPage = () => {
  useReveal();
  useCounters();

  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Ticker />
      <Work />
      <Showreel />
      <Process />
      <Tools />
      <About />
      <Testimonials />
      <Tarifs />
      <Contact />
      <Footer />
      <ScrollTop />
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);
  return loading ? <Loader /> : <PortfolioPage />;
};

export default App;