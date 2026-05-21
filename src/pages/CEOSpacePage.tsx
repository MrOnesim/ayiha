import { useState, useEffect } from "react";
import {
    Users,
    TrendingUp,
    DollarSign,
    Shield,
    Upload,
    CheckCircle2,
    X,
    AlertCircle,
    LogOut,
    BarChart2,
    Eye,
    Download,
    Trash2,
    UserCheck,
    UserX,
    Clock,
    Star,
    Zap,
    FileText,
    Lock,
} from "lucide-react";

const CEO_SECRET_PATH = "admin-ayiha-2026";

const mockStats = {
    totalRelais: 254,
    activeClients: 87,
    monthlyRevenue: 2850000,
    relayBudget: 485000,
    pendingScreenshots: 18,
    validatedToday: 42,
};

const mockRelais = [
    {
        id: 1,
        name: "Mariama Kounde",
        whatsapp: "+229 97 65 43 21",
        zone: "Cotonou Centre",
        points: 674,
        level: "Or",
        status: "active",
        gains: 18500,
        screenshots: 12,
        lastActive: "2026-05-28",
    },
    {
        id: 2,
        name: "Kolade Adjovi",
        whatsapp: "+229 95 32 10 87",
        zone: "Porto-Novo",
        points: 412,
        level: "Argent",
        status: "active",
        gains: 10500,
        screenshots: 8,
        lastActive: "2026-05-27",
    },
    {
        id: 3,
        name: "Farida Soumanou",
        whatsapp: "+229 96 78 44 23",
        zone: "Parakou",
        points: 1150,
        level: "Diamant",
        status: "active",
        gains: 28000,
        screenshots: 22,
        lastActive: "2026-05-28",
    },
    {
        id: 4,
        name: "Brice Hounton",
        whatsapp: "+229 97 11 99 55",
        zone: "Bohicon",
        points: 80,
        level: "Bronze",
        status: "inactive",
        gains: 2000,
        screenshots: 3,
        lastActive: "2026-05-10",
    },
    {
        id: 5,
        name: "Aissatou Dansou",
        whatsapp: "+229 94 66 22 88",
        zone: "Abomey",
        points: 520,
        level: "Or",
        status: "active",
        gains: 13000,
        screenshots: 10,
        lastActive: "2026-05-26",
    },
];

const mockScreenshots = [
    {
        id: 1,
        relais: "Mariama Kounde",
        client: "Boutique Mode Cotonou",
        platform: "WhatsApp Status",
        submittedAt: "2026-05-28 14:32",
        status: "pending",
        points: 5,
    },
    {
        id: 2,
        relais: "Kolade Adjovi",
        client: "Restaurant Saveurs",
        platform: "Facebook",
        submittedAt: "2026-05-28 12:15",
        status: "pending",
        points: 8,
    },
    {
        id: 3,
        relais: "Farida Soumanou",
        client: "Pharmacie Centrale",
        platform: "Instagram",
        submittedAt: "2026-05-28 10:00",
        status: "approved",
        points: 10,
    },
    {
        id: 4,
        relais: "Aissatou Dansou",
        client: "Boutique Mode Cotonou",
        platform: "WhatsApp Status",
        submittedAt: "2026-05-27 18:44",
        status: "rejected",
        points: 5,
    },
];

const mockBilan = [
    {
        relais: "Farida Soumanou",
        whatsapp: "+229 96 78 44 23",
        points: 1150,
        gains: 28000,
        level: "Diamant",
    },
    {
        relais: "Mariama Kounde",
        whatsapp: "+229 97 65 43 21",
        points: 674,
        gains: 18500,
        level: "Or",
    },
    {
        relais: "Aissatou Dansou",
        whatsapp: "+229 94 66 22 88",
        points: 520,
        gains: 13000,
        level: "Or",
    },
    {
        relais: "Kolade Adjovi",
        whatsapp: "+229 95 32 10 87",
        points: 412,
        gains: 10500,
        level: "Argent",
    },
    {
        relais: "Brice Hounton",
        whatsapp: "+229 97 11 99 55",
        points: 80,
        gains: 2000,
        level: "Bronze",
    },
];

