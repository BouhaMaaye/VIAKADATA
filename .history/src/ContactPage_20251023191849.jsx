import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const ContactPage = () => {
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-5 bg-gradient-to-br from-[#00204E] via-[#001739] to-[#00204E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FF5F00] rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FF5F00] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-[700px] mx-auto">
            Prêt à transformer vos données en avantage compétitif ? Parlons de votre projet.
          </p>
        </div>
      </section>

      {/* Contact Section - Split Layout */}
      <section className="py-20 px-5 bg-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Left Side - Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#00204E] mb-6">
                  Prêt à mettre l'IA au service de votre entreprise ?
                </h2>
                <p className="text-base text-gray-600 leading-relaxed mb-8">
                  Contactez-nous pour découvrir comment nos services de conseil en IA et en machine learning peuvent vous aider à faire progresser votre stratégie d'IA.
                </p>
              </div>

              {/* Informations de contact */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-2xl border border-gray-200 hover:border-[#FF5F00]/30 transition-all duration-300 hover:shadow-lg group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FF5F00] to-[#e55100] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00204E] mb-1">Email</h3>
                    <a href="mailto:contact@viakdata.fr" className="text-gray-600 hover:text-[#FF5F00] transition-colors">
                      contact@viakdata.fr
                    </a>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-2xl border border-gray-200 hover:border-[#FF5F00]/30 transition-all duration-300 hover:shadow-lg group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00204E] to-[#003875] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00204E] mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-gray-600 hover:text-[#FF5F00] transition-colors">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>

                {/* Localisation */}
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-2xl border border-gray-200 hover:border-[#FF5F00]/30 transition-all duration-300 hover:shadow-lg group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FF5F00] to-[#e55100] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00204E] mb-1">Localisation</h3>
                    <p className="text-gray-600">Haute-Savoie, France</p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-2xl border border-gray-200 hover:border-[#FF5F00]/30 transition-all duration-300 hover:shadow-lg group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00204E] to-[#003875] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00204E] mb-1">Disponibilité</h3>
                    <p className="text-gray-600">Lun - Ven: 9h - 18h</p>
                    <p className="text-sm text-gray-500 mt-1">Réponse sous 24-48h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[#f8fafc] to-white p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,32,78,0.1)] border border-gray-200">
                <h3 className="text-2xl font-bold text-[#00204E] mb-6">Envoyez-nous un message</h3>
                
                <form className="space-y-5">
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
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Rôle et Entreprise sur la même ligne */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                        Votre rôle <span className="text-[#FF5F00]">*</span>
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                        Entreprise <span className="text-[#FF5F00]">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Nombre d'employés */}
                  <div>
                    <label htmlFor="employees" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre d'employés
                    </label>
                    <select
                      id="employees"
                      name="employees"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  {/* Parcours vers l'IA */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Où en êtes-vous dans votre parcours vers l'IA ?
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start cursor-pointer group p-3 rounded-xl hover:bg-white/50 transition-colors">
                        <input
                          type="radio"
                          name="ai-journey"
                          value="explorer"
                          className="mt-1 w-4 h-4 text-[#FF5F00] focus:ring-[#FF5F00]"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          <strong className="text-[#00204E]">Exploratoire</strong> – On y réfléchit, pas encore d'adhésion
                        </span>
                      </label>
                      <label className="flex items-start cursor-pointer group p-3 rounded-xl hover:bg-white/50 transition-colors">
                        <input
                          type="radio"
                          name="ai-journey"
                          value="execute"
                          className="mt-1 w-4 h-4 text-[#FF5F00] focus:ring-[#FF5F00]"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          <strong className="text-[#00204E]">Prêt à exécuter</strong> – Nous souhaitons nous lancer
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Votre message <span className="text-[#FF5F00]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      placeholder="Décrivez-nous votre projet et vos besoins en IA..."
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5F00] focus:border-transparent transition-all duration-300 resize-none"
                    ></textarea>
                  </div>

                  {/* Bouton de soumission */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-br from-[#FF5F00] to-[#e55100] text-white rounded-xl font-bold text-base uppercase tracking-wide transition-all duration-400 shadow-[0_10px_30px_rgba(255,95,0,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,95,0,0.4)]"
                    >
                      Envoyer ma demande
                    </button>
                  </div>
                </form>
              </div>
            </div>

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
                  src="public/Viakdata.jpg" 
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
                <li><a href="/#offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Conseil & Audit Data</a></li>
                <li><a href="/#offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Développement IA</a></li>
                <li><a href="/#offers" className="text-white/80 hover:text-[#FF5F00] transition-all duration-300 hover:translate-x-1 inline-block">Formation & Accompagnement</a></li>
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
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        .border-3 { border-width: 3px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default ContactPage;