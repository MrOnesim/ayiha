import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { login } from "../services/authService";

type LoginMode = "relais" | "ceo";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState<LoginMode>("relais");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const from = (location.state as { from?: Location })?.from?.pathname || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        setIsLoading(true);
        try {
            const result = await login({ email, password });
            if (result.success) {
                // Rediriger vers l'espace approprié
                const targetPath = mode === "ceo" ? "/ceo" : "/relay";
                navigate(targetPath, { replace: true });
            } else {
                setError(result.error || "Échec de la connexion");
            }
        } catch {
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
            {/* Bouton retour */}
            <button
                onClick={() => navigate("/")}
                className="fixed top-6 left-6 flex items-center gap-2 text-text-muted hover:text-green-brand transition-colors"
            >
                <ArrowLeft size={20} />
                <span className="font-medium">Retour au site</span>
            </button>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-brand/10 border-2 border-green-brand mb-4">
                        <LogIn size={28} color="#00A651" />
                    </div>
                    <h1 className="font-poppins font-black text-2xl text-text-primary">
                        AYIHA BOOST
                    </h1>
                    <p className="text-text-muted mt-2">
                        Connectez-vous à votre espace
                    </p>
                </div>

                {/* Sélection du mode */}
                <div className="flex gap-2 mb-8 p-1 bg-bg-muted rounded-xl">
                    <button
                        type="button"
                        onClick={() => setMode("relais")}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                            mode === "relais"
                                ? "bg-green-brand text-white shadow-lg"
                                : "text-text-muted hover:text-text-primary"
                        }`}
                    >
                        Espace Relais
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("ceo")}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                            mode === "ceo"
                                ? "bg-navy-brand text-white shadow-lg"
                                : "text-text-muted hover:text-text-primary"
                        }`}
                    >
                        Espace CEO
                    </button>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="card">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-text-secondary">
                                Email
                            </label>
                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-text-secondary">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="input-field pl-12 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-primary transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bouton de connexion */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn-primary w-full justify-center mt-6 ${
                            mode === "ceo"
                                ? "bg-navy-brand hover:bg-navy-light"
                                : ""
                        }`}
                        style={
                            mode === "ceo"
                                ? {
                                      background:
                                          "linear-gradient(135deg, #1E3A8A, #0f2460)",
                                  }
                                : undefined
                        }
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <LogIn size={18} />
                                Se connecter
                            </>
                        )}
                    </button>

                    {/* Note de développement */}
                    <div className="mt-6 p-4 rounded-xl bg-bg-muted text-xs text-text-faint">
                        <p className="font-semibold mb-1">
                            Mode développement :
                        </p>
                        <p>
                            Pour tester, entrez n'importe quel email et mot de
                            passe. L'email détermine le rôle (contenant "ceo" →
                            CEO, sinon → Relais).
                        </p>
                    </div>
                </form>

                {/* Liens utiles */}
                <div className="text-center mt-6">
                    <a
                        href="https://wa.me/22901562020"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-brand hover:underline"
                    >
                        Besoin d'aide ? Contactez-nous sur WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
