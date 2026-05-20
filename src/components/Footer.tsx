import { Zap, Phone, Mail, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const { dark } = useTheme();
  const navigate = (page: string) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const bg      = dark ? '#05080f' : '#0d1f5c';
  const border  = dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)';
  const muted   = dark ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.65)';
  const social  = ['Facebook', 'Instagram', 'Twitter', 'YouTube'];
  const letters = ['f', 'in', 'tw', '▶'];

  return (
    <footer style={{ background: bg, color: 'white', transition: 'background 0.3s' }}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,166,81,0.2)', border: '2px solid #00A651' }}>
                <Zap size={22} color="#00A651" fill="#00A651" />
              </div>
              <div>
                <div className="font-poppins font-black text-lg" style={{ color: '#00A651', lineHeight: 1.1 }}>AYIHA BOOST</div>
                <div className="text-xs font-bold tracking-widest" style={{ color: '#93c5fd' }}>BEN/AFRICA</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: muted }}>
              Le premier réseau de relais digitaux couvrant les 77 communes du Bénin. Boostez votre présence digitale avec nous.
            </p>
            <div className="flex gap-3">
              {social.map((label, i) => (
                <a key={label} href="#" aria-label={label} title={label} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all text-xs font-bold" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#00A651'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  {letters[i]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-base mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[{id:'home',label:'Accueil'},{id:'offers',label:'Nos Offres'},{id:'about',label:'À Propos'},{id:'join',label:'Rejoindre'},{id:'contact',label:'Contact'}].map(item => (
                <li key={item.id}>
                  <button onClick={() => navigate(item.id)} className="text-sm transition-colors" style={{ color: muted, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00A651')}
                    onMouseLeave={e => (e.currentTarget.style.color = muted)}
                  >
                    → {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-base mb-5">Nos Formules</h4>
            <ul className="space-y-3">
              {[
                { label: '⬡ Starter — 15 000 FCFA', color: '#9ca3af' },
                { label: '★ Pro — 35 000 FCFA',       color: '#00A651' },
                { label: '◆ Premium — 75 000 FCFA',   color: '#FF6B00' },
                { label: '→ Espace Relais',            color: muted },
                { label: '→ Espace CEO',               color: muted },
              ].map(item => (
                <li key={item.label}><span className="text-sm" style={{ color: item.color }}>{item.label}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/22901562020" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm transition-colors" style={{ color: muted, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                  onMouseLeave={e => (e.currentTarget.style.color = muted)}
                >
                  <Phone size={16} style={{ marginTop: 2, color: '#25D366', flexShrink: 0 }} />
                  <span>WhatsApp : 0156202023</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@ayihaboost.com" className="flex items-start gap-3 text-sm transition-colors" style={{ color: muted, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00A651')}
                  onMouseLeave={e => (e.currentTarget.style.color = muted)}
                >
                  <Mail size={16} style={{ marginTop: 2, color: '#00A651', flexShrink: 0 }} />
                  <span>contact@ayihaboost.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{ color: muted }}>
                <MapPin size={16} style={{ marginTop: 2, color: '#FF6B00', flexShrink: 0 }} />
                <span>Cotonou, Bénin<br />77 Communes couvertes</span>
              </li>
            </ul>
            <a href="https://wa.me/22901562020" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl" style={{ background: '#25D366', color: 'white', textDecoration: 'none', borderRadius: '12px' }}>
              <Phone size={16} /> WhatsApp maintenant
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: `1px solid ${border}` }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © 2026 AYIHA BOOST BEN/AFRICA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: '#00A651', animation: 'pulse-green 2s infinite' }} />
            <span className="text-xs font-medium" style={{ color: '#00A651' }}>Mission nationale : 77 communes du Bénin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
