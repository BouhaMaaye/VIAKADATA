import React, { useState, useEffect, useRef } from 'react';

const ViakdataWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    
    let W, H, particles, animId;
    const N = 90;
    const LINK_DIST = 140;
    const SPEED = 0.25;
    const COLOR_A = '#FF5F00';
    const COLOR_B = '#00204E';

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
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-SPEED, SPEED) * DPR,
        vy: rand(-SPEED, SPEED) * DPR,
        r: rand(1.2, 2.2) * DPR,
        hue: Math.random()
      }));
      loop();
    };

    const lerpColor = (c1, c2, t) => {
      const p = (hex) => hex.match(/\w\w/g).map(x => parseInt(x, 16));
      const [r1, g1, b1] = p(c1.replace('#', ''));
      const [r2, g2, b2] = p(c2.replace('#', ''));
      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const b = Math.round(b1 + (b2 - b1) * t);
      return `rgba(${r},${g},${b},1)`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
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

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
    };

    const loop = () => {
      draw();
      animId = requestAnimationFrame(loop);
    };

    init();

    const handleResize = () => {
      cancelAnimationFrame(animId);
      init();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const navItems = [
    { label: 'Accueil', href: '#home' },
    { 
      label: 'Expertise IA', 
      dropdown: [
        { label: 'Notre Approche', href: '#' },
        { label: 'Diagnostic Data', href: '#' },
        { label: 'Solutions IA', href: '#' }
      ]
    },
    { 
      label: 'Secteurs', 
      dropdown: [
        { label: 'Métallurgie', href: '#' },
        { label: 'Plasturgie', href: '#' },
        { label: 'Agroalimentaire', href: '#' }
      ]
    },
    { label: 'Nos Offres', href: '#offers' },
    { 
      label: 'Qui sommes-nous ?', 
      dropdown: [
        { label: 'Notre équipe', href: '#' },
        { label: 'Notre histoire', href: '#' },
        { label: 'Nos valeurs', href: '#' }
      ]
    },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div className="font-sans bg-[#F9FAFB] text-gray-800 overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-60" />
      
      {showIntro && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#00204E] via-[#001739] to-[#000f26] z-[9999] flex items-center justify-center" style={{ animation: 'introFadeOut 0.6s ease forwards 0.9s' }}>
          <div className="flex items-center gap-3.5" style={{ animation: 'introRise 0.9s cubic-bezier(0.22,0.61,0.36,1) 0.2s forwards', transform: 'translateY(10px)' }}>
            <div className="h-[84px] w-[84px] rounded-full bg-[#FF5F00] flex items-center justify-center text-white font-bold text-[34px]" style={{ boxShadow: '0 0 0 0 rgba(255,95,0,0.4)', animation: 'pulseRing 1.6s ease-out infinite' }}>
              V
            </div>
            <div className="font-extrabold text-[42px] text-white tracking-tight">
              IA<span className="text-[#FF5F00]">K</span>DATA
            </div>
          </div>
        </div>
      )}

      <div className={`fixed top-0 left-0 right-0 z-[999] px-5 pointer-events-none transition-all duration-300`}>
        <div className="max-w-[1400px] mx-auto pointer-events-none">
          <nav className={`w-max mx-auto backdrop-blur-[18px] bg-white/75 border border-[#00204E]/10 rounded-[60px] shadow-[0_18px_60px_-20px_rgba(0,32,78,0.35)] flex items-center gap-8 pointer-events-auto transition-all duration-300 ${isScrolled ? 'py-2.5 px-7 mt-2' : 'py-4 px-10 mt-4'}`}>
            <a href="#" className="flex items-center gap-3">
              <span className={`rounded-full bg-[#00204E] text-white font-bold flex items-center justify-center transition-all duration-300 ${isScrolled ? 'h-10 w-10 text-lg' : 'h-12 w-12 text-xl'}`}>V</span>
              <span className={`font-extrabold text-[#00204E] tracking-tight transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
                IA<span className="text-[#FF5F00]">K</span>DATA
              </span>
            </a>
            
            <div className={`md:flex items-center gap-7 ${mobileMenuOpen ? 'flex' : 'hidden'} md:relative fixed md:top-0 top-[120px] left-5 right-5 md:bg-transparent bg-white md:rounded-none rounded-2xl md:shadow-none shadow-[0_25px_60px_rgba(0,32,78,0.3)] md:p-0 p-6 flex-col md:flex-row transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 md:opacity-100 md:translate-y-0'}`}>
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.dropdown ? (
                    <>
                      <button 
                        onClick={() => toggleDropdown(index)}
                        className="font-medium text-base text-[#00204E] flex items-center gap-1 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full"
                      >
                        {item.label}
                        <span className={`text-xs transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}>▾</span>
                      </button>
                      {activeDropdown === index && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 min-w-[200px] bg-white rounded-2xl border border-[#00204E]/10 shadow-[0_25px_60px_-12px_rgba(0,32,78,0.25)] p-3 z-[100]">
                          {item.dropdown.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-3 rounded-xl text-[#00204E] text-sm hover:bg-[#00204E]/5 hover:text-[#FF5F00] transition-all duration-200"
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="font-medium text-base text-[#00204E] py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full block"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-around w-6 h-6"
            >
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
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop" 
              alt="Transformation digitale" 
              className="absolute inset-0 w-full h-full object-cover"
              style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#00204E]/70 via-[#00204E]/50 to-[#FF5F00]/30" style={{ animation: 'overlayShift 12s ease-in-out infinite alternate' }} />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] bg-[#FF5F00] rounded-full opacity-10 rotate-45" style={{ animation: 'float 6s ease-in-out infinite, rotate 20s linear infinite' }} />
              <div className="absolute bottom-[15%] left-[8%] w-[150px] h-[150px] bg-[#00204E] opacity-10" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'float 8s ease-in-out infinite reverse' }} />
              <div className="absolute top-[30%] left-[70%] w-[100px] h-[100px] bg-[#FF5F00] rounded-2xl opacity-10 rotate-[30deg]" style={{ animation: 'pulse 4s ease-in-out infinite, rotate 15s linear infinite reverse' }} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center px-5">
              <div className="mb-10" style={{ animation: 'logoFadeIn 1s ease 0.5s forwards', opacity: 0 }}>
                <div className="h-[120px] w-[120px] mb-5 rounded-full bg-[#00204E] text-white font-bold text-5xl flex items-center justify-center shadow-[0_20px_60px_rgba(0,32,78,0.3)]">
                  V
                </div>
                <div className="font-extrabold text-3xl md:text-5xl text-white tracking-tight" style={{ textShadow: '0 4px 20px rgba(0,32,78,0.5)' }}>
                  IA<span className="text-[#FF5F00]" style={{ filter: 'drop-shadow(0 4px 20px rgba(255,95,0,0.5))' }}>K</span>DATA
                </div>
              </div>
              <div style={{ animation: 'ctaFadeIn 1s ease 0.9s forwards', opacity: 0 }}>
                <a 
                  href="#savoir" 
                  className="inline-flex items-center gap-2.5 px-8 md:px-10 py-4 bg-gradient-to-br from-[#FF5F00] to-[#e55100] text-white rounded-full font-semibold text-base md:text-lg uppercase tracking-wider shadow-[0_10px_30px_rgba(255,95,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,95,0,0.4)]"
                >
                  Découvrir nos solutions
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
            <div className="hidden md:block absolute bottom-7 right-7 bg-white/95 text-[#00204E] rounded-2xl p-5 w-[280px] shadow-[0_20px_50px_rgba(0,32,78,0.2)] backdrop-blur-sm border border-white/30" style={{ animation: 'badgeFadeIn 1s ease 1.1s forwards', opacity: 0 }}>
              <p className="text-sm leading-relaxed font-semibold m-0">
                <span className="inline-block text-[#FF5F00] mr-2">📊</span>
                Diagnostic gratuit : Révélateur de vos leviers de croissance IA
              </p>
            </div>
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  );
};

export default ViakdataWebsite;