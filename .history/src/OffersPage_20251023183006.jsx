import React, { useState, useEffect } from 'react';

const OffersPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Expertise IA', dropdown: [{ label: 'Notre Approche', href: '#' }, { label: 'Diagnostic Data', href: '#' }, { label: 'Solutions IA', href: '#' }] },
    { label: 'Nos Offres', href: '/offers' },
    { label: 'Contact', href: '/contact' }
  ];

  const offers = [
    {
      id: 1,
      category: 'ia',
      icon: '🤖',
      title: 'Intégration de l\'IA et IA Générative',
      subtitle: 'Transformez votre entreprise avec l\'intelligence artificielle',
      description: 'Nous créons des stratégies d\'intégration d\'IA à fort impact, adaptées à votre organisation. Identification des cas d\'usage les plus pertinents, feuille de route claire et accompagnement de mise en œuvre fluide.',
      features: [
        'Audit complet de vos processus métier',
        'Identification des opportunités d\'IA générative',
        'Développement de solutions IA sur mesure',
        'Formation de vos équipes à l\'IA',
        'Support et maintenance continue'
      ],
      price: 'Sur devis',
      duration: '3-6 mois',
      gradient: 'from-[#FF5F00] to-[#e55100]'
    },
    {
      id: 2,
      category: 'automation',
      icon: '⚡',
      title: 'Automatisation Intelligente',
      subtitle: 'Optimisez vos opérations avec l\'automatisation',
      description: 'Automatisez vos processus répétitifs et libérez le potentiel de vos équipes. De l\'automatisation simple aux workflows intelligents alimentés par l\'IA.',
      features: [
        'Automatisation des processus métier (RPA)',
        'Workflows intelligents avec IA',
        'Intégration avec vos outils existants',
        'Tableaux de bord en temps réel',
        'ROI mesurable et rapide'
      ],
      price: 'À partir de 15K€',
      duration: '1-3 mois',
      gradient: 'from-[#00204E] to-[#003875]'
    },
    {
      id: 3,
      category: 'data',
      icon: '📊',
      title: 'Conseil en Science des Données',
      subtitle: 'Transformez vos données en avantage stratégique',
      description: 'Nos experts vous aident à identifier des insights, optimiser votre prise de décision et accélérer la croissance grâce à des solutions d\'analyse avancée et de machine learning.',
      features: [
        'Stratégie data complète',
        'Modèles prédictifs sur mesure',
        'Data mining et analytics avancés',
        'Visualisation interactive des données',
        'Gouvernance et qualité des données'
      ],
      price: 'Sur devis',
      duration: '2-4 mois',
      gradient: 'from-[#FF5F00] to-[#e55100]'
    },
    {
      id: 4,
      category: 'evaluation',
      icon: '🎯',
      title: 'Évaluation de Préparation à l\'IA',
      subtitle: 'Assurez une transformation IA fluide',
      description: 'Identifiez les lacunes technologiques et d\'infrastructure nécessaires à l\'intégration de l\'IA. Feuille de route stratégique claire pour optimiser l\'intégration et assurer une réussite durable.',
      features: [
        'Audit de maturité IA',
        'Analyse des infrastructures',
        'Roadmap de transformation',
        'Identification des quick wins',
        'Plan de montée en compétences'
      ],
      price: '5K€ - 15K€',
      duration: '2-4 semaines',
      gradient: 'from-[#00204E] to-[#003875]'
    },
    {
      id: 5,
      category: 'training',
      icon: '🎓',
      title: 'Formation en Entreprise',
      subtitle: 'Maîtrisez l\'IA et le Machine Learning',
      description: 'Formations sur mesure pour vos cadres dirigeants, responsables techniques et équipes. Acquérez les connaissances nécessaires pour gérer, diriger et investir en toute confiance dans l\'IA.',
      features: [
        'Formations executives sur l\'IA',
        'Workshops techniques pratiques',
        'Certification en data science',
        'Accompagnement personnalisé',
        'Support post-formation'
      ],
      price: '2K€ - 10K€',
      duration: '1-5 jours',
      gradient: 'from-[#FF5F00] to-[#e55100]'
    },
    {
      id: 6,
      category: 'automation',
      icon: '🔄',
      title: 'Automatisation des Flux de Travail',
      subtitle: 'Simplifiez et accélérez vos processus',
      description: 'Conception et mise en œuvre de workflows automatisés pour éliminer les tâches manuelles, réduire les erreurs et améliorer la productivité de vos équipes.',
      features: [
        'Cartographie des processus',
        'Automatisation end-to-end',
        'Intégration multi-systèmes',
        'Notifications et alertes intelligentes',
        'Reporting automatisé'
      ],
      price: 'À partir de 8K€',
      duration: '1-2 mois',
      gradient: 'from-[#00204E] to-[#003875]'
    },
    {
      id: 7,
      category: 'ia',
      icon: '💡',
      title: 'Solutions IA Personnalisées',
      subtitle: 'Développement d\'applications IA sur mesure',
      description: 'Création de solutions d\'intelligence artificielle adaptées à vos besoins spécifiques : chatbots intelligents, systèmes de recommandation, vision par ordinateur, NLP et plus encore.',
      features: [
        'Analyse de vos besoins spécifiques',
        'Développement d\'algorithmes sur mesure',
        'Intégration dans votre écosystème',
        'Optimisation continue des modèles',
        'Maintenance et évolution'
      ],
      price: 'Sur devis',
      duration: '3-8 mois',
      gradient: 'from-[#FF5F00] to-[#e55100]'
    },
    {
      id: 8,
      category: 'data',
      icon: '🔮',
      title: 'Analytics Prédictifs',
      subtitle: 'Anticipez l\'avenir avec l\'IA prédictive',
      description: 'Utilisez le machine learning pour prédire les tendances, anticiper les problèmes et prendre des décisions proactives basées sur vos données historiques.',
      features: [
        'Modèles de prévision avancés',
        'Détection d\'anomalies',
        'Analyse de sentiment',
        'Prédiction de churn',
        'Optimisation des prix'
      ],
      price: 'À partir de 20K€',
      duration: '2-5 mois',
      gradient: 'from-[#00204E] to-[#003875]'
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes les offres', icon: '🌟' },
    { id: 'ia', label: 'Intelligence Artificielle', icon: '🤖' },
    { id: 'automation', label: 'Automatisation', icon: '⚡' },
    { id: 'data', label: 'Data & Analytics', icon: '📊' },
    { id: 'evaluation', label: 'Audit & Évaluation', icon: '🎯' },
    { id: 'training', label: 'Formation', icon: '🎓' }
  ];

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

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

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-5 bg-gradient-to-br from-[#00204E] via-[#001739] to-[#00204E] overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF5F00] rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FF5F00] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#FF5F00] rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-white rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-[#FF5F00] font-semibold text-sm uppercase tracking-wider">Nos Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Des Solutions IA & Automatisation
            <span className="block text-[#FF5F00] mt-2">Sur Mesure Pour Votre Entreprise</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-[800px] mx-auto leading-relaxed">
            De l'audit data à la création d'applications IA innovantes, nous vous accompagnons à chaque étape de votre transformation digitale.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-24 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 py-6 px-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#FF5F00] to-[#e55100] text-white shadow-[0_8px_24px_rgba(255,95,0,0.3)] scale-105'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#FF5F00] hover:text-[#FF5F00] hover:shadow-md'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF5F00] opacity-5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#00204E] opacity-5 blur-[150px] rounded-full"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer, index) => (
              <div
                key={offer.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,32,78,0.08)] hover:shadow-[0_20px_60px_rgba(0,32,78,0.15)] transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient header */}
                <div className={`h-2 bg-gradient-to-r ${offer.gradient}`}></div>
                
                {/* Card content */}
                <div className="p-8">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${offer.gradient} text-white text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      {offer.icon}
                    </div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${offer.gradient} opacity-20 blur-xl`}></div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#00204E] mb-2 group-hover:text-[#FF5F00] transition-colors duration-300">
                    {offer.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm font-semibold text-[#FF5F00] mb-4">
                    {offer.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {offer.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-[#FF5F00] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price and duration */}
                  <div className="flex items-center justify-between mb-6 pt-6 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tarif</p>
                      <p className="text-lg font-bold text-[#00204E]">{offer.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Durée</p>
                      <p className="text-lg font-bold text-[#00204E]">{offer.duration}</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="/contact"
                    className={`block w-full py-4 text-center bg-gradient-to-r ${offer.gradient} text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,95,0,0.3)] hover:-translate-y-1`}
                  >
                    Demander un devis
                  </a>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${offer.gradient} opacity-5 rounded-bl-[100px] transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-5 bg-gradient-to-br from-[#00204E] via-[#001739] to-[#00204E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5F00] rounded-full blur-[200px]"></div>
        </div>

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            Discutons de votre projet et découvrons ensemble comment nos solutions peuvent accélérer votre croissance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-10 py-5 bg-gradient-to-r from-[#FF5F00] to-[#e55100] text-white font-bold rounded-full text-lg uppercase tracking-wide transition-all duration-400 shadow-[0_15px_40px_rgba(255,95,0,0.3)] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,95,0,0.4)]"
            >
              Demander un audit gratuit
            </a>
            <a
              href="tel:+33123456789"
              className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full text-lg uppercase tracking-wide transition-all duration-400 border-2 border-white/30 hover:bg-white/20 hover:-translate-y-1"
            >
              Nous appeler
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
              <h3 className="text-lg font-bold text-[#FF5F00] uppercase tracking-wide mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#FF5F00]">Solutions</h3>
              <ul className="space-y-4">
                <li><a href="/offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Intelligence Artificielle</a></li>
                <li><a href="/offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Automatisation</a></li>
                <li><a href="/offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Data & Analytics</a></li>
                <li><a href="/offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Formation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FF5F00] uppercase tracking-wide mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-[#FF5F00]">Entreprise</h3>
              <ul className="space-y-4">
                <li><a href="/#savoir" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">À propos</a></li>
                <li><a href="/#ai-impact" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Impact de l'IA</a></li>
                <li><a href="/contact" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Contact</a></li>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default OffersPage;