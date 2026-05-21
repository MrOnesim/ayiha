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
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import { useTheme } from "./context/ThemeContext";
import AIChatbot from "./components/AIChatbot";

const PAGES_WITH_NAV_FOOTER = [
    "/",
    "/offers",
    "/about",
    "/join",
    "/contact",
    "/login",
];

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const { dark } = useTheme();

    const showNavFooter = PAGES_WITH_NAV_FOOTER.includes(location.pathname);
    const isCeoPage = location.pathname.startsWith("/ceo");

    return (
        <div
            className="min-h-screen"
            style={{
                background: "var(--bg-primary)",
                transition: "background 0.3s",
            }}
        >
            {showNavFooter && <Navbar />}

            {/* Back button for relay/ceo pages */}
            {!showNavFooter && (
                <button
                    onClick={() => {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                    style={{
                        background: isCeoPage
                            ? "rgba(0,166,81,0.7)"
                            : "rgba(30,58,138,0.9)",
                        border: `1px solid ${isCeoPage ? "rgba(0,166,81,0.4)" : "rgba(255,255,255,0.2)"}`,
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    }}
                >
                    ← Retour au site
                </button>
            )}

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/offers" element={<OffersPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/join" element={<JoinPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* Routes protégées */}
                    <Route
                        path="/relay"
                        element={
                            <PrivateRoute allowedRoles={["relais", "admin"]}>
                                <RelaySpacePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ceo"
                        element={
                            <PrivateRoute allowedRoles={["ceo", "admin"]}>
                                <CEOSpacePage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </main>

            {showNavFooter && <Footer />}

            {/* WhatsApp floating button — décalé pour laisser place au chatbot */}
            {showNavFooter && (
                <a
                    href="https://wa.me/22901562020?text=Bonjour AYIHA BOOST BEN/AFRICA !"
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
