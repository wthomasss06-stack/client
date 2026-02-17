import React, { useState, useEffect } from 'react';
import useAnimations from './useAnimations';

// ─────────────────────────────────────────────
// DONNÉES
// ─────────────────────────────────────────────
const projects = [
  { id:1, cat:'affiche',   emoji:'🎭', title:'Festival Nuits d\'Abidjan', sub:'Affiche événementielle', tags:['Print','Typo'],        year:'2025', color:'#FF3D00' },
  { id:2, cat:'video',     emoji:'🎬', title:'Showreel Créatif 2025',     sub:'Montage vidéo & motion', tags:['Montage','AE'],         year:'2025', color:'#6C63FF', isVideo:true },
  { id:3, cat:'identite',  emoji:'👟', title:'Brand Kofi Sneakers',       sub:'Identité visuelle',      tags:['Logo','Charte'],        year:'2024', color:'#00BFA5' },
  { id:4, cat:'affiche',   emoji:'🎵', title:'Concert Afrobeats Live',    sub:'Affiche & flyer',        tags:['Print','Couleur'],      year:'2024', color:'#FFD600' },
  { id:5, cat:'video',     emoji:'📱', title:'Pub TVC Telma Mobile',      sub:'Spot publicitaire 30s',  tags:['Montage','Étalonnage'], year:'2025', color:'#E91E63' },
  { id:6, cat:'social',    emoji:'🍞', title:'Pack BakeryCI',             sub:'Instagram & Facebook',   tags:['Social','Motion'],      year:'2025', color:'#FF9800' },
  { id:7, cat:'identite',  emoji:'🍽️', title:'Restaurant Wouri',          sub:'Menu, carte & identité', tags:['Print','Logo'],         year:'2024', color:'#4CAF50' },
  { id:8, cat:'motion',    emoji:'✨', title:'Intro Motion YouTubeur',    sub:'Générique animé 10s',    tags:['Motion','AE'],          year:'2025', color:'#9C27B0' },
];

const filters = [
  { key:'tous',     label:'Tout voir' },
  { key:'affiche',  label:'Affiches' },
  { key:'video',    label:'Vidéo' },
  { key:'identite', label:'Identité' },
  { key:'social',   label:'Social Media' },
  { key:'motion',   label:'Motion' },
];

