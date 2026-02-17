import React, { useState, useEffect, useRef } from 'react';
import useAnimations from './useAnimations';

// ─────────────────────────────────────────────
// DONNÉES
// ─────────────────────────────────────────────

const projectsData = [
  {
    id: 1, category: 'affiche',
    title: 'Festival Nuits d\'Abidjan',
    sub: 'Affiche événementielle',
    tags: ['Print', 'Typographie'],
    year: '2025',
    color: '#FF3D00',
    emoji: '🎭',
  },
  {
    id: 2, category: 'video',
    title: 'Showreel Créatif 2025',
    sub: 'Montage vidéo & motion',
    tags: ['Montage', 'After Effects'],
    year: '2025',
    color: '#6C63FF',
    emoji: '🎬',
    isVideo: true,
  },
  {
    id: 3, category: 'identite',
    title: 'Brand Kofi Sneakers',
    sub: 'Identité visuelle complète',
    tags: ['Logo', 'Charte graphique'],
    year: '2024',
    color: '#00BFA5',
    emoji: '👟',
  },
  {
    id: 4, category: 'affiche',
    title: 'Concert Afrobeats Live',
    sub: 'Affiche & flyer',
    tags: ['Print', 'Couleur'],
    year: '2024',
    color: '#FFD600',
    emoji: '🎵',
  },
  {
    id: 5, category: 'video',
    title: 'Pub TVC Telma Mobile',
    sub: 'Spot publicitaire 30s',
    tags: ['Montage', 'Couleur étalonnage'],
    year: '2025',
    color: '#E91E63',
    emoji: '📱',
  },
  {
    id: 6, category: 'social',
    title: 'Pack Réseaux — BakeryCI',
    sub: 'Contenu Instagram & Facebook',
    tags: ['Social media', 'Motion'],
    year: '2025',
    color: '#FF9800',
    emoji: '🍞',
  },
  {
    id: 7, category: 'identite',
    title: 'Restaurant Wouri',
    sub: 'Menu, carte & identité',
    tags: ['Print', 'Logo'],
    year: '2024',
    color: '#4CAF50',
    emoji: '🍽️',
  },
  {
    id: 8, category: 'motion',
    title: 'Intro Motion — YouTubeur',
    sub: 'Générique animé 10s',
    tags: ['Motion design', 'After Effects'],
    year: '2025',
    color: '#9C27B0',
    emoji: '✨',
  },
];

const filters = [
  { key: 'tous', label: 'Tout voir' },
  { key: 'affiche', label: 'Affiches' },
  { key: 'video', label: 'Vidéo' },
  { key: 'identite', label: 'Identité' },
  { key: 'social', label: 'Social Media' },
  { key: 'motion', label: 'Motion' },
];

