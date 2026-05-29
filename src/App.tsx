import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import OffersPage from "./pages/OffersPage";
import AboutPage from "./pages/AboutPage";
import JoinPage from "./pages/JoinPage";
import ContactPage from "./pages/ContactPage";
import RelaySpacePage from "./pages/RelaySpacePage";
import CEOSpacePage from "./pages/CEOSpacePage";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import AIChatbot from "./components/AIChatbot";
import ScrollToTop from "./components/ScrollToTop";
import { SITE_CONFIG } from "./constants/siteConfig";

// Liste des pages où afficher le Navbar et le Footer
const PAGES_WITH_NAV_FOOTER = ["/", "/offers", "/about", "/join", "/contact"];

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const showNavFooter = PAGES_WITH_NAV_FOOTER.includes(location.pathname);
    const isCeoPage = location.pathname.startsWith("/ceo");

    // Redirection automatique de /ceo vers le chemin sécurisé si nécessaire (optionnel)

    return (
        <ThemeProvider>
            <AppContent
                showNavFooter={showNavFooter}
                isCeoPage={isCeoPage}
                navigate={navigate}
                location={location}
            />
        </ThemeProvider>
    );
}

function AppContent({
    showNavFooter,
    isCeoPage,
    navigate,
    location,
}: {
    showNavFooter: boolean;
    isCeoPage: boolean;
    navigate: (p: string) => void;
    location: { pathname: string };
}) {
    return (
        <div className={`app-container ${isCeoPage ? "ceo-theme" : ""}`}>
            <ScrollToTop />
            {showNavFooter && <Navbar />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/relay" element={<RelaySpacePage />} />
                <Route
                    path="/ceo"
                    element={
                        <div
                            className="flex flex-col items-center justify-center min-h-[80vh] p-10 text-center relative overflow-hidden"
                            style={{
                                background: "radial-gradient(circle at center, #1e293b 0%, #080c18 100%)",
                                color: "white"
                            }}
                        >
                            {/* Decorative background elements */}
                            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]" style={{ background: "#00A651" }} />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px]" style={{ background: "#1E3A8A" }} />

                            <div className="relative z-10 max-w-md mx-auto">
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse shadow-[0_0_40px_rgba(0,166,81,0.2)]"
                                    style={{
                                        background: "rgba(0,166,81,0.1)",
                                        border: "1px solid rgba(0,166,81,0.3)"
                                    }}
                                >
                                    <span className="text-4xl">🎩</span>
                                </div>
                                <h1 className="font-poppins font-black text-3xl mb-4 tracking-tight">Accès Sécurisé CEO</h1>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Cette zone est réservée à l'administration de {SITE_CONFIG.name}. Une clé d'accès sécurisée est requise pour continuer.
                                </p>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                        Tentative de connexion non autorisée détectée.
                                    </div>
                                    <a
                                        href="/"
                                        className="btn-primary w-full justify-center"
                                        style={{ textDecoration: "none", padding: "16px" }}
                                    >
                                        Retour au Terminal Public
                                    </a>
                                </div>

                                <p className="mt-10 text-xs text-gray-500 uppercase tracking-widest font-bold">
                                    Ayiha Security Systems · v2.6.0
                                </p>
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/admin-ayiha-2026/dashboard"
                    element={<CEOSpacePage />}
                />
                {/* Fallback 404 */}
                <Route
                    path="*"
                    element={
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <h2 className="text-4xl font-black text-gray-300">
                                404
                            </h2>
                            <p>Page non trouvée</p>
                        </div>
                    }
                />
            </Routes>

            {showNavFooter && <Footer />}

            {/* WhatsApp floating button — décalé pour laisser place au chatbot */}
            {showNavFooter && (
                <a
                    href={SITE_CONFIG.links.whatsapp("Bonjour " + SITE_CONFIG.name + " " + SITE_CONFIG.region + " !")}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Nous contacter sur WhatsApp"
                    aria-label="Contacter sur WhatsApp"
                    style={{
                        position: "fixed",
                        bottom: "24px",
                        right: "96px",
                        zIndex: 999,
                        width: "50px",
                        height: "50px",
                        background: "#25D366",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                    }
                >
                    <Phone size={22} color="white" />
                </a>
            )}

            {/* IA Chatbot — visible sur toutes les pages publiques */}
            {showNavFooter && <AIChatbot />}
        </div>
    );
}
