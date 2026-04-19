import React, { useState, useEffect } from 'react';
import {
  Star,
  Gift,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Sparkles,
  Sun,
  Moon,
  PartyPopper,
  Cake,
  Banknote,
  Smartphone,
  Building2,
  Coins,
  AlertTriangle,
  HandHeart,
  PenLine,
  Check,
  Trophy,
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Head from 'next/head';
import Image from 'next/image';


// ─── Types ────────────────────────────────────────────────────────
type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  expired?: boolean;
};

// ─── Theme Definitions ────────────────────────────────────────────
const themes = {
  dark: {
    bg: 'bg-[#080b12]',
    bgGradient: 'from-[#080b12] via-[#0d1117] to-[#080b12]',
    cardBg: 'bg-white/[0.03] border border-amber-500/[0.12]',
    sectionBg: 'bg-white/[0.02] border border-amber-500/10',
    timerBg: 'bg-white/[0.03] border border-amber-500/[0.12]',
    timerItemBg: 'bg-white/[0.05] border border-amber-500/20',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-200',
    textMuted: 'text-gray-400',
    iconMuted: 'text-amber-400/70',
    toggleBg: 'bg-amber-400 text-gray-900',
    toggleBorder: 'border-amber-500/50',
    warningBg: 'bg-red-950/40 border-red-500/30',
    warningText: 'text-red-400',
    warningSubText: 'text-red-300',
    starOpacity: 'opacity-[0.12]',
    particleOpacity: 'opacity-30',
  },
  light: {
    bg: 'bg-[#fafaf7]',
    bgGradient: 'from-[#fefce8] via-[#fafaf7] to-[#fef9ec]',
    cardBg: 'bg-white/80 border border-amber-400/30',
    sectionBg: 'bg-amber-50/60 border border-amber-300/30',
    timerBg: 'bg-white/80 border border-amber-400/30',
    timerItemBg: 'bg-amber-50 border border-amber-200/60',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    iconMuted: 'text-amber-600/70',
    toggleBg: 'bg-gray-900 text-amber-400',
    toggleBorder: 'border-gray-700/50',
    warningBg: 'bg-red-50 border-red-300/50',
    warningText: 'text-red-600',
    warningSubText: 'text-red-500',
    starOpacity: 'opacity-[0.15]',
    particleOpacity: 'opacity-50',
  },
};

