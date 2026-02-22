import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Importation de tes composants
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';

// Importation de tes pages
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Admin from './pages/Admin';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Le SplashScreen s'arrête après 2.5 secondes
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. Écran de chargement au démarrage */}
      <AnimatePresence>
        {loading && <SplashScreen key="splash" />}
      </AnimatePresence>

      <div className="min-h-screen bg-[#fcfcfc] font-sans flex flex-col">
        {/* 2. Navbar visible uniquement après le chargement */}
        {!loading && <Navbar />}
        
        {/* 3. Contenu principal avec espace pour la Navbar fixe */}
        <main className={`flex-grow transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100 pt-32 lg:pt-40'}`}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* 4. Footer tout en bas après le chargement */}
        {!loading && <Footer />}
      </div>
    </>
  );
}

export default App;