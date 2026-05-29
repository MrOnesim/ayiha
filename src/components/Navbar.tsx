import { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
    { path: '/', id: 'home', label: 'Accueil' },
    { path: '/offers', id: 'offers', label: 'Offres' },
    { path: '/about', id: 'about', label: 'À Propos' },
    { path: '/join', id: 'join', label: 'Rejoindre' },
    { path: '/contact', id: 'contact', label: 'Contact' },
];

function DarkToggle() {
    const { dark, toggleDark } = useTheme();

    return (
        <button
            onClick={toggleDark}
            className="theme-toggle"
            title={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            aria-label="Changer de thème"
        >
            <span
                className="theme-toggle-knob"
                style={{ left: dark ? '28px' : '4px' }}
            >
                {dark ? '🌙' : '☀️'}
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
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navBg = dark
        ? scrolled
            ? 'rgba(10, 14, 26, 0.98)'
            : 'rgba(10, 14, 26, 0.85)'
        : scrolled
          ? 'rgba(30, 58, 138, 0.98)'
          : 'rgba(30, 58, 138, 0.85)';

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: navBg,
                    backdropFilter: 'blur(20px)',
                    boxShadow: scrolled
                        ? '0 4px 30px rgba(0, 0, 0, 0.15)'
                        : 'none',
                    padding: scrolled ? '12px 0' : '16px 0',
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
                                style={{
                                    color: '#00A651',
                                    lineHeight: 1.1,
                                }}
                            >
                                AYIHA BOOST
                            </span>
                            <span
                                className="text-xs font-bold tracking-widest"
                                style={{
                                    color: '#93c5fd',
                                    letterSpacing: '0.15em',
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
                                className={`nav-button ${
                                    pathname === item.path ? 'active' : ''
                                }`}
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

                    {/* Mobile */}
                    <div className="md:hidden flex items-center gap-2">
                        <DarkToggle />

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '10px',
                            }}
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

            {/* MOBILE MENU */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
                    style={{
                        background: dark
                            ? 'rgba(10, 14, 26, 0.99)'
                            : 'rgba(15, 25, 70, 0.99)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            onClick={handleLinkClick}
                            style={{
                                color:
                                    pathname === item.path
                                        ? '#00A651'
                                        : 'rgba(255,255,255,0.85)',
                                fontSize: '22px',
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        to="/relay"
                        onClick={handleLinkClick}
                        style={{ color: 'white', marginTop: 20 }}
                    >
                        Espace Relais
                    </Link>

                    <Link
                        to="/ceo"
                        onClick={handleLinkClick}
                        style={{
                            color: 'white',
                            fontWeight: 700,
                            marginTop: 10,
                        }}
                    >
                        CEO
                    </Link>
                </div>
            )}
        </>
    );
}
