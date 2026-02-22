import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Sparkles, Star, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PREMIUM_PRODUCTS = [
 { 
  id: 1, 
  name: "Grand Boubou Basin Riche", 
  price: 65000, 
  category: "Cérémonie", 
  image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800", 
  rating: 5 
},
  { 
    id: 2, 
    name: "Robe Wax Haute Couture", 
    price: 35000, 
    category: "Soirée", 
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=800", 
    rating: 4.8 
  },
  { 
    id: 3, 
    name: "Tunique Bogolan Signature", 
    price: 28500, 
    category: "Homme", 
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800", 
    rating: 4.9 
  },
  { 
    id: 4, 
    name: "Accessoires Manjak Tissés", 
    price: 15000, 
    category: "Accessoires", 
    image: "https://images.unsplash.com/photo-1574343821035-779836369c0d?auto=format&fit=crop&q=80&w=800", 
    rating: 5 
  },
];

export default function Home() { 
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // --- LOGIQUE INTERACTIVE 3D ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  return (
    <div className="space-y-32 pb-20">
      
      {/* ================= SECTION HERO CINÉMATIQUE ================= */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-visible" 
        onMouseMove={handleMouse}
        onMouseLeave={() => { x.set(0); y.set(0); }}
      >
        {/* Texte en arrière-plan (z-index négatif pour éviter la superposition) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.03] select-none pointer-events-none -z-10">
          <h2 className="text-[22vw] font-black tracking-tighter text-center uppercase leading-none">Hackire</h2>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Côté Gauche : Texte */}
          <div className="lg:col-span-6 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="flex items-center gap-3 text-green-700 bg-green-50 w-fit px-6 py-2 rounded-full border border-green-100 shadow-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative rounded-full h-3 w-3 bg-green-600"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Collection Dakar 2026</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="text-7xl lg:text-[120px] font-black leading-[0.8] tracking-tighter text-gray-900"
            >
              L'ART <br /> <span className="text-orange-600 italic underline decoration-green-800 decoration-8">SÉNÉGAL</span>.
            </motion.h1>
            
            <p className="text-gray-400 text-xl lg:text-2xl font-medium max-w-md border-l-4 border-orange-600 pl-6 py-2">
              L'élégance africaine revisitée. <br /> 
              <span className="text-gray-900 font-bold">Portez votre culture avec fierté.</span>
            </p>

            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => navigate('/products')} 
                className="px-12 py-6 bg-gray-900 text-white rounded-full font-black text-xl hover:bg-orange-600 transition-all shadow-2xl hover:-translate-y-1"
              >
                La Boutique
              </button>
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="client"/>)}
                 </div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Approuvé par <br/><span className="text-gray-900">+2k clients</span></p>
              </div>
            </div>
          </div>

          {/* Côté Droit : La Carte 3D Interactive */}
          <div className="lg:col-span-6 relative perspective-2000 h-[600px] flex items-center justify-center">
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} 
              className="relative w-full max-w-[450px] aspect-[4/5]"
            >
              {/* Cadre Image Principal */}
              <div 
                className="absolute inset-0 rounded-[5rem] overflow-hidden border-[20px] border-white shadow-2xl bg-white" 
                style={{ transform: "translateZ(30px)" }}
              >
                <img src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Fashion Model" />
              </div>

              {/* Tag Prix Flottant */}
              <motion.div 
                style={{ transform: "translateZ(120px) translateX(-40px)" }} 
                className="absolute top-20 -left-10 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-orange-50 z-30"
              >
                <p className="text-orange-600 font-black text-3xl">45.000 <span className="text-xs">FCFA</span></p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Basin Riche</p>
              </motion.div>

              {/* Badge Qualité */}
              <motion.div 
                style={{ transform: "translateZ(100px) translateX(20px)" }} 
                className="absolute -bottom-10 -right-5 bg-green-800 text-white p-8 rounded-full shadow-2xl z-40 flex flex-col items-center border-8 border-white"
              >
                <Star fill="white" size={20} />
                <p className="text-[10px] font-black uppercase">Top Qualité</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= BANDEAU DÉFILANT (MARQUEE) ================= */}
      <div className="py-12 bg-gray-900 text-white overflow-hidden whitespace-nowrap flex border-y border-white/10 rotate-[-1deg]">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex gap-20 text-5xl font-black uppercase italic"
        >
          {["LIVRAISON PARTOUT AU SÉNÉGAL", "AUTHENTIQUE BASIN RICHE", "WAVE & ORANGE MONEY", "LIVRAISON PARTOUT AU SÉNÉGAL"].map((text, i) => (
            <span key={i} className="flex items-center gap-10">
              {text} <Sparkles className="text-orange-500" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ================= SECTION GRILLE DE PRODUITS ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-6xl font-black italic tracking-tighter">Nos Best-Sellers</h2>
            <div className="w-40 h-2 bg-orange-600 mt-4 rounded-full"></div>
          </div>
          <p className="text-gray-400 font-bold max-w-xs text-right uppercase tracking-widest text-xs">
            Sélectionnés avec soin pour vos plus beaux événements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {PREMIUM_PRODUCTS.map((product) => (
            <motion.div 
              key={product.id} 
              whileHover={{ y: -15 }} 
              className="group bg-white p-4 rounded-[3.5rem] hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] bg-gray-50 border border-gray-100 shadow-sm mb-6">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" alt={product.name}/>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-8 gap-4">
                  <button 
                    onClick={() => addToCart(product)} 
                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl"
                  >
                    <ShoppingCart size={18} /> Acheter
                  </button>
                  <button className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
                    <Eye size={16} /> Détails
                  </button>
                </div>
                <button className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={18} />
                </button>
              </div>
              <div className="px-4 pb-4">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#ea580c" className="text-orange-600"/>)}
                </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-1">{product.name}</h3>
                <p className="text-orange-600 font-black text-xl italic">{product.price.toLocaleString()} FCFA</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}