// ─── Gift Items ───────────────────────────────────────────────────
const giftItems = [
  { icon: Banknote, label: 'Argent liquide', sub: 'Je prends !', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20' },
  { icon: Smartphone, label: 'Mobile money', sub: 'Bienvenue !', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20' },
  { icon: Building2, label: 'Virement bancaire', sub: 'Avec plaisir !', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20' },
  { icon: Coins, label: 'Cryptomonnaie', sub: 'Je reçois aussi', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/20' },
];

// ─── Confetti Launcher ────────────────────────────────────────────
async function launchConfetti() {
  if (typeof window === 'undefined') return;
  const confetti = (await import('canvas-confetti')).default;
  const duration = 4000;
  const end = Date.now() + duration;
  const colors = ['#f59e0b', '#fcd34d', '#fbbf24', '#ffffff', '#d97706'];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
      zIndex: 9999,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();

  // Central burst
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors,
    zIndex: 9999,
    scalar: 1.2,
  });
}

// ─── Timer Block ──────────────────────────────────────────────────
function TimerBlock({ value, label, isDark }: { value: number; label: string; isDark: boolean }) {
  const t = themes[isDark ? 'dark' : 'light'];
  return (
    <div
      className={`${t.timerItemBg} rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col items-center backdrop-blur-sm transition-transform duration-300 hover:scale-105`}
    >
      <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text leading-none tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className={`text-xs sm:text-sm font-semibold uppercase tracking-widest mt-2 ${t.textMuted}`}>
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function BirthdayInvitation() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const t = themes[isDarkMode ? 'dark' : 'light'];

  // ── Countdown ────────────────────────────────────────────────
  useEffect(() => {
    const targetDate = new Date('2026-07-13T00:00:00').getTime();
    const update = () => {
      const dist = targetDate - Date.now();
      if (dist <= 0) {
        setTimeLeft({ expired: true });
        launchConfetti();
        return;
      }
      setTimeLeft({
        days: Math.floor(dist / 86400000),
        hours: Math.floor((dist % 86400000) / 3600000),
        minutes: Math.floor((dist % 3600000) / 60000),
        seconds: Math.floor((dist % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Mouse Tracker ────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleConfirm = () => {
    setHasConfirmed(true);
    launchConfetti();
  };

  return (
    <>
      <Head>
        <title>Dr_EPL&apos;s Birthday — 13/07/2025</title>
        <meta name="description" content="Célébration des 15 ans d'existence du Dr EPL le 13 Juillet 2025" />
        <link rel="canonical" href="https://drepl.cg" />
      </Head>

      <div
        className={`min-h-screen bg-gradient-to-br ${t.bgGradient} ${t.bg} relative overflow-hidden transition-colors duration-500`}
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        {/* ── Background Stars ──────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${t.starOpacity}`}
              style={{
                left: `${(i * 37 + 7) % 100}%`,
                top: `${(i * 53 + 11) % 100}%`,
                animationDelay: `${(i * 0.4) % 3}s`,
              }}
            >
              <Star
                className="animate-pulse"
                style={{ width: i % 3 === 0 ? 8 : 12, height: i % 3 === 0 ? 8 : 12, color: '#f59e0b' }}
              />
            </div>
          ))}
        </div>

        {/* ── Mouse Follower ────────────────────────────────────── */}
        <div
          className="hidden md:block fixed w-5 h-5 rounded-full pointer-events-none z-40 mix-blend-screen"
          style={{
            left: mousePos.x - 10,
            top: mousePos.y - 10,
            background: 'radial-gradient(circle, rgba(251,191,36,0.6) 0%, transparent 70%)',
            filter: 'blur(4px)',
            transition: 'left 0.08s ease-out, top 0.08s ease-out',
          }}
        />

        {/* ── Theme Toggle ──────────────────────────────────────── */}
        <div className="fixed top-5 right-5 z-50">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full ${t.toggleBg} border ${t.toggleBorder} shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95`}
            aria-label="Changer le thème"
          >
            {isDarkMode
              ? <Sun className="w-4 h-4" />
              : <Moon className="w-4 h-4" />
            }
          </button>
        </div>

        {/* ── Main Content ──────────────────────────────────────── */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-3xl">

          {/* ── Hero ────────────────────────────────────────────── */}
          <header className="text-center mb-10 sm:mb-14 animate-fade-in-up">

            {/* Avatar */}
            <div className="relative inline-block mb-6 group">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-glow-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)',
                  transform: 'scale(1.3)',
                }}
              />
              {/* Spinning ring */}
              <div
                className="absolute -inset-1.5 rounded-full border-2 border-dashed border-amber-400/40 animate-spin-slow"
              />
              <div
                className={`w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-[3px] border-amber-400/60 shadow-2xl cursor-pointer transition-transform duration-500 ${isAvatarActive ? 'scale-150' : 'scale-100'} hover:scale-110`}
                onMouseDown={() => setIsAvatarActive(true)}
                onMouseUp={() => setIsAvatarActive(false)}
                onTouchStart={() => setIsAvatarActive(true)}
                onTouchEnd={() => setIsAvatarActive(false)}
              >
                <Image
                  src="/drepl.jpg"
                  alt="Photo du Dr EPL"
                  width={160}
                  height={160}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${t.textPrimary} leading-tight`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {!timeLeft.expired ? 'Bientôt l\'anniversaire' : 'C\'est l\'anniversaire'}
              <span className="block mt-1">
                <TypeAnimation
                  sequence={[
                    ' du Dr EPL !', 2000,
                    ' de Dolnick !', 2000,
                    ' de Prudhome !', 2000,
                    ' du Docteur !', 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  style={{ fontFamily: "'Amalfi Coast', sans-serif" }}
                  className="shimmer-text text-4xl sm:text-5xl md:text-6xl"
                />
              </span>
            </h1>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className={`text-sm sm:text-base font-medium ${t.textSecondary}`}>
                15 ans d'existence · n+1 années d'expérience
              </span>
            </div>
          </header>

          {/* ── Countdown ───────────────────────────────────────── */}
          <section
            className={`${t.timerBg} rounded-3xl p-5 sm:p-7 md:p-8 mb-8 sm:mb-10 backdrop-blur-xl shadow-2xl animate-fade-in-up`}
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className={`text-base sm:text-lg font-semibold uppercase tracking-widest text-center mb-5 flex items-center justify-center gap-2 ${t.textMuted}`}>
              <Clock className="w-4 h-4 text-amber-400" />
              Compte à rebours
              <Clock className="w-4 h-4 text-amber-400" />
            </h2>

            {timeLeft.expired ? (
              <div className="text-center py-4">
                <PartyPopper className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-bounce" />
                <p className="text-2xl sm:text-3xl font-extrabold gradient-text">
                  C&apos;est AUJOURD&apos;HUI !!!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: 'Jours', value: timeLeft.days ?? 0 },
                  { label: 'Heures', value: timeLeft.hours ?? 0 },
                  { label: 'Minutes', value: timeLeft.minutes ?? 0 },
                  { label: 'Secondes', value: timeLeft.seconds ?? 0 },
                ].map((unit) => (
                  <TimerBlock key={unit.label} value={unit.value} label={unit.label} isDark={isDarkMode} />
                ))}
              </div>
            )}
          </section>

          {/* ── Main Card ───────────────────────────────────────── */}
          <main
            className={`${t.cardBg} rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-xl shadow-2xl animate-fade-in-up`}
            style={{ animationDelay: '0.2s' }}
          >
            {/* Intro */}
            <div className={`mb-7 sm:mb-9 text-base sm:text-lg leading-relaxed ${t.textSecondary}`}>
              <p className="text-center font-semibold mb-3">Bonjour mes chers patients,</p>
              <p className="text-center sm:text-left">
                Dans{' '}
                <span className="font-bold text-amber-400">{timeLeft.days ?? 0}</span>{' '}
                {(timeLeft.days ?? 0) === 1 ? 'jour' : 'jours'}, nous célébrerons un grand événement —{' '}
                <span className="font-bold text-amber-400">L&apos;anniversaire du Dr EPL !</span>
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-amber-500/10 mb-7 sm:mb-9" />

            {/* ── Gifts Section ─────────────────────────────────── */}
            <section className={`${t.sectionBg} rounded-2xl p-5 sm:p-7 mb-7 sm:mb-9 backdrop-blur-sm`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-1 flex items-center gap-2 gradient-text`}>
                <Gift className="w-5 h-5 text-amber-400 flex-shrink-0" />
                Section Cadeaux
              </h3>
              <p className={`text-xs sm:text-sm ${t.textMuted} mb-5 ml-7`}>
                Parce que vous insistez…
              </p>

              <p className={`mb-4 text-sm sm:text-base ${t.textSecondary}`}>
                Pas besoin de m&apos;offrir une villa ni une Tesla autonome — je n&apos;aime pas le lucre, ni le luxe.
                Je suis quelqu&apos;un de très simple : je préfère les{' '}
                <span className="text-red-500 font-bold">Ferrari</span>.
              </p>

              <p className={`mb-5 italic text-sm sm:text-base ${t.textMuted}`}>
                Je ne vous oblige pas à ne pas m&apos;envoyer de l&apos;argent…
                Mais puisque vous insistez, je reste ouvert d&apos;esprit :
              </p>

              {/* Gift Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {giftItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`bg-gradient-to-br ${item.color} border rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default`}
                    >
                      <div className="p-2 rounded-lg bg-white/10 flex-shrink-0">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${t.textPrimary}`}>{item.label}</p>
                        <p className={`text-xs ${t.textMuted}`}>{item.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className={`text-xs sm:text-sm ${t.textMuted} italic`}>
                Même si c&apos;est l&apos;argent prévu pour l&apos;épargne, la popote, le loyer, le mariage, la rançon…
                envoyez d&apos;abord, je vous renverrai avec un pourcentage.
              </p>
            </section>

            {/* ── Event Details ─────────────────────────────────── */}
            <section className={`${t.sectionBg} rounded-2xl p-5 sm:p-7 mb-7 sm:mb-9 backdrop-blur-sm`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-5 flex items-center gap-2 gradient-text`}>
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                Détails de l&apos;événement
              </h3>

              <div className={`space-y-4 text-sm sm:text-base ${t.textSecondary}`}>
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  </div>
                  <p>
                    <span className="font-bold text-amber-400">Dimanche</span>{' '}
                    13 Juillet 2025
                  </p>
                </div>

                {/* Cake */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 flex-shrink-0 mt-0.5">
                    <Cake className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  </div>
                  <p>
                    <span className="font-bold text-amber-400">Couper le gâteau</span>{' '}
                    n&apos;a jamais tué quelqu&apos;un.
                  </p>
                </div>

                {/* Warning */}
                <div className={`${t.warningBg} border rounded-xl p-4 flex items-start gap-3`}>
                  <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${t.warningText}`} />
                  <div>
                    <p className={`font-bold text-sm sm:text-base ${t.warningText}`}>
                      ATTENTION : La personne qui rate mon gâteau :{' '}
                      <span className={t.warningSubText}>yama amel ben gâteau</span>
                    </p>
                    <p className={`text-xs sm:text-sm mt-1 ${t.warningSubText}`}>
                      Oui, c&apos;est une menace.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────── */}
            <div className="text-center">
              <button
                onClick={handleConfirm}
                className={`relative inline-flex items-center gap-2 px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg text-gray-900 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 active:scale-95 ${hasConfirmed ? 'opacity-80' : ''} overflow-hidden group`}
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                {hasConfirmed
                  ? <><Check className="w-5 h-5" /> Présence confirmée !</>
                  : <><PartyPopper className="w-5 h-5" /> Je confirme ma présence !</>
                }
              </button>

              <div className="mt-7 space-y-2">
                <p className={`font-semibold text-base sm:text-lg flex items-center justify-center gap-2 text-amber-400`}>
                  <HandHeart className="w-5 h-5" />
                  Please, soyez les bienvênus
                </p>
                <p className={`${t.textMuted} italic text-sm sm:text-base`}>
                  ABC toujours (Aspect, Beauté, Charisme)
                </p>
                <p className="text-amber-400 font-bold text-sm sm:text-base flex items-center justify-center gap-1">
                  <PenLine className="w-4 h-4" />
                  Dr_EPL
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-amber-500/10 mt-7 sm:mt-9 mb-6 sm:mb-7" />

            {/* ── Thanks ────────────────────────────────────────── */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-amber-400 fill-amber-400" />
                <p className={`font-bold text-sm sm:text-base text-amber-400`}>
                  Merci à vous mes patients, sans vous je ne suis rien.
                </p>
                <Heart className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>

              <div className={`${t.sectionBg} rounded-xl p-4 sm:p-5 border inline-block max-w-md`}>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className={`${t.textSecondary} text-sm sm:text-base text-left`}>
                    Pas de souhaits utopiques, venez avec :{' '}
                    <span className="text-amber-400 font-bold">
                      votre bonne humeur, humour, appétit… et les cadeaux évoqués plus haut.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className={`text-center mt-8 pb-8 ${t.textMuted} text-xs sm:text-sm`}>
            <p>
              Fait avec{' '}
              <Heart className="w-3 h-3 inline text-amber-400 fill-amber-400 mx-0.5" />
              pour le Dr EPL — 13 Juillet 2025
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}