import { useState } from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Send,
    CheckCircle2,
    Clock,
    MessageCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sendContactForm, validateContactForm } from '../services/emailService';

export default function ContactPage() {
    const { dark } = useTheme();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Theme-aware color variables
    const t = {
        sectionAlt: dark ? 'var(--bg-primary)' : '#F5F7FA',
        sectionWht: dark ? 'var(--bg-secondary)' : 'white',
        cardBg: dark ? 'var(--bg-card)' : 'white',
        textPrim: dark ? 'var(--text-primary)' : '#111',
        textMuted: dark ? 'var(--text-muted)' : '#666',
        textFaint: dark ? 'var(--text-faint)' : '#888',
        navy: dark ? 'var(--navy)' : '#1E3A8A',
        mutedBg: dark ? 'var(--bg-muted)' : '#F5F7FA',
        labelColor: dark ? 'var(--text-secondary)' : '#333',
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const validation = validateContactForm(form);
        if (!validation.valid) {
            setErrors(validation.errors);
            return;
        }
        setErrors({});

        setLoading(true);
        try {
            const result = await sendContactForm(form);
            if (result.success) {
                setSent(true);
            } else {
                setErrors({ form: result.message });
            }
        } catch {
            setErrors({ form: 'Une erreur est survenue. Veuillez réessayer.' });
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const contactMethods = [
        {
            icon: Phone,
            title: 'WhatsApp',
            value: '0156202023',
            desc: 'Disponible 7j/7 · Réponse rapide',
            href: 'https://wa.me/2290156202023',
            color: '#25D366',
        },
        {
            icon: Mail,
            title: 'Email',
            value: 'contact@ayihaboost.com',
            desc: 'Réponse sous 24h ouvrées',
            href: 'mailto:contact@ayihaboost.com',
            color: '#00A651',
        },
        {
            icon: MapPin,
            title: 'Localisation',
            value: 'Cotonou, Bénin',
            desc: 'Réseau national · 77 communes',
            href: '#',
            color: '#FF6B00',
        },
        {
            icon: Clock,
            title: 'Horaires',
            value: 'Lun–Sam : 8h – 20h',
            desc: 'WhatsApp disponible 24/7',
            href: '#',
            color: '#1E3A8A',
        },
    ];

    return (
        <div>
            {/* Hero */}
            <section
                className="pt-28 pb-16 text-center"
                style={{
                    background: dark
                        ? 'linear-gradient(135deg,#080c18,#0f1a3a)'
                        : 'linear-gradient(135deg,#1E3A8A,#0f2460)',
                }}
            >
                <div className="container">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                        style={{
                            background: 'rgba(0,166,81,0.2)',
                            color: '#7ddc9f',
                            border: '1px solid rgba(0,166,81,0.3)',
                        }}
                    >
                        <MessageCircle size={14} /> Nous contacter
                    </div>
                    <h1
                        className="font-poppins font-black text-white mb-5"
                        style={{
                            fontSize: 'clamp(32px,5vw,54px)',
                            lineHeight: 1.2,
                        }}
                    >
                        Parlons de votre
                        <br />
                        <span style={{ color: '#00A651' }}>
                            projet ensemble
                        </span>
                    </h1>
                    <p
                        className="text-lg"
                        style={{
                            color: 'rgba(255,255,255,0.75)',
                            lineHeight: 1.7,
                        }}
                    >
                        Une question sur nos offres, envie de rejoindre le
                        réseau ou simplement curieux ? Contactez-nous, nous
                        adorons échanger.
                    </p>
                </div>
            </section>

            {/* Contact methods */}
            <section className="py-16" style={{ background: t.sectionAlt }}>
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {contactMethods.map((method) => {
                            const Icon = method.icon;
                            return (
                                <a
                                    key={method.title}
                                    href={method.href}
                                    target={
                                        method.href.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                    rel="noopener noreferrer"
                                    className="card text-center"
                                    style={{
                                        textDecoration: 'none',
                                        borderTop: `4px solid ${method.color}`,
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                                        style={{
                                            background: `${method.color}15`,
                                        }}
                                    >
                                        <Icon size={22} color={method.color} />
                                    </div>
                                    <div
                                        className="font-bold text-sm mb-1"
                                        style={{ color: t.navy }}
                                    >
                                        {method.title}
                                    </div>
                                    <div
                                        className="font-semibold text-xs mb-2"
                                        style={{ color: t.textPrim }}
                                    >
                                        {method.value}
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: t.textFaint }}
                                    >
                                        {method.desc}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Form + Info */}
            <section className="py-20" style={{ background: t.sectionWht }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                        {/* Form */}
                        <div>
                            <h2 className="section-title mb-2">
                                Envoyez-nous un message
                            </h2>
                            <p className="section-subtitle mb-8">
                                Remplissez le formulaire ou contactez-nous
                                directement via WhatsApp.
                            </p>

                            {sent ? (
                                <div
                                    className="p-8 rounded-2xl text-center"
                                    style={{
                                        background: 'rgba(0,166,81,0.08)',
                                        border: '2px solid rgba(0,166,81,0.2)',
                                    }}
                                >
                                    <CheckCircle2
                                        size={48}
                                        color="#00A651"
                                        className="mx-auto mb-4"
                                    />
                                    <h3
                                        className="font-poppins font-bold text-xl mb-3"
                                        style={{ color: '#00A651' }}
                                    >
                                        Message envoyé !
                                    </h3>
                                    <p
                                        className="text-sm mb-6"
                                        style={{
                                            color: t.textMuted,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        Merci {form.name} ! Nous avons bien reçu
                                        votre message et vous répondrons dans
                                        les 24h. En urgence, contactez-nous sur
                                        WhatsApp : 0156202023
                                    </p>
                                    <a
                                        href="https://wa.me/2290156202023"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary mx-auto"
                                        style={{ display: 'inline-flex' }}
                                    >
                                        <Phone size={16} /> Contacter sur
                                        WhatsApp
                                    </a>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label
                                                className="block text-sm font-semibold mb-2"
                                                style={{ color: t.labelColor }}
                                            >
                                                Nom complet *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Votre nom"
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-semibold mb-2"
                                                style={{ color: t.labelColor }}
                                            >
                                                Numéro WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+229 XX XX XX XX"
                                                className="input-field"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{ color: t.labelColor }}
                                        >
                                            Email (optionnel)
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="votre@email.com"
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{ color: t.labelColor }}
                                        >
                                            Sujet *
                                        </label>
                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        >
                                            <option value="">
                                                Sélectionnez un sujet
                                            </option>
                                            <option value="starter">
                                                Formule Starter (15 000 FCFA)
                                            </option>
                                            <option value="pro">
                                                Formule Pro (35 000 FCFA)
                                            </option>
                                            <option value="premium">
                                                Formule Premium (75 000 FCFA)
                                            </option>
                                            <option value="relais">
                                                Devenir Relais
                                            </option>
                                            <option value="info">
                                                Demande d'information
                                            </option>
                                            <option value="autre">Autre</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{ color: t.labelColor }}
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Dites-nous en quoi nous pouvons vous aider..."
                                            className="input-field"
                                            style={{ resize: 'none' }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary w-full justify-center"
                                        style={{
                                            padding: '14px 24px',
                                            fontSize: '15px',
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <div
                                                    className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                                                    style={{
                                                        animation:
                                                            'spin-slow 0.8s linear infinite',
                                                    }}
                                                />{' '}
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} /> Envoyer le
                                                message
                                            </>
                                        )}
                                    </button>
                                    <p
                                        className="text-xs text-center"
                                        style={{ color: t.textFaint }}
                                    >
                                        En envoyant ce formulaire, vous acceptez
                                        d'être contacté par WhatsApp ou email.
                                    </p>
                                </form>
                            )}
                        </div>

                        {/* Info side */}
                        <div className="space-y-6">
                            <div
                                className="p-6 rounded-2xl"
                                style={{
                                    background:
                                        'linear-gradient(135deg,#00A651,#005c30)',
                                }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{
                                            background:
                                                'rgba(255,255,255,0.15)',
                                        }}
                                    >
                                        <Phone size={22} color="white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">
                                            Réponse rapide via WhatsApp
                                        </h3>
                                        <p
                                            className="text-sm"
                                            style={{
                                                color: 'rgba(255,255,255,0.75)',
                                            }}
                                        >
                                            Généralement en moins d'une heure
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className="text-sm mb-5"
                                    style={{
                                        color: 'rgba(255,255,255,0.8)',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Pour une réponse immédiate, contactez-nous
                                    directement sur WhatsApp. Nous répondons
                                    7j/7 de 8h à 20h.
                                </p>
                                <a
                                    href="https://wa.me/2290156202023?text=Bonjour AYIHA BOOST, j'ai une question"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 font-bold text-sm py-3 px-5 rounded-xl w-full justify-center"
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        textDecoration: 'none',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                    }}
                                >
                                    Cliquer pour écrire sur WhatsApp
                                </a>
                            </div>

                            <div className="card">
                                <h3
                                    className="font-poppins font-bold text-lg mb-5"
                                    style={{ color: t.navy }}
                                >
                                    Questions fréquentes
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            q: 'Quel est le délai de démarrage ?',
                                            a: 'Votre campagne démarre dans les 24h après confirmation de votre souscription.',
                                        },
                                        {
                                            q: 'Comment sont vérifiées les publications ?',
                                            a: 'Chaque relais envoie des screenshots horodatés. Notre système détecte les doublons.',
                                        },
                                        {
                                            q: 'Puis-je voir les preuves de publication ?',
                                            a: 'Oui ! Votre rapport mensuel inclut tous les screenshots des publications effectuées.',
                                        },
                                        {
                                            q: 'Où êtes-vous situés ?',
                                            a: 'Notre équipe est basée à Cotonou. Nos relais couvrent les 77 communes du Bénin.',
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.q}
                                            className="pb-4"
                                            style={{
                                                borderBottom: `1px solid var(--border-color)`,
                                            }}
                                        >
                                            <div
                                                className="font-semibold text-sm mb-1"
                                                style={{ color: t.navy }}
                                            >
                                                ❓ {item.q}
                                            </div>
                                            <div
                                                className="text-sm"
                                                style={{
                                                    color: t.textMuted,
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                → {item.a}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="p-6 rounded-2xl text-center"
                                style={{
                                    background: t.mutedBg,
                                    border: `2px solid var(--border-color)`,
                                }}
                            >
                                <div className="text-3xl mb-3">🇧🇯</div>
                                <h4
                                    className="font-bold text-base mb-2"
                                    style={{ color: t.navy }}
                                >
                                    Bénin · Cotonou
                                </h4>
                                <p
                                    className="text-sm"
                                    style={{
                                        color: t.textMuted,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Basés à Cotonou, opérant dans les 77
                                    communes du Bénin. Notre ambition : couvrir
                                    toute l'Afrique de l'Ouest.
                                </p>
                                <div className="flex flex-wrap gap-2 justify-center mt-4">
                                    {[
                                        'Cotonou',
                                        'Porto-Novo',
                                        'Parakou',
                                        'Bohicon',
                                        '+ 73 communes',
                                    ].map((city) => (
                                        <span
                                            key={city}
                                            className="px-3 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                background:
                                                    'rgba(0,166,81,0.1)',
                                                color: '#00A651',
                                            }}
                                        >
                                            📍 {city}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
