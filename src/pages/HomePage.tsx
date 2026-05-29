import { useState, useEffect, useRef } from 'react';
import {
    Zap,
    ArrowRight,
    CheckCircle2,
    Star,
    Users,
    MapPin,
    TrendingUp,
    Phone,
    ChevronRight,
    Shield,
    Target,
    Clock,
    MessageCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function AnimatedCounter({
    end,
    suffix = '',
}: {
    end: number;
    suffix?: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const steps = 60;
                    const stepTime = 2000 / steps;
                    let current = 0;
                    const increment = end / steps;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else setCount(Math.floor(current));
                    }, stepTime);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end]);

    return (
        <div ref={ref} className="stat-counter" style={{ color: '#00A651' }}>
            {count.toLocaleString()}
            {suffix}
        </div>
    );
}

export default function HomePage() {
    const [testimonialIdx, setTestimonialIdx] = useState(0);
    const { dark } = useTheme();
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const testimonials = [
        {
            name: 'Mariama K.',
            role: 'Relais Cotonou',
            text: "Grâce à AYIHA BOOST, j'ai pu augmenter mes revenus mensuels de 40 000 FCFA en partageant des publications. Simple, rapide et très sérieux !",
            stars: 5,
            initials: 'MK',
            color: '#00A651',
        },
        {
            name: 'Kolade A.',
            role: 'Client Pro — Parakou',
            text: "Mon entreprise est maintenant visible dans toute la ville. Le réseau de relais d'AYIHA BOOST est incroyable. Je recommande la formule Pro.",
            stars: 5,
            initials: 'KA',
            color: '#1E3A8A',
        },
        {
            name: 'Adjovi F.',
            role: 'Relais Abomey',
            text: "Depuis que j'ai rejoint le réseau, chaque mois je reçois mes paiements MoMo sans problème. L'équipe est très réactive sur WhatsApp.",
            stars: 5,
            initials: 'AF',
            color: '#FF6B00',
        },
    ];

    const features = [
        {
            icon: Shield,
            title: 'Sécurisé & Fiable',
            desc: 'Plateforme chiffrée, SSL obligatoire, données protégées à 100%.',
        },
        {
            icon: TrendingUp,
            title: 'Revenus Garantis',
            desc: 'Système de points transparent avec paiements MoMo chaque mois.',
        },
        {
            icon: Target,
            title: '77 Communes',
            desc: 'Réseau national couvrant toutes les communes du Bénin.',
        },
        {
            icon: Clock,
            title: 'Support 24/7',
            desc: 'Équipe disponible sur WhatsApp pour toutes vos questions.',
        },
    ];

    const plans = [
        {
            name: 'Starter',
            price: '15 000',
            color: '#6b7280',
            features: [
                '1 publication / semaine',
                '5 relais assignés',
                'Rapport mensuel',
                'Support WhatsApp',
            ],
            featured: false,
        },
        {
            name: 'Pro',
            price: '35 000',
            color: '#00A651',
            features: [
                '3 publications / semaine',
                '20 relais assignés',
                'Dashboard temps réel',
                'Support prioritaire',
                'Boost organique',
            ],
            featured: true,
        },
        {
            name: 'Premium',
            price: '75 000',
            color: '#FF6B00',
            features: [
                'Publications illimitées',
                '50+ relais assignés',
                'Couverture nationale',
                'Account manager dédié',
                'Statistiques avancées',
                'Priorité absolue',
            ],
            featured: false,
        },
    ];

    useEffect(() => {
        const interval = setInterval(
            () => setTestimonialIdx((i) => (i + 1) % testimonials.length),
            4500
        );
        return () => clearInterval(interval);
    }, []);

    const cardBg = dark ? 'var(--bg-card)' : 'white';
    const sectionAlt = dark ? 'var(--bg-primary)' : '#F8FAFC';
    const sectionWht = dark ? 'var(--bg-secondary)' : 'white';
    const textMuted = dark ? 'var(--text-muted)' : '#64748b';
    const textPrim = dark ? 'var(--text-primary)' : '#0f172a';
    const borderCol = dark ? 'var(--border-color)' : '#e2e8f0';

    return (
        <div>
            {/* ─── HERO ─── */}
            <section
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
                style={{
                    background: dark
                        ? 'linear-gradient(135deg,#080c18 0%,#0f1a3a 40%,#003d20 100%)'
                        : 'linear-gradient(135deg,#0f2460 0%,#1E3A8A 40%,#00622f 100%)',
                }}
            >
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            'url(/images/africa-digital-network.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div
                    className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-10"
                    style={{
                        background: '#00A651',
                        filter: 'blur(80px)',
                        animation: 'float 6s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-10"
                    style={{
                        background: '#FF6B00',
                        filter: 'blur(80px)',
                        animation: 'float 8s ease-in-out infinite reverse',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                />

                <div className="relative z-10 container py-32 text-center">
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 animate-fadeInUp"
                        style={{
                            background: 'rgba(0,166,81,0.2)',
                            border: '1px solid rgba(0,166,81,0.4)',
                            color: '#7ddc9f',
                        }}
                    >
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{
                                background: '#00A651',
                                animation: 'pulse-green 2s infinite',
                            }}
                        />
                        🇧🇯 Premier réseau de relais digitaux du Bénin
                    </div>
                    <h1
                        className="font-poppins font-black mb-6 animate-fadeInUp"
                        style={{
                            fontSize: 'clamp(36px,6vw,72px)',
                            lineHeight: 1.1,
                            color: 'white',
                            animationDelay: '0.1s',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Boostez votre visibilité
                        <br />
                        <span style={{ color: '#00A651' }}>
                            partout au Bénin
                        </span>
                    </h1>
                    <p
                        className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fadeInUp"
                        style={{
                            color: 'rgba(255,255,255,0.85)',
                            lineHeight: 1.7,
                            animationDelay: '0.2s',
                        }}
                    >
                        AYIHA BOOST BEN/AFRICA connecte vos publications aux 77
                        communes via un réseau de relais actifs et motivés.
                        Visibilité maximale, paiements MoMo garantis.
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <button
                            onClick={() => handleNavigate('/offers')}
                            className="btn-primary"
                            style={{
                                padding: '16px 36px',
                                fontSize: '16px',
                                borderRadius: '14px',
                            }}
                        >
                            Voir nos offres <ArrowRight size={18} />
                        </button>
                        <a
                            href="https://wa.me/2290156202023"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                            style={{
                                padding: '16px 36px',
                                fontSize: '16px',
                                borderRadius: '14px',
                            }}
                        >
                            <Phone size={18} /> WhatsApp : 0156202023
                        </a>
                    </div>
                    <div
                        className="flex flex-wrap justify-center gap-6 mt-12 animate-fadeInUp"
                        style={{ animationDelay: '0.4s' }}
                    >
                        {[
                            '✓ SSL Sécurisé',
                            '✓ Paiements MoMo',
                            '✓ 77 Communes',
                            '✓ Support 24/7',
                        ].map((b) => (
                            <span
                                key={b}
                                className="text-sm font-medium"
                                style={{ color: 'rgba(255,255,255,0.8)' }}
                            >
                                {b}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
                    <div
                        className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
                        style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                    >
                        <div
                            className="w-1.5 h-3 rounded-full"
                            style={{
                                background: 'white',
                                animation: 'float 1.5s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section
                style={{ background: dark ? '#0a0f1e' : '#1E3A8A' }}
                className="py-20"
            >
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { end: 250, suffix: '+', label: 'Relais actifs' },
                            {
                                end: 77,
                                suffix: '',
                                label: 'Communes couvertes',
                            },
                            {
                                end: 1200,
                                suffix: '+',
                                label: 'Clients satisfaits',
                            },
                            {
                                end: 98,
                                suffix: '%',
                                label: 'Taux de satisfaction',
                            },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="flex flex-col items-center gap-3"
                            >
                                <AnimatedCounter
                                    end={s.end}
                                    suffix={s.suffix}
                                />
                                <div
                                    className="text-sm font-medium"
                                    style={{ color: 'rgba(255,255,255,0.75)' }}
                                >
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="py-24" style={{ background: sectionAlt }}>
                <div className="container">
                    <div className="text-center mb-16">
                        <div className="badge badge-green mb-4">
                            <Zap size={14} /> Comment ça marche
                        </div>
                        <h2 className="section-title mb-4">
                            Simple. Rapide. Efficace.
                        </h2>
                        <p className="section-subtitle max-w-xl mx-auto">
                            En 3 étapes, votre contenu touche des milliers de
                            personnes à travers tout le Bénin.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                icon: Target,
                                title: 'Choisissez votre formule',
                                desc: 'Sélectionnez parmi nos 3 formules selon votre budget et vos ambitions.',
                                color: '#1E3A8A',
                            },
                            {
                                step: '02',
                                icon: Users,
                                title: 'On active votre réseau',
                                desc: 'Nos relais publient votre contenu avec screenshots horodatés comme preuves.',
                                color: '#00A651',
                            },
                            {
                                step: '03',
                                icon: TrendingUp,
                                title: 'Vous décollez',
                                desc: 'Votre visibilité explose, vous recevez un rapport mensuel complet.',
                                color: '#FF6B00',
                            },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.step}
                                    className="card text-center relative"
                                >
                                    <div
                                        className="absolute top-4 right-4 font-poppins font-black"
                                        style={{
                                            color: item.color,
                                            opacity: 0.06,
                                            fontSize: '72px',
                                        }}
                                    >
                                        {item.step}
                                    </div>
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                        style={{
                                            background: `${item.color}15`,
                                        }}
                                    >
                                        <Icon size={28} color={item.color} />
                                    </div>
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold text-white"
                                        style={{ background: item.color }}
                                    >
                                        {item.step}
                                    </div>
                                    <h3
                                        className="font-poppins font-bold text-lg mb-3"
                                        style={{
                                            color: dark
                                                ? 'var(--navy)'
                                                : '#1E3A8A',
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-sm"
                                        style={{
                                            color: textMuted,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── PRICING PREVIEW ─── */}
            <section className="py-24" style={{ background: sectionWht }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="badge badge-orange mb-4">
                            <Star size={14} /> Nos Formules
                        </div>
                        <h2 className="section-title mb-4">
                            Des tarifs accessibles pour tous
                        </h2>
                        <p className="section-subtitle max-w-xl mx-auto">
                            Que vous soyez une petite boutique ou une grande
                            entreprise, nous avons la formule qu'il vous faut.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className="pricing-card"
                                style={{
                                    border: plan.featured
                                        ? `3px solid ${plan.color}`
                                        : `2px solid ${borderCol}`,
                                    position: 'relative',
                                }}
                            >
                                <div className="text-center mb-6">
                                    <span
                                        className="font-poppins font-black text-lg"
                                        style={{ color: plan.color }}
                                    >
                                        {plan.name}
                                    </span>
                                    <div className="mt-3 mb-1">
                                        <span
                                            className="font-poppins font-black text-4xl"
                                            style={{ color: textPrim }}
                                        >
                                            {plan.price}
                                        </span>
                                        <span
                                            className="text-sm font-medium ml-1"
                                            style={{ color: textMuted }}
                                        >
                                            FCFA/mois
                                        </span>
                                    </div>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-center gap-3 text-sm"
                                            style={{
                                                color: dark
                                                    ? 'var(--text-secondary)'
                                                    : '#334155',
                                            }}
                                        >
                                            <CheckCircle2
                                                size={16}
                                                color={plan.color}
                                                style={{ flexShrink: 0 }}
                                            />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={`https://wa.me/2290156202023?text=Je souhaite souscrire à la formule ${plan.name} (${plan.price} FCFA/mois)`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 rounded-xl font-semibold text-sm text-center transition-all block"
                                    style={{
                                        background: plan.featured
                                            ? plan.color
                                            : 'transparent',
                                        color: plan.featured
                                            ? 'white'
                                            : plan.color,
                                        border: `2px solid ${plan.color}`,
                                        textDecoration: 'none',
                                    }}
                                >
                                    Souscrire maintenant →
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <button
                            onClick={() => handleNavigate('/offers')}
                            className="btn-primary"
                            style={{ padding: '14px 36px' }}
                        >
                            Voir tous les détails <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="py-24" style={{ background: sectionAlt }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="badge badge-green mb-5">
                                <Shield size={14} /> Pourquoi AYIHA BOOST ?
                            </div>
                            <h2 className="section-title mb-5">
                                La plateforme{' '}
                                <span style={{ color: '#00A651' }}>
                                    la plus fiable
                                </span>
                                <br />
                                du marché béninois
                            </h2>
                            <p className="section-subtitle mb-8">
                                Nous avons construit un système robuste,
                                transparent et sécurisé qui protège clients et
                                relais.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {features.map((f) => {
                                    const Icon = f.icon;
                                    return (
                                        <div
                                            key={f.title}
                                            className="p-5 rounded-2xl"
                                            style={{
                                                background: cardBg,
                                                boxShadow: 'var(--shadow-card)',
                                                border: '1px solid var(--border-color)',
                                            }}
                                        >
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                                                style={{
                                                    background:
                                                        'rgba(0,166,81,0.1)',
                                                }}
                                            >
                                                <Icon
                                                    size={20}
                                                    color="#00A651"
                                                />
                                            </div>
                                            <h4
                                                className="font-bold text-sm mb-1"
                                                style={{
                                                    color: dark
                                                        ? 'var(--navy)'
                                                        : '#1E3A8A',
                                                }}
                                            >
                                                {f.title}
                                            </h4>
                                            <p
                                                className="text-xs"
                                                style={{
                                                    color: textMuted,
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {f.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <div
                                className="rounded-3xl p-8 relative overflow-hidden"
                                style={{
                                    background:
                                        'linear-gradient(135deg,#1E3A8A 0%,#00A651 100%)',
                                }}
                            >
                                <div
                                    className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
                                    style={{
                                        background: 'white',
                                        transform: 'translate(30%,-30%)',
                                    }}
                                />
                                <h3 className="font-poppins font-bold text-2xl text-white mb-6">
                                    🇧🇯 Notre Impact National
                                </h3>
                                <div className="space-y-5">
                                    {[
                                        {
                                            label: 'Couverture nationale',
                                            value: 100,
                                            text: '77/77 communes',
                                        },
                                        {
                                            label: 'Relais actifs recrutés',
                                            value: 84,
                                            text: '250+ relais',
                                        },
                                        {
                                            label: 'Clients satisfaits',
                                            value: 96,
                                            text: '98% satisfaction',
                                        },
                                        {
                                            label: 'Publications délivrées',
                                            value: 78,
                                            text: '5 000+ publications',
                                        },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-white">
                                                    {item.label}
                                                </span>
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{ color: '#a7f3d0' }}
                                                >
                                                    {item.text}
                                                </span>
                                            </div>
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    background:
                                                        'rgba(255,255,255,0.2)',
                                                }}
                                            >
                                                <div
                                                    className="progress-fill"
                                                    style={{
                                                        width: `${item.value}%`,
                                                        background:
                                                            'linear-gradient(90deg,rgba(255,255,255,0.7),white)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleNavigate('/about')}
                                    className="mt-8 w-full py-3 rounded-xl font-semibold text-sm text-white"
                                    style={{
                                        background: 'rgba(255,255,255,0.15)',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    En savoir plus sur nous →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section className="py-24" style={{ background: sectionWht }}>
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <div className="badge badge-blue mb-4">
                            <Star size={14} /> Témoignages
                        </div>
                        <h2 className="section-title mb-4">
                            Ce que disent nos membres
                        </h2>
                        <p className="section-subtitle">
                            Plus de 1 200 clients et relais font confiance à
                            AYIHA BOOST.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {testimonials.map((t, i) => (
                            <div
                                key={t.name}
                                className="testimonial-card"
                                style={{
                                    transform:
                                        i === testimonialIdx
                                            ? 'scale(1.02)'
                                            : 'scale(1)',
                                    borderTop:
                                        i === testimonialIdx
                                            ? `4px solid ${t.color}`
                                            : '4px solid transparent',
                                    transition: 'all 0.4s',
                                }}
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.stars)].map((_, j) => (
                                        <Star
                                            key={j}
                                            size={14}
                                            color="#FF6B00"
                                            fill="#FF6B00"
                                        />
                                    ))}
                                </div>
                                <p
                                    className="text-sm mb-6"
                                    style={{
                                        color: textMuted,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                        style={{ background: t.color }}
                                    >
                                        {t.initials}
                                    </div>
                                    <div>
                                        <div
                                            className="font-semibold text-sm"
                                            style={{ color: textPrim }}
                                        >
                                            {t.name}
                                        </div>
                                        <div
                                            className="text-xs"
                                            style={{
                                                color: 'var(--text-faint)',
                                            }}
                                        >
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setTestimonialIdx(i)}
                                className="rounded-full transition-all"
                                style={{
                                    width:
                                        i === testimonialIdx ? '24px' : '8px',
                                    height: '8px',
                                    background:
                                        i === testimonialIdx
                                            ? '#00A651'
                                            : dark
                                              ? 'rgba(255,255,255,0.2)'
                                              : '#e2e8f0',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── JOIN RELAIS CTA ─── */}
            <section
                className="py-24"
                style={{ background: dark ? '#0a0f1e' : '#1E3A8A' }}
            >
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div
                        className="badge mb-5"
                        style={{
                            background: 'rgba(0,166,81,0.2)',
                            color: '#7ddc9f',
                            display: 'inline-flex',
                            gap: '6px',
                            alignItems: 'center',
                            padding: '6px 14px',
                            borderRadius: '100px',
                            fontSize: '13px',
                            fontWeight: 600,
                        }}
                    >
                        <Users size={14} /> Devenir Relais
                    </div>
                    <h2
                        className="font-poppins font-black mb-5 text-white"
                        style={{
                            fontSize: 'clamp(28px,4vw,46px)',
                            lineHeight: 1.2,
                        }}
                    >
                        Rejoignez le réseau et
                        <br />
                        <span style={{ color: '#00A651' }}>
                            gagnez chaque mois
                        </span>
                    </h2>
                    <p
                        className="text-lg mb-10 max-w-2xl mx-auto"
                        style={{
                            color: 'rgba(255,255,255,0.8)',
                            lineHeight: 1.7,
                        }}
                    >
                        Devenez relais AYIHA BOOST et gagnez des points en
                        partageant des publications. Paiements MoMo garantis
                        chaque fin de mois.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => handleNavigate('/join')}
                            className="btn-primary"
                            style={{ padding: '16px 36px', fontSize: '16px' }}
                        >
                            <Users size={18} /> Rejoindre comme relais
                        </button>
                        <a
                            href="https://wa.me/22901562020?text=Je veux devenir relais AYIHA BOOST"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: '#25D366',
                                color: 'white',
                                padding: '16px 36px',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '16px',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <MessageCircle size={18} /> WhatsApp us
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── CITIES ─── */}
            <section className="py-24" style={{ background: sectionAlt }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="badge badge-green mb-4">
                            <MapPin size={14} /> Présence nationale
                        </div>
                        <h2 className="section-title mb-4">
                            Présents dans toutes les 77 communes
                        </h2>
                        <p className="section-subtitle max-w-xl mx-auto">
                            Du nord au sud, de l'est à l'ouest — AYIHA BOOST
                            couvre tout le Bénin.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {[
                            'Cotonou',
                            'Porto-Novo',
                            'Parakou',
                            'Abomey-Calavi',
                            'Djougou',
                            'Bohicon',
                            'Kandi',
                            'Lokossa',
                            'Ouidah',
                            'Natitingou',
                            'Savè',
                            'Nikki',
                        ].map((city, i) => (
                            <div
                                key={city}
                                className="px-3 py-3 rounded-xl text-center text-sm font-medium"
                                style={{
                                    background: cardBg,
                                    color: dark ? 'var(--navy)' : '#1E3A8A',
                                    boxShadow: 'var(--shadow-card)',
                                    borderLeft:
                                        i < 6
                                            ? '3px solid #00A651'
                                            : '3px solid #FF6B00',
                                }}
                            >
                                <MapPin
                                    size={12}
                                    style={{
                                        display: 'inline',
                                        marginRight: 4,
                                        color: i < 6 ? '#00A651' : '#FF6B00',
                                    }}
                                />
                                {city}
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--text-faint)' }}
                        >
                            + 65 autres communes couvertes dans tout le Bénin
                        </span>
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section
                className="py-24 text-center relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg,#00A651,#005c30)',
                }}
            >
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 30% 50%,#FF6B00 0%,transparent 50%),radial-gradient(circle at 70% 50%,#1E3A8A 0%,transparent 50%)',
                    }}
                />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h2
                        className="font-poppins font-black text-white mb-5"
                        style={{
                            fontSize: 'clamp(28px,4vw,48px)',
                            lineHeight: 1.2,
                        }}
                    >
                        Prêt à booster votre visibilité ?
                    </h2>
                    <p
                        className="text-lg mb-10"
                        style={{
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.7,
                        }}
                    >
                        Contactez-nous et lancez votre campagne de visibilité
                        digitale à travers tout le Bénin.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => handleNavigate('/offers')}
                            className="font-semibold text-base py-4 px-8 rounded-xl"
                            style={{
                                background: 'white',
                                color: '#00A651',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Découvrir les offres →
                        </button>
                        <a
                            href="https://wa.me/2290156202023"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-base py-4 px-8 rounded-xl"
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                color: 'white',
                                border: '2px solid rgba(255,255,255,0.4)',
                                textDecoration: 'none',
                                display: 'inline-block',
                            }}
                        >
                            0156202023
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