export default function CEOSpacePage() {
    const [step, setStep] = useState<"gate" | "login" | "otp" | "dashboard">(
        "gate",
    );
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<
        "dashboard" | "relais" | "screenshots" | "upload" | "bilan" | "logs"
    >("dashboard");
    const [sessionTimer, setSessionTimer] = useState(30 * 60);
    const [screenshotFilter, setScreenshotFilter] = useState<string>("all");
    const [relaisFilter, setRelaisFilter] = useState<string>("all");

    // Session timer (30 min)
    useEffect(() => {
        if (step !== "dashboard") return;
        const t = setInterval(() => {
            setSessionTimer((prev) => {
                if (prev <= 1) {
                    setStep("login");
                    return 30 * 60;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [step]);

    const formatTimer = (s: number) =>
        `${Math.floor(s / 60)
            .toString()
            .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

    const handleLogin = () => {
        if (username === "ceo" && password === "Ayiha@2026") {
            setError("");
            setStep("otp");
        } else {
            setError("Identifiants incorrects. Accès refusé.");
        }
    };

    const handleOtp = () => {
        if (otp === "2026") {
            setError("");
            setStep("dashboard");
            setSessionTimer(30 * 60);
        } else {
            setError("Code OTP invalide.");
        }
    };

    // Gate: check secret URL awareness
    if (step === "gate") {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{ background: "#111" }}
            >
                <div className="text-center max-w-sm">
                    <div className="text-5xl mb-6">🔒</div>
                    <h1
                        className="font-poppins font-black text-2xl mb-3"
                        style={{ color: "#00A651" }}
                    >
                        Accès Restreint
                    </h1>
                    <p
                        className="text-sm mb-8"
                        style={{
                            color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.7,
                        }}
                    >
                        Cette page est réservée au personnel autorisé d'AYIHA
                        BOOST BEN/AFRICA.
                        <br />
                        URL secrète — non indexée.
                    </p>
                    <button
                        onClick={() => setStep("login")}
                        className="btn-primary mx-auto"
                        style={{ display: "inline-flex", padding: "14px 32px" }}
                    >
                        <Lock size={16} /> Accéder au panneau CEO
                    </button>
                    <p
                        className="mt-4 text-xs"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                        /{CEO_SECRET_PATH}
                    </p>
                </div>
            </div>
        );
    }

    if (step === "login") {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{ background: "#111" }}
            >
                <div
                    className="w-full max-w-sm p-8 rounded-3xl"
                    style={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}
                >
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{
                                background: "rgba(0,166,81,0.15)",
                                border: "2px solid rgba(0,166,81,0.3)",
                            }}
                        >
                            <Shield size={28} color="#00A651" />
                        </div>
                        <h1
                            className="font-poppins font-black text-2xl mb-1"
                            style={{ color: "white" }}
                        >
                            Espace CEO
                        </h1>
                        <p
                            className="text-sm"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                            AYIHA BOOST — Panneau d'administration
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label
                                className="block text-sm font-semibold mb-2"
                                style={{ color: "rgba(255,255,255,0.7)" }}
                            >
                                Identifiant
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Identifiant CEO"
                                className="input-field"
                                style={{
                                    background: "#2a2a2a",
                                    border: "2px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                }}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleLogin()
                                }
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm font-semibold mb-2"
                                style={{ color: "rgba(255,255,255,0.7)" }}
                            >
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="input-field"
                                style={{
                                    background: "#2a2a2a",
                                    border: "2px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                }}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleLogin()
                                }
                            />
                        </div>

                        {error && (
                            <div
                                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                                style={{
                                    background: "rgba(239,68,68,0.15)",
                                    color: "#ef4444",
                                }}
                            >
                                <AlertCircle size={14} /> {error}
                            </div>
                        )}

                        <button
                            onClick={handleLogin}
                            className="btn-primary w-full justify-center"
                            style={{ padding: "14px", marginTop: "8px" }}
                        >
                            Connexion sécurisée →
                        </button>
                    </div>

                    <div
                        className="mt-8 text-center text-xs"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                        🔒 Connexion chiffrée · Session 30 min · Logs
                        enregistrés
                    </div>
                </div>
            </div>
        );
    }

    if (step === "otp") {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{ background: "#111" }}
            >
                <div
                    className="w-full max-w-sm p-8 rounded-3xl"
                    style={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}
                >
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-3">📲</div>
                        <h2
                            className="font-poppins font-black text-2xl mb-1"
                            style={{ color: "white" }}
                        >
                            Vérification OTP
                        </h2>
                        <p
                            className="text-sm"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                            Un code a été envoyé sur le WhatsApp CEO
                        </p>
                    </div>
                    <div className="space-y-5">
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                            placeholder="Code OTP"
                            className="input-field text-center text-2xl tracking-widest"
                            style={{
                                background: "#2a2a2a",
                                border: "2px solid rgba(255,255,255,0.1)",
                                color: "white",
                                fontFamily: "monospace",
                                letterSpacing: "0.3em",
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleOtp()}
                        />
                        {error && (
                            <div
                                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                                style={{
                                    background: "rgba(239,68,68,0.15)",
                                    color: "#ef4444",
                                }}
                            >
                                <AlertCircle size={14} /> {error}
                            </div>
                        )}
                        <button
                            onClick={handleOtp}
                            className="btn-primary w-full justify-center"
                            style={{ padding: "14px" }}
                        >
                            Valider le code OTP
                        </button>
                        <button
                            onClick={() => {
                                setStep("login");
                                setError("");
                            }}
                            className="w-full text-sm text-center"
                            style={{
                                color: "rgba(255,255,255,0.4)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            ← Retour
                        </button>
                    </div>
                    <div
                        className="mt-6 text-center text-xs"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                        💡 Demo: utilisez le code "2026"
                    </div>
                </div>
            </div>
        );
    }

    // Full Dashboard
    const tabs = [
        { id: "dashboard", label: "Dashboard", icon: BarChart2 },
        { id: "relais", label: "Gestion Relais", icon: Users },
        { id: "screenshots", label: "Screenshots", icon: Eye },
        { id: "upload", label: "Publications", icon: Upload },
        { id: "bilan", label: "Bilan Mensuel", icon: FileText },
        { id: "logs", label: "Logs Sécurité", icon: Shield },
    ];

    const levelColor = (l: string) => {
        const m: Record<string, string> = {
            Bronze: "#CD7F32",
            Argent: "#9ca3af",
            Or: "#d97706",
            Diamant: "#1E3A8A",
        };
        return m[l] || "#888";
    };

    const filteredRelais =
        relaisFilter === "all"
            ? mockRelais
            : mockRelais.filter((r) => r.status === relaisFilter);
    const filteredScreenshots =
        screenshotFilter === "all"
            ? mockScreenshots
            : mockScreenshots.filter((s) => s.status === screenshotFilter);

    return (
        <div className="min-h-screen" style={{ background: "#111" }}>
            {/* CEO Top bar */}
            <div
                className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
                style={{
                    background: "#1a1a1a",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                            background: "rgba(0,166,81,0.2)",
                            border: "2px solid rgba(0,166,81,0.4)",
                        }}
                    >
                        <Zap size={16} color="#00A651" fill="#00A651" />
                    </div>
                    <div>
                        <div
                            className="font-poppins font-bold text-sm"
                            style={{ color: "white" }}
                        >
                            AYIHA BOOST — CEO
                        </div>
                        <div
                            className="text-xs"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                            Panneau d'administration sécurisé
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                            background:
                                sessionTimer < 300
                                    ? "rgba(239,68,68,0.15)"
                                    : "rgba(0,166,81,0.15)",
                            color: sessionTimer < 300 ? "#ef4444" : "#00A651",
                        }}
                    >
                        <Clock size={12} /> Session: {formatTimer(sessionTimer)}
                    </div>
                    <button
                        onClick={() => setStep("gate")}
                        title="Déconnexion"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "none",
                            cursor: "pointer",
                            padding: "6px 10px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <LogOut size={14} color="rgba(255,255,255,0.6)" />
                        <span
                            className="text-xs"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                            Déconnexion
                        </span>
                    </button>
                </div>
            </div>

            {/* Tab nav */}
            <div
                className="sticky z-40 px-4 overflow-x-auto"
                style={{
                    top: "56px",
                    background: "#1a1a1a",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
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
                                            ? "#00A651"
                                            : "transparent",
                                    color:
                                        activeTab === tab.id
                                            ? "white"
                                            : "rgba(255,255,255,0.5)",
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
                        <h2
                            className="font-poppins font-bold text-xl"
                            style={{ color: "white" }}
                        >
                            Vue d'ensemble — Mai 2026
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                {
                                    label: "Total Relais",
                                    value: mockStats.totalRelais,
                                    color: "#00A651",
                                    icon: Users,
                                },
                                {
                                    label: "Clients actifs",
                                    value: mockStats.activeClients,
                                    color: "#FF6B00",
                                    icon: TrendingUp,
                                },
                                {
                                    label: "CA Mensuel",
                                    value: `${(mockStats.monthlyRevenue / 1000).toFixed(0)}K`,
                                    suffix: "FCFA",
                                    color: "#00A651",
                                    icon: DollarSign,
                                },
                                {
                                    label: "Budget Relais",
                                    value: `${(mockStats.relayBudget / 1000).toFixed(0)}K`,
                                    suffix: "FCFA",
                                    color: "#d97706",
                                    icon: Star,
                                },
                                {
                                    label: "En attente",
                                    value: mockStats.pendingScreenshots,
                                    color: "#ef4444",
                                    icon: Clock,
                                },
                                {
                                    label: "Validés aujourd'hui",
                                    value: mockStats.validatedToday,
                                    color: "#00A651",
                                    icon: CheckCircle2,
                                },
                            ].map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div
                                        key={s.label}
                                        className="p-4 rounded-2xl text-center"
                                        style={{
                                            background: "#1a1a1a",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                                            style={{
                                                background: `${s.color}20`,
                                            }}
                                        >
                                            <Icon size={18} color={s.color} />
                                        </div>
                                        <div
                                            className="font-poppins font-black text-2xl"
                                            style={{
                                                color: s.color,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {s.value}
                                        </div>
                                        {s.suffix && (
                                            <div
                                                className="text-xs"
                                                style={{
                                                    color: "rgba(255,255,255,0.4)",
                                                }}
                                            >
                                                {s.suffix}
                                            </div>
                                        )}
                                        <div
                                            className="text-xs mt-1"
                                            style={{
                                                color: "rgba(255,255,255,0.4)",
                                            }}
                                        >
                                            {s.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Revenue chart placeholder */}
                        <div
                            className="p-6 rounded-2xl"
                            style={{
                                background: "#1a1a1a",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <h3
                                className="font-bold text-base mb-5"
                                style={{ color: "white" }}
                            >
                                Évolution du CA (6 derniers mois)
                            </h3>
                            <div className="flex items-end gap-3 h-32">
                                {[
                                    { month: "Déc", pct: 40 },
                                    { month: "Jan", pct: 55 },
                                    { month: "Fév", pct: 48 },
                                    { month: "Mar", pct: 65 },
                                    { month: "Avr", pct: 75 },
                                    { month: "Mai", pct: 92 },
                                ].map((d) => (
                                    <div
                                        key={d.month}
                                        className="flex-1 flex flex-col items-center gap-1"
                                    >
                                        <div
                                            className="text-xs font-bold"
                                            style={{ color: "#00A651" }}
                                        >
                                            {d.pct}%
                                        </div>
                                        <div
                                            className="w-full rounded-t-lg transition-all"
                                            style={{
                                                height: `${d.pct}%`,
                                                background:
                                                    d.month === "Mai"
                                                        ? "linear-gradient(180deg, #00A651, #005c30)"
                                                        : "rgba(0,166,81,0.3)",
                                                minHeight: "8px",
                                            }}
                                        />
                                        <div
                                            className="text-xs"
                                            style={{
                                                color: "rgba(255,255,255,0.4)",
                                            }}
                                        >
                                            {d.month}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alerts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div
                                className="p-5 rounded-2xl"
                                style={{
                                    background: "rgba(239,68,68,0.08)",
                                    border: "1px solid rgba(239,68,68,0.2)",
                                }}
                            >
                                <h4
                                    className="font-bold text-sm mb-3"
                                    style={{ color: "#ef4444" }}
                                >
                                    ⚠️ Alertes ({mockStats.pendingScreenshots})
                                </h4>
                                <p
                                    className="text-sm"
                                    style={{ color: "rgba(255,255,255,0.6)" }}
                                >
                                    {mockStats.pendingScreenshots} screenshots
                                    en attente de validation. Vérifiez les
                                    soumissions des relais avant la fin du mois.
                                </p>
                                <button
                                    onClick={() => setActiveTab("screenshots")}
                                    className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                                    style={{
                                        background: "rgba(239,68,68,0.15)",
                                        color: "#ef4444",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Voir les screenshots →
                                </button>
                            </div>
                            <div
                                className="p-5 rounded-2xl"
                                style={{
                                    background: "rgba(0,166,81,0.08)",
                                    border: "1px solid rgba(0,166,81,0.2)",
                                }}
                            >
                                <h4
                                    className="font-bold text-sm mb-3"
                                    style={{ color: "#00A651" }}
                                >
                                    💰 Budget Relais Disponible
                                </h4>
                                <p
                                    className="text-sm"
                                    style={{ color: "rgba(255,255,255,0.6)" }}
                                >
                                    {mockStats.relayBudget.toLocaleString()}{" "}
                                    FCFA disponibles pour les paiements MoMo de
                                    fin de mois.
                                </p>
                                <button
                                    onClick={() => setActiveTab("bilan")}
                                    className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                                    style={{
                                        background: "rgba(0,166,81,0.15)",
                                        color: "#00A651",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Générer le bilan →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── RELAIS TAB ── */}
                {activeTab === "relais" && (
                    <div className="space-y-5">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <h2
                                className="font-poppins font-bold text-xl"
                                style={{ color: "white" }}
                            >
                                Gestion des Relais ({mockRelais.length})
                            </h2>
                            <div className="flex gap-2">
                                {["all", "active", "inactive"].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setRelaisFilter(f)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                        style={{
                                            background:
                                                relaisFilter === f
                                                    ? "#00A651"
                                                    : "rgba(255,255,255,0.08)",
                                            color:
                                                relaisFilter === f
                                                    ? "white"
                                                    : "rgba(255,255,255,0.5)",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {f === "all"
                                            ? "Tous"
                                            : f === "active"
                                              ? "Actifs"
                                              : "Inactifs"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredRelais.map((relais) => (
                                <div
                                    key={relais.id}
                                    className="p-5 rounded-2xl"
                                    style={{
                                        background: "#1a1a1a",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div
                                            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 text-white"
                                            style={{
                                                background: levelColor(
                                                    relais.level,
                                                ),
                                            }}
                                        >
                                            {relais.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span
                                                    className="font-bold text-sm"
                                                    style={{ color: "white" }}
                                                >
                                                    {relais.name}
                                                </span>
                                                <span
                                                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                                                    style={{
                                                        background:
                                                            relais.status ===
                                                            "active"
                                                                ? "rgba(0,166,81,0.15)"
                                                                : "rgba(239,68,68,0.15)",
                                                        color:
                                                            relais.status ===
                                                            "active"
                                                                ? "#00A651"
                                                                : "#ef4444",
                                                    }}
                                                >
                                                    {relais.status === "active"
                                                        ? "● Actif"
                                                        : "○ Inactif"}
                                                </span>
                                                <span
                                                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                                                    style={{
                                                        background: `${levelColor(relais.level)}20`,
                                                        color: levelColor(
                                                            relais.level,
                                                        ),
                                                    }}
                                                >
                                                    {relais.level}
                                                </span>
                                            </div>
                                            <div
                                                className="flex flex-wrap gap-3 mt-1 text-xs"
                                                style={{
                                                    color: "rgba(255,255,255,0.4)",
                                                }}
                                            >
                                                <span>
                                                    📱 {relais.whatsapp}
                                                </span>
                                                <span>📍 {relais.zone}</span>
                                                <span>
                                                    ⭐ {relais.points} pts
                                                </span>
                                                <span>
                                                    💰{" "}
                                                    {relais.gains.toLocaleString()}{" "}
                                                    FCFA
                                                </span>
                                                <span>
                                                    📸 {relais.screenshots}{" "}
                                                    screenshots
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                title="Valider / Activer"
                                                className="p-2 rounded-lg transition-all"
                                                style={{
                                                    background:
                                                        "rgba(0,166,81,0.15)",
                                                    border: "none",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <UserCheck
                                                    size={16}
                                                    color="#00A651"
                                                />
                                            </button>
                                            <button
                                                title="Désactiver"
                                                className="p-2 rounded-lg transition-all"
                                                style={{
                                                    background:
                                                        "rgba(239,68,68,0.15)",
                                                    border: "none",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <UserX
                                                    size={16}
                                                    color="#ef4444"
                                                />
                                            </button>
                                            <button
                                                title="Supprimer"
                                                className="p-2 rounded-lg transition-all"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                    border: "none",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Trash2
                                                    size={16}
                                                    color="rgba(255,255,255,0.3)"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── SCREENSHOTS TAB ── */}
                {activeTab === "screenshots" && (
                    <div className="space-y-5">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <h2
                                className="font-poppins font-bold text-xl"
                                style={{ color: "white" }}
                            >
                                Validation des Screenshots
                            </h2>
                            <div className="flex gap-2">
                                {["all", "pending", "approved", "rejected"].map(
                                    (f) => (
                                        <button
                                            key={f}
                                            onClick={() =>
                                                setScreenshotFilter(f)
                                            }
                                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                            style={{
                                                background:
                                                    screenshotFilter === f
                                                        ? "#00A651"
                                                        : "rgba(255,255,255,0.08)",
                                                color:
                                                    screenshotFilter === f
                                                        ? "white"
                                                        : "rgba(255,255,255,0.5)",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {f === "all"
                                                ? "Tous"
                                                : f === "pending"
                                                  ? "En attente"
                                                  : f === "approved"
                                                    ? "Validés"
                                                    : "Rejetés"}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredScreenshots.map((ss) => {
                                const statusMap: Record<
                                    string,
                                    { color: string; label: string; bg: string }
                                > = {
                                    pending: {
                                        color: "#d97706",
                                        label: "⏳ En attente",
                                        bg: "rgba(217,119,6,0.12)",
                                    },
                                    approved: {
                                        color: "#00A651",
                                        label: "✓ Validé",
                                        bg: "rgba(0,166,81,0.12)",
                                    },
                                    rejected: {
                                        color: "#ef4444",
                                        label: "✕ Rejeté",
                                        bg: "rgba(239,68,68,0.12)",
                                    },
                                };
                                const st = statusMap[ss.status];
                                return (
                                    <div
                                        key={ss.id}
                                        className="p-5 rounded-2xl"
                                        style={{
                                            background: "#1a1a1a",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                📸
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                    <span
                                                        className="font-bold text-sm"
                                                        style={{
                                                            color: "white",
                                                        }}
                                                    >
                                                        {ss.relais}
                                                    </span>
                                                    <span
                                                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                                                        style={{
                                                            background: st.bg,
                                                            color: st.color,
                                                        }}
                                                    >
                                                        {st.label}
                                                    </span>
                                                    <span
                                                        className="text-xs font-bold"
                                                        style={{
                                                            color: "#00A651",
                                                        }}
                                                    >
                                                        +{ss.points} pts
                                                    </span>
                                                </div>
                                                <div
                                                    className="text-xs"
                                                    style={{
                                                        color: "rgba(255,255,255,0.4)",
                                                    }}
                                                >
                                                    {ss.client} · {ss.platform}{" "}
                                                    · {ss.submittedAt}
                                                </div>
                                            </div>
                                            {ss.status === "pending" && (
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <button
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                                                        style={{
                                                            background:
                                                                "rgba(0,166,81,0.2)",
                                                            color: "#00A651",
                                                            border: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <CheckCircle2
                                                            size={13}
                                                        />{" "}
                                                        Valider
                                                    </button>
                                                    <button
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                                                        style={{
                                                            background:
                                                                "rgba(239,68,68,0.2)",
                                                            color: "#ef4444",
                                                            border: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <X size={13} /> Rejeter
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ── UPLOAD / PUBLICATIONS TAB ── */}
                {activeTab === "upload" && (
                    <div className="space-y-6">
                        <h2
                            className="font-poppins font-bold text-xl"
                            style={{ color: "white" }}
                        >
                            Uploader une Publication Client
                        </h2>
                        <div
                            className="p-6 rounded-2xl"
                            style={{
                                background: "#1a1a1a",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{
                                                color: "rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            Nom du client *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Boutique Mode Cotonou"
                                            className="input-field"
                                            style={{
                                                background: "#2a2a2a",
                                                border: "2px solid rgba(255,255,255,0.1)",
                                                color: "white",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{
                                                color: "rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            Titre de la publication *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Titre de la campagne"
                                            className="input-field"
                                            style={{
                                                background: "#2a2a2a",
                                                border: "2px solid rgba(255,255,255,0.1)",
                                                color: "white",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{
                                                color: "rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            Zone de diffusion *
                                        </label>
                                        <select
                                            className="input-field"
                                            style={{
                                                background: "#2a2a2a",
                                                border: "2px solid rgba(255,255,255,0.1)",
                                                color: "white",
                                            }}
                                        >
                                            <option>Cotonou Centre</option>
                                            <option>Cotonou Sud</option>
                                            <option>Porto-Novo</option>
                                            <option>Parakou</option>
                                            <option>
                                                Tout le Bénin (77 communes)
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-semibold mb-2"
                                            style={{
                                                color: "rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            Date limite de publication *
                                        </label>
                                        <input
                                            type="date"
                                            className="input-field"
                                            style={{
                                                background: "#2a2a2a",
                                                border: "2px solid rgba(255,255,255,0.1)",
                                                color: "white",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-semibold mb-2"
                                        style={{
                                            color: "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        Visuel de la publication *
                                    </label>
                                    <div
                                        className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer"
                                        style={{
                                            borderColor:
                                                "rgba(255,255,255,0.15)",
                                            background: "#2a2a2a",
                                        }}
                                    >
                                        <Upload
                                            size={32}
                                            color="rgba(255,255,255,0.3)"
                                            className="mx-auto mb-3"
                                        />
                                        <p
                                            className="text-sm font-medium"
                                            style={{
                                                color: "rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            Cliquer pour uploader l'image
                                        </p>
                                        <p
                                            className="text-xs mt-1"
                                            style={{
                                                color: "rgba(255,255,255,0.3)",
                                            }}
                                        >
                                            PNG, JPG — Max 20 MB
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-semibold mb-2"
                                        style={{
                                            color: "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        Texte de la publication
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Texte à accompagner l'image..."
                                        className="input-field"
                                        style={{
                                            background: "#2a2a2a",
                                            border: "2px solid rgba(255,255,255,0.1)",
                                            color: "white",
                                            resize: "none",
                                        }}
                                    />
                                </div>
                                <button
                                    className="btn-primary w-full justify-center"
                                    style={{ padding: "14px" }}
                                >
                                    <Upload size={16} /> Publier dans l'espace
                                    relais
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── BILAN TAB ── */}
                {activeTab === "bilan" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <h2
                                className="font-poppins font-bold text-xl"
                                style={{ color: "white" }}
                            >
                                Bilan Mensuel — Mai 2026
                            </h2>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                                style={{
                                    background: "#00A651",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <Download size={15} /> Exporter Excel / CSV
                            </button>
                        </div>

                        <div
                            className="p-5 rounded-2xl"
                            style={{
                                background: "#1a1a1a",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                                <div>
                                    <div
                                        className="text-sm font-semibold"
                                        style={{
                                            color: "rgba(255,255,255,0.5)",
                                        }}
                                    >
                                        Total à payer ce mois
                                    </div>
                                    <div
                                        className="font-poppins font-black text-3xl"
                                        style={{ color: "#00A651" }}
                                    >
                                        {mockBilan
                                            .reduce((s, r) => s + r.gains, 0)
                                            .toLocaleString()}{" "}
                                        FCFA
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div
                                        className="text-sm font-semibold"
                                        style={{
                                            color: "rgba(255,255,255,0.5)",
                                        }}
                                    >
                                        Relais à payer
                                    </div>
                                    <div
                                        className="font-poppins font-black text-3xl"
                                        style={{ color: "#FF6B00" }}
                                    >
                                        {mockBilan.length}
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr
                                            style={{
                                                borderBottom:
                                                    "1px solid rgba(255,255,255,0.08)",
                                            }}
                                        >
                                            {[
                                                "Relais",
                                                "WhatsApp MoMo",
                                                "Niveau",
                                                "Points",
                                                "Montant FCFA",
                                                "Statut",
                                            ].map((h) => (
                                                <th
                                                    key={h}
                                                    className="text-left py-3 px-3 text-xs font-bold"
                                                    style={{
                                                        color: "rgba(255,255,255,0.4)",
                                                    }}
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockBilan.map((r, i) => (
                                            <tr
                                                key={r.relais}
                                                style={{
                                                    borderBottom:
                                                        "1px solid rgba(255,255,255,0.05)",
                                                }}
                                            >
                                                <td
                                                    className="py-3 px-3 font-semibold"
                                                    style={{ color: "white" }}
                                                >
                                                    {r.relais}
                                                </td>
                                                <td
                                                    className="py-3 px-3"
                                                    style={{ color: "#25D366" }}
                                                >
                                                    {r.whatsapp}
                                                </td>
                                                <td className="py-3 px-3">
                                                    <span
                                                        className="px-2 py-0.5 rounded text-xs font-bold"
                                                        style={{
                                                            background: `${levelColor(r.level)}20`,
                                                            color: levelColor(
                                                                r.level,
                                                            ),
                                                        }}
                                                    >
                                                        {r.level}
                                                    </span>
                                                </td>
                                                <td
                                                    className="py-3 px-3 font-bold"
                                                    style={{ color: "#00A651" }}
                                                >
                                                    {r.points}
                                                </td>
                                                <td
                                                    className="py-3 px-3 font-bold"
                                                    style={{ color: "white" }}
                                                >
                                                    {r.gains.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-3">
                                                    <span
                                                        className="px-2 py-0.5 rounded text-xs font-bold"
                                                        style={{
                                                            background:
                                                                i === 0
                                                                    ? "rgba(239,68,68,0.15)"
                                                                    : "rgba(0,166,81,0.15)",
                                                            color:
                                                                i === 0
                                                                    ? "#ef4444"
                                                                    : "#00A651",
                                                        }}
                                                    >
                                                        {i === 0
                                                            ? "⏳ En attente"
                                                            : "✓ À payer"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── LOGS TAB ── */}
                {activeTab === "logs" && (
                    <div className="space-y-5">
                        <h2
                            className="font-poppins font-bold text-xl"
                            style={{ color: "white" }}
                        >
                            Logs de Sécurité
                        </h2>
                        <div
                            className="p-5 rounded-2xl"
                            style={{
                                background: "rgba(239,68,68,0.08)",
                                border: "1px solid rgba(239,68,68,0.2)",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle size={16} color="#ef4444" />
                                <span
                                    className="font-bold text-sm"
                                    style={{ color: "#ef4444" }}
                                >
                                    Tentative suspecte détectée
                                </span>
                            </div>
                            <p
                                className="text-sm"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                            >
                                Une tentative de connexion avec des identifiants
                                erronés a été détectée depuis 41.x.x.x — Bloquée
                                automatiquement.
                            </p>
                        </div>
                        {[
                            {
                                type: "success",
                                msg: "Connexion CEO réussie",
                                ip: "41.y.y.y",
                                time: "2026-05-28 09:15:32",
                                icon: "✅",
                            },
                            {
                                type: "success",
                                msg: "Validation de 12 screenshots",
                                ip: "41.y.y.y",
                                time: "2026-05-28 10:32:18",
                                icon: "✅",
                            },
                            {
                                type: "warning",
                                msg: "Upload publication — Boutique Mode",
                                ip: "41.y.y.y",
                                time: "2026-05-28 11:05:47",
                                icon: "📤",
                            },
                            {
                                type: "error",
                                msg: "Tentative connexion échouée (3 essais)",
                                ip: "41.x.x.x",
                                time: "2026-05-27 22:14:03",
                                icon: "❌",
                            },
                            {
                                type: "success",
                                msg: "Génération bilan mensuel Avril 2026",
                                ip: "41.y.y.y",
                                time: "2026-05-01 08:30:00",
                                icon: "📊",
                            },
                            {
                                type: "info",
                                msg: "Backup automatique Firebase effectué",
                                ip: "system",
                                time: "2026-05-28 03:00:00",
                                icon: "💾",
                            },
                        ].map((log, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 rounded-xl"
                                style={{
                                    background: "#1a1a1a",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <span className="text-xl flex-shrink-0">
                                    {log.icon}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div
                                        className="text-sm font-medium"
                                        style={{
                                            color: "rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        {log.msg}
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{
                                            color: "rgba(255,255,255,0.3)",
                                        }}
                                    >
                                        IP: {log.ip}
                                    </div>
                                </div>
                                <div
                                    className="text-xs flex-shrink-0"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    {log.time}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
