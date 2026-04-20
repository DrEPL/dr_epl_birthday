import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]/30 mt-20">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading font-bold text-2xl tracking-wide">
                Dr<span className="text-[var(--accent-teal)]">.</span> EPL
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed">
              Ingénieur IA & Big Data passionné par le développement de solutions intelligentes et innovantes, adaptées aux réalités africaines.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://github.com/DrEPL" target="_blank" rel="noopener noreferrer" className="p-2 bg-[var(--bg-surface)] rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-teal)] hover:bg-[var(--bg-deep)] transition-colors border border-[var(--border)]">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/dolnick-prudhome-enzanza-024159246" target="_blank" rel="noopener noreferrer" className="p-2 bg-[var(--bg-surface)] rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-teal)] hover:bg-[var(--bg-deep)] transition-colors border border-[var(--border)]">
                <Linkedin size={18} />
              </a>
              <a href="mailto:dolnickenzanza@gmail.com" className="p-2 bg-[var(--bg-surface)] rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-teal)] hover:bg-[var(--bg-deep)] transition-colors border border-[var(--border)]">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-[var(--text-primary)]">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors text-sm">Accueil</Link></li>
              <li><Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors text-sm">À Propos</Link></li>
              <li><Link href="/services" className="text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors text-sm">Services</Link></li>
              <li><Link href="/portfolio" className="text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors text-sm">Portfolio</Link></li>
              <li><Link href="/contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-[var(--text-primary)]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <Mail className="w-5 h-5 text-[var(--accent-teal)] flex-shrink-0" />
                <a href="mailto:dolnickenzanza@gmail.com" className="hover:text-[var(--accent-teal)] transition-colors">
                  dolnickenzanza@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <Phone className="w-5 h-5 text-[var(--accent-teal)] flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="https://wa.me/221784518582" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-teal)] transition-colors">
                    +221 78 451 85 82 (WhatsApp)
                  </a>
                  <a href="https://wa.me/242069462886" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-teal)] transition-colors">
                    +242 06 946 28 86 (WhatsApp)
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <MapPin className="w-5 h-5 text-[var(--accent-teal)] flex-shrink-0" />
                <span>Dakar, Sénégal<br/>(Disponible en remote)</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[var(--border)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-muted)] text-sm">
            &copy; {currentYear} Dr EPL. Tous droits réservés.
          </p>
          <p className="text-[var(--text-muted)] text-xs flex items-center gap-1">
            Construit avec Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
