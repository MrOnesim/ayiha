import { useState } from "react";
import {
    Star,
    Bell,
    Upload,
    History,
    LogOut,
    Eye,
    Download,
    CheckCircle2,
    Clock,
    TrendingUp,
    Award,
    Home,
    ChevronRight,
    AlertCircle,
    Lock,
} from "lucide-react";
import { SITE_CONFIG } from "../constants/siteConfig";

// Mock data
const mockRelais = {
    name: "Mariama Kounde",
    whatsapp: "+229 97 65 43 21",
    level: "Or",
    levelColor: "#d97706",
    points: 674,
    pointsGoal: 1000,
    gains: 18500,
    rank: 12,
    totalRelais: 250,
};

const mockPublications = [
    {
        id: 1,
        client: "Boutique Mode Cotonou",
        title: "Promo Spéciale Fête — -30% sur tout",
        date: "2026-05-28",
        zone: "Cotonou Centre",
        deadline: "2026-06-05",
        status: "available",
        points: 8,
        image: null,
    },
    {
        id: 2,
        client: "Restaurant Saveurs d'Afrique",
        title: "Menu du Weekend — Nouveau plat",
        date: "2026-05-26",
        zone: "Cotonou Sud",
        deadline: "2026-05-30",
        status: "submitted",
        points: 10,
        image: null,
    },
    {
        id: 3,
        client: "Pharmacie Centrale",
        title: "Sensibilisation Paludisme",
        date: "2026-05-20",
        zone: "Tout Cotonou",
        deadline: "2026-05-25",
        status: "validated",
        points: 15,
        image: null,
    },
];

const mockHistory = [
    { month: "Avril 2026", points: 580, gains: 14500, status: "paid" },
    { month: "Mars 2026", points: 410, gains: 10500, status: "paid" },
    { month: "Février 2026", points: 320, gains: 8000, status: "paid" },
];

