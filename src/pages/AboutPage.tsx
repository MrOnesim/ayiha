import {
    Target,
    Eye,
    Heart,
    Users,
    MapPin,
    TrendingUp,
    Zap,
    Star,
    Award,
    Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SITE_CONFIG } from "../constants/siteConfig";

export default function AboutPage() {
    const { dark } = useTheme();
    const navigate = useNavigate();
    const handleNavigate = (path: string) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const t = {
        sectionAlt: dark ? "var(--bg-primary)" : "#F5F7FA",
        sectionWht: dark ? "var(--bg-secondary)" : "white",
        cardBg: dark ? "var(--bg-card)" : "white",
        textPrim: dark ? "var(--text-primary)" : "#111",
        textMuted: dark ? "var(--text-muted)" : "#666",
        textFaint: dark ? "var(--text-faint)" : "#888",
        navy: dark ? "var(--navy)" : "#1E3A8A",
        mutedBg: dark ? "var(--bg-muted)" : "#F5F7FA",
    };

    const values = [
        {
            icon: Eye,
            title: "Vision",
            desc: `Devenir la référence du marketing de proximité digitale en Afrique de l'Ouest, en commençant par les ${SITE_CONFIG.business.communesCount} communes du Bénin.`,
            color: "#1E3A8A",
        },
        {
            icon: Target,
            title: "Mission",
            desc: `Connecter les entrepreneurs et PME béninois à un réseau de relais humains actifs pour maximiser leur visibilité digitale locale.`,
            color: "#00A651",
        },
        {
            icon: Heart,
            title: "Valeurs",
            desc: "Transparence, confiance, impact local. Chaque relais est un partenaire à part entière. Ensemble, nous construisons un écosystème gagnant-gagnant.",
            color: "#FF6B00",
        },
    ];

    const team = [
        {
            name: "Directeur Technique Fondateur",
            role: "CTO & Fondateur",
            desc: "En charge de toute l'infrastructure technique : React, NestJS, Firebase. Architecte de la plateforme depuis le 30 avril 2026.",
            initials: "CTO",
            color: "#1E3A8A",
            skills: ["React JS", "NestJS", "Firebase", "Architecture"],
        },
        {
            name: "Équipe des Relais",
            role: "Réseau National",
            desc: `Plus de ${SITE_CONFIG.business.relaisCount} relais actifs dans toutes les communes du Bénin. Chaque relais est formé et motivé pour diffuser avec qualité.`,
            initials: SITE_CONFIG.business.relaisCount.toString(),
            color: "#00A651",
            skills: ["Diffusion", "Preuves", "WhatsApp", "Bénin"],
        },
        {
            name: "Équipe Support",
            role: "Relation Client",
            desc: "Notre équipe répond à tous vos messages WhatsApp rapidement. Clients et relais sont toujours bien accompagnés.",
            initials: "SUP",
            color: "#FF6B00",
            skills: ["Support", "WhatsApp", "Suivi", "Service"],
        },
    ];

    const milestones = [
        {
            date: "30 Avril 2026",
            title: "Création officielle",
            desc: `Fondation de ${SITE_CONFIG.name} ${SITE_CONFIG.region} avec un premier réseau de 50 relais.`,
            color: "#00A651",
        },
        {
            date: "Semaine 1",
            title: "Site vitrine en ligne",
            desc: "Lancement du site officiel avec 5 pages et mise en production sur Vercel.",
            color: "#1E3A8A",
        },
        {
            date: "Semaine 2",
            title: "Espace Relais MVP",
            desc: "Déploiement de la connexion relais, publication et upload de screenshots.",
            color: "#FF6B00",
        },
        {
            date: "Semaine 3",
            title: "Espace CEO sécurisé",
            desc: "Dashboard CEO avec gestion complète des relais et génération de bilans.",
            color: "#8b5cf6",
        },
        {
            date: "Mois 2",
            title: "Automatisation",
            desc: "Notifications automatiques, calcul des points en temps réel, détection doublons.",
            color: "#00A651",
        },
        {
            date: "Mois 3",
            title: "PWA & MoMo",
            desc: "Application installable Android, domaine personnalisé et API paiements MoMo.",
            color: "#1E3A8A",
        },
    ];

    const communes = [
        "Cotonou",
        "Porto-Novo",
        "Parakou",
        "Abomey-Calavi",
        "Djougou",
        "Bohicon",
        "Kandi",
        "Lokossa",
        "Ouidah",
        "Natitingou",
        "Savè",
        "Nikki",
        "Malanville",
        "Bassila",
        "Bembèrèkè",
        "Cobly",
        "Dassa-Zoumé",
        "Glazoué",
        "Kérou",
        "Toucountouna",
        "Kalalé",
        "Pèrèrè",
        "Gogounou",
        "Banikoara",
        "Ségbana",
    ];

    return (
        <div>
            {/* Hero */}
            <section
                className="pt-28 pb-16"
                style={{
                    background: dark
                        ? "linear-gradient(135deg,#080c18,#0f1a3a)"
                        : "linear-gradient(135deg,#1E3A8A,#0f2460)",
                }}
            >
                <div className="container text-center">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                        style={{
                            background: "rgba(0,166,81,0.2)",
                            color: "#7ddc9f",
                            border: "1px solid rgba(0,166,81,0.3)",
                        }}
                    >
                        <Globe size={14} /> À propos de nous
                    </div>
                    <h1
                        className="font-poppins font-black text-white mb-6"
                        style={{
                            fontSize: "clamp(32px,5vw,56px)",
                            lineHeight: 1.2,
                        }}
                    >
                        {SITE_CONFIG.name}
                        <br />
                        <span style={{ color: "#00A651" }}>
                            Au service de votre visibilité
                        </span>
                    </h1>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{
                            color: "rgba(255,255,255,0.75)",
                            lineHeight: 1.7,
                        }}
                    >
                        {SITE_CONFIG.name} {SITE_CONFIG.region} est né d'une vision simple :
                        rendre la visibilité digitale accessible à tous les
                        entrepreneurs béninois, dans toutes les {SITE_CONFIG.business.communesCount} communes.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-20" style={{ background: t.sectionAlt }}>
                <div className="container">
                    <div className="text-center mb-14">
                        <h2 className="section-title mb-4">Notre ADN</h2>
                        <p className="section-subtitle max-w-xl mx-auto">
                            Trois piliers fondateurs qui guident chacune de nos
                            décisions au quotidien.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div
                                    key={v.title}
                                    className="card text-center"
                                    style={{
                                        borderTop: `4px solid ${v.color}`,
                                    }}
                                >
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                        style={{ background: `${v.color}15` }}
                                    >
                                        <Icon size={30} color={v.color} />
                                    </div>
                                    <h3
                                        className="font-poppins font-bold text-xl mb-4"
                                        style={{ color: v.color }}
                                    >
                                        {v.title}
                                    </h3>
                                    <p
                                        className="text-sm"
                                        style={{
                                            color: t.textMuted,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {v.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20" style={{ background: t.sectionWht }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
                                style={{
                                    background: "rgba(0,166,81,0.1)",
                                    color: "#00A651",
                                }}
                            >
                                <Zap size={14} /> Notre histoire
                            </div>
                            <h2 className="section-title mb-6">
                                De Cotonou aux
                                <br />
                                <span style={{ color: "#00A651" }}>
                                    {SITE_CONFIG.business.communesCount} communes du Bénin
                                </span>
                            </h2>
                            <div
                                className="space-y-4 text-base"
                                style={{ color: t.textMuted, lineHeight: 1.8 }}
                            >
                                <p>
                                    {SITE_CONFIG.name} {SITE_CONFIG.region} est né d'un constat
                                    simple : les entreprises béninoises peinent
                                    à se faire voir localement malgré le boom
                                    digital. Les réseaux sociaux coûtent cher,
                                    les agences sont hors de portée pour les
                                    PME.
                                </p>
                                <p>
                                    Notre solution : un réseau humain de relais
                                    locaux, ancrés dans chaque quartier, chaque
                                    commune, qui diffusent le contenu de nos
                                    clients avec authenticité et proximité.
                                </p>
                                <p>
                                    Fondé le 30 avril 2026, {SITE_CONFIG.name} a
                                    rapidement construit un réseau de plus de
                                    {SITE_CONFIG.business.relaisCount} relais actifs couvrant toutes les {SITE_CONFIG.business.communesCount}
                                    communes. Notre ambition : l'Afrique de
                                    l'Ouest entière.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: Users,
                                    label: `${SITE_CONFIG.business.relaisCount} relais actifs`,
                                    value: "et en croissance chaque semaine",
                                    color: "#00A651",
                                },
                                {
                                    icon: MapPin,
                                    label: `${SITE_CONFIG.business.communesCount} communes couvertes`,
                                    value: "présence dans tout le Bénin",
                                    color: "#1E3A8A",
                                },
                                {
                                    icon: TrendingUp,
                                    label: "1 200+ clients",
                                    value: "font confiance à notre réseau",
                                    color: "#FF6B00",
                                },
                                {
                                    icon: Star,
                                    label: "98% de satisfaction",
                                    value: "nos membres nous recommandent",
                                    color: "#8b5cf6",
                                },
                            ].map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="flex items-center gap-4 p-4 rounded-xl"
                                        style={{
                                            background: t.mutedBg,
                                            border: `2px solid ${stat.color}20`,
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: `${stat.color}15`,
                                            }}
                                        >
                                            <Icon
                                                size={22}
                                                color={stat.color}
                                            />
                                        </div>
                                        <div>
                                            <div
                                                className="font-poppins font-bold text-base"
                                                style={{ color: t.textPrim }}
                                            >
                                                {stat.label}
                                            </div>
                                            <div
                                                className="text-sm"
                                                style={{ color: t.textFaint }}
                                            >
                                                {stat.value}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20" style={{ background: t.sectionAlt }}>
                <div className="container">
                    <div className="text-center mb-14">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                            style={{
                                background: "rgba(30,58,138,0.1)",
                                color: dark ? "var(--navy)" : "#1E3A8A",
                            }}
                        >
                            <Users size={14} /> L'équipe fondatrice
                        </div>
                        <h2 className="section-title mb-4">
                            Les humains derrière {SITE_CONFIG.name}
                        </h2>
                        <p className="section-subtitle max-w-xl mx-auto">
                            Une équipe passionnée, ancrée dans le Bénin, avec
                            une vision panafricaine.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="card text-center">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-poppins font-black text-lg"
                                    style={{
                                        background: `linear-gradient(135deg,${member.color},${member.color}aa)`,
                                    }}
                                >
                                    {member.initials}
                                </div>
                                <h3
                                    className="font-poppins font-bold text-base mb-1"
                                    style={{ color: t.textPrim }}
                                >
                                    {member.name}
                                </h3>
                                <div
                                    className="text-sm font-semibold mb-3"
                                    style={{ color: member.color }}
                                >
                                    {member.role}
                                </div>
                                <p
                                    className="text-sm mb-5"
                                    style={{
                                        color: t.textMuted,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {member.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {member.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full text-xs font-semibold"
                                            style={{
                                                background: `${member.color}15`,
                                                color: member.color,
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20" style={{ background: t.sectionWht }}>
                <div className="container">
                    <div className="text-center mb-14">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                            style={{
                                background: "rgba(255,107,0,0.1)",
                                color: "#FF6B00",
                            }}
                        >
                            <Award size={14} /> Feuille de route
                        </div>
                        <h2 className="section-title mb-4">Notre parcours</h2>
                        <p className="section-subtitle">
                            Les grandes étapes de construction de {SITE_CONFIG.name} {SITE_CONFIG.region}.
                        </p>
                    </div>
                    <div className="relative">
                        <div
                            className="absolute left-6 top-0 bottom-0 w-0.5"
                            style={{
                                background:
                                    "linear-gradient(180deg,#00A651,#1E3A8A,#FF6B00)",
                            }}
                        />
                        <div className="space-y-8">
                            {milestones.map((m, i) => (
                                <div key={m.title} className="flex gap-6">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 z-10 border-4"
                                            style={{
                                                background: m.color,
                                                borderColor: dark
                                                    ? "var(--bg-secondary)"
                                                    : "white",
                                                boxShadow: `0 0 0 3px ${m.color}40`,
                                            }}
                                        >
                                            {i + 1}
                                        </div>
                                    </div>
                                    <div className="pb-4 flex-1">
                                        <div
                                            className="text-xs font-bold mb-1"
                                            style={{ color: m.color }}
                                        >
                                            {m.date}
                                        </div>
                                        <h3
                                            className="font-poppins font-bold text-base mb-2"
                                            style={{ color: t.navy }}
                                        >
                                            {m.title}
                                        </h3>
                                        <p
                                            className="text-sm"
                                            style={{
                                                color: t.textMuted,
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {m.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 77 Communes */}
            <section
                className="py-20"
                style={{ background: dark ? "#0a0f1e" : "#1E3A8A" }}
            >
                <div className="container">
                    <div className="text-center mb-14">
                        <h2
                            className="font-poppins font-black text-white mb-4 flex items-center justify-center gap-3"
                            style={{ fontSize: "clamp(28px,4vw,42px)" }}
                        >
                            <Globe size={40} color="#00A651" />
                            Mission :{" "}
                            <span style={{ color: "#00A651" }}>
                                {SITE_CONFIG.business.communesCount} communes
                            </span>
                        </h2>
                        <p
                            className="text-lg max-w-xl mx-auto"
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                lineHeight: 1.7,
                            }}
                        >
                            Notre ambition est d'avoir au moins 1 relais actif
                            dans chacune des {SITE_CONFIG.business.communesCount} communes du Bénin.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {communes.map((city, i) => (
                            <div
                                key={city}
                                className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                                style={{
                                    background:
                                        i % 3 === 0
                                            ? "rgba(0,166,81,0.2)"
                                            : i % 3 === 1
                                              ? "rgba(255,107,0,0.2)"
                                              : "rgba(255,255,255,0.1)",
                                    color:
                                        i % 3 === 0
                                            ? "#7ddc9f"
                                            : i % 3 === 1
                                              ? "#fbb47c"
                                              : "rgba(255,255,255,0.8)",
                                    border: `1px solid ${i % 3 === 0 ? "rgba(0,166,81,0.3)" : i % 3 === 1 ? "rgba(255,107,0,0.3)" : "rgba(255,255,255,0.15)"}`,
                                }}
                            >
                                <MapPin size={14} /> {city}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                className="py-20 text-center"
                style={{
                    background: "linear-gradient(135deg,#00A651,#005c30)",
                }}
            >
                <div className="container">
                    <h2
                        className="font-poppins font-black text-white mb-5"
                        style={{ fontSize: "clamp(28px,4vw,42px)" }}
                    >
                        Faites partie de l'aventure
                    </h2>
                    <p
                        className="text-lg mb-10"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                        Que vous soyez client ou relais, rejoignez le réseau qui
                        construit l'avenir digital du Bénin.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => handleNavigate("/join")}
                            className="font-bold text-base py-4 px-8 rounded-xl"
                            style={{
                                background: "white",
                                color: "#00A651",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Devenir Relais →
                        </button>
                        <button
                            onClick={() => handleNavigate("/offers")}
                            className="font-bold text-base py-4 px-8 rounded-xl"
                            style={{
                                background: "rgba(255,255,255,0.15)",
                                color: "white",
                                border: "2px solid rgba(255,255,255,0.4)",
                                cursor: "pointer",
                            }}
                        >
                            Voir les offres
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
