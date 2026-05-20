import { useState } from 'react';
import { Phone } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import AboutPage from './pages/AboutPage';
import JoinPage from './pages/JoinPage';
import ContactPage from './pages/ContactPage';
import RelaySpacePage from './pages/RelaySpacePage';
import CEOSpacePage from './pages/CEOSpacePage';
import { useTheme } from './context/ThemeContext';
import AIChatbot from './components/AIChatbot';

const PAGES_WITH_NAV_FOOTER = ['home', 'offers', 'about', 'join', 'contact'];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { dark } = useTheme();

  const showNavFooter = PAGES_WITH_NAV_FOOTER.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':    return <HomePage    setCurrentPage={setCurrentPage} />;
      case 'offers':  return <OffersPage  setCurrentPage={setCurrentPage} />;
      case 'about':   return <AboutPage   setCurrentPage={setCurrentPage} />;
      case 'join':    return <JoinPage    setCurrentPage={setCurrentPage} />;
      case 'contact': return <ContactPage />;
      case 'relay':   return <RelaySpacePage />;
      case 'ceo':     return <CEOSpacePage />;
      default:        return <HomePage    setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', transition: 'background 0.3s' }}>
      {showNavFooter && (
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      {/* Back button for relay/ceo pages */}
      {!showNavFooter && (
        <button
          onClick={() => setCurrentPage('home')}
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 600,
            background: dark
              ? (currentPage === 'ceo' ? 'rgba(0,166,81,0.25)' : 'rgba(30,58,138,0.7)')
              : (currentPage === 'ceo' ? 'rgba(0,166,81,0.2)'  : 'rgba(30,58,138,0.9)'),
            color: 'white',
            border: `1px solid ${currentPage === 'ceo' ? 'rgba(0,166,81,0.4)' : 'rgba(255,255,255,0.2)'}`,
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          ← Retour au site
        </button>
      )}

      <main>{renderPage()}</main>

      {showNavFooter && <Footer setCurrentPage={setCurrentPage} />}

      {/* WhatsApp floating button — décalé pour laisser place au chatbot */}
      {showNavFooter && (
        <a
          href="https://wa.me/22901562020?text=Bonjour AYIHA BOOST BEN/AFRICA !"
          target="_blank"
          rel="noopener noreferrer"
          title="Nous contacter sur WhatsApp"
          aria-label="Contacter sur WhatsApp"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '96px',
            zIndex: 999,
            width: '50px',
            height: '50px',
            background: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Phone size={22} color="white" />
        </a>
      )}

      {/* IA Chatbot — visible sur toutes les pages publiques */}
      {showNavFooter && <AIChatbot />}
    </div>
  );
}
