import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'offers', label: 'Offres' },
    { id: 'about', label: 'À Propos' },
    { id: 'join', label: 'Rejoindre' },
    { id: 'contact', label: 'Contact' },
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

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { dark } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navigate = (page: string) => {
        setCurrentPage(page);
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
                    <button
                        onClick={() => navigate('home')}
                        className="flex items-center gap-2.5 group"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                            style={{
                                background: 'rgba(0, 166, 81, 0.15)',
                                border: '2px solid #00A651',
                                boxShadow: '0 0 20px rgba(0, 166, 81, 0.2)',
                            }}
                        >
                            <Zap size={20} color="#00A651" fill="#00A651" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span
                                className="font-poppins font-black text-base"
                                style={{ color: '#00A651', lineHeight: 1.1 }}
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
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.id)}
                                style={{
                                    color:
                                        currentPage === item.id
                                            ? '#00A651'
                                            : 'rgba(255, 255, 255, 0.8)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight:
                                        currentPage === item.id ? 600 : 500,
                                    fontSize: '14px',
                                    fontFamily: 'Inter, sans-serif',
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    if (currentPage !== item.id) {
                                        (
                                            e.currentTarget as HTMLElement
                                        ).style.color = '#00A651';
                                        (
                                            e.currentTarget as HTMLElement
                                        ).style.background =
                                            'rgba(255, 255, 255, 0.08)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (currentPage !== item.id) {
                                        (
                                            e.currentTarget as HTMLElement
                                        ).style.color =
                                            'rgba(255, 255, 255, 0.8)';
                                        (
                                            e.currentTarget as HTMLElement
                                        ).style.background = 'transparent';
                                    }
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <DarkToggle />
                        <button
                            onClick={() => navigate('relay')}
                            style={{
                                background: 'transparent',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '13px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.background = 'rgba(255, 255, 255, 0.1)';
                                (
                                    e.currentTarget as HTMLElement
                                ).style.borderColor =
                                    'rgba(255, 255, 255, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.background = 'transparent';
                                (
                                    e.currentTarget as HTMLElement
                                ).style.borderColor =
                                    'rgba(255, 255, 255, 0.3)';
                            }}
                        >
                            Espace Relais
                        </button>
                        <button
                            onClick={() => navigate('ceo')}
                            style={{
                                background:
                                    'linear-gradient(135deg, #00A651, #10b981)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '13px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontFamily: 'Inter, sans-serif',
                                boxShadow: '0 4px 14px rgba(0, 166, 81, 0.3)',
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = 'translateY(-2px)';
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    '0 6px 20px rgba(0, 166, 81, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = 'translateY(0)';
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    '0 4px 14px rgba(0, 166, 81, 0.3)';
                            }}
                        >
                            CEO
                        </button>
                    </div>

                    {/* Mobile hamburger */}
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
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) =>
                                ((
                                    e.currentTarget as HTMLElement
                                ).style.background = 'rgba(255, 255, 255, 0.2)')
                            }
                            onMouseLeave={(e) =>
                                ((
                                    e.currentTarget as HTMLElement
                                ).style.background = 'rgba(255, 255, 255, 0.1)')
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
                            ? 'rgba(10, 14, 26, 0.99)'
                            : 'rgba(15, 25, 70, 0.99)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <button
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '12px',
                            transition: 'background 0.2s',
                        }}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.background =
                                'rgba(255, 255, 255, 0.2)')
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.background =
                                'rgba(255, 255, 255, 0.1)')
                        }
                    >
                        <X color="white" size={24} />
                    </button>

                    {/* Logo */}
                    <div className="flex items-center gap-2.5 mb-6">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'rgba(0, 166, 81, 0.15)',
                                border: '2px solid #00A651',
                            }}
                        >
                            <Zap size={24} color="#00A651" fill="#00A651" />
                        </div>
                        <div>
                            <div
                                className="font-poppins font-black text-xl"
                                style={{ color: '#00A651' }}
                            >
                                AYIHA BOOST
                            </div>
                            <div
                                className="text-xs font-bold tracking-widest"
                                style={{ color: '#93c5fd' }}
                            >
                                BEN/AFRICA
                            </div>
                        </div>
                    </div>

                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.id)}
                            style={{
                                color:
                                    currentPage === item.id
                                        ? '#00A651'
                                        : 'rgba(255, 255, 255, 0.85)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '22px',
                                fontWeight: 700,
                                transition: 'all 0.2s ease',
                                padding: '4px 0',
                            }}
                            onMouseEnter={(e) => {
                                if (currentPage !== item.id) {
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.color = '#00A651';
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.transform = 'scale(1.05)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentPage !== item.id) {
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.color = 'rgba(255, 255, 255, 0.85)';
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.transform = 'scale(1)';
                                }
                            }}
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className="flex flex-col gap-3 w-full max-w-xs mt-4 px-8">
                        <button
                            onClick={() => navigate('relay')}
                            style={{
                                background: 'transparent',
                                color: 'white',
                                padding: '16px 24px',
                                borderRadius: '14px',
                                fontWeight: 600,
                                fontSize: '15px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.background = 'rgba(255, 255, 255, 0.1)';
                                (
                                    e.currentTarget as HTMLElement
                                ).style.borderColor =
                                    'rgba(255, 255, 255, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.background = 'transparent';
                                (
                                    e.currentTarget as HTMLElement
                                ).style.borderColor =
                                    'rgba(255, 255, 255, 0.3)';
                            }}
                        >
                            Espace Relais
                        </button>
                        <button
                            onClick={() => navigate('ceo')}
                            style={{
                                background:
                                    'linear-gradient(135deg, #00A651, #10b981)',
                                color: 'white',
                                padding: '16px 24px',
                                borderRadius: '14px',
                                fontWeight: 600,
                                fontSize: '15px',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                                boxShadow: '0 4px 14px rgba(0, 166, 81, 0.3)',
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = 'translateY(-2px)';
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    '0 6px 20px rgba(0, 166, 81, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = 'translateY(0)';
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    '0 4px 14px rgba(0, 166, 81, 0.3)';
                            }}
                        >
                            Espace CEO
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
