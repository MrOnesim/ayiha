import { Zap, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
    const { dark } = useTheme();

    const bg = dark ? "#05080f" : "#0d1f5c";
    const border = dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)";
    const muted = dark ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.65)";
    const social = ["Facebook", "Instagram", "Twitter", "YouTube"];
    const letters = ["f", "in", "tw", "▶"];

    return (
        <footer className="site-footer">
            <div className="max-w-7xl mx-auto px-4 py-16 container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-5">
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: "rgba(0,166,81,0.2)",
                                    border: "2px solid #00A651",
                                }}
                            >
                                <Zap size={22} color="#00A651" fill="#00A651" />
                            </div>
                            <div>
                                <div
                                    className="font-poppins font-black text-lg"
                                    style={{
                                        color: "#00A651",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    AYIHA BOOST
                                </div>
                                <div
                                    className="text-xs font-bold tracking-widest"
                                    style={{ color: "#93c5fd" }}
                                >
                                    BEN/AFRICA
                                </div>
                            </div>
                        </div>
                        <p
                            className="text-sm leading-relaxed mb-6"
                            style={{ color: muted }}
                        >
                            Le premier réseau de relais digitaux couvrant les 77
                            communes du Bénin. Boostez votre présence digitale
                            avec nous.
                        </p>
                        <div className="flex gap-3">
                            {social.map((label, i) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    title={label}
                                    className="social-badge"
                                    style={{ textDecoration: "none" }}
                                >
                                    {letters[i]}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-base mb-5">Navigation</h4>
                        <ul className="space-y-3">
                            {[
                                { path: "/", label: "Accueil" },
                                { path: "/offers", label: "Nos Offres" },
                                { path: "/about", label: "À Propos" },
                                { path: "/join", label: "Rejoindre" },
                                { path: "/contact", label: "Contact" },
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                        className="text-sm footer-link no-underline"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                            padding: 0,
                                        }}
                                    >
                                        → {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-base mb-5">
                            Nos Formules
                        </h4>
                        <ul className="space-y-3">
                            {[
                                {
                                    label: "⬡ Starter — 15 000 FCFA",
                                    color: "#9ca3af",
                                },
                                {
                                    label: "★ Pro — 35 000 FCFA",
                                    color: "#00A651",
                                },
                                {
                                    label: "◆ Premium — 75 000 FCFA",
                                    color: "#FF6B00",
                                },
                                { label: "→ Espace Relais", color: muted, path: "/relay" },
                                { label: "→ Espace CEO", color: muted, path: "/ceo" },
                            ].map((item) => (
                                <li key={item.label}>
                                    {item.path ? (
                                        <Link
                                            to={item.path}
                                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                            className="text-sm footer-link no-underline"
                                            style={{ color: item.color }}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span
                                            className="text-sm"
                                            style={{ color: item.color }}
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-base mb-5">Contact</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://wa.me/22901562020"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-sm footer-link"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Phone
                                        size={16}
                                        style={{
                                            marginTop: 2,
                                            color: "#25D366",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span>WhatsApp : 0156202023</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:contact@ayihaboost.com"
                                    className="flex items-start gap-3 text-sm footer-link"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Mail
                                        size={16}
                                        style={{
                                            marginTop: 2,
                                            color: "#00A651",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span>contact@ayihaboost.com</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-sm muted">
                                <MapPin
                                    size={16}
                                    style={{
                                        marginTop: 2,
                                        color: "#FF6B00",
                                        flexShrink: 0,
                                    }}
                                />
                                <span>
                                    Cotonou, Bénin
                                    <br />
                                    77 Communes couvertes
                                </span>
                            </li>
                        </ul>
                        <a
                            href="https://wa.me/22901562020"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl"
                            style={{
                                background: "#25D366",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "12px",
                            }}
                        >
                            <Phone size={16} /> WhatsApp maintenant
                        </a>
                    </div>
                </div>
            </div>
            {/* Bottom bar */}
            <div className="footer-bottom">
                <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 container">
                    <p className="text-xs muted">
                        © 2026 AYIHA BOOST BEN/AFRICA. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{
                                background: "var(--green)",
                                animation: "pulse-green 2s infinite",
                            }}
                        />
                        <span
                            className="text-xs font-medium"
                            style={{ color: "var(--green)" }}
                        >
                            Mission nationale : 77 communes du Bénin
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
