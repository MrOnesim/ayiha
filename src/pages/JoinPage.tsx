import { CheckCircle2, Star, Users, Phone, Gift, Award, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface JoinPageProps {
  setCurrentPage?: (page: string) => void;
}

export default function JoinPage({ setCurrentPage: _setCurrentPage }: JoinPageProps) {
  const { dark } = useTheme();

  const t = {
    sectionAlt: dark ? 'var(--bg-primary)'   : '#F5F7FA',
    sectionWht: dark ? 'var(--bg-secondary)'  : 'white',
    cardBg:     dark ? 'var(--bg-card)'       : 'white',
    textPrim:   dark ? 'var(--text-primary)'  : '#111',
    textMuted:  dark ? 'var(--text-muted)'    : '#666',
    textFaint:  dark ? 'var(--text-faint)'    : '#888',
    navy:       dark ? 'var(--navy)'          : '#1E3A8A',
    mutedBg:    dark ? 'var(--bg-muted)'      : '#F5F7FA',
    borderCol:  dark ? 'var(--border-color)'  : '#f0f0f0',
  };

  const levels = [
    { level: 'Bronze',  points: '0 – 199 pts',   gain: '2 000 – 5 000 FCFA',  color: '#CD7F32', bg: dark ? 'rgba(205,127,50,0.1)'  : '#fdf3e7', icon: '🥉', perks: ['Accès publications standards','Paiement mensuel MoMo','Badge Bronze'] },
    { level: 'Argent',  points: '200 – 499 pts',  gain: '5 000 – 12 000 FCFA', color: '#9ca3af', bg: dark ? 'rgba(156,163,175,0.1)' : '#f9fafb', icon: '🥈', perks: ['Publications prioritaires','Bonus mensuel 500 FCFA','Badge Argent','Accès formations'] },
    { level: 'Or',      points: '500 – 999 pts',  gain: '12 000 – 25 000 FCFA',color: '#d97706', bg: dark ? 'rgba(217,119,6,0.1)'  : '#fffbeb', icon: '🥇', perks: ['Publications VIP','Bonus mensuel 2 000 FCFA','Badge Or','Formations avancées','Priorité support'] },
    { level: 'Diamant', points: '1000+ pts',       gain: '25 000+ FCFA',        color: '#1E3A8A', bg: dark ? 'rgba(30,58,138,0.12)' : '#eff6ff', icon: '💎', perks: ['Toutes les publications','Bonus illimité','Badge Diamant','Toutes formations','Accès CEO partiel','Référencement prioritaire'] },
  ];

  const howPoints = [
    { action: 'Publier un contenu client sur WhatsApp Status', points: 5 },
    { action: 'Publier sur Facebook (profil ou groupe)',        points: 8 },
    { action: 'Publier sur Instagram avec hashtag officiel',   points: 10 },
    { action: 'Recruter un nouveau relais actif',              points: 25 },
    { action: 'Réaliser 10 publications dans le mois',         points: 30, bonus: true },
    { action: 'Maintenir le niveau Or 3 mois consécutifs',     points: 100, bonus: true },
  ];

  const steps = [
    { step: '01', title: 'Remplir le formulaire', desc: 'Cliquez sur le bouton ci-dessous pour accéder au formulaire Google Forms et renseigner vos informations.', icon: '📝' },
    { step: '02', title: 'Vérification (24h)',     desc: 'Notre équipe vérifie votre profil et vous contacte sur WhatsApp dans les 24 heures ouvrées.',               icon: '✅' },
    { step: '03', title: 'Accès à l\'espace relais', desc: 'Vous recevez votre code PIN et accédez à votre tableau de bord pour voir les publications.',              icon: '🔑' },
    { step: '04', title: 'Publiez & gagnez !',    desc: 'Publiez les contenus clients, envoyez vos screenshots et accumulez des points chaque mois.',               icon: '💰' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-16 text-center relative overflow-hidden" style={{ background: dark ? 'linear-gradient(135deg,#080c18,#0f1a3a)' : 'linear-gradient(135deg,#1E3A8A,#0f2460)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%,#00A651 0%,transparent 40%),radial-gradient(circle at 80% 20%,#FF6B00 0%,transparent 40%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'rgba(0,166,81,0.2)', color: '#7ddc9f', border: '1px solid rgba(0,166,81,0.3)' }}>
            <Users size={14} /> Rejoindre le réseau
          </div>
          <h1 className="font-poppins font-black text-white mb-5" style={{ fontSize: 'clamp(32px,5vw,56px)', lineHeight: 1.2 }}>
            Devenez Relais et<br /><span style={{ color: '#00A651' }}>gagnez chaque mois</span>
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Rejoignez le réseau AYIHA BOOST et gagnez des revenus supplémentaires en partageant des publications sur vos réseaux sociaux. Simple, flexible, et rémunéré chaque mois.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '16px 36px', fontSize: '16px', borderRadius: '14px' }}>
              📝 Remplir le formulaire
            </a>
            <a href="https://wa.me/22901562020?text=Bonjour, je veux devenir relais AYIHA BOOST" target="_blank" rel="noopener noreferrer" className="font-bold text-base py-4 px-8 rounded-xl inline-flex items-center gap-2 justify-center" style={{ background: '#25D366', color: 'white', textDecoration: 'none', borderRadius: '14px' }}>
              <Phone size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20" style={{ background: t.sectionAlt }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: 'rgba(0,166,81,0.1)', color: '#00A651' }}>
              <Gift size={14} /> Avantages relais
            </div>
            <h2 className="section-title mb-4">Pourquoi devenir relais ?</h2>
            <p className="section-subtitle max-w-xl mx-auto">Des avantages concrets, un système transparent, des paiements fiables.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'Revenus mensuels',     desc: 'Gagnez entre 2 000 et 25 000+ FCFA par mois selon votre niveau et activité.', color: '#00A651' },
              { icon: '📱', title: 'Travail depuis mobile', desc: 'Tout se fait depuis votre smartphone Android. Aucun équipement spécial requis.', color: '#1E3A8A' },
              { icon: '⏰', title: 'Horaires libres',       desc: 'Publiez quand vous voulez. Vous gérez votre temps comme vous l\'entendez.', color: '#FF6B00' },
              { icon: '📊', title: 'Tableau de bord',       desc: 'Suivez vos points en temps réel dans votre espace relais. Transparence totale.', color: '#8b5cf6' },
              { icon: '🎓', title: 'Formations offertes',   desc: 'Accédez à des formations sur les réseaux sociaux et le marketing digital.', color: '#00A651' },
              { icon: '🤝', title: 'Communauté',            desc: 'Rejoignez le groupe WhatsApp AYIHA BUILDERS et échangez avec tous les relais.', color: '#1E3A8A' },
            ].map(item => (
              <div key={item.title} className="card" style={{ borderLeft: `4px solid ${item.color}` }}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: t.navy }}>{item.title}</h3>
                <p className="text-sm" style={{ color: t.textMuted, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points system */}
      <section className="py-20" style={{ background: t.sectionWht }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00' }}>
              <Star size={14} /> Barème des points
            </div>
            <h2 className="section-title mb-4">Comment gagner des points ?</h2>
            <p className="section-subtitle max-w-xl mx-auto">Chaque action de publication vous rapporte des points. Plus vous êtes actif, plus vous gagnez.</p>
          </div>
          <div className="max-w-2xl mx-auto space-y-3 mb-12">
            {howPoints.map(item => (
              <div key={item.action} className="flex items-center justify-between p-4 rounded-xl" style={{ background: item.bonus ? (dark ? 'rgba(0,166,81,0.08)' : 'rgba(0,166,81,0.05)') : t.mutedBg, border: item.bonus ? '2px solid rgba(0,166,81,0.2)' : '2px solid transparent' }}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} color="#00A651" />
                  <span className="text-sm font-medium" style={{ color: t.textPrim }}>
                    {item.action}
                    {item.bonus && <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#FF6B00', color: 'white' }}>BONUS</span>}
                  </span>
                </div>
                <div className="font-poppins font-black text-lg flex-shrink-0 ml-4" style={{ color: item.bonus ? '#FF6B00' : '#00A651' }}>
                  +{item.points}<span className="text-xs font-normal ml-1" style={{ color: t.textFaint }}>pts</span>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto p-5 rounded-2xl text-sm" style={{ background: dark ? 'rgba(30,58,138,0.1)' : 'rgba(30,58,138,0.05)', border: `2px solid ${dark ? 'rgba(30,58,138,0.2)' : 'rgba(30,58,138,0.1)'}`, color: t.textMuted, lineHeight: 1.7 }}>
            <strong style={{ color: t.navy }}>📌 Règle importante :</strong> Les points sont comptabilisés uniquement après vérification et validation de vos screenshots. Tout screenshot non conforme ou dupliqué sera rejeté automatiquement.
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-20" style={{ background: t.sectionAlt }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: 'rgba(30,58,138,0.1)', color: dark ? 'var(--navy)' : '#1E3A8A' }}>
              <Award size={14} /> Niveaux relais
            </div>
            <h2 className="section-title mb-4">Progressez dans la hiérarchie</h2>
            <p className="section-subtitle max-w-xl mx-auto">4 niveaux avec des avantages croissants. Plus vous progressez, plus vous gagnez.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((level, i) => (
              <div key={level.level} className="pricing-card" style={{ borderTop: `4px solid ${level.color}`, background: level.bg, transform: i === 3 ? 'scale(1.03)' : 'scale(1)' }}>
                <div className="text-center mb-5">
                  <div className="text-4xl mb-3">{level.icon}</div>
                  <h3 className="font-poppins font-black text-xl" style={{ color: level.color }}>{level.level}</h3>
                  <div className="text-sm font-semibold mt-1" style={{ color: t.textFaint }}>{level.points}</div>
                </div>
                <div className="py-3 px-4 rounded-xl text-center mb-5 font-poppins font-bold text-base" style={{ background: `${level.color}15`, color: level.color }}>
                  {level.gain}
                </div>
                <ul className="space-y-2">
                  {level.perks.map(perk => (
                    <li key={perk} className="flex items-center gap-2 text-sm" style={{ color: t.textMuted }}>
                      <CheckCircle2 size={14} color={level.color} style={{ flexShrink: 0 }} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20" style={{ background: t.sectionWht }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: 'rgba(0,166,81,0.1)', color: '#00A651' }}>
              <ChevronRight size={14} /> Comment rejoindre
            </div>
            <h2 className="section-title mb-4">4 étapes pour démarrer</h2>
            <p className="section-subtitle max-w-xl mx-auto">En moins de 48h, vous pouvez commencer à gagner des points et des revenus.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map(step => (
              <div key={step.step} className="flex items-start gap-4 p-6 rounded-2xl" style={{ background: t.mutedBg }}>
                <div className="text-3xl flex-shrink-0">{step.icon}</div>
                <div>
                  <div className="text-xs font-bold mb-1" style={{ color: '#00A651' }}>ÉTAPE {step.step}</div>
                  <h3 className="font-bold text-base mb-2" style={{ color: t.navy }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: t.textMuted, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center relative overflow-hidden" style={{ background: dark ? 'linear-gradient(135deg,#080c18,#0f1a3a)' : 'linear-gradient(135deg,#1E3A8A,#0f2460)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%,#00A651 0%,transparent 50%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="font-poppins font-black text-white mb-5" style={{ fontSize: 'clamp(28px,4vw,44px)', lineHeight: 1.2 }}>Prêt(e) à rejoindre ?</h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            Remplissez notre formulaire ou contactez-nous directement sur WhatsApp. Notre équipe vous répondra dans les 24 heures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="font-bold text-base py-4 px-8 rounded-xl inline-flex items-center gap-2 justify-center" style={{ background: '#00A651', color: 'white', textDecoration: 'none' }}>
              📝 Remplir le formulaire Google Forms
            </a>
            <a href="https://wa.me/22901562020?text=Bonjour, je veux rejoindre le réseau AYIHA BOOST comme relais" target="_blank" rel="noopener noreferrer" className="font-bold text-base py-4 px-8 rounded-xl inline-flex items-center gap-2 justify-center" style={{ background: '#25D366', color: 'white', textDecoration: 'none' }}>
              <Phone size={18} /> WhatsApp : 0156202023
            </a>
          </div>
          <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>✓ Gratuit · ✓ Sans engagement · ✓ Paiements MoMo garantis</p>
        </div>
      </section>
    </div>
  );
}