const tools = [
  { name:'Photoshop',    icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name:'Illustrator',  icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  { name:'Premiere Pro', icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg' },
  { name:'After Effects',icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg' },
  { name:'Figma',        icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name:'InDesign',     icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/indesign/indesign-plain.svg' },
  { name:'Canva',        icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
];

const steps = [
  { num:'01', title:'Brief',     desc:'J\'écoute, je pose les bonnes questions. Comprendre votre univers avant de créer.' },
  { num:'02', title:'Concept',   desc:'Moodboard, direction artistique, esquisses. On valide ensemble la vision.' },
  { num:'03', title:'Création',  desc:'Je donne vie au concept avec précision, exigence et passion du détail.' },
  { num:'04', title:'Livraison', desc:'Fichiers finaux, sources, retours inclus. Vous repartez prêts à lancer.' },
];

const testimonials = [
  { name:'Aminata D.', role:'Directrice, EventCI',         text:'Mory a transformé notre festival avec des visuels à couper le souffle. Réactif, talentueux, professionnel.',  note:5 },
  { name:'Kofi A.',    role:'Fondateur, Kofi Sneakers',    text:'Notre identité de marque est maintenant méconnaissable — dans le bon sens. Un travail bluffant.',              note:5 },
  { name:'Sarah M.',   role:'Créatrice de contenu',        text:'Le pack réseaux sociaux a triplé mon engagement. Exactement ce que je voulais, même mieux.',                  note:5 },
];

const packs = [
  { name:'Starter',   price:'80 000',   unit:'FCFA', delay:'3–5 jours',   desc:'Pour démarrer avec un visuel fort',             hot:false, items:['1 affiche ou flyer','2 révisions','Fichiers HD','Format print + digital'] },
  { name:'Créatif',   price:'200 000',  unit:'FCFA', delay:'7–10 jours',  desc:'Pour une présence cohérente et impactante',     hot:true,  items:['Identité visuelle (logo + charte)','Pack réseaux (10 visuels)','3 révisions','Montage vidéo 30s inclus'] },
  { name:'Studio',    price:'Sur devis',unit:'',      delay:'Personnalisé',desc:'Pour les projets ambitieux et complets',        hot:false, items:['Identité complète','Showreel / spot pub','Motion design','Accompagnement long terme'] },
];

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href:'#portfolio', label:'Portfolio' },
    { href:'#processus', label:'Processus' },
    { href:'#outils',    label:'Outils' },
    { href:'#about',     label:'À propos' },
    { href:'#contact',   label:'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        MK<span className="nav-logo-dot" />
      </a>

      <ul className={`nav-center ${open ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} className="nav-link" onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer le thème">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <a href="#contact" className="nav-cta">Me contacter</a>
        <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero-noise" />
    <div className="hero-grid" />
    <div className="hero-bg-text">GRAPHISTE</div>

    <div className="hero-badge reveal">
      <span className="badge-pulse" /> Disponible pour missions
    </div>

    <div className="hero-title-block reveal">
      <span className="hero-name">MORY</span>
      <span className="hero-name-out">KONÉ</span>
      <span className="hero-divider" />
    </div>

    <div className="hero-bottom">
      <p className="hero-desc reveal">
        <strong>Graphiste & Créatif</strong> basé à Abidjan.
        Je transforme vos idées en visuels qui captivent,
        marquent et convertissent.
      </p>

      <div className="hero-stats-row reveal">
        <div className="h-stat">
          <span className="counter h-stat-num" data-target="60" data-suffix="+">0</span>
          <span className="h-stat-lbl">Projets livrés</span>
        </div>
        <div className="h-stat">
          <span className="counter h-stat-num" data-target="3" data-suffix=" ans">0</span>
          <span className="h-stat-lbl">D'expérience</span>
        </div>
        <div className="h-stat">
          <span className="counter h-stat-num" data-target="40" data-suffix="+">0</span>
          <span className="h-stat-lbl">Clients</span>
        </div>
      </div>

      <div className="hero-actions reveal">
        <a href="#portfolio" className="btn-primary">
          Voir le portfolio <i className="fas fa-arrow-right" />
        </a>
        <a href="#contact" className="btn-outline">
          Travaillons ensemble
        </a>
      </div>
    </div>

    <div className="scroll-ind">
      <span>Scroll</span>
      <div className="scroll-line" />
    </div>
  </section>
);

// ─────────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────────
const Portfolio = () => {
  const [active, setActive]   = useState('tous');
  const [visible, setVisible] = useState(projects);

  useEffect(() => {
    setVisible(active === 'tous' ? projects : projects.filter(p => p.cat === active));
  }, [active]);

  return (
    <section id="portfolio" className="portfolio-sec">
      <div className="port-head">
        <div>
          <div className="s-tag reveal">Portfolio</div>
          <h2 className="s-title reveal">MES <span className="out">CRÉATIONS</span></h2>
        </div>
        <div className="filters reveal">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn ${active === f.key ? 'active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {visible.map((p, i) => (
          <div
            key={p.id}
            className="project-card reveal"
            style={{ animationDelay:`${i * 0.06}s` }}
          >
            <div
              className="card-color"
              style={{ background:`linear-gradient(135deg, ${p.color}55, ${p.color}22)` }}
            />
            <div className="card-bg">{p.emoji}</div>

            {p.isVideo && (
              <div className="card-play"><i className="fas fa-play" /></div>
            )}

            <div className="card-btn">Voir →</div>

            <div className="card-info">
              <div className="card-cat">{p.tags.join(' · ')}</div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-sub">{p.sub} — {p.year}</p>
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
    <section className="showreel-sec">
      <div className="showreel-frame">
        {!playing ? (
          <>
            <div className="sr-bg-text">SHOWREEL</div>
            <div className="sr-play">
              <button className="sr-play-btn" onClick={() => setPlaying(true)}>
                <i className="fas fa-play" />
              </button>
              <div className="sr-title">MON MEILLEUR <span style={{color:'var(--accent2)'}}>TRAVAIL</span></div>
              <div className="sr-sub">Montage vidéo & Motion design · 2025</div>
            </div>
          </>
        ) : (
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            allow="autoplay; encrypted-media" allowFullScreen title="Showreel"
          />
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// PROCESSUS
// ─────────────────────────────────────────────
const Processus = () => (
  <section id="processus" className="section processus-sec">
    <div className="s-inner">
      <div className="s-tag reveal">Comment je travaille</div>
      <h2 className="s-title reveal">MON <span className="out">PROCESSUS</span></h2>
      <div className="steps">
        {steps.map((s, i) => (
          <div key={s.num} className="step reveal" style={{ transitionDelay:`${i * 0.1}s` }}>
            <span className="step-num">{s.num}</span>
            <div className="step-bar" />
            <h3 className="step-title">{s.title}</h3>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// OUTILS
// ─────────────────────────────────────────────
const Outils = () => (
  <section id="outils" className="outils-sec">
    <div className="outils-head">
      <div className="s-tag reveal">Ma boîte à outils</div>
      <h2 className="s-title reveal">LOGICIELS <span className="out">MAÎTRISÉS</span></h2>
    </div>
    <div className="tools-wrap">
      <div className="tools-track">
        {[...tools, ...tools].map((t, i) => (
          <div key={i} className="tool-chip">
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
  <section id="about" className="section about-sec">
    <div className="about-grid">
      <div className="about-img-wrap reveal-l">
        <div className="about-img-frame">
          {/* Remplacer par : <img src="/assets/images/mory.jpg" alt="Mory Koné" /> */}
          <span className="about-initials">MK</span>
        </div>
        <div className="about-float-tag">
          <i className="fas fa-palette" /> Graphiste · 3 ans d'expérience
        </div>
        <blockquote className="about-quote-block">
          "Un bon visuel, c'est un message qui n'a pas besoin de mots."
          <cite>— Mory Koné</cite>
        </blockquote>
      </div>

      <div className="reveal-r">
        <div className="s-tag">À propos</div>
        <h2 className="s-title">QUI <span className="out">SUIS-JE ?</span></h2>
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
        <div className="skills-wrap">
          {['Direction artistique','Identité de marque','Montage vidéo','Motion design','Réseaux sociaux','Print & affichage'].map(s => (
            <span key={s} className="skill-chip">{s}</span>
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
  const t = testimonials[idx];
  return (
    <section className="section testi-sec">
      <div className="s-inner">
        <div className="s-tag reveal">Ils me font confiance</div>
        <h2 className="s-title reveal">AVIS <span className="out">CLIENTS</span></h2>
        <div className="testi-wrap reveal">
          <button className="arr" onClick={() => setIdx(i => (i-1+testimonials.length)%testimonials.length)}>
            <i className="fas fa-chevron-left" />
          </button>
          <div className="testi-card">
            <div className="stars">{[...Array(t.note)].map((_,i)=><span key={i} className="star">★</span>)}</div>
            <p className="testi-text">"{t.text}"</p>
            <div className="testi-author">
              <div className="author-av">{t.name[0]}</div>
              <div><strong>{t.name}</strong><span>{t.role}</span></div>
            </div>
          </div>
          <button className="arr" onClick={() => setIdx(i => (i+1)%testimonials.length)}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>
        <div className="cdots">
          {testimonials.map((_,i) => (
            <button key={i} className={`cdot ${i===idx?'active':''}`} onClick={()=>setIdx(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// TARIFS
// ─────────────────────────────────────────────
const Tarifs = () => (
  <section id="tarifs" className="section tarifs-sec">
    <div className="s-inner">
      <div className="s-tag reveal">Investissement</div>
      <h2 className="s-title reveal">MES <span className="out">OFFRES</span></h2>
      <p style={{color:'var(--text2)',fontSize:'.95rem',marginBottom:'0'}} className="reveal">
        Des formules claires pour chaque besoin. Prix en FCFA.
      </p>
      <div className="packs">
        {packs.map((p, i) => (
          <div key={p.name} className={`pack reveal ${p.hot ? 'hot' : ''}`} style={{ transitionDelay:`${i*0.1}s` }}>
            {p.hot && <div className="pack-badge">⭐ Le plus demandé</div>}
            <div className="pack-name">{p.name}</div>
            <div className="pack-price">{p.price}<span> {p.unit}</span></div>
            <div className="pack-delay"><i className="fas fa-clock" />{p.delay}</div>
            <p className="pack-desc">{p.desc}</p>
            <ul className="pack-list">
              {p.items.map(item => <li key={item}><i className="fas fa-check" />{item}</li>)}
            </ul>
            <a href="#contact" className="pack-btn">Choisir ce pack</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ nom:'', email:'', service:'', message:'' });
  const [sent, setSent] = useState(false);
  const handle = e => setForm({...form, [e.target.name]:e.target.value});

  return (
    <section id="contact" className="section contact-sec">
      <div className="s-tag reveal">Contact</div>
      <h2 className="s-title reveal">PARLONS DE <span className="out">VOTRE PROJET</span></h2>

      <div className="contact-grid">
        <div className="reveal-l">
          <p style={{color:'var(--text2)',lineHeight:'1.8',marginBottom:'0',fontSize:'.95rem'}}>
            Une idée, un projet, une question ?<br/>
            Écrivez-moi — je réponds sous 24h.
          </p>
          <div className="c-infos">
            <a href="mailto:mory.kone@email.com" className="c-info">
              <div className="c-icon"><i className="fas fa-envelope" /></div>mory.kone@email.com
            </a>
            <a href="https://wa.me/2250000000000" target="_blank" rel="noreferrer" className="c-info">
              <div className="c-icon"><i className="fab fa-whatsapp" /></div>WhatsApp direct
            </a>
            <div className="c-info">
              <div className="c-icon"><i className="fas fa-map-marker-alt" /></div>Abidjan, Côte d'Ivoire
            </div>
          </div>
          <div className="socials">
            <a href="#" className="soc"><i className="fab fa-instagram" /></a>
            <a href="#" className="soc"><i className="fab fa-behance" /></a>
            <a href="#" className="soc"><i className="fab fa-linkedin-in" /></a>
            <a href="#" className="soc"><i className="fab fa-youtube" /></a>
          </div>
        </div>

        <div className="reveal-r">
          {!sent ? (
            <form className="c-form" onSubmit={e=>{e.preventDefault();setSent(true)}}>
              <div className="f-row">
                <div className="f-g">
                  <label className="f-lbl">Nom complet *</label>
                  <input className="f-inp" name="nom" value={form.nom} onChange={handle} placeholder="Votre nom" required />
                </div>
                <div className="f-g">
                  <label className="f-lbl">Email *</label>
                  <input className="f-inp" type="email" name="email" value={form.email} onChange={handle} placeholder="votre@email.com" required />
                </div>
              </div>
              <div className="f-g">
                <label className="f-lbl">Service souhaité</label>
                <select className="f-inp" name="service" value={form.service} onChange={handle}>
                  <option value="">Sélectionnez...</option>
                  <option value="affiche">Affiche / Flyer</option>
                  <option value="identite">Identité visuelle</option>
                  <option value="video">Montage vidéo</option>
                  <option value="motion">Motion design</option>
                  <option value="social">Pack réseaux sociaux</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="f-g">
                <label className="f-lbl">Votre projet *</label>
                <textarea className="f-inp" name="message" value={form.message} onChange={handle} rows={5} placeholder="Décrivez votre projet, délais, budget..." required />
              </div>
              <button type="submit" className="btn-primary" style={{width:'100%',justifyContent:'center'}}>
                Envoyer le message <i className="fas fa-paper-plane" />
              </button>
            </form>
          ) : (
            <div className="form-ok">
              <div className="ok-icon">✓</div>
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
      <div className="f-logo">MK<span className="f-logo-dot" /></div>
      <span className="f-copy">© 2025 Mory Koné — Tous droits réservés</span>
      <nav className="f-nav">
        <a href="#portfolio">Portfolio</a>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
      </nav>
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
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return vis ? (
    <button className="scroll-top" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
      <i className="fas fa-arrow-up" />
    </button>
  ) : null;
};

// ─────────────────────────────────────────────
// LOADER
// ─────────────────────────────────────────────
const Loader = () => (
  <div className="loader">
    <span className="loader-word"><span>MORY</span></span>
    <span className="loader-word"><span>KONÉ</span></span>
    <div className="loader-bar-wrap"><div className="loader-bar-fill" /></div>
    <p className="loader-sub">Graphiste & Créatif</p>
  </div>
);

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
const Page = ({ theme, toggleTheme }) => {
  useAnimations();
  return (
    <div className="app">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
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
  const [theme, setTheme]     = useState('dark');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  };

  // Initialiser le thème
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return loading
    ? <Loader />
    : <Page theme={theme} toggleTheme={toggleTheme} />;
};

export default App;