const tools = [
  { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  { name: 'Premiere Pro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg' },
  { name: 'After Effects', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'InDesign', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/indesign/indesign-plain.svg' },
  { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
];

const steps = [
  { num: '01', title: 'Brief', desc: 'J\'écoute, je pose les bonnes questions. Comprendre votre univers avant de créer.' },
  { num: '02', title: 'Concept', desc: 'Moodboard, direction artistique, esquisses. On valide ensemble la vision.' },
  { num: '03', title: 'Création', desc: 'Je donne vie au concept avec précision, exigence et passion du détail.' },
  { num: '04', title: 'Livraison', desc: 'Fichiers finaux, sources, retours inclus. Vous repartez prêts à lancer.' },
];

const testimonials = [
  { name: 'Aminata D.', role: 'Directrice, EventCI', text: 'Mory a transformé notre festival avec des visuels à couper le souffle. Réactif, talentueux, professionnel.', note: 5 },
  { name: 'Kofi A.', role: 'Fondateur, Kofi Sneakers', text: 'Notre identité de marque est maintenant méconnaissable — dans le bon sens. Un travail bluffant.', note: 5 },
  { name: 'Sarah M.', role: 'Créatrice de contenu', text: 'Le pack réseaux sociaux a triplé mon engagement. Exactement ce que je voulais, même mieux.', note: 5 },
];

const packs = [
  {
    name: 'Starter',
    price: '80 000',
    delai: '3–5 jours',
    desc: 'Pour démarrer avec un visuel fort',
    items: ['1 affiche ou flyer', '2 révisions', 'Fichiers HD', 'Format print + digital'],
    accent: '#555',
  },
  {
    name: 'Créatif',
    price: '200 000',
    delai: '7–10 jours',
    desc: 'Pour une présence cohérente et impactante',
    items: ['Identité visuelle (logo + charte)', 'Pack réseaux sociaux (10 visuels)', '3 révisions', 'Montage vidéo 30s inclus'],
    accent: '#FF3D00',
    popular: true,
  },
  {
    name: 'Studio',
    price: 'Sur devis',
    delai: 'Personnalisé',
    desc: 'Pour les projets ambitieux et complets',
    items: ['Identité complète', 'Showreel / spot publicitaire', 'Motion design', 'Accompagnement long terme'],
    accent: '#6C63FF',
  },
];

// ─────────────────────────────────────────────
// COMPOSANTS UTILITAIRES
// ─────────────────────────────────────────────

const StarRating = ({ note }) => (
  <div className="stars">
    {[...Array(note)].map((_, i) => (
      <span key={i} className="star">★</span>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#processus', label: 'Processus' },
    { href: '#outils', label: 'Outils' },
    { href: '#about', label: 'À propos' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">MK<span className="dot">.</span></a>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="nav-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Me contacter
          </a>
        </li>
      </ul>
      <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero-noise" />
    <div className="hero-grid-lines" />

    <div className="hero-content">
      <div className="hero-tag reveal">
        <span className="tag-dot" /> Disponible pour missions
      </div>

      <h1 className="hero-title reveal">
        <span className="title-line">MORY</span>
        <span className="title-line accent-line">KONÉ</span>
        <span className="title-sub">Graphiste & Créatif</span>
      </h1>

      <p className="hero-desc reveal">
        Affiches qui marquent. Vidéos qui captivent.<br />
        Identités qui restent. Je transforme vos idées<br />
        en <em>visuels inoubliables.</em>
      </p>

      <div className="hero-actions reveal">
        <a href="#portfolio" className="btn-primary">
          Voir le portfolio <i className="fas fa-arrow-right" />
        </a>
        <a href="#contact" className="btn-ghost">
          Travailler ensemble
        </a>
      </div>

      <div className="hero-stats reveal">
        <div className="stat">
          <span className="counter" data-target="60" data-suffix="+">0</span>
          <span className="stat-label">Projets livrés</span>
        </div>
        <div className="stat-sep" />
        <div className="stat">
          <span className="counter" data-target="3" data-suffix=" ans">0</span>
          <span className="stat-label">D'expérience</span>
        </div>
        <div className="stat-sep" />
        <div className="stat">
          <span className="counter" data-target="40" data-suffix="+">0</span>
          <span className="stat-label">Clients satisfaits</span>
        </div>
      </div>
    </div>

    <div className="hero-visual reveal">
      <div className="visual-frame">
        <div className="visual-photo-placeholder">
          <span className="initials">MK</span>
          <div className="visual-badge badge-1">Graphiste</div>
          <div className="visual-badge badge-2">Motion</div>
          <div className="visual-badge badge-3">Vidéo</div>
        </div>
      </div>
      <div className="visual-deco-circle" />
      <div className="visual-deco-line" />
    </div>

    <a href="#portfolio" className="scroll-hint">
      <span>Scroll</span>
      <div className="scroll-line" />
    </a>
  </section>
);

// ─────────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────────

const Portfolio = () => {
  const [active, setActive] = useState('tous');
  const [visible, setVisible] = useState(projectsData);

  useEffect(() => {
    if (active === 'tous') setVisible(projectsData);
    else setVisible(projectsData.filter((p) => p.category === active));
  }, [active]);

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="section-label reveal">— Portfolio</div>
      <h2 className="section-title reveal">
        MES <span className="accent">CRÉATIONS</span>
      </h2>

      {/* Filtres */}
      <div className="filters reveal">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${active === f.key ? 'active' : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
            {active === f.key && <span className="filter-count">{visible.length}</span>}
          </button>
        ))}
      </div>

      {/* Grille projets */}
      <div className="projects-grid">
        {visible.map((p, i) => (
          <div
            key={p.id}
            className="project-card reveal"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="card-visual" style={{ '--card-color': p.color }}>
              <div className="card-bg-emoji">{p.emoji}</div>
              {p.isVideo && (
                <div className="card-play">
                  <i className="fas fa-play" />
                </div>
              )}
              <div className="card-overlay">
                <button className="card-view-btn">Voir le projet <i className="fas fa-arrow-right" /></button>
              </div>
            </div>
            <div className="card-info">
              <div className="card-meta">
                <span className="card-year">{p.year}</span>
                {p.tags.map((t) => <span key={t} className="card-tag">{t}</span>)}
              </div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-sub">{p.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SHOWREEL
// ─────────────────────────────────────────────

const Showreel = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="showreel-section">
      <div className="showreel-inner">
        <div className="showreel-text reveal">
          <span className="section-label">— Showreel</span>
          <h2 className="showreel-title">MON MEILLEUR<br /><span className="accent">TRAVAIL</span></h2>
          <p>Une sélection de mes projets vidéo et motion design les plus marquants.</p>
        </div>
        <div className="showreel-player reveal">
          <div className="player-frame">
            {!playing ? (
              <button className="play-btn" onClick={() => setPlaying(true)}>
                <div className="play-icon"><i className="fas fa-play" /></div>
                <span>Lancer le showreel</span>
              </button>
            ) : (
              <iframe
                width="100%" height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Showreel Mory Koné"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// PROCESSUS
// ─────────────────────────────────────────────

const Processus = () => (
  <section id="processus" className="section processus-section">
    <div className="section-label reveal">— Comment je travaille</div>
    <h2 className="section-title reveal">MON <span className="accent">PROCESSUS</span></h2>

    <div className="steps-grid">
      {steps.map((s, i) => (
        <div key={s.num} className="step reveal" style={{ animationDelay: `${i * 0.12}s` }}>
          <div className="step-num">{s.num}</div>
          <div className="step-line" />
          <h3 className="step-title">{s.title}</h3>
          <p className="step-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// ─────────────────────────────────────────────
// OUTILS
// ─────────────────────────────────────────────

const Outils = () => (
  <section id="outils" className="section outils-section">
    <div className="section-label reveal">— Ma boîte à outils</div>
    <h2 className="section-title reveal">OUTILS <span className="accent">MAÎTRISÉS</span></h2>
    <div className="tools-track-wrapper">
      <div className="tools-track">
        {[...tools, ...tools].map((t, i) => (
          <div key={i} className="tool-item">
            <img src={t.icon} alt={t.name} loading="lazy" />
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// À PROPOS
// ─────────────────────────────────────────────

const About = () => (
  <section id="about" className="section about-section">
    <div className="about-grid">
      <div className="about-visual reveal">
        <div className="about-photo-frame">
          <div className="about-photo-placeholder">
            <span>MK</span>
          </div>
          <div className="about-deco-tag">
            <i className="fas fa-palette" /> Graphiste depuis 3 ans
          </div>
        </div>
        <blockquote className="about-quote reveal">
          "Un bon visuel, c'est un message qui n'a pas besoin de mots."
          <cite>— Mory Koné</cite>
        </blockquote>
      </div>

      <div className="about-content reveal">
        <div className="section-label">— À propos</div>
        <h2 className="section-title">QUI <span className="accent">SUIS-JE ?</span></h2>
        <p className="about-text">
          Je suis <strong>Mory Koné</strong>, graphiste créatif basé en Côte d'Ivoire.
          Passionné par l'image, la typographie et le storytelling visuel, j'aide
          les marques, artistes et entrepreneurs à se distinguer avec des créations
          qui ont du <em>caractère</em>.
        </p>
        <p className="about-text">
          Affiches, identités visuelles, montages vidéo, motion design — je maîtrise
          l'ensemble de la chaîne créative pour offrir des livrables qui dépassent
          les attentes.
        </p>
        <div className="about-skills">
          {['Direction artistique', 'Identité de marque', 'Montage vidéo', 'Motion design', 'Réseaux sociaux', 'Print & affichage'].map((s) => (
            <span key={s} className="skill-pill">{s}</span>
          ))}
        </div>
        <a href="#contact" className="btn-primary">
          Travaillons ensemble <i className="fas fa-arrow-right" />
        </a>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// TÉMOIGNAGES
// ─────────────────────────────────────────────

const Testimonials = () => {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  const t = testimonials[idx];

  return (
    <section className="section testimonials-section">
      <div className="section-label reveal">— Ils me font confiance</div>
      <h2 className="section-title reveal">AVIS <span className="accent">CLIENTS</span></h2>

      <div className="testimonial-carousel reveal">
        <button className="carousel-arrow left" onClick={prev}><i className="fas fa-chevron-left" /></button>
        <div className="testimonial-card">
          <StarRating note={t.note} />
          <p className="testimonial-text">"{t.text}"</p>
          <div className="testimonial-author">
            <div className="author-avatar">{t.name[0]}</div>
            <div>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </div>
        </div>
        <button className="carousel-arrow right" onClick={next}><i className="fas fa-chevron-right" /></button>
      </div>

      <div className="carousel-dots">
        {testimonials.map((_, i) => (
          <button key={i} className={`dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
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
    <div className="section-label reveal">— Investissement</div>
    <h2 className="section-title reveal">MES <span className="accent">OFFRES</span></h2>
    <p className="section-desc reveal">Des formules claires pour chaque besoin. Tous les prix sont en FCFA.</p>

    <div className="packs-grid">
      {packs.map((p, i) => (
        <div key={p.name} className={`pack-card reveal ${p.popular ? 'popular' : ''}`} style={{ '--pack-accent': p.accent }}>
          {p.popular && <div className="popular-badge">⭐ Le plus demandé</div>}
          <div className="pack-header">
            <h3 className="pack-name">{p.name}</h3>
            <div className="pack-price">{p.price} <span>{p.price !== 'Sur devis' ? 'FCFA' : ''}</span></div>
            <div className="pack-delai"><i className="fas fa-clock" /> {p.delai}</div>
            <p className="pack-desc">{p.desc}</p>
          </div>
          <ul className="pack-items">
            {p.items.map((item) => (
              <li key={item}><i className="fas fa-check" /> {item}</li>
            ))}
          </ul>
          <a href="#contact" className="pack-btn">Choisir ce pack</a>
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-grid">
        <div className="contact-left reveal">
          <div className="section-label">— Contact</div>
          <h2 className="section-title">PARLONS DE<br /><span className="accent">VOTRE PROJET</span></h2>
          <p className="contact-desc">
            Une idée, un projet, une question ? Écrivez-moi — je réponds sous 24h.
          </p>
          <div className="contact-infos">
            <a href="mailto:mory.kone@email.com" className="contact-info-item">
              <div className="info-icon"><i className="fas fa-envelope" /></div>
              <span>mory.kone@email.com</span>
            </a>
            <a href="https://wa.me/2250000000000" target="_blank" rel="noreferrer" className="contact-info-item">
              <div className="info-icon"><i className="fab fa-whatsapp" /></div>
              <span>WhatsApp direct</span>
            </a>
            <div className="contact-info-item">
              <div className="info-icon"><i className="fas fa-map-marker-alt" /></div>
              <span>Abidjan, Côte d'Ivoire</span>
            </div>
          </div>
          <div className="contact-socials">
            <a href="#" className="social-link"><i className="fab fa-instagram" /></a>
            <a href="#" className="social-link"><i className="fab fa-behance" /></a>
            <a href="#" className="social-link"><i className="fab fa-linkedin-in" /></a>
            <a href="#" className="social-link"><i className="fab fa-youtube" /></a>
          </div>
        </div>

        <div className="contact-right reveal">
          {!sent ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom" required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Service souhaité</label>
                <select name="service" value={form.service} onChange={handleChange}>
                  <option value="">Sélectionnez...</option>
                  <option value="affiche">Affiche / Flyer</option>
                  <option value="identite">Identité visuelle</option>
                  <option value="video">Montage vidéo</option>
                  <option value="motion">Motion design</option>
                  <option value="social">Pack réseaux sociaux</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Décrivez votre projet *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Parlez-moi de votre projet, vos délais, votre budget..." required />
              </div>
              <button type="submit" className="btn-primary full-width">
                Envoyer le message <i className="fas fa-paper-plane" />
              </button>
            </form>
          ) : (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Message envoyé !</h3>
              <p>Je vous réponds dans les 24 heures. Merci de votre confiance.</p>
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
      <div className="footer-logo">MK<span className="dot">.</span></div>
      <p className="footer-text">© 2025 Mory Koné — Tous droits réservés</p>
      <div className="footer-links">
        <a href="#portfolio">Portfolio</a>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
// SCROLL TO TOP
// ─────────────────────────────────────────────

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return visible ? (
    <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <i className="fas fa-arrow-up" />
    </button>
  ) : null;
};

// ─────────────────────────────────────────────
// LOADER
// ─────────────────────────────────────────────

const Loader = () => (
  <div className="loader">
    <div className="loader-inner">
      <div className="loader-logo">MK<span>.</span></div>
      <div className="loader-bar"><div className="loader-progress" /></div>
      <p className="loader-msg">Chargement...</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// APP PRINCIPALE
// ─────────────────────────────────────────────

const Portfolio_Page = () => {
  useAnimations();
  return (
    <div className="app">
      {/* Curseur personnalisé */}
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      <Navbar />
      <Hero />
      <Portfolio />
      <Showreel />
      <Processus />
      <Outils />
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
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);
  return loading ? <Loader /> : <Portfolio_Page />;
};

export default App;