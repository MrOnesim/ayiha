import { Zap, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Hexagon, Star, Diamond, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SITE_CONFIG } from "../constants/siteConfig";

export default function Footer() {
    const { dark } = useTheme();

    const muted = dark ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.65)";
    const socialLinks = [
        { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
        { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
        { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
        { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
    ];

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
                                    {SITE_CONFIG.name}
                                </div>
                                <div
                                    className="text-xs font-bold tracking-widest"
                                    style={{ color: "#93c5fd" }}
                                >
                                    {SITE_CONFIG.region}
                                </div>
                            </div>
                        </div>
                        <p
                            className="text-sm leading-relaxed mb-6"
                            style={{ color: muted }}
                        >
                            {SITE_CONFIG.description}
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                    title={item.label}
                                    className="social-badge"
                                    style={{ 
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <item.icon size={16} />
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
                                        className="text-sm footer-link no-underline flex items-center gap-2"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                            padding: 0,
                                        }}
                                    >
                                        <ChevronRight size={14} className="opacity-50" />
                                        {item.label}
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
                                    label: "Starter — 15 000 FCFA",
                                    icon: Hexagon,
                                    color: "#9ca3af",
                                },
                                {
                                    label: "Pro — 35 000 FCFA",
                                    icon: Star,
                                    color: "#00A651",
                                },
                                {
                                    label: "Premium — 75 000 FCFA",
                                    icon: Diamond,
                                    color: "#FF6B00",
                                },
                                { label: "Espace Relais", color: muted, icon: ChevronRight, path: "/relay" },
                                { label: "Espace CEO", color: muted, icon: ChevronRight, path: "/ceo" },
                            ].map((item) => (
                                <li key={item.label}>
                                    {item.path ? (
                                        <Link
                                            to={item.path}
                                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                            className="text-sm footer-link no-underline flex items-center gap-2"
                                            style={{ color: item.color }}
                                        >
                                            <item.icon size={14} className="opacity-70" />
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span
                                            className="text-sm flex items-center gap-2"
                                            style={{ color: item.color }}
                                        >
                                            <item.icon size={14} className="opacity-70" />
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
                                        href={SITE_CONFIG.links.whatsapp()}
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
                                        <span>WhatsApp : {SITE_CONFIG.contact.phone}</span>
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
                                    <span>{SITE_CONFIG.contact.email}</span>
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
