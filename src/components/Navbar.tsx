import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navItems = [
    { path: "/", id: "home", label: "Accueil" },
    { path: "/offers", id: "offers", label: "Offres" },
    { path: "/about", id: "about", label: "À Propos" },
    { path: "/join", id: "join", label: "Rejoindre" },
    { path: "/contact", id: "contact", label: "Contact" },
];

function DarkToggle() {
    const { dark, toggleDark } = useTheme();
    return (
        <button
            onClick={toggleDark}
            className="theme-toggle"
            title={dark ? "Passer en mode clair" : "Passer en mode sombre"}
            aria-label="Changer de thème"
        >
            <span
                className="theme-toggle-knob"
                style={{ left: dark ? "28px" : "4px" }}
            >
                {dark ? "🌙" : "☀️"}
            </span>
        </button>
    );
}

export default function Navbar() {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { dark } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navBg = dark
        ? scrolled
            ? "rgba(10, 14, 26, 0.98)"
            : "rgba(10, 14, 26, 0.85)"
        : scrolled
          ? "rgba(30, 58, 138, 0.98)"
          : "rgba(30, 58, 138, 0.85)";

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: navBg,
                    backdropFilter: "blur(20px)",
                    boxShadow: scrolled
                        ? "0 4px 30px rgba(0, 0, 0, 0.15)"
                        : "none",
                    padding: scrolled ? "12px 0" : "16px 0",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={handleLinkClick}
                        className="flex items-center gap-2.5 group no-underline"
                    >
                        <div className="logo-badge group-hover:scale-105">
                            <Zap size={20} color="#00A651" fill="#00A651" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span
                                className="font-poppins font-black text-base"
                                style={{ color: "#00A651", lineHeight: 1.1 }}
                            >
                                AYIHA BOOST
                            </span>
                            <span
                                className="text-xs font-bold tracking-widest"
                                style={{
                                    color: "#93c5fd",
                                    letterSpacing: "0.15em",
                                }}
                            >
                                BEN/AFRICA
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 nav-links">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={handleLinkClick}
                                className={`nav-button ${pathname === item.path ? "active" : ""}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <DarkToggle />
                        <Link
                            to="/relay"
                            onClick={handleLinkClick}
                            className="nav-cta ghost no-underline flex items-center justify-center"
                        >
                            Espace Relais
                        </Link>
                        <Link
                            to="/ceo"
                            onClick={handleLinkClick}
                            className="nav-cta primary no-underline flex items-center justify-center"
                        >
                            CEO
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <DarkToggle />
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "none",
                                cursor: "pointer",
                                padding: "8px",
                                borderRadius: "10px",
                                transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) =>
                                ((
                                    e.currentTarget as HTMLElement
                                ).style.background = "rgba(255, 255, 255, 0.2)")
                            }
                            onMouseLeave={(e) =>
                                ((
                                    e.currentTarget as HTMLElement
                                ).style.background = "rgba(255, 255, 255, 0.1)")
                            }
                        >
                            {menuOpen ? (
                                <X color="white" size={22} />
                            ) : (
                                <Menu color="white" size={22} />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 animate-slideDown"
                    style={{
                        background: dark
                            ? "rgba(10, 14, 26, 0.99)"
                            : "rgba(15, 25, 70, 0.99)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <button
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "none",
                            cursor: "pointer",
                            padding: "10px",
                            borderRadius: "12px",
                            transition: "background 0.2s",
                        }}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.background =
                                "rgba(255, 255, 255, 0.2)")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.background =
                                "rgba(255, 255, 255, 0.1)")
                        }
                    >
                        <X color="white" size={24} />
                    </button>

                    {/* Logo */}
                    <div className="flex items-center gap-2.5 mb-6">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{
                                background: "rgba(0, 166, 81, 0.15)",
                                border: "2px solid #00A651",
                            }}
                        >
                            <Zap size={24} color="#00A651" fill="#00A651" />
                        </div>
                        <div>
                            <div
                                className="font-poppins font-black text-xl"
                                style={{ color: "#00A651" }}
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

                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            onClick={handleLinkClick}
                            style={{
                                color:
                                    pathname === item.path
                                        ? "#00A651"
                                        : "rgba(255, 255, 255, 0.85)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "22px",
                                fontWeight: 700,
                                transition: "all 0.2s ease",
                                padding: "4px 0",
                                textDecoration: "none",
                            }}
                            onMouseEnter={(e) => {
                                if (pathname !== item.path) {
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.color = "#00A651";
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.transform = "scale(1.05)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (pathname !== item.path) {
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.color = "rgba(255, 255, 255, 0.85)";
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.transform = "scale(1)";
                                }
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="flex flex-col gap-3 w-full max-w-xs mt-4 px-8">
                        <Link
                            to="/relay"
                            onClick={handleLinkClick}
                            className="text-center no-underline"
                            style={{
                                background: "transparent",
                                color: "white",
                                padding: "16px 24px",
                                borderRadius: "14px",
                                fontWeight: 600,
                                fontSize: "15px",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                cursor: "pointer",
                                fontFamily: "Inter, sans-serif",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.background = "rgba(255, 255, 255, 0.1)";
                                (
                                    e.currentTarget as HTMLElement
                                ).style.borderColor =
                                    "rgba(255, 255, 255, 0.5)";
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.background = "transparent";
                                (
                                    e.currentTarget as HTMLElement
                                ).style.borderColor =
                                    "rgba(255, 255, 255, 0.3)";
                            }}
                        >
                            Espace Relais
                        </Link>
                        <Link
                            to="/ceo"
                            onClick={handleLinkClick}
                            className="text-center no-underline"
                            style={{
                                background:
                                    "linear-gradient(135deg, #00A651, #10b981)",
                                color: "white",
                                padding: "16px 24px",
                                borderRadius: "14px",
                                fontWeight: 600,
                                fontSize: "15px",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "Inter, sans-serif",
                                boxShadow: "0 4px 14px rgba(0, 166, 81, 0.3)",
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = "translateY(-2px)";
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    "0 6px 20px rgba(0, 166, 81, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = "translateY(0)";
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    "0 4px 14px rgba(0, 166, 81, 0.3)";
                            }}
                        >
                            Espace CEO
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