export default function RelaySpacePage() {
    const [loginStep, setLoginStep] = useState<"login" | "pin" | "dashboard">(
        "login",
    );
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [activeTab, setActiveTab] = useState<
        "dashboard" | "publications" | "upload" | "history" | "notifications"
    >("dashboard");
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [selectedPub, setSelectedPub] = useState<number | null>(null);
    const [loginError, setLoginError] = useState("");

    const handleLogin = () => {
        if (phone.length < 8) {
            setLoginError("Numéro WhatsApp invalide");
            return;
        }
        setLoginError("");
        setLoginStep("pin");
    };

    const handlePin = () => {
        if (pin.length !== 4) {
            setLoginError("Code PIN doit avoir 4 chiffres");
            return;
        }
        setLoginError("");
        setLoginStep("dashboard");
    };

    const handleUpload = () => {
        if (!uploadFile) return;
        setTimeout(() => {
            setUploadSuccess(true);
            setUploadFile(null);
        }, 1500);
    };

    const statusBadge = (status: string) => {
        const map: Record<
            string,
            { label: string; color: string; bg: string }
        > = {
            available: {
                label: "Disponible",
                color: "#00A651",
                bg: "rgba(0,166,81,0.1)",
            },
            submitted: {
                label: "Soumis",
                color: "#d97706",
                bg: "rgba(217,119,6,0.1)",
            },
            validated: {
                label: "Validé ✓",
                color: "#1E3A8A",
                bg: "rgba(30,58,138,0.1)",
            },
            rejected: {
                label: "Rejeté",
                color: "#ef4444",
                bg: "rgba(239,68,68,0.1)",
            },
        };
        const s = map[status] || map.available;
        return (
            <span
                className="px-2 py-1 rounded-lg text-xs font-bold"
                style={{ color: s.color, background: s.bg }}
            >
                {s.label}
            </span>
        );
    };

    if (loginStep === "login") {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{
                    background: "linear-gradient(135deg, #1E3A8A, #00A651)",
                }}
            >
                <div
                    className="w-full max-w-sm p-8 rounded-3xl"
                    style={{
                        background: "white",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                    }}
                >
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ background: "rgba(0,166,81,0.1)" }}
                        >
                            <Lock size={32} color="#00A651" />
                        </div>
                        <h1
                            className="font-poppins font-black text-2xl mb-1"
                            style={{ color: "#1E3A8A" }}
                        >
                            Espace Relais
                        </h1>
                        <p className="text-sm" style={{ color: "#888" }}>
                            {SITE_CONFIG.name} {SITE_CONFIG.region}
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label
                                className="block text-sm font-semibold mb-2"
                                style={{ color: "#333" }}
                            >
                                Numéro WhatsApp
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+229 XX XX XX XX"
                                className="input-field"
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleLogin()
                                }
                            />
                        </div>

                        {loginError && (
                            <div
                                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                                style={{
                                    background: "rgba(239,68,68,0.1)",
                                    color: "#ef4444",
                                }}
                            >
                                <AlertCircle size={14} /> {loginError}
                            </div>
                        )}

                        <button
                            onClick={handleLogin}
                            className="btn-primary w-full justify-center"
                            style={{ padding: "14px" }}
                        >
                            Continuer →
                        </button>

                        <div className="text-center">
                            <a
                                href="https://wa.me/22901562020?text=Je veux accéder à l'espace relais"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm"
                                style={{ color: "#00A651" }}
                            >
                                Pas encore relais ? Rejoindre →
                            </a>
                        </div>
                    </div>

                    <div
                        className="mt-8 pt-6 border-t border-gray-100 text-center text-xs"
                        style={{ color: "#bbb" }}
                    >
                        🔒 Connexion sécurisée SSL · Données chiffrées
                    </div>
                </div>
            </div>
        );
    }

    if (loginStep === "pin") {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{
                    background: "linear-gradient(135deg, #1E3A8A, #00A651)",
                }}
            >
                <div
                    className="w-full max-w-sm p-8 rounded-3xl"
                    style={{
                        background: "white",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                    }}
                >
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-3">🔑</div>
                        <h2
                            className="font-poppins font-black text-2xl mb-1"
                            style={{ color: "#1E3A8A" }}
                        >
                            Code PIN
                        </h2>
                        <p className="text-sm" style={{ color: "#888" }}>
                            Entrez votre code PIN à 4 chiffres
                        </p>
                        <p
                            className="text-xs mt-1 font-semibold"
                            style={{ color: "#00A651" }}
                        >
                            {phone}
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) =>
                                    setPin(e.target.value.slice(0, 4))
                                }
                                placeholder="● ● ● ●"
                                maxLength={4}
                                className="input-field text-center text-3xl tracking-widest"
                                style={{
                                    letterSpacing: "0.5em",
                                    fontFamily: "monospace",
                                }}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handlePin()
                                }
                            />
                        </div>

                        {loginError && (
                            <div
                                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                                style={{
                                    background: "rgba(239,68,68,0.1)",
                                    color: "#ef4444",
                                }}
                            >
                                <AlertCircle size={14} /> {loginError}
                            </div>
                        )}

                        <button
                            onClick={handlePin}
                            className="btn-primary w-full justify-center"
                            style={{ padding: "14px" }}
                        >
                            Se connecter
                        </button>

                        <button
                            onClick={() => {
                                setLoginStep("login");
                                setPin("");
                                setLoginError("");
                            }}
                            className="w-full text-sm text-center"
                            style={{
                                color: "#888",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            ← Changer de numéro
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Dashboard
    const tabs = [
        { id: "dashboard", label: "Tableau de bord", icon: Home },
        { id: "publications", label: "Publications", icon: Eye },
        { id: "upload", label: "Soumettre preuve", icon: Upload },
        { id: "history", label: "Historique", icon: History },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    const progressPct = Math.min(
        (mockRelais.points / mockRelais.pointsGoal) * 100,
        100,
    );

    return (
        <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
            {/* Top bar */}
            <div
                className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
                style={{
                    background: "#1E3A8A",
                    boxShadow: "0 2px 15px rgba(0,0,0,0.2)",
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                        style={{ background: "#00A651", color: "white" }}
                    >
                        {mockRelais.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </div>
                    <div>
                        <div className="font-semibold text-sm text-white">
                            {mockRelais.name}
                        </div>
                        <div
                            className="text-xs"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                            Niveau {mockRelais.level} · {mockRelais.points} pts
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                            background: `${mockRelais.levelColor}30`,
                            color: mockRelais.levelColor,
                        }}
                    >
                        🥇 {mockRelais.level}
                    </div>
                    <button
                        onClick={() => setLoginStep("login")}
                        title="Déconnexion"
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "none",
                            cursor: "pointer",
                            padding: "6px",
                            borderRadius: "8px",
                        }}
                    >
                        <LogOut size={16} color="white" />
                    </button>
                </div>
            </div>

            {/* Tab nav */}
            <div
                className="sticky z-30 px-4 overflow-x-auto"
                style={{
                    top: "56px",
                    background: "white",
                    borderBottom: "1px solid #eee",
                }}
            >
                <div className="flex gap-1 py-2 min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() =>
                                    setActiveTab(tab.id as typeof activeTab)
                                }
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
                                style={{
                                    background:
                                        activeTab === tab.id
                                            ? "#1E3A8A"
                                            : "transparent",
                                    color:
                                        activeTab === tab.id ? "white" : "#666",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <Icon size={15} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="container py-8">
                {/* ── DASHBOARD TAB ── */}
                {activeTab === "dashboard" && (
                    <div className="space-y-6">
                        {/* Stats row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                {
                                    label: "Points du mois",
                                    value: mockRelais.points,
                                    suffix: "pts",
                                    color: "#00A651",
                                    icon: Star,
                                },
                                {
                                    label: "Gains estimés",
                                    value: `${mockRelais.gains.toLocaleString()}`,
                                    suffix: " FCFA",
                                    color: "#FF6B00",
                                    icon: TrendingUp,
                                },
                                {
                                    label: "Niveau actuel",
                                    value: mockRelais.level,
                                    suffix: "",
                                    color: mockRelais.levelColor,
                                    icon: Award,
                                },
                                {
                                    label: "Classement",
                                    value: `#${mockRelais.rank}`,
                                    suffix: `/${mockRelais.totalRelais}`,
                                    color: "#1E3A8A",
                                    icon: ChevronRight,
                                },
                            ].map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="card text-center"
                                        style={{ padding: "20px 16px" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: `${stat.color}15`,
                                            }}
                                        >
                                            <Icon
                                                size={18}
                                                color={stat.color}
                                            />
                                        </div>
                                        <div
                                            className="font-poppins font-black text-xl"
                                            style={{
                                                color: stat.color,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {stat.value}
                                            <span
                                                className="text-xs font-normal"
                                                style={{ color: "#aaa" }}
                                            >
                                                {stat.suffix}
                                            </span>
                                        </div>
                                        <div
                                            className="text-xs mt-1"
                                            style={{ color: "#888" }}
                                        >
                                            {stat.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Progress */}
                        <div className="card">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3
                                        className="font-poppins font-bold text-base"
                                        style={{ color: "#1E3A8A" }}
                                    >
                                        Progression vers le niveau Diamant 💎
                                    </h3>
                                    <p
                                        className="text-sm mt-1"
                                        style={{ color: "#888" }}
                                    >
                                        {mockRelais.points} /{" "}
                                        {mockRelais.pointsGoal} points
                                    </p>
                                </div>
                                <div
                                    className="px-3 py-1 rounded-full text-sm font-bold"
                                    style={{
                                        background: "rgba(0,166,81,0.1)",
                                        color: "#00A651",
                                    }}
                                >
                                    {Math.round(progressPct)}%
                                </div>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </div>
                            <p
                                className="text-xs mt-3"
                                style={{ color: "#aaa" }}
                            >
                                Il vous reste{" "}
                                {mockRelais.pointsGoal - mockRelais.points}{" "}
                                points pour atteindre le niveau Diamant
                            </p>
                        </div>

                        {/* Recent publications */}
                        <div className="card">
                            <h3
                                className="font-poppins font-bold text-base mb-5"
                                style={{ color: "#1E3A8A" }}
                            >
                                Publications récentes
                            </h3>
                            <div className="space-y-3">
                                {mockPublications.slice(0, 3).map((pub) => (
                                    <div
                                        key={pub.id}
                                        className="flex items-center gap-3 p-3 rounded-xl"
                                        style={{ background: "#F5F7FA" }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs text-white"
                                            style={{ background: "#1E3A8A" }}
                                        >
                                            📢
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div
                                                className="text-sm font-semibold truncate"
                                                style={{ color: "#111" }}
                                            >
                                                {pub.title}
                                            </div>
                                            <div
                                                className="text-xs"
                                                style={{ color: "#888" }}
                                            >
                                                {pub.client} · {pub.date}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {statusBadge(pub.status)}
                                            <span
                                                className="text-xs font-bold"
                                                style={{ color: "#00A651" }}
                                            >
                                                +{pub.points}pts
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => setActiveTab("publications")}
                                className="mt-4 w-full text-sm text-center py-2.5 rounded-xl font-semibold transition-all"
                                style={{
                                    background: "rgba(30,58,138,0.08)",
                                    color: "#1E3A8A",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Voir toutes les publications →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── PUBLICATIONS TAB ── */}
                {activeTab === "publications" && (
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <h2
                                className="font-poppins font-bold text-xl"
                                style={{ color: "#1E3A8A" }}
                            >
                                Publications du mois
                            </h2>
                            <div
                                className="text-sm font-medium"
                                style={{ color: "#888" }}
                            >
                                {mockPublications.length} publications
                            </div>
                        </div>

                        {mockPublications.map((pub) => (
                            <div
                                key={pub.id}
                                className="card"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    setSelectedPub(
                                        selectedPub === pub.id ? null : pub.id,
                                    )
                                }
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                                        style={{
                                            background: "rgba(30,58,138,0.08)",
                                        }}
                                    >
                                        📢
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3 flex-wrap">
                                            <h3
                                                className="font-bold text-base"
                                                style={{ color: "#111" }}
                                            >
                                                {pub.title}
                                            </h3>
                                            {statusBadge(pub.status)}
                                        </div>
                                        <div
                                            className="text-sm mt-1"
                                            style={{ color: "#888" }}
                                        >
                                            <strong>{pub.client}</strong> ·
                                            Zone: {pub.zone}
                                        </div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span
                                                className="text-xs"
                                                style={{ color: "#aaa" }}
                                            >
                                                <Clock
                                                    size={12}
                                                    style={{
                                                        display: "inline",
                                                        marginRight: 3,
                                                    }}
                                                />
                                                Jusqu'au {pub.deadline}
                                            </span>
                                            <span
                                                className="text-xs font-bold"
                                                style={{ color: "#00A651" }}
                                            >
                                                +{pub.points} points
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {selectedPub === pub.id && (
                                    <div
                                        className="mt-5 pt-5 flex flex-col sm:flex-row gap-3"
                                        style={{
                                            borderTop: "1px solid #f0f0f0",
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={() =>
                                                setActiveTab("upload")
                                            }
                                            className="btn-primary flex-1 justify-center"
                                            style={{
                                                padding: "10px 16px",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <Upload size={14} /> Soumettre ma
                                            preuve
                                        </button>
                                        <button
                                            className="flex items-center gap-2 justify-center flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all"
                                            style={{
                                                background:
                                                    "rgba(30,58,138,0.08)",
                                                color: "#1E3A8A",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Download size={14} /> Télécharger
                                            le contenu
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* ── UPLOAD TAB ── */}
                {activeTab === "upload" && (
                    <div className="space-y-6">
                        <h2
                            className="font-poppins font-bold text-xl"
                            style={{ color: "#1E3A8A" }}
                        >
                            Soumettre une preuve
                        </h2>

                        {uploadSuccess ? (
                            <div
                                className="p-8 rounded-2xl text-center"
                                style={{
                                    background: "rgba(0,166,81,0.08)",
                                    border: "2px solid rgba(0,166,81,0.2)",
                                }}
                            >
                                <CheckCircle2
                                    size={48}
                                    color="#00A651"
                                    className="mx-auto mb-4"
                                />
                                <h3
                                    className="font-poppins font-bold text-xl mb-3"
                                    style={{ color: "#00A651" }}
                                >
                                    Screenshot soumis avec succès !
                                </h3>
                                <p
                                    className="text-sm mb-6"
                                    style={{ color: "#555", lineHeight: 1.6 }}
                                >
                                    Votre preuve a été envoyée et horodatée
                                    automatiquement. Elle sera vérifiée par
                                    l'équipe AYIHA BOOST sous 48h.
                                </p>
                                <button
                                    onClick={() => {
                                        setUploadSuccess(false);
                                        setActiveTab("publications");
                                    }}
                                    className="btn-primary mx-auto"
                                    style={{ display: "inline-flex" }}
                                >
                                    Voir mes publications
                                </button>
                            </div>
                        ) : (
                            <div className="card">
                                <div className="space-y-5">
                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{ color: "#333" }}
                                        >
                                            Publication concernée
                                        </label>
                                        <select className="input-field">
                                            {mockPublications.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.title} — {p.client}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{ color: "#333" }}
                                        >
                                            Plateforme de publication
                                        </label>
                                        <select className="input-field">
                                            <option>WhatsApp Status</option>
                                            <option>Facebook Profil</option>
                                            <option>Facebook Groupe</option>
                                            <option>Instagram</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{ color: "#333" }}
                                        >
                                            Screenshot de preuve *
                                        </label>
                                        <div
                                            className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all"
                                            style={{
                                                borderColor: uploadFile
                                                    ? "#00A651"
                                                    : "#e5e7eb",
                                                background: uploadFile
                                                    ? "rgba(0,166,81,0.04)"
                                                    : "#fafafa",
                                            }}
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "file-upload",
                                                    )
                                                    ?.click()
                                            }
                                        >
                                            <input
                                                id="file-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setUploadFile(
                                                        e.target.files?.[0] ||
                                                            null,
                                                    )
                                                }
                                            />
                                            {uploadFile ? (
                                                <div>
                                                    <CheckCircle2
                                                        size={32}
                                                        color="#00A651"
                                                        className="mx-auto mb-2"
                                                    />
                                                    <p
                                                        className="font-semibold text-sm"
                                                        style={{
                                                            color: "#00A651",
                                                        }}
                                                    >
                                                        {uploadFile.name}
                                                    </p>
                                                    <p
                                                        className="text-xs mt-1"
                                                        style={{
                                                            color: "#888",
                                                        }}
                                                    >
                                                        {(
                                                            uploadFile.size /
                                                            1024
                                                        ).toFixed(0)}{" "}
                                                        KB
                                                    </p>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setUploadFile(null);
                                                        }}
                                                        className="mt-2 text-xs"
                                                        style={{
                                                            color: "#ef4444",
                                                            background: "none",
                                                            border: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Upload
                                                        size={32}
                                                        color="#ccc"
                                                        className="mx-auto mb-3"
                                                    />
                                                    <p
                                                        className="font-semibold text-sm"
                                                        style={{
                                                            color: "#333",
                                                        }}
                                                    >
                                                        Cliquer pour choisir un
                                                        screenshot
                                                    </p>
                                                    <p
                                                        className="text-xs mt-1"
                                                        style={{
                                                            color: "#aaa",
                                                        }}
                                                    >
                                                        PNG, JPG, JPEG — Max 10
                                                        MB
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className="p-4 rounded-xl text-sm"
                                        style={{
                                            background: "rgba(255,107,0,0.08)",
                                            border: "1px solid rgba(255,107,0,0.2)",
                                            color: "#555",
                                        }}
                                    >
                                        <strong style={{ color: "#FF6B00" }}>
                                            ⚠️ Important :
                                        </strong>{" "}
                                        Le screenshot doit clairement montrer la
                                        publication avec la date/heure visible.
                                        Les doublons et screenshots non
                                        conformes seront automatiquement
                                        détectés et rejetés.
                                    </div>

                                    <button
                                        onClick={handleUpload}
                                        disabled={!uploadFile}
                                        className="btn-primary w-full justify-center"
                                        style={{
                                            padding: "14px",
                                            opacity: uploadFile ? 1 : 0.5,
                                            cursor: uploadFile
                                                ? "pointer"
                                                : "not-allowed",
                                        }}
                                    >
                                        <Upload size={16} /> Soumettre ma preuve
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── HISTORY TAB ── */}
                {activeTab === "history" && (
                    <div className="space-y-5">
                        <h2
                            className="font-poppins font-bold text-xl"
                            style={{ color: "#1E3A8A" }}
                        >
                            Historique des paiements
                        </h2>

                        {mockHistory.map((h) => (
                            <div key={h.month} className="card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3
                                            className="font-bold text-base"
                                            style={{ color: "#111" }}
                                        >
                                            {h.month}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span
                                                className="text-sm"
                                                style={{ color: "#888" }}
                                            >
                                                <Star
                                                    size={12}
                                                    style={{
                                                        display: "inline",
                                                        marginRight: 3,
                                                        color: "#00A651",
                                                    }}
                                                />
                                                {h.points} points
                                            </span>
                                            <span
                                                className="font-bold text-sm"
                                                style={{ color: "#00A651" }}
                                            >
                                                {h.gains.toLocaleString()} FCFA
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-bold"
                                            style={{
                                                background:
                                                    "rgba(0,166,81,0.1)",
                                                color: "#00A651",
                                            }}
                                        >
                                            ✓ Payé MoMo
                                        </span>
                                        <button
                                            className="p-2 rounded-lg text-sm"
                                            style={{
                                                background:
                                                    "rgba(30,58,138,0.08)",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                            title="Télécharger le bilan"
                                        >
                                            <Download
                                                size={16}
                                                color="#1E3A8A"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div
                            className="p-5 rounded-2xl text-center text-sm"
                            style={{
                                background: "rgba(30,58,138,0.05)",
                                color: "#666",
                                lineHeight: 1.7,
                            }}
                        >
                            💳 Les paiements MoMo sont effectués entre le 28 et
                            le 31 de chaque mois.
                            <br />
                            Contactez-nous sur WhatsApp en cas de problème :{" "}
                            <strong style={{ color: "#00A651" }}>
                                0156202023
                            </strong>
                        </div>
                    </div>
                )}

                {/* ── NOTIFICATIONS TAB ── */}
                {activeTab === "notifications" && (
                    <div className="space-y-5">
                        <h2
                            className="font-poppins font-bold text-xl"
                            style={{ color: "#1E3A8A" }}
                        >
                            Notifications
                        </h2>

                        {[
                            {
                                title: "Nouvelle publication disponible !",
                                desc: "Boutique Mode Cotonou a une nouvelle publication. Publiez avant le 5 juin pour gagner 8 points.",
                                time: "Il y a 2h",
                                read: false,
                                color: "#00A651",
                            },
                            {
                                title: "Votre screenshot a été validé ✓",
                                desc: 'Le screenshot pour "Restaurant Saveurs d\'Afrique" a été validé. +10 points ajoutés à votre solde.',
                                time: "Hier",
                                read: false,
                                color: "#1E3A8A",
                            },
                            {
                                title: "Paiement MoMo reçu 💰",
                                desc: "Votre paiement de 14 500 FCFA pour le mois d'Avril 2026 a été envoyé sur MoMo.",
                                time: "30 Apr",
                                read: true,
                                color: "#FF6B00",
                            },
                            {
                                title: "Bienvenue dans le réseau !",
                                desc: "Vous avez rejoint AYIHA BOOST BEN/AFRICA. Publiez dès aujourd'hui pour commencer à gagner des points !",
                                time: "30 Apr",
                                read: true,
                                color: "#8b5cf6",
                            },
                        ].map((notif, i) => (
                            <div
                                key={i}
                                className="card"
                                style={{
                                    borderLeft: `4px solid ${notif.color}`,
                                    opacity: notif.read ? 0.75 : 1,
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    {!notif.read && (
                                        <div
                                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                            style={{ background: notif.color }}
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3
                                                className="font-bold text-sm"
                                                style={{ color: "#111" }}
                                            >
                                                {notif.title}
                                            </h3>
                                            <span
                                                className="text-xs flex-shrink-0"
                                                style={{ color: "#aaa" }}
                                            >
                                                {notif.time}
                                            </span>
                                        </div>
                                        <p
                                            className="text-sm mt-1"
                                            style={{
                                                color: "#666",
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {notif.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
