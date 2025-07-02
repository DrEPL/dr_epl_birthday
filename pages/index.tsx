import React, { useState, useEffect, useRef } from 'react';
import { Star, Gift, MapPin, Calendar, Clock, Phone, Heart, Sparkles, Sun, Moon } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Head from 'next/head';
import Image from 'next/image';

export default function BirthdayInvitation() {
  type TimeLeft = {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    expired?: boolean;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [confettiActive, setConfettiActive] = useState(false);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fireworksQty, setFireworksQty] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-07-13T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ expired: true });
        setFireworksActive(true);
        setConfettiActive(true);
        setTimeout(() => {
          setFireworksActive(false);
          setConfettiActive(false);
        }, 5000);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerConfetti = () => {
    setConfettiActive(true);
    setFireworksActive(true);
    setTimeout(() => {
      setConfettiActive(false);
      setFireworksActive(false);
    }, 4000);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const qty = window.innerWidth < 768 ? 10 : 20;
    setFireworksQty(qty);
  }, []);

  // Thèmes
  const themes = {
    dark: {
      bg: "min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800",
      cardBg: "bg-gradient-to-br from-gray-900/60 to-black/70 backdrop-blur-2xl",
      sectionBg: "bg-gradient-to-r from-gray-800/40 to-gray-900/50",
      timerBg: "bg-gradient-to-r from-gray-800/40 to-gray-900/50 backdrop-blur-lg",
      timerItemBg: "bg-gradient-to-b from-gray-700 to-gray-800",
      textPrimary: "text-white",
      textSecondary: "text-gray-100",
      textMuted: "text-gray-300",
      border: "border-yellow-500/30",
      cardBorder: "border-yellow-400/40",
      starColor: "text-yellow-400"
    },
    light: {
      bg: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50",
      cardBg: "bg-gradient-to-br from-white/90 to-yellow-50/80 backdrop-blur-2xl",
      sectionBg: "bg-gradient-to-r from-yellow-50/60 to-white/70",
      timerBg: "bg-gradient-to-r from-white/80 to-yellow-50/60 backdrop-blur-lg",
      timerItemBg: "bg-gradient-to-b from-yellow-100 to-yellow-200",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-800",
      textMuted: "text-gray-600",
      border: "border-yellow-400/60",
      cardBorder: "border-yellow-500/50",
      starColor: "text-yellow-500"
    }
  };

  const currentTheme = themes[isDarkMode ? 'dark' : 'light'];

  return (
    <>
      <Head>
        <title>Dr_EPL's Birthday - 13/07/2025</title>
        <meta name="description" content="Célébration des 15 ans d'existence du Dr EPL le 13 Juillet 2025" />
        <link rel="canonical" href="https://drepl.cg" />
      </Head>
      <div className={`${currentTheme.bg} relative overflow-hidden transition-all duration-500`}>
        {/* Theme Toggle Button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'} shadow-lg transform hover:scale-110 transition-all duration-300 border-2 ${isDarkMode ? 'border-yellow-500' : 'border-gray-700'}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-pulse ${isDarkMode ? 'opacity-20' : 'opacity-30'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <Star className={`w-4 h-4 md:w-6 md:h-6 ${currentTheme.starColor}`} />
            </div>
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-bounce ${isDarkMode ? 'opacity-40' : 'opacity-60'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Mouse Follower Effect - Hidden on mobile */}
        <div
          className={`hidden md:block fixed w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full pointer-events-none ${isDarkMode ? 'opacity-30' : 'opacity-40'} blur-sm transition-all duration-100 ease-out z-40`}
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${1 + Math.sin(Date.now() * 0.005) * 0.3})`
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative">
                <div className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-clip rounded-full mx-auto border-4 border-yellow-400 shadow-2xl transform transition-all duration-500 bg-gradient-to-br
                 from-yellow-400 to-amber-600 flex items-center justify-center hover:scale-150 ${isActive ? 'scale-150' : 'scale-100'}`
                }
                  onMouseDown={() => setIsActive(true)}
                  onMouseUp={() => setIsActive(false)}
                  onTouchStart={() => setIsActive(true)}
                  onTouchEnd={() => setIsActive(false)}
                >
                  <Image
                    src="/drepl.jpg"
                    alt="Photo du Dr EPL"
                    width={160}
                    height={160}
                    priority
                  />
                </div>
              </div>
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 sm:mt-8 ${currentTheme.textPrimary} leading-tight min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col items-center justify-center`}>
              <div className="flex flex-col justify-center gap-0 items-center">
                <span className="typewriter-text">
                  {!timeLeft.expired ? "Bientôt l'anniversaire " : "C'est l'anniversaire "}
                </span>
                <TypeAnimation className='bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent py-10 px-2 !font-normal'
                  sequence={[
                    " du Dr EPL !",
                    2000,
                    " de Dolnick !",
                    2000,
                    " de Prudhome !",
                    2000,
                    " du Docteur !",
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Amalfi Coast', sans-serif",
                    marginTop: '-35px'
                  }}
                  repeat={Infinity}
                />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl mt-2">🎉</div>
            </h1>

            <div className={`text-lg sm:text-xl md:text-2xl mt-4 font-mono bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent px-4`}>
              15 ans d'existence ainsi que n+1 années d'expérience
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8 sm:mb-12">
            <div className={`max-w-4xl mx-auto ${currentTheme.timerBg} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 ${currentTheme.border} shadow-2xl`}>
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent flex items-center justify-center gap-2`}>
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
                Compte à rebours Tic Tac
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
              </h2>

              {timeLeft.expired ? (
                <div className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 animate-bounce">
                  🎉 C'est AUJOURD'HUI !!! 🎉
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
                  {[
                    { label: 'Jours', value: timeLeft.days },
                    { label: 'Heures', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Secondes', value: timeLeft.seconds }
                  ].map((unit, index) => (
                    <div key={unit.label} className={`${currentTheme.timerItemBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 transform hover:scale-105 transition-all duration-300 ${currentTheme.cardBorder}`}>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2 animate-pulse">
                        {unit.value || 0}
                      </div>
                      <div className={`text-xs sm:text-sm md:text-base ${currentTheme.textMuted} font-semibold`}>{unit.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className={`max-w-4xl mx-auto ${currentTheme.cardBg} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 ${currentTheme.border} shadow-2xl`}>

            {/* Introduction */}
            <div className={`mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed ${currentTheme.textSecondary}`}>
              <p className="mb-4 text-center font-semibold">Bonjour mes chers patients,</p>

              <p className="mb-4 text-center sm:text-left">
                Dans <span className="text-yellow-400 font-bold">{timeLeft.days || 0}</span> {(timeLeft.days || 0) === 1 ? "jour" : "jours"}, nous célébrerons un grand événement.
                <span className="text-yellow-400 font-bold text-lg sm:text-xl animate-pulse block sm:inline mt-2 sm:mt-0"> L'anniversaire du Dr EPL !</span>
              </p>
            </div>

            {/* Gifts Section */}
            <div className="mb-6 sm:mb-8">
              <div className={`${currentTheme.sectionBg} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 ${currentTheme.cardBorder}`}>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
                  Section Cadeaux
                </h3>

                <p className={`mb-4 text-sm sm:text-base ${currentTheme.textSecondary}`}>
                  Pas besoin de m'offrir une villa, ni une Voiture autonome Tesla, je n'aime pas le lucre, ni le luxe.
                  Je suis quelqu'un de très simple : je préfère les <span className="text-red-500 font-bold">Ferrari</span> 😁.
                </p>

                <p className={`mb-4 italic text-sm sm:text-base ${currentTheme.textMuted}`}>
                  Je ne vous oblige pas à ne pas m'envoyer de l'argent…<br />
                  Mais bon 😅, puisque vous insistez pour m'offrir quelque chose, je reste ouvert d'esprit :
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  {[
                    { icon: '💵', text: 'Argent liquide ? Je prends !', color: isDarkMode ? 'from-gray-600 to-gray-700' : 'from-yellow-100 to-yellow-200' },
                    { icon: '📱', text: 'Mobile money ? Bienvenue !', color: isDarkMode ? 'from-gray-600 to-gray-700' : 'from-yellow-100 to-yellow-200' },
                    { icon: '🏦', text: 'Virement bancaire ? Avec plaisir !', color: isDarkMode ? 'from-gray-600 to-gray-700' : 'from-yellow-100 to-yellow-200' },
                    { icon: '🪙', text: 'Cryptomonnaie ? Je reçois aussi… 😁', color: isDarkMode ? 'from-gray-600 to-gray-700' : 'from-yellow-100 to-yellow-200' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r ${item.color} bg-opacity-30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 ${currentTheme.cardBorder} transform hover:scale-105 transition-all duration-300`}
                    >
                      <span className="text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3">{item.icon}</span>
                      <span className={`${currentTheme.textPrimary} font-semibold text-sm sm:text-base`}>{item.text}</span>
                    </div>
                  ))}
                </div>

                <p className={`text-xs sm:text-sm ${currentTheme.textMuted} italic`}>
                  Même si c'est argent prévu pour l'épargne, la popote, le loyer, le mariage, la rançon...
                  envoyez d'abord, je vous renverrai avec un pourcentage 😁
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="mb-6 sm:mb-8">
              <div className={`${currentTheme.sectionBg} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 ${currentTheme.cardBorder}`}>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-yellow-400 flex items-center gap-2">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  Détails de l'événement
                </h3>

                <div className={`space-y-3 sm:space-y-4 text-sm sm:text-base ${currentTheme.textSecondary}`}>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <span className="font-bold text-yellow-400">Dimanche</span> 13 Juillet 2025
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-normal">
                  {/* <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" /> */}
                  <span className="font-bold text-yellow-400">Couper le gâteau </span>
                  <p className="flex flex-col items-center gap-2">
                    n'a jamais tué quelqu'un.
                  </p>
                  </div>

                  <div className={`${isDarkMode ? 'bg-red-800/30 border-red-500/40' : 'bg-red-100/60 border-red-400/60'} rounded-lg sm:rounded-xl p-3 sm:p-4 border`}>
                    <p className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} font-bold text-sm sm:text-base`}>
                      ⚠️ ATTENTION : La personne qui rate mon gâteau 🍰 : <span className={`${isDarkMode ? 'text-red-300' : 'text-red-500'}`}>yama amel ben gâteau</span> 😁‼
                      <br className="hidden sm:block" />
                      <span className="block sm:inline mt-1 sm:mt-0">Oui c'est une menace 😅</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button
                onClick={triggerConfetti}
                className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black font-bold py-3 px-6 sm:py-4 sm:px-8 md:px-12 rounded-full text-base sm:text-lg md:text-xl transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 animate-pulse w-full sm:w-auto"
              >
                🎉 Je confirme ma présence ! 🎉
              </button>

              <div className="mt-6 sm:mt-8 space-y-2">
                <p className="text-yellow-400 font-bold text-lg sm:text-xl flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                  Please, soyez les bienvêtus 🙏🏾
                </p>
                <p className={`${currentTheme.textMuted} italic text-sm sm:text-base`}>ABC toujours (Aspect, Beauté, Charisme)</p>
                <p className="text-yellow-400 font-bold text-base sm:text-lg">~Dr_EPL ✍🏽</p>
              </div>
            </div>

            {/* Thanks Section */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-yellow-400 font-bold mb-4 text-base sm:text-lg">
                Merci à vous mes patients, sans vous je ne suis rien.
              </p>

              <div className={`${currentTheme.sectionBg} rounded-lg sm:rounded-xl p-4 sm:p-6 ${currentTheme.cardBorder}`}>
                <p className={`${currentTheme.textSecondary} text-sm sm:text-base`}>
                  Pas de souhaits utopiques, venez avec :
                  <span className="text-yellow-400 font-bold block sm:inline mt-1 sm:mt-0"> votre bonne humeur, humour, appétit… et les cadeaux évoqués plus haut 😇</span>
                </p>
              </div>
            </div>
          </div>

          {/* Confetti Effect */}
          {confettiActive && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-lg sm:text-xl md:text-2xl animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                >
                  {['🎉', '🎊', '🎂', '🎁', '✨', '🌟', '💖', '🎈'][Math.floor(Math.random() * 8)]}
                </div>
              ))}
            </div>
          )}

          {/* Fireworks Effect */}
          {fireworksActive && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {[...Array(fireworksQty)].map((_, i) => (
                <div
                  key={`firework-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  <div className="relative">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full animate-ping"></div>
                    {[...Array(6)].map((_, sparkIndex) => (
                      <div
                        key={sparkIndex}
                        className="absolute w-0.5 h-3 sm:w-1 sm:h-4 md:w-1 md:h-6 bg-gradient-to-t from-yellow-400 to-amber-500 opacity-80 animate-pulse"
                        style={{
                          transform: `rotate(${sparkIndex * 60}deg) translateY(-15px)`,
                          transformOrigin: 'bottom center',
                          animationDelay: `${sparkIndex * 0.1}s`,
                          animationDuration: '1.5s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}