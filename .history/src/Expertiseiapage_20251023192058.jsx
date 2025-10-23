import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExpertiseIAPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', to: '/' },
    { label: 'Expertise IA', to: '/expertise-ia' },            // route
    { label: 'Nos Offres', hash: '#offers' },                  // ancre sur Home
    { label: 'Contact', to: '/contact' }                       // route
  ];
  

  const stats = [
    { number: '150+', label: 'Projets IA réalisés', icon: '🚀' },
    { number: '95%', label: 'Taux de satisfaction', icon: '⭐' },
    { number: '50+', label: 'Entreprises accompagnées', icon: '🏢' },
    { number: '10+', label: 'Années d\'expérience', icon: '💎' }
  ];

  const technologies = [
    { name: 'TensorFlow', icon: '🧠', color: 'from-[#FF5F00] to-[#e55100]' },
    { name: 'PyTorch', icon: '🔥', color: 'from-[#00204E] to-[#003875]' },
    { name: 'OpenAI GPT', icon: '💬', color: 'from-[#FF5F00] to-[#e55100]' },
    { name: 'Computer Vision', icon: '👁️', color: 'from-[#00204E] to-[#003875]' },
    { name: 'NLP', icon: '📝', color: 'from-[#FF5F00] to-[#e55100]' },
    { name: 'Machine Learning', icon: '⚙️', color: 'from-[#00204E] to-[#003875]' },
    { name: 'Deep Learning', icon: '🎯', color: 'from-[#FF5F00] to-[#e55100]' },
    { name: 'AutoML', icon: '🤖', color: 'from-[#00204E] to-[#003875]' }
  ];

  const expertise = [
    {
      id: 1,
      icon: '🎯',
      title: 'Stratégie IA Sur Mesure',
      description: 'Nous analysons en profondeur votre écosystème pour concevoir une stratégie IA parfaitement alignée avec vos objectifs business.',
      features: [
        'Audit complet de vos processus',
        'Identification des opportunités IA',
        'Roadmap de transformation digitale',
        'Priorisation des cas d\'usage'
      ]
    },
    {
      id: 2,
      icon: '🚀',
      title: 'IA Générative Avancée',
      description: 'Exploitez la puissance de l\'IA générative (GPT, DALL-E, Midjourney) pour automatiser la création de contenu et améliorer la productivité.',
      features: [
        'Chatbots intelligents personnalisés',
        'Génération de contenu automatisée',
        'Assistants virtuels sur mesure',
        'Analyse et synthèse de documents'
      ]
    },
    {
      id: 3,
      icon: '🧠',
      title: 'Machine Learning Prédictif',
      description: 'Transformez vos données historiques en prédictions précises pour anticiper les tendances et optimiser vos décisions.',
      features: [
        'Modèles prédictifs personnalisés',
        'Détection d\'anomalies en temps réel',
        'Optimisation des processus',
        'Forecasting avancé'
      ]
    },
    {
      id: 4,
      icon: '👁️',
      title: 'Computer Vision',
      description: 'Donnez des yeux à vos systèmes avec la vision par ordinateur : reconnaissance d\'objets, détection de défauts, analyse d\'images.',
      features: [
        'Détection et classification d\'objets',
        'Contrôle qualité automatisé',
        'Reconnaissance faciale éthique',
        'Analyse vidéo en temps réel'
      ]
    },
    {
      id: 5,
      icon: '📊',
      title: 'Analytics & Data Science',
      description: 'Exploitez tout le potentiel de vos données avec des analyses avancées et des visualisations percutantes.',
      features: [
        'Data mining et exploration',
        'Dashboards interactifs',
        'Analyse prédictive avancée',
        'Recommandations data-driven'
      ]
    },
    {
      id: 6,
      icon: '🔒',
      title: 'IA Éthique & Responsable',
      description: 'Développez une IA transparente, équitable et conforme aux réglementations, en respectant la vie privée et l\'éthique.',
      features: [
        'Conformité RGPD et AI Act',
        'Audit de biais algorithmiques',
        'Explicabilité des modèles',
        'Gouvernance de l\'IA'
      ]
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Découverte & Audit',
      description: 'Nous analysons votre écosystème, vos données et vos objectifs pour identifier les meilleures opportunités IA.',
      icon: '🔍',
      duration: '1-2 semaines'
    },
    {
      step: '02',
      title: 'Stratégie & Roadmap',
      description: 'Conception d\'une feuille de route claire avec priorisation des cas d\'usage et estimation du ROI.',
      icon: '📋',
      duration: '1-2 semaines'
    },
    {
      step: '03',
      title: 'Développement & PoC',
      description: 'Création de prototypes et proof-of-concept pour valider la faisabilité technique et le potentiel.',
      icon: '⚡',
      duration: '4-8 semaines'
    },
    {
      step: '04',
      title: 'Déploiement & Scale',
      description: 'Mise en production avec intégration dans vos systèmes existants et formation de vos équipes.',
      icon: '🚀',
      duration: '4-12 semaines'
    },
    {
      step: '05',
      title: 'Optimisation Continue',
      description: 'Monitoring, maintenance et amélioration continue des modèles pour garantir des performances optimales.',
      icon: '🔄',
      duration: 'En continu'
    }
  ];

  const useCases = [
    {
      title: 'Chatbot Intelligent',
      description: 'Assistant virtuel capable de comprendre et répondre naturellement aux questions de vos clients 24/7.',
      impact: '+40% satisfaction client',
      icon: '💬'
    },
    {
      title: 'Maintenance Prédictive',
      description: 'Anticipez les pannes et optimisez la maintenance de vos équipements grâce au ML.',
      impact: '-30% coûts maintenance',
      icon: '🔧'
    },
    {
      title: 'Détection de Fraude',
      description: 'Identifiez en temps réel les transactions suspectes et protégez votre entreprise.',
      impact: '-85% fraudes détectées',
      icon: '🛡️'
    },
    {
      title: 'Recommandations Personnalisées',
      description: 'Système de recommandation intelligent pour booster vos ventes et l\'engagement.',
      impact: '+25% taux conversion',
      icon: '🎯'
    },
    {
      title: 'Analyse de Sentiment',
      description: 'Comprenez les émotions et opinions de vos clients à partir de leurs retours.',
      impact: 'Insights actionnables',
      icon: '😊'
    },
    {
      title: 'Optimisation des Prix',
      description: 'Prix dynamiques basés sur l\'offre, la demande et la concurrence en temps réel.',
      impact: '+15% marges',
      icon: '💰'
    }
  ];

  return (
    <div className="font-sans bg-white text-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[999] px-5 pointer-events-none">
        <div className="max-w-[1400px] mx-auto pointer-events-none">
          <nav className={`w-max mx-auto backdrop-blur-[18px] bg-white/90 border border-[#00204E]/10 rounded-[60px] shadow-[0_18px_60px_-20px_rgba(0,32,78,0.35)] flex items-center gap-8 pointer-events-auto transition-all duration-300 ${isScrolled ? 'py-2.5 px-7 mt-2' : 'py-4 px-10 mt-4'}`}>
            <a href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-full bg-[#FF5F00] flex items-center justify-center text-white font-bold text-lg">V</div>
              <span className="font-extrabold text-xl text-[#00204E] tracking-tight">IA<span className="text-[#FF5F00]">K</span>DATA</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
  <div key={index} className="relative">
    {item.dropdown ? (
      <>
        <button
          onClick={() =>
            setActiveDropdown(activeDropdown === index ? null : index)
          }
          className="font-medium text-base text-[#00204E] flex items-center gap-1 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full"
        >
          {item.label}
          <span
            className={`text-xs transition-transform duration-200 ${
              activeDropdown === index ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>
        {activeDropdown === index && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 min-w-[200px] bg-white rounded-2xl border border-[#00204E]/10 shadow-[0_25px_60px_-12px_rgba(0,32,78,0.25)] p-3 z-[100]">
            {item.dropdown.map((subItem, subIndex) =>
              subItem.to ? (
                <Link
                  key={subIndex}
                  to={subItem.to}
                  className="block px-4 py-3 rounded-xl text-[#00204E] text-sm hover:bg-[#00204E]/5 hover:text-[#FF5F00] transition-all duration-200"
                >
                  {subItem.label}
                </Link>
              ) : (
                <a
                  key={subIndex}
                  href={subItem.href}
                  className="block px-4 py-3 rounded-xl text-[#00204E] text-sm hover:bg-[#00204E]/5 hover:text-[#FF5F00] transition-all duration-200"
                >
                  {subItem.label}
                </a>
              )
            )}
          </div>
        )}
      </>
    ) : item.to ? (
      <Link
        to={item.to}
        className="font-medium text-base text-[#00204E] py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full block"
      >
        {item.label}
      </Link>
    ) : (
      <Link
        to={{ pathname: "/", hash: item.hash }}
        className="font-medium text-base text-[#00204E] py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF5F00] after:transition-all after:duration-300 hover:text-[#FF5F00] hover:after:w-full block"
      >
        {item.label}
      </Link>
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

      {/* Hero Section - Ultra Modern */}
      <section className="relative pt-32 pb-32 px-5 bg-gradient-to-br from-[#00204E] via-[#001739] to-[#000f26] overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#FF5F00 1px, transparent 1px), linear-gradient(90deg, #FF5F00 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#FF5F00] rounded-full blur-[180px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[#FF5F00] rounded-full blur-[180px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00204E] rounded-full blur-[200px] opacity-30"></div>
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-fadeIn">
                <span className="text-[#FF5F00] font-semibold text-sm uppercase tracking-wider">🚀 Leader en Intelligence Artificielle</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                L'Excellence en
                <span className="block bg-gradient-to-r from-[#FF5F00] to-[#FFB366] bg-clip-text text-transparent mt-2">
                  Intelligence Artificielle
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Transformez votre entreprise avec nos solutions IA de pointe. De la stratégie au déploiement, nous vous accompagnons vers l'excellence technologique.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="/contact" className="px-8 py-4 bg-gradient-to-r from-[#FF5F00] to-[#e55100] text-white font-bold rounded-full text-lg uppercase tracking-wide transition-all duration-400 shadow-[0_20px_50px_rgba(255,95,0,0.4)] hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(255,95,0,0.5)] text-center">
                  Démarrer votre projet IA
                </a>
                <a href="#expertise" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full text-lg uppercase tracking-wide transition-all duration-400 border-2 border-white/30 hover:bg-white/20 hover:-translate-y-1 text-center">
                  Découvrir notre expertise
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-extrabold text-[#FF5F00] mb-1">{stat.number}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                {/* Central circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-[#FF5F00] to-[#e55100] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(255,95,0,0.5)] animate-pulse">
                    <span className="text-6xl">🤖</span>
                  </div>
                </div>

                {/* Orbiting circles */}
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className="absolute inset-0"
                    style={{
                      animation: `orbit ${20 + index * 5}s linear infinite`,
                      animationDelay: `${index * -3}s`
                    }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${index % 2 === 0 ? 'from-[#FF5F00] to-[#e55100]' : 'from-white to-gray-200'} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{technologies[index].icon}</span>
                    </div>
                  </div>
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ animation: 'rotate 30s linear infinite' }}>
                  <circle cx="50%" cy="50%" r="40%" fill="none" stroke="rgba(255,95,0,0.2)" strokeWidth="2" strokeDasharray="5,5"/>
                  <circle cx="50%" cy="50%" r="30%" fill="none" stroke="rgba(255,95,0,0.1)" strokeWidth="1"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Banner */}
      <section className="py-12 px-5 bg-gradient-to-r from-[#00204E] via-[#003875] to-[#00204E] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Technologies & Frameworks de Pointe</h3>
            <p className="text-white/80">Nous maîtrisons les outils les plus avancés de l'IA moderne</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className={`group px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-gradient-to-r ${tech.color} transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_30px_rgba(255,95,0,0.3)]`}
              >
                <span className="text-white font-semibold flex items-center gap-2">
                  <span className="text-xl">{tech.icon}</span>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Cards */}
      <section id="expertise" className="py-24 px-5 bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FF5F00] opacity-5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00204E] opacity-5 blur-[200px] rounded-full"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-[#FF5F00]/10 rounded-full border border-[#FF5F00]/20">
              <span className="text-[#FF5F00] font-semibold text-sm uppercase tracking-wider">Notre Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#00204E] mb-6">
              Des Solutions IA Complètes
              <span className="block text-[#FF5F00] mt-2">Pour Chaque Besoin</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
              De la stratégie à l'implémentation, nous couvrons l'ensemble du spectre de l'intelligence artificielle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,32,78,0.08)] hover:shadow-[0_25px_70px_rgba(0,32,78,0.15)] transition-all duration-500 hover:-translate-y-3"
              >
                {/* Icon */}
                <div className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FF5F00] to-[#e55100] rounded-2xl flex items-center justify-center text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-[#00204E] mb-3 group-hover:text-[#FF5F00] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <ul className="space-y-3">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-[#FF5F00] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-2 bg-gradient-to-r from-[#FF5F00] to-[#e55100] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-5 bg-gradient-to-br from-[#00204E] via-[#001739] to-[#00204E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#FF5F00] rounded-full blur-[250px]"></div>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-[#FF5F00] font-semibold text-sm uppercase tracking-wider">Notre Méthodologie</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Un Processus Éprouvé
              <span className="block text-[#FF5F00] mt-2">Pour Des Résultats Garantis</span>
            </h2>
          </div>

          <div className="space-y-12">
            {process.map((step, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-[#FF5F00] to-[#e55100] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl">{step.icon}</span>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4">{step.description}</p>
                    <div className="inline-block px-4 py-2 bg-white/10 rounded-full">
                      <span className="text-[#FF5F00] font-semibold text-sm">⏱️ {step.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-5 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-[#FF5F00]/10 rounded-full border border-[#FF5F00]/20">
              <span className="text-[#FF5F00] font-semibold text-sm uppercase tracking-wider">Cas d'Usage</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#00204E] mb-6">
              L'IA en Action
              <span className="block text-[#FF5F00] mt-2">Des Résultats Concrets</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-[#f8fafc] to-white p-8 rounded-3xl border border-gray-200 hover:border-[#FF5F00]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,32,78,0.12)] overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  {useCase.icon}
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF5F00] to-[#e55100] rounded-2xl flex items-center justify-center text-3xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {useCase.icon}
                  </div>

                  <h3 className="text-xl font-bold text-[#00204E] mb-3 group-hover:text-[#FF5F00] transition-colors duration-300">
                    {useCase.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    {useCase.description}
                  </p>

                  <div className="inline-block px-4 py-2 bg-[#FF5F00]/10 rounded-full">
                    <span className="text-[#FF5F00] font-bold text-sm">📈 {useCase.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-5 bg-gradient-to-br from-[#00204E] via-[#001739] to-[#000f26] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #FF5F00 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5F00] rounded-full blur-[250px] opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="mb-8 text-7xl animate-bounce">🚀</div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Prêt à Révolutionner Votre Entreprise
            <span className="block text-[#FF5F00] mt-2">Avec l'Intelligence Artificielle ?</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-[800px] mx-auto">
            Rejoignez les entreprises leaders qui ont fait confiance à VIAKDATA pour leur transformation IA. 
            Discutons de votre projet dès aujourd'hui.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="px-12 py-5 bg-gradient-to-r from-[#FF5F00] to-[#e55100] text-white font-bold rounded-full text-xl uppercase tracking-wide transition-all duration-400 shadow-[0_20px_50px_rgba(255,95,0,0.4)] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(255,95,0,0.5)]"
            >
              Démarrer Maintenant
            </a>
            <a
              href="/offers"
              className="px-12 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full text-xl uppercase tracking-wide transition-all duration-400 border-2 border-white/30 hover:bg-white/20 hover:-translate-y-2"
            >
              Voir nos Solutions
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00204E] text-white py-20 px-5 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <img 
                  src="/Viakdata.jpg" 
                  alt="VIAKDATA" 
                  className="h-[42px] w-auto block"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,32,78,0.25))' }}
                />
              </div>
              <p className="text-white/80 leading-relaxed mb-8">Votre partenaire en transformation digitale, intelligence artificielle et valorisation des données.</p>
              <div className="flex gap-4">
                <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#FF5F00] hover:-translate-y-1">in</a>
                <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#FF5F00] hover:-translate-y-1">𝕏</a>
                <a href="mailto:contact@viakdata.fr" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#FF5F00] hover:-translate-y-1">✉</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FF5F00] uppercase tracking-wide mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#FF5F00]">Expertise</h3>
              <ul className="space-y-4">
                <li><a href="/expertise-ia" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Intelligence Artificielle</a></li>
                <li><a href="/expertise-ia" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Machine Learning</a></li>
                <li><a href="/expertise-ia" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">IA Générative</a></li>
                <li><a href="/expertise-ia" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Computer Vision</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FF5F00] uppercase tracking-wide mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#FF5F00]">Solutions</h3>
              <ul className="space-y-4">
                <li><a href="/offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Nos Offres</a></li>
                <li><a href="/offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Automatisation</a></li>
                <li><a href="/offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Data Science</a></li>
                <li><a href="/offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Formation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FF5F00] uppercase tracking-wide mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#FF5F00]">Contact</h3>
              <div className="space-y-4">
                <p className="text-white/80 flex items-center gap-3"><span className="text-[#FF5F00] w-4">✉</span>contact@viakdata.fr</p>
                <p className="text-white/80 flex items-center gap-3"><span className="text-[#FF5F00] w-4">📍</span>Haute-Savoie, France</p>
                <p className="text-white/80 flex items-center gap-3"><span className="text-[#FF5F00] w-4">📞</span>+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-5 text-white/70 text-sm">
            <p>&copy; 2025 VIAKDATA SAS, tous droits réservés</p>
            <div className="flex gap-8 flex-wrap justify-center">
              <a href="#" className="hover:text-[#FF5F00] transition-colors duration-300">Mentions légales</a>
              <a href="#" className="hover:text-[#FF5F00] transition-colors duration-300">Politique de confidentialité</a>
              <a href="#" className="hover:text-[#FF5F00] transition-colors duration-300">CGV</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(200px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(200px) rotate(-360deg);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gridMove {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(50px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default ExpertiseIAPage;