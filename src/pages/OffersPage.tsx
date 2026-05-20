import { CheckCircle2, X, Star, Phone, Zap, Users, BarChart2, Shield, Clock, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface OffersPageProps {
  setCurrentPage: (page: string) => void;
}

export default function OffersPage({ setCurrentPage }: OffersPageProps) {
  const { dark } = useTheme();
  const navigate = (page: string) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const t = {
    sectionAlt:  dark ? 'var(--bg-primary)'   : '#F5F7FA',
    sectionWht:  dark ? 'var(--bg-secondary)'  : 'white',
    cardBg:      dark ? 'var(--bg-card)'       : 'white',
    textPrim:    dark ? 'var(--text-primary)'  : '#111',
    textMuted:   dark ? 'var(--text-muted)'    : '#666',
    textFaint:   dark ? 'var(--text-faint)'    : '#888',
    borderCol:   dark ? 'var(--border-color)'  : '#f0f0f0',
    mutedBg:     dark ? 'var(--bg-muted)'      : '#F5F7FA',
    navy:        dark ? 'var(--navy)'          : '#1E3A8A',
  };

  const plans = [
    {
      name: 'Starter', price: '15 000', period: 'FCFA / mois', tagline: 'Idéal pour démarrer',
      color: '#6b7280', lightBg: dark ? 'rgba(107,114,128,0.08)' : '#f9fafb', icon: Zap, featured: false,
      whatsappText: 'Formule Starter (15 000 FCFA/mois)',
      features: [
        { text: '1 publication par semaine',     included: true },
        { text: '5 relais assignés',              included: true },
        { text: '1 zone géographique',            included: true },
        { text: 'Rapport mensuel PDF',            included: true },
        { text: 'Support WhatsApp',               included: true },
        { text: 'Screenshots preuves',            included: true },
        { text: 'Dashboard temps réel',           included: false },
        { text: 'Boost organique',                included: false },
        { text: 'Account manager dédié',          included: false },
        { text: 'Couverture nationale',           included: false },
      ],
    },
    {
      name: 'Pro', price: '35 000', period: 'FCFA / mois', tagline: 'Le choix des entrepreneurs',
      color: '#00A651', lightBg: dark ? 'rgba(0,166,81,0.1)' : '#f0fdf4', icon: TrendingUp, featured: true,
      whatsappText: 'Formule Pro (35 000 FCFA/mois)',
      features: [
        { text: '3 publications par semaine',     included: true },
        { text: '20 relais assignés',             included: true },
        { text: '3 zones géographiques',          included: true },
        { text: 'Rapport mensuel + hebdo',        included: true },
        { text: 'Support prioritaire 24/7',       included: true },
        { text: 'Screenshots preuves HD',         included: true },
        { text: 'Dashboard temps réel',           included: true },
        { text: 'Boost organique',                included: true },
        { text: 'Account manager dédié',          included: false },
        { text: 'Couverture nationale',           included: false },
      ],
    },
    {
      name: 'Premium', price: '75 000', period: 'FCFA / mois', tagline: 'Visibilité nationale maximale',
      color: '#FF6B00', lightBg: dark ? 'rgba(255,107,0,0.08)' : '#fff7ed', icon: Star, featured: false,
      whatsappText: 'Formule Premium (75 000 FCFA/mois)',
      features: [
        { text: 'Publications illimitées',        included: true },
        { text: '50+ relais assignés',            included: true },
        { text: 'Toutes les zones (77 communes)', included: true },
        { text: 'Rapports quotidiens',            included: true },
        { text: 'Support VIP 24/7',               included: true },
        { text: 'Screenshots preuves HD',         included: true },
        { text: 'Dashboard temps réel',           included: true },
        { text: 'Boost organique maximal',        included: true },
        { text: 'Account manager dédié',          included: true },
        { text: 'Couverture nationale complète',  included: true },
      ],
    },
  ];

  const faqs = [
    { q: 'Comment fonctionne le système de publication ?', a: 'Vous nous envoyez votre contenu (image + texte). Nos relais publient sur WhatsApp, Facebook, Instagram et envoient des screenshots horodatés comme preuves.' },
    { q: 'Quand sont effectués les paiements aux relais ?', a: 'Les paiements MoMo sont effectués en fin de mois, entre le 28 et le 31. Chaque relais reçoit son bilan détaillant ses points et son gain exact.' },
    { q: 'Puis-je changer de formule en cours de mois ?', a: 'Oui ! Vous pouvez upgrader votre formule à tout moment. La différence est calculée au prorata. Contactez-nous sur WhatsApp.' },
    { q: 'Quelle est la différence entre relais et client ?', a: 'Les clients paient pour que leur contenu soit diffusé. Les relais publient ce contenu et gagnent des points. Vous pouvez être les deux !' },
    { q: 'Comment rejoindre le réseau en tant que relais ?', a: 'Remplissez le formulaire sur la page "Rejoindre" ou contactez-nous sur WhatsApp. Après vérification, vous recevez vos accès.' },
    { q: 'Y a-t-il un engagement de durée ?', a: 'Non ! Nos formules sont sans engagement. Vous pouvez arrêter à tout moment.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-16 text-center" style={{ background: dark ? 'linear-gradient(135deg,#080c18,#0f1a3a)' : 'linear-gradient(135deg,#1E3A8A,#0f2460)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: 'rgba(0,166,81,0.2)', color: '#7ddc9f', border: '1px solid rgba(0,166,81,0.3)' }}>
            <Star size={14} /> Nos Formules
          </div>
          <h1 className="font-poppins font-black text-white mb-5" style={{ fontSize: 'clamp(32px,5vw,54px)', lineHeight: 1.2 }}>
            Des offres adaptées à<br /><span style={{ color: '#00A651' }}>chaque ambition</span>
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 550, margin: '0 auto' }}>
            Choisissez la formule qui correspond à votre budget et vos objectifs. Tous les plans incluent des preuves screenshots vérifiables.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20" style={{ background: t.sectionAlt }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map(plan => {
              const Icon = plan.icon;
              return (
                <div key={plan.name} className="pricing-card" style={{ border: plan.featured ? `3px solid ${plan.color}` : `2px solid ${t.borderCol}`, transform: plan.featured ? 'scale(1.03)' : 'scale(1)', position: 'relative' }}>
                  {plan.featured && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="px-5 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: plan.color }}>⭐ PLUS POPULAIRE</span>
                    </div>
                  )}
                  <div className="p-5 rounded-2xl mb-6 text-center" style={{ background: plan.lightBg }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${plan.color}20` }}>
                      <Icon size={26} color={plan.color} />
                    </div>
                    <div className="font-poppins font-black text-xl mb-1" style={{ color: plan.color }}>{plan.name}</div>
                    <div className="text-xs font-medium" style={{ color: t.textFaint }}>{plan.tagline}</div>
                  </div>
                  <div className="text-center mb-6">
                    <span className="font-poppins font-black text-5xl" style={{ color: t.textPrim, lineHeight: 1 }}>{plan.price}</span>
                    <div className="text-sm font-medium mt-1" style={{ color: t.textFaint }}>{plan.period}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f.text} className="flex items-center gap-3 text-sm" style={{ color: f.included ? (dark ? 'var(--text-secondary)' : '#333') : (dark ? 'var(--text-faint)' : '#bbb') }}>
                        {f.included
                          ? <CheckCircle2 size={16} color={plan.color} style={{ flexShrink: 0 }} />
                          : <X size={16} color={dark ? 'rgba(255,255,255,0.15)' : '#d1d5db'} style={{ flexShrink: 0 }} />}
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/22901562020?text=Bonjour AYIHA BOOST, je souhaite souscrire à la ${plan.whatsappText}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl font-bold text-sm text-center transition-all block"
                    style={{ background: plan.featured ? plan.color : 'transparent', color: plan.featured ? 'white' : plan.color, border: `2px solid ${plan.color}`, textDecoration: 'none' }}
                  >
                    <Phone size={15} style={{ display: 'inline', marginRight: 8 }} /> Souscrire via WhatsApp
                  </a>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10 text-sm" style={{ color: t.textFaint }}>
            💳 Paiement par MoMo · 📞 Support WhatsApp · 🔒 Aucun engagement
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20" style={{ background: t.sectionWht }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">Ce qui est inclus dans chaque plan</h2>
            <p className="section-subtitle">Tous nos plans partagent ces garanties fondamentales.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Shield,     title: 'Preuves vérifiables', desc: 'Screenshots horodatés de chaque publication. Transparence totale et traçabilité garantie.', color: '#1E3A8A' },
              { icon: Users,      title: 'Relais certifiés',    desc: 'Tous nos relais sont vérifiés, formés et motivés. Qualité de diffusion assurée.', color: '#00A651' },
              { icon: BarChart2,  title: 'Rapport mensuel',     desc: 'Bilan complet de vos performances : portée, publications, preuves, statistiques.', color: '#FF6B00' },
              { icon: Phone,      title: 'Support WhatsApp',    desc: 'Notre équipe répond à vos questions rapidement. Pas de ticket, contact direct.', color: '#25D366' },
              { icon: Clock,      title: 'Publication rapide',  desc: 'Votre contenu est diffusé dans les 24h après validation. Efficacité maximale.', color: '#8b5cf6' },
              { icon: Zap,        title: 'Sans engagement',     desc: 'Résiliez à tout moment. Aucun contrat forcé. Nous vous gardons par la qualité.', color: '#FF6B00' },
            ].map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-6 rounded-2xl transition-all" style={{ background: t.mutedBg, border: '2px solid transparent', cursor: 'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = f.color; (e.currentTarget as HTMLElement).style.background = t.cardBg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; (e.currentTarget as HTMLElement).style.background = t.mutedBg; }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}15` }}>
                    <Icon size={22} color={f.color} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: t.navy }}>{f.title}</h3>
                  <p className="text-sm" style={{ color: t.textMuted, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: t.sectionAlt }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">Questions fréquentes</h2>
            <p className="section-subtitle">Tout ce que vous devez savoir avant de commencer.</p>
          </div>
          <div className="space-y-4">
            {faqs.map(faq => (
              <details key={faq.q} style={{ background: t.cardBg, borderRadius: '14px', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border-color)' }}>
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-base" style={{ color: t.navy, listStyle: 'none' }}>
                  {faq.q}
                  <span className="text-xl font-light ml-4" style={{ color: '#00A651' }}>+</span>
                </summary>
                <div className="px-5 pb-5 text-sm" style={{ color: t.textMuted, lineHeight: 1.7 }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg,#00A651,#005c30)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-poppins font-black text-white mb-5" style={{ fontSize: 'clamp(28px,4vw,42px)' }}>Prêt à commencer ?</h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Choisissez votre formule et contactez-nous sur WhatsApp pour démarrer en moins de 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/22901562020?text=Bonjour AYIHA BOOST, je veux souscrire à une formule" target="_blank" rel="noopener noreferrer" className="font-bold text-base py-4 px-8 rounded-xl inline-flex items-center gap-2 justify-center" style={{ background: 'white', color: '#00A651', textDecoration: 'none' }}>
              <Phone size={18} /> Contacter sur WhatsApp
            </a>
            <button onClick={() => navigate('join')} className="font-bold text-base py-4 px-8 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.4)', cursor: 'pointer' }}>
              Devenir Relais →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
