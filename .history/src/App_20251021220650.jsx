import React, { useState, useEffect, useRef } from 'react';

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
    { label: 'Expertise IA', dropdown: [{ label: 'Notre Approche', href: '#' }, { label: 'Diagnostic Data', href: '#' }, { label: 'Solutions IA', href: '#' }] },
    { label: 'Secteurs', dropdown: [{ label: 'Métallurgie', href: '#' }, { label: 'Plasturgie', href: '#' }, { label: 'Agroalimentaire', href: '#' }] },
    { label: 'Nos Offres', href: '#offers' },
    { label: 'Qui sommes-nous ?', dropdown: [{ label: 'Notre équipe', href: '#' }, { label: 'Notre histoire', href: '#' }, { label: 'Nos valeurs', href: '#' }] },
    { label: 'Contact', href: '#contact' }
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
          <nav className={`w-max mx-auto backdrop-blur-[18px] bg-white/75 border border-[#00204E]/10 rounded-[60px] shadow-[0_18px_60px_-20px_rgba(0,32,78,0.35)] flex items-center gap-8 pointer-events-auto transition-all duration-300 ${isScrolled ? 'py-2.5 px-7 mt-2' : 'py-4 px-10 mt-4'}`}>
            <a href="#" className="flex items-center gap-3">
              <span className={`rounded-full bg-[#00204E] text-white font-bold flex items-center justify-center transition-all duration-300 ${isScrolled ? 'h-10 w-10 text-lg' : 'h-12 w-12 text-xl'}`}>V</span>
              <span className={`font-extrabold text-[#00204E] tracking-tight transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>IA<span className="text-[#FF5F00]">K</span>DATA</span>
            </a>
            <div className={`md:flex items-center gap-7 ${mobileMenuOpen ? 'flex' : 'hidden'} md:relative fixed md:top-0 top-[120px] left-5 right-5 md:bg-transparent bg-white md:rounded-none rounded-2xl md:shadow-none shadow-[0_25px_60px_rgba(0,32,78,0.3)] md:p-0 p-6 flex-col md:flex-row transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 md:opacity-100 md:translate-y-0'}`}>
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.dropdown ? (
                    <>
                      <button onClick={() => setActiveDropdown(activeDropdown === index ? null : index)} className="font-medium text-base text-[#00204E] flex items-center gap-1 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full">
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
                    <a href={item.href} className="font-medium text-base text-[#00204E] py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full block">{item.label}</a>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex flex-col justify-around w-6 h-6">
              <span className={`w-full h-0.5 bg-[#00204E] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-[#00204E] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-[#00204E] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </nav>
        </div>
      </div>

      <section className="relative py-10 px-5 pb-30 min-h-screen flex items-center">
        <div className="relative mx-auto max-w-[1400px] w-full">
          <div className="relative w-full h-[70vh] min-h-[600px] rounded-[32px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,32,78,0.3)]" style={{ animation: 'heroFadeIn 1s ease 0.2s forwards', opacity: 0 }}>
            <div className="absolute z-30 left-1/2 -translate-x-1/2 top-0 w-[600px] max-w-[90%] h-20 rounded-b-[60px] bg-[#00204E] shadow-[0_15px_40px_-12px_rgba(0,32,78,0.4)]" />
            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop" alt="Transformation digitale" className="absolute inset-0 w-full h-full object-cover" style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#00204E]/70 via-[#00204E]/50 to-[#FF5F00]/30" style={{ animation: 'overlayShift 12s ease-in-out infinite alternate' }} />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] bg-[#FF5F00] rounded-full opacity-10 rotate-45" style={{ animation: 'float 6s ease-in-out infinite, rotate 20s linear infinite' }} />
              <div className="absolute bottom-[15%] left-[8%] w-[150px] h-[150px] bg-[#00204E] opacity-10" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'float 8s ease-in-out infinite reverse' }} />
              <div className="absolute top-[30%] left-[70%] w-[100px] h-[100px] bg-[#FF5F00] rounded-2xl opacity-10 rotate-[30deg]" style={{ animation: 'pulse 4s ease-in-out infinite, rotate 15s linear infinite reverse' }} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center px-5">
              <div className="mb-10" style={{ animation: 'logoFadeIn 1s ease 0.5s forwards', opacity: 0 }}>
                <img 
                  src="public/viakadata-fb.png" 
                  alt="VIAKDATA" 
                  className="w-[220px] md:w-[520px] h-auto block mx-auto"
                  style={{ filter: 'drop-shadow(0 20px 60px rgba(0,32,78,0.35))' }}
                />
              </div>
              <div style={{ animation: 'ctaFadeIn 1s ease 0.9s forwards', opacity: 0 }}>
                <a href="#savoir" className="inline-flex items-center gap-2.5 px-8 md:px-10 py-4 bg-gradient-to-br from-[#FF5F00] to-[#e55100] text-white rounded-full font-semibold text-base md:text-lg uppercase tracking-wider shadow-[0_10px_30px_rgba(255,95,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,95,0,0.4)]">
                  Découvrez notre expertise <span className="text-xl">→</span>
                </a>
              </div>
            </div>
            <div className="hidden md:block absolute bottom-7 right-7 bg-white/95 text-[#00204E] rounded-2xl p-5 w-[280px] shadow-[0_20px_50px_rgba(0,32,78,0.2)] backdrop-blur-sm border border-white/30" style={{ animation: 'badgeFadeIn 1s ease 1.1s forwards', opacity: 0 }}>
              <p className="text-sm leading-relaxed font-semibold m-0"><span className="inline-block text-[#FF5F00] mr-2">📊</span>Audit gratuit : Révélez le potentiel de vos données industrielles</p>
            </div>
          </div>
        </div>
      </section>

      <section id="savoir" className="py-25 px-5 bg-[#F9FAFB]">
        <div className="max-w-[1200px] mx-auto text-center">
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

      <section id="offers" className="py-25 px-5 bg-gradient-to-br from-[#F9FAFB] to-[#E8F4FD]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-[#00204E] mb-5 uppercase tracking-wider font-bold">Nos solutions</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto">De l'audit data à la création d'applications IA sur mesure, nous vous accompagnons à chaque étape.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-15">
            {[
              { icon: '🔗', title: 'Intégration de l\'IA et de l\'IA générative', desc: 'Nous créons des stratégies d\'intégration d\'IA à fort impact, adaptées à votre organisation, en identifiant les cas d\'usage les plus pertinents et en fournissant une feuille de route claire et concrète, avec un accompagnement de mise en œuvre fluide.' },
              { icon: '📋', title: 'Évaluations de l\'état de préparation à l\'IA', desc: 'Assurez une transformation IA fluide en identifiant les lacunes technologiques et d\'infrastructures nécessaires à l\'intégration de l\'IA. Nous fournissons une feuille de route stratégique claire pour optimiser l\'intégration de l\'IA et assurer une réussite durable.' },
              { icon: '📊', title: 'Conseil en science des données', desc: 'Transformez vos données en avantage stratégique. Nos experts vous aident à identifier des insights, à optimiser votre prise de décision et à faire croître la croissance de votre entreprise grâce à des solutions d\'analyse avancée, de machine learning et d\'IA.' },
              { icon: '🎓', title: 'Formation en entreprise et maîtrise de l\'IA', desc: 'Acquérez les connaissances en IA nécessaires pour gérer, diriger et investir en toute confiance. Nous offrons aux cadres dirigeants, aux responsables de l\'ingénierie et aux cadres non techniques les connaissances et l\'expertise nécessaires pour maîtriser efficacement l\'IA et le machine learning.' },
              { icon: '📈', title: 'Développement de logiciels d\'IA', desc: 'Résolvez des problèmes d\'automatisation complexes grâce à des solutions de Machine Learning et de Traitement Automatique du Langage (TALN) sur mesure et prêtes à l\'emploi. De la catégorisation de documents et de l\'analyse des sentiments aux chatbots, en passant par la reconnaissance d\'entités et l\'extraction d\'informations, nous aidons les équipes à créer des systèmes d\'IA performants, gages d\'efficacité et d\'impact.' },
              { icon: '💬', title: 'Solutions de modèles de langage volumineux', desc: 'Nous aidons les organisations à affiner, optimiser et déployer leurs LLM pour un impact concret et améliorer l\'automatisation, la recherche de connaissances, la génération de contenu et les interactions clients. Nous créons des systèmes RAG personnalisés, des agents intelligents et une IA agentique adaptés à vos données et à vos objectifs.' }
            ].map((offer, i) => (
              <div key={i} className="solution-card bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,32,78,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_80px_rgba(0,32,78,0.25)] flex flex-col group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5F00]/0 to-[#00204E]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(255,95,0,0.05) 0%, rgba(0,32,78,0.08) 100%)' }}></div>
                <div className="p-8 text-center flex-grow relative z-10">
                  <div className="solution-icon w-[80px] h-[80px] mx-auto mb-6 rounded-full bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center text-white text-3xl shadow-[0_10px_30px_rgba(0,32,78,0.12)] transition-all duration-500 group-hover:scale-105 group-hover:rotate-6 group-hover:from-[#FF5F00] group-hover:to-[#e55100] group-hover:shadow-[0_15px_40px_rgba(255,95,0,0.35)]">{offer.icon}</div>
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

      <section id="sectors" className="py-25 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-[#00204E] mb-5 uppercase tracking-wider font-bold">Secteurs d'expertise</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-[800px] mx-auto">Une connaissance approfondie des défis et opportunités de l'industrie manufacturière.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-15 mb-15">
            {[
              { icon: '🏭', title: 'Métallurgie', desc: 'Prédiction qualité, optimisation énergétique, maintenance prédictive des équipements.' },
              { icon: '♻️', title: 'Plasturgie', desc: 'Réduction des rebuts, optimisation des cycles, traçabilité intelligente des lots.' },
              { icon: '🌱', title: 'Agroalimentaire', desc: 'Contrôle qualité automatisé, prévision de la demande, optimisation logistique.' },
              { icon: '⚙️', title: 'Mécanique', desc: 'Optimisation d\'usinage, détection d\'anomalies, planification intelligente.' }
            ].map((sector, i) => (
              <div key={i} className="bg-white p-12 rounded-2xl shadow-[0_15px_40px_rgba(0,32,78,0.08)] transition-all duration-300 border-t-4 border-[#00204E] hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,32,78,0.15)] hover:border-[#FF5F00] group">
                <div className="w-[90px] h-[90px] mx-auto mb-8 rounded-full bg-gradient-to-br from-[#00204E] to-[#003875] flex items-center justify-center text-white text-4xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-[10deg] group-hover:from-[#FF5F00] group-hover:to-[#e55100]">{sector.icon}</div>
                <h3 className="text-xl md:text-2xl text-[#00204E] mb-5 font-bold">{sector.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">{sector.desc}</p>
              </div>
            ))}
          </div>
          <button className="px-10 py-4 bg-gradient-to-br from-[#00204E] to-[#003875] text-white rounded-full font-bold text-base md:text-lg uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,32,78,0.3)]">Découvrir nos cas d'usage industriels</button>
        </div>
      </section>

      <section className="py-25 px-5 bg-gradient-to-br from-[#F9FAFB] to-[#F0F8FF]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-[#00204E] mb-5 uppercase tracking-wider font-bold">Ils nous font confiance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-15">
            {[
              { quote: "VIAKDATA a transformé notre approche data. Leur expertise technique et leur connaissance de nos métiers ont fait toute la différence.", author: 'Marie Dupont', title: 'Directrice Industrielle, Groupe Métallurgique' },
              { quote: "Un accompagnement pragmatique et efficace. Les solutions développées sont parfaitement intégrées à nos processus de production.", author: 'Pierre Martin', title: 'Responsable Innovation, Industriel Plasturgie' },
              { quote: "Enfin un partenaire qui comprend nos enjeux industriels. Le ROI est là, nos équipes sont montées en compétence.", author: 'Sophie Leroy', title: 'DSI, Groupe Agroalimentaire' }
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-10 shadow-[0_20px_50px_rgba(0,32,78,0.1)] transition-all duration-300 relative overflow-hidden hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,32,78,0.15)] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#FF5F00] before:to-[#00204E]">
                <div className="flex gap-1 mb-6 text-[#FFD700] text-lg justify-center">{'★★★★★'.split('').map((star, j) => <span key={j}>{star}</span>)}</div>
                <p className="text-base md:text-lg leading-relaxed text-gray-700 italic mb-8 relative">
                  <span className="absolute -top-4 -left-4 text-6xl text-[#FF5F00] opacity-30 font-serif">"</span>
                  {t.quote}
                </p>
                <div className="text-center">
                  <div className="font-bold text-lg text-[#00204E] mb-1">{t.author}</div>
                  <div className="text-gray-600 text-sm">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-30 px-5 bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-[#00204E]">Transformons ensemble vos données en décisions</h2>
          <p className="text-lg md:text-xl leading-relaxed mb-12 text-gray-600 max-w-[800px] mx-auto">
            Audit gratuit de votre écosystème data et identification de vos opportunités IA. Échangeons sur vos projets de transformation digitale.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap">
            <a href="#" className="inline-block px-11 py-5 bg-gradient-to-br from-[#FF5F00] to-[#e55100] text-white rounded-full font-bold text-base md:text-lg uppercase tracking-wide transition-all duration-400 shadow-[0_15px_35px_rgba(255,95,0,0.25)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_25px_50px_rgba(255,95,0,0.4)] min-w-[220px]">
              Audit gratuit
            </a>
            <a href="#offers" className="inline-block px-11 py-5 bg-white text-[#00204E] rounded-full font-bold text-base md:text-lg uppercase tracking-wide transition-all duration-400 border-3 border-[#00204E] shadow-[0_15px_35px_rgba(0,32,78,0.15)] hover:bg-[#00204E] hover:text-white hover:-translate-y-1 hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,32,78,0.3)] min-w-[220px]">
              Nos solutions
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#00204E] text-white py-20 px-5 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <img 
                  src="public//Viakdata.jpg" 
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
              <h3 className="text-lg font-bold text-[#FF5F00] uppercase tracking-wide mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#FF5F00]">Secteurs</h3>
              <ul className="space-y-4">
                <li><a href="#sectors" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Métallurgie</a></li>
                <li><a href="#sectors" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Plasturgie</a></li>
                <li><a href="#sectors" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Agroalimentaire</a></li>
                <li><a href="#sectors" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Mécanique</a></li>
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