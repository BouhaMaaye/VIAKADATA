import React, { useState, useEffect, useRef } from 'react';
import Threads from './components/Threads';

const ViakdataWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, particles, animId;
    const N = 90, LINK_DIST = 140, SPEED = 0.25;
    const COLOR_A = '#FF5F00', COLOR_B = '#00204E';

    const resize = () => {
      W = canvas.width = Math.floor(window.innerWidth * DPR);
      H = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    const rand = (a, b) => a + Math.random() * (b - a);
    const init = () => {
      resize();
      particles = Array.from({ length: N }).map(() => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-SPEED, SPEED) * DPR, vy: rand(-SPEED, SPEED) * DPR,
        r: rand(1.2, 2.2) * DPR, hue: Math.random()
      }));
      loop();
    };

    const lerpColor = (c1, c2, t) => {
      const p = (hex) => hex.match(/\w\w/g).map(x => parseInt(x, 16));
      const [r1, g1, b1] = p(c1.replace('#', ''));
      const [r2, g2, b2] = p(c2.replace('#', ''));
      return `rgba(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)},1)`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < LINK_DIST * DPR) {
            const alpha = 1 - d / (LINK_DIST * DPR);
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(255,95,0,${0.08 * alpha})`);
            grad.addColorStop(1, `rgba(0,32,78,${0.10 * alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = DPR;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        const col = lerpColor(COLOR_B, COLOR_A, p.hue);
        ctx.fillStyle = col.replace('1)', '.9)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = col.replace('1)', '.08)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
    };

    const loop = () => { draw(); animId = requestAnimationFrame(loop); };
    init();
    const handleResize = () => { cancelAnimationFrame(animId); init(); };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animId); };
  }, []);

  const navItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'Expertise IA', href: '/expertise-ia' },
    { label: 'Nos Offres', href: '/offers' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <div className="font-sans bg-[#F9FAFB] text-gray-800 overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-60" />
      
      {showIntro && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#00204E] via-[#001739] to-[#000f26] z-[9999] flex items-center justify-center" style={{ animation: 'introFadeOut 0.6s ease forwards 0.9s' }}>
          <div className="flex items-center gap-3.5" style={{ animation: 'introRise 0.9s cubic-bezier(0.22,0.61,0.36,1) 0.2s forwards', transform: 'translateY(10px)' }}>
            <div className="h-[84px] w-[84px] rounded-full bg-[#FF5F00] flex items-center justify-center text-white font-bold text-[34px]" style={{ boxShadow: '0 0 0 0 rgba(255,95,0,0.4)', animation: 'pulseRing 1.6s ease-out infinite' }}>V</div>
            <div className="font-extrabold text-[42px] text-white tracking-tight">IA<span className="text-[#FF5F00]">K</span>DATA</div>
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 z-[999] px-5 pointer-events-none">
        <div className="max-w-[1400px] mx-auto pointer-events-none">
          <nav className={`w-max mx-auto backdrop-blur-[18px] bg-white/10 border border-white/20 rounded-[60px] shadow-[0_18px_60px_-20px_rgba(0,0,0,0.2)] flex items-center gap-8 pointer-events-auto transition-all duration-300 ${isScrolled ? 'py-2.5 px-7 mt-2 bg-white/90 border-[#00204E]/10' : 'py-4 px-10 mt-4'}`}>
            <a href="#" className="flex items-center gap-3">
              <span className={`rounded-full bg-[#00204E] text-white font-bold flex items-center justify-center transition-all duration-300 ${isScrolled ? 'h-10 w-10 text-lg' : 'h-12 w-12 text-xl'}`}>V</span>
              <span className={`font-extrabold text-[#00204E] tracking-tight transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>IA<span className="text-[#FF5F00]">K</span>DATA</span>
            </a>
            <div className={`md:flex items-center gap-7 ${mobileMenuOpen ? 'flex' : 'hidden'} md:relative fixed md:top-0 top-[120px] left-5 right-5 md:bg-transparent bg-white md:rounded-none rounded-2xl md:shadow-none shadow-[0_25px_60px_rgba(0,32,78,0.3)] md:p-0 p-6 flex-col md:flex-row transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 md:opacity-100 md:translate-y-0'}`}>
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.dropdown ? (
                    <>
                      <button onClick={() => setActiveDropdown(activeDropdown === index ? null : index)} className={`font-medium text-base flex items-center gap-1 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full transition-colors ${isScrolled ? 'text-[#00204E]' : 'text-white'}`}>
                        {item.label}<span className={`text-xs transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}>▾</span>
                      </button>
                      {activeDropdown === index && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 min-w-[200px] bg-white rounded-2xl border border-[#00204E]/10 shadow-[0_25px_60px_-12px_rgba(0,32,78,0.25)] p-3 z-[100]">
                          {item.dropdown.map((subItem, subIndex) => (
                            <a key={subIndex} href={subItem.href} className="block px-4 py-3 rounded-xl text-[#00204E] text-sm hover:bg-[#00204E]/5 hover:text-[#FF5F00] transition-all duration-200">{subItem.label}</a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a href={item.href} className={`font-medium text-base py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full block transition-colors ${isScrolled ? 'text-[#00204E]' : 'text-white'}`}>{item.label}</a>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex flex-col justify-around w-6 h-6">
              <span className={`w-full h-0.5 transition-all duration-300 ${isScrolled ? 'bg-[#00204E]' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 transition-all duration-300 ${isScrolled ? 'bg-[#00204E]' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 transition-all duration-300 ${isScrolled ? 'bg-[#00204E]' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </nav>
        </div>
      </div>

      <section id="home" className="relative w-full h-screen bg-gradient-to-br from-[#00204E] via-[#001739] to-[#00204E] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Threads
            color={[1, 0.37, 0]}
            amplitude={1.2}
            distance={0.2}
            enableMouseInteraction={true}
          />
        </div>
        
        {/* Overlay dégradé subtil pour plus de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5F00]/5 via-transparent to-[#00204E]/10 pointer-events-none" />
        
        {/* Texte de présentation à gauche */}
        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 max-w-[500px] z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            EXPERTS EN DATA
            <span className="block text-[#FF5F00] mt-2">& INTELLIGENCE ARTIFICIELLE</span>
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8">
            Spécialistes de la transformation digitale, de l'intelligence artificielle et de la valorisation des données pour votre entreprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-br from-[#FF5F00] to-[#e55100] text-white rounded-full font-bold text-base uppercase tracking-wide transition-all duration-400 shadow-[0_15px_35px_rgba(255,95,0,0.25)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_25px_50px_rgba(255,95,0,0.4)] text-center">
              Audit gratuit
            </a>
            <a href="#savoir" className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-base uppercase tracking-wide transition-all duration-400 border-2 border-white/30 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 text-center">
              Découvrir
            </a>
          </div>
        </div>
        
        {/* Logo VIAKDATA en bas à droite */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10">
          <img 
            src="/viakadata-fb.png" 
            alt="VIAKDATA" 
            className="h-16 md:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}
          />
        </div>
      </section>

      {/* Séparateur visuel moderne et luxueux */}
      <div className="relative h-32 bg-gradient-to-b from-[#00204E] via-[#001739] to-[#F9FAFB] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF5F00] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00204E] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <section id="savoir" className="py-25 px-5 bg-[#F9FAFB] relative">
        {/* Décoration d'arrière-plan subtile */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#FF5F00] rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl text-[#00204E] mb-5 uppercase tracking-wider font-bold">Pourquoi choisir VIAKDATA ?</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto">Nous transformons vos données en avantage compétitif grâce à l'intelligence artificielle et une expertise industrielle éprouvée.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-15">
            {[
              { icon: '🎯', title: 'Stratégie Data sur mesure', desc: 'Audit complet de votre écosystème data, roadmap personnalisée et accompagnement à chaque étape de votre transformation digitale.', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1600&auto=format&fit=crop' },
              { icon: '🚀', title: 'Solutions IA concrètes', desc: 'Développement d\'applications intelligentes adaptées à vos processus industriels : prédiction, optimisation, automatisation.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop' },
              { icon: '👨‍🏫', title: 'Formation & Transfert', desc: 'Montée en compétences de vos équipes sur les technologies data et IA pour une autonomie durable.', img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1600&auto=format&fit=crop' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,32,78,0.1)] transition-all duration-[400ms] border-t-4 border-[#FF5F00] overflow-hidden hover:-translate-y-5 hover:scale-[1.03] hover:shadow-[0_30px_60px_rgba(0,32,78,0.2)] group">
                <figure className="relative w-full aspect-[16/9] overflow-hidden">
                  <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover scale-[1.04] transition-all duration-700 group-hover:scale-[1.085] group-hover:saturate-[1.05]" />
                </figure>
                <div className="p-7 text-center">
                  <div className="w-[90px] h-[90px] -mt-9 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF5F00] to-[#e55100] flex items-center justify-center text-white text-4xl border-[6px] border-white shadow-[0_10px_30px_rgba(0,32,78,0.12)] transition-transform duration-300 group-hover:scale-[1.08] group-hover:rotate-6">{item.icon}</div>
                  <h3 className="text-xl md:text-2xl text-[#00204E] mb-5 font-bold">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Séparateur diagonal moderne */}
      <div className="relative h-40 bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00204E]/5 to-[#FF5F00]/5 transform -skew-y-2"></div>
        </div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-[#FF5F00] rounded-full blur-[150px] opacity-10 animate-pulse"></div>
      </div>

      <section id="ai-impact" className="py-28 px-5 bg-gradient-to-br from-[#f1f5f9] via-white to-[#e2e8f0] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-[#00204E]">Comment l'IA et l'apprentissage automatique impactent votre entreprise</h2>
          <p className="text-lg md:text-xl text-center text-gray-600 mb-16 max-w-[900px] mx-auto leading-relaxed">
            Découvrez les avantages concrets de l'intelligence artificielle pour transformer vos opérations et accélérer votre croissance.
          </p>
          
          {/* Première ligne - 3 cartes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { 
                title: 'Réduit les coûts', 
                icon: <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>,
                desc: "L'IA réduit les besoins humains dans les flux de travail et processus complexes et répétitifs, ce qui entraîne des économies de coûts importantes." 
              },
              { 
                title: 'Automatise le flux de travail', 
                icon: <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/></svg>,
                desc: "L'IA automatise les tâches fastidieuses en reproduisant la pensée et la prise de décision humaines." 
              },
              { 
                title: 'Améliore la qualité du travail', 
                icon: <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                desc: "L'IA permet un traitement plus cohérent avec moins de distractions." 
              }
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl p-9 shadow-[0_12px_40px_rgba(0,32,78,0.08)] hover:shadow-[0_25px_60px_rgba(0,32,78,0.14)] transition-all duration-400 border border-transparent hover:border-[#FF5F00]/20 cursor-pointer relative overflow-hidden hover:-translate-y-2 flex flex-col items-center text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5F00] to-[#00204E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="mb-6 transform group-hover:scale-110 transition-all duration-400 bg-gradient-to-br from-[#00204E] to-[#001739] rounded-full p-5 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#00204E] group-hover:text-[#FF5F00] transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Deuxième ligne - 2 cartes centrées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
            {[
              { 
                title: 'Augmente les revenus', 
                icon: <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                desc: "Grâce aux solutions d'apprentissage automatique, d'IA générative et de PNL, vous pouvez créer des expériences client hyper-personnalisées pour augmenter les revenus et accroître l'engagement." 
              },
              { 
                title: 'Crée un avantage concurrentiel', 
                icon: <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
                desc: "Grâce à l'IA et à des informations avancées basées sur des données, vous pouvez créer des propositions de valeur uniques face à vos concurrents grâce à des solutions innovantes." 
              }
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl p-9 shadow-[0_12px_40px_rgba(0,32,78,0.08)] hover:shadow-[0_25px_60px_rgba(0,32,78,0.14)] transition-all duration-400 border border-transparent hover:border-[#FF5F00]/20 cursor-pointer relative overflow-hidden hover:-translate-y-2 flex flex-col items-center text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5F00] to-[#00204E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="mb-6 transform group-hover:scale-110 transition-all duration-400 bg-gradient-to-br from-[#00204E] to-[#001739] rounded-full p-5 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#00204E] group-hover:text-[#FF5F00] transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Séparateur ondulé moderne */}
      <div className="relative h-24 bg-gradient-to-b from-[#F9FAFB] to-[#ffffff] overflow-hidden">
        <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64 C320,100 640,20 960,64 C1280,108 1440,64 1440,64 L1440,120 L0,120 Z" fill="url(#gradient1)" opacity="0.3"/>
          <path d="M0,80 C360,40 720,100 1080,60 C1280,40 1440,80 1440,80 L1440,120 L0,120 Z" fill="url(#gradient2)" opacity="0.5"/>
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#00204E"/>
              <stop offset="50%" stopColor="#FF5F00"/>
              <stop offset="100%" stopColor="#00204E"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#FF5F00"/>
              <stop offset="100%" stopColor="#00204E"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <section id="offers" className="py-25 px-5 bg-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-[#00204E] mb-5 uppercase tracking-wider font-bold">Nos solutions</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto">De l'audit data à la création d'applications IA sur mesure, nous vous accompagnons à chaque étape.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-15 max-w-[1000px] mx-auto">
            {[
              { icon: '🔗', title: 'Intégration de l\'IA et de l\'IA générative', desc: 'Nous créons des stratégies d\'intégration d\'IA à fort impact, adaptées à votre organisation, en identifiant les cas d\'usage les plus pertinents et en fournissant une feuille de route claire et concrète, avec un accompagnement de mise en œuvre fluide.' },
              { icon: '📋', title: 'Évaluations de l\'état de préparation à l\'IA', desc: 'Assurez une transformation IA fluide en identifiant les lacunes technologiques et d\'infrastructures nécessaires à l\'intégration de l\'IA. Nous fournissons une feuille de route stratégique claire pour optimiser l\'intégration de l\'IA et assurer une réussite durable.' },
              { icon: '📊', title: 'Conseil en science des données', desc: 'Transformez vos données en avantage stratégique. Nos experts vous aident à identifier des insights, à optimiser votre prise de décision et à faire croître la croissance de votre entreprise grâce à des solutions d\'analyse avancée, de machine learning et d\'IA.' },
              { icon: '🎓', title: 'Formation en entreprise et maîtrise de l\'IA', desc: 'Acquérez les connaissances en IA nécessaires pour gérer, diriger et investir en toute confiance. Nous offrons aux cadres dirigeants, aux responsables de l\'ingénierie et aux cadres non techniques les connaissances et l\'expertise nécessaires pour maîtriser efficacement l\'IA et le machine learning.' },
              { icon: '📈', title: 'Développement de logiciels d\'IA', desc: 'Résolvez des problèmes d\'automatisation complexes grâce à des solutions de Machine Learning et de Traitement Automatique du Langage (TALN) sur mesure et prêtes à l\'emploi. De la catégorisation de documents et de l\'analyse des sentiments aux chatbots, en passant par la reconnaissance d\'entités et l\'extraction d\'informations, nous aidons les équipes à créer des systèmes d\'IA performants, gages d\'efficacité et d\'impact.' },
              { icon: '💬', title: 'Solutions de modèles de langage volumineux', desc: 'Nous aidons les organisations à affiner, optimiser et déployer leurs LLM pour un impact concret et améliorer l\'automatisation, la recherche de connaissances, la génération de contenu et les interactions clients. Nous créons des systèmes RAG personnalisés, des agents intelligents et une IA agentique adaptés à vos données et à vos objectifs.' }
            ].map((offer, i) => (
              <div key={i} className="solution-card bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,32,78,0.1)] transition-all duration-500 hover:shadow-[0_35px_80px_rgba(0,32,78,0.25)] flex flex-col group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5F00]/0 to-[#00204E]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(255,95,0,0.05) 0%, rgba(0,32,78,0.08) 100%)' }}></div>
                <div className="p-8 text-center flex-grow relative z-10">
                  <div className="solution-icon w-[80px] h-[80px] mx-auto mb-6 rounded-full bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center text-white text-3xl shadow-[0_10px_30px_rgba(0,32,78,0.12)] transition-all duration-500 group-hover:rotate-6 group-hover:from-[#FF5F00] group-hover:to-[#e55100] group-hover:shadow-[0_15px_40px_rgba(255,95,0,0.35)]">{offer.icon}</div>
                  <h3 className="text-xl md:text-2xl text-[#00204E] mb-5 font-bold transition-colors duration-500 group-hover:text-[#FF5F00]">{offer.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed transition-colors duration-500 group-hover:text-gray-700">{offer.desc}</p>
                </div>
                <div className="p-8 pt-0 relative z-10">
                  <button className="solution-button w-full py-4 bg-transparent border-2 border-[#0066CC] text-[#0066CC] rounded-xl font-bold uppercase tracking-wide transition-all duration-500 hover:bg-gradient-to-r hover:from-[#FF5F00] hover:to-[#e55100] hover:text-white hover:border-transparent hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,95,0,0.4)]">EN SAVOIR PLUS</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Séparateur fluide moderne avec particules */}
      <div className="relative h-48 bg-gradient-to-b from-white to-[#f8fafc] overflow-hidden">
        <div className="absolute inset-0">
          {/* Particules flottantes */}
          <div className="absolute top-10 left-1/4 w-3 h-3 bg-[#FF5F00] rounded-full opacity-40 animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-1/3 w-2 h-2 bg-[#00204E] rounded-full opacity-30 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/2 w-4 h-4 bg-[#FF5F00] rounded-full opacity-20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
          
          {/* Gradient fluide */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5F00]/5 to-transparent"></div>
        </div>
      </div>

      <section id="contact" className="py-20 px-5 bg-white relative overflow-hidden">
        <div className="max-w-[900px] mx-auto relative z-10">
          {/* En-tête de la section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#00204E]">
              Prêt à mettre l'IA au service de votre entreprise ?
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-[700px] mx-auto">
              Contactez-nous pour découvrir comment nos services de conseil en IA et en machine learning peuvent 
              vous aider à faire progresser votre stratégie d'IA. Remplissez le formulaire ci-dessous et nous vous 
              répondrons sous 24 à 48 heures.
            </p>
          </div>

          {/* Formulaire */}
          <form className="space-y-6">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Votre nom <span className="text-[#FF5F00]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Votre e-mail <span className="text-[#FF5F00]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Rôle */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                Votre rôle <span className="text-[#FF5F00]">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
              />
              <p className="text-xs text-gray-500 mt-1">Quel est votre rôle dans l'entreprise</p>
            </div>

            {/* Nom de l'entreprise */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                Nom de l'entreprise <span className="text-[#FF5F00]">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Nombre d'employés */}
            <div>
              <label htmlFor="employees" className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre d'employés <span className="text-[#FF5F00]">*</span>
              </label>
              <input
                type="text"
                id="employees"
                name="employees"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
              />
              <p className="text-xs text-gray-500 mt-1">Combien d'employés à temps plein ou d'entrepreneurs avez-vous ?</p>
            </div>

            {/* Parcours vers l'IA */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Où en êtes-vous dans votre parcours vers l'IA ? <span className="text-[#FF5F00]">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="radio"
                    name="ai-journey"
                    value="explorer"
                    className="mt-1 w-4 h-4 text-[#FF5F00] focus:ring-[#FF5F00]"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-[#00204E]">
                    <strong>Exploratoire</strong> – Pas encore d'adhésion. On y réfléchit. On ne sait pas encore ce qu'on veut ni ce dont on a besoin.
                  </span>
                </label>
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="radio"
                    name="ai-journey"
                    value="execute"
                    className="mt-1 w-4 h-4 text-[#FF5F00] focus:ring-[#FF5F00]"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-[#00204E]">
                    <strong>Prêt à exécuter</strong> – Nous avons l'adhésion. Nous souhaitons nous lancer sur plusieurs fronts. Il nous faut juste le bon partenaire.
                  </span>
                </label>
              </div>
            </div>

            {/* Préférence de localisation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Préférence de localisation du consultant <span className="text-[#FF5F00]">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="location"
                    value="local"
                    className="w-4 h-4 text-[#FF5F00] focus:ring-[#FF5F00]"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-[#00204E]">
                    Nous recherchons quelqu'un de local – sur place
                  </span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="location"
                    value="remote"
                    className="w-4 h-4 text-[#FF5F00] focus:ring-[#FF5F00]"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-[#00204E]">
                    Nous privilégions un mode de travail à distance
                  </span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="location"
                    value="both"
                    className="w-4 h-4 text-[#FF5F00] focus:ring-[#FF5F00]"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-[#00204E]">
                    Peu importe. Les deux nous conviennent.
                  </span>
                </label>
              </div>
            </div>

            {/* Type d'aide */}
            <div>
              <label htmlFor="help-type" className="block text-sm font-semibold text-gray-700 mb-2">
                Type d'aide d'IA nécessaire
              </label>
              <textarea
                id="help-type"
                name="help-type"
                rows="4"
                placeholder="Brève description. Par exemple, ateliers de formation pour l'équipe de direction, élaboration de stratégie pour l'exercice 2027, solutions d'IA personnalisées..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300 resize-none"
              ></textarea>
            </div>

            {/* Bouton de soumission */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-br from-[#FF5F00] to-[#e55100] text-white rounded-lg font-bold text-base uppercase tracking-wide transition-all duration-400 shadow-[0_10px_30px_rgba(255,95,0,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,95,0,0.4)]"
              >
                Envoyer ma demande
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-[#00204E] text-white py-20 px-5 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <img 
                  src="public/Viakdata.jpg" 
                  alt="VIAKDATA" 
                  className="h-[42px] w-auto block"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,32,78,0.25))' }}
                />
              </div>
              <p className="text-white/80 leading-relaxed mb-8">Votre partenaire en transformation digitale, intelligence artificielle et valorisation des données industrielles.</p>
              <div className="flex gap-4">
                <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#FF5F00] hover:-translate-y-1">in</a>
                <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#FF5F00] hover:-translate-y-1">𝕏</a>
                <a href="mailto:contact@viakdata.fr" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#FF5F00] hover:-translate-y-1">✉</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FF5F00] uppercase tracking-wide mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#FF5F00]">Solutions</h3>
              <ul className="space-y-4">
                <li><a href="#offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Conseil & Audit Data</a></li>
                <li><a href="#offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Développement IA</a></li>
                <li><a href="#offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Formation & Accompagnement</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Expertise industrielle</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-[#FF5F00] uppercase tracking-wide mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#FF5F00]">Contact</h3>
              <div className="space-y-4">
                <p className="text-white/80 flex items-center gap-3"><span className="text-[#FF5F00] w-4">✉</span>contact@viakdata.fr</p>
                <p className="text-white/80 flex items-center gap-3"><span className="text-[#FF5F00] w-4">📍</span>Haute-Savoie, France</p>
                <p className="text-white/80 flex items-center gap-3"><span className="text-[#FF5F00] w-4">📞</span>Consultation gratuite disponible</p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-5 text-white/70 text-sm">
            <p>&copy; 2025 VIAKDATA SAS, tous droits réservés</p>
            <div className="flex gap-8 flex-wrap justify-center">
              <a href="#" className="hover:text-[#FF5F00] transition-colors duration-300 relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-px after:bg-[#FF5F00] after:transition-all after:duration-300 hover:after:w-full">Mentions légales</a>
              <a href="#" className="hover:text-[#FF5F00] transition-colors duration-300 relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-px after:bg-[#FF5F00] after:transition-all after:duration-300 hover:after:w-full">Politique de confidentialité</a>
              <a href="#" className="hover:text-[#FF5F00] transition-colors duration-300 relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-px after:bg-[#FF5F00] after:transition-all after:duration-300 hover:after:w-full">CGV</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes heroFadeIn { to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes logoFadeIn { to { opacity: 1; transform: translateY(0); } }
        @keyframes ctaFadeIn { to { opacity: 1; transform: translateY(0); } }
        @keyframes badgeFadeIn { to { opacity: 1; transform: translateX(0); } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.05); } }
        @keyframes overlayShift {
          0% { background: linear-gradient(135deg, rgba(0,32,78,0.7) 0%, rgba(0,32,78,0.5) 40%, rgba(255,95,0,0.3) 100%); }
          100% { background: linear-gradient(135deg, rgba(0,32,78,0.6) 0%, rgba(255,95,0,0.2) 40%, rgba(0,32,78,0.4) 100%); }
        }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes introRise { to { transform: translateY(0); filter: none; opacity: 1; } }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(255,95,0,0.45); }
          70% { box-shadow: 0 0 0 22px rgba(255,95,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,95,0,0); }
        }
        @keyframes introFadeOut { to { opacity: 0; visibility: hidden; } }
        html { scroll-behavior: smooth; }
        .border-3 { border-width: 3px; }
      `}</style>
    </div>
  );
};

export default ViakdataWebsite;