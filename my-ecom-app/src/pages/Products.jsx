import React, { useState, useEffect } from 'react'; // Ajout de useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios'; // On utilise axios pour parler à Django

export default function Products() {
  const { addToCart } = useCart();
  
  // --- ÉTATS (STATES) ---
  const [products, setProducts] = useState([]); // Contiendra les produits venus de Django
  const [loading, setLoading] = useState(true); // Pour afficher un état de chargement
  const [filter, setFilter] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  // --- APPEL API DJANGO ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Remplace l'URL par ton point d'entrée Django
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_BASE_URL}/api/products/`);
        setProducts(response.data); // On remplit notre état avec les données JSON
      } catch (error) {
        console.error("Erreur Django:", error);
      } finally {
        setLoading(false); // On arrête le chargement
      }
    };
    fetchProducts();
  }, []);

  // --- LOGIQUE DE FILTRAGE ---
  // On filtre sur les données qui viennent maintenant du Backend
  const filteredProducts = products.filter(p => 
    (filter === "Tous" || p.category_name === filter) && // category_name vient de notre Serializer
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Liste des catégories (idéalement, à récupérer aussi via l'API plus tard)
  const CATEGORIES = ["Tous", "Cérémonie", "Soirée", "Homme", "Accessoires"];

  if (loading) return <div className="text-center py-40 font-black italic">Chargement de la collection...</div>;

  return (
    <div className="min-h-screen pb-20 max-w-6xl mx-auto px-6">
      
      {/* HEADER : Titre animé avec Framer Motion */}
      <header className="mb-20 text-center space-y-4">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-orange-600 font-black tracking-[0.5em] uppercase text-[10px]">
          Exclusivité HackireShop
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl lg:text-7xl font-black tracking-tighter">
          LA <span className="italic text-orange-600">COLLECTION</span>.
        </motion.h1>
      </header>

      {/* FILTRES & RECHERCHE : Interactivité utilisateur */}
      <div className="flex flex-col items-center gap-10 mb-20">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-gray-900 text-white shadow-xl scale-105' : 'bg-white text-gray-400 border border-gray-100 hover:text-orange-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-600" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un modèle..."
            className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] outline-none font-medium transition-all shadow-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* GRILLE DE PRODUITS : Affichage dynamique */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <motion.div
              layout // Framer motion gère les déplacements fluides quand on filtre
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={product.id}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3.5rem] bg-gray-50 mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                {/* L'image vient maintenant de l'URL fournie par Django */}
                <img 
                  src={product.image} 
                  className={`w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 ${product.stock === 0 ? 'grayscale' : ''}`} 
                  alt={product.name} 
                />
                
                {product.stock > 0 && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center px-10">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="w-full bg-white text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} /> Commander
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="text-center px-4 space-y-2">
                <p className="text-orange-600 font-black text-[9px] uppercase tracking-[0.3em]">{product.category_name}</p>
                <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-none group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-2xl font-black text-gray-900">{product.price.toLocaleString()}</span>
                  <span className="text-xs font-black text-orange-600 uppercase tracking-tighter">FCFA</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* État vide si aucun produit ne correspond aux filtres */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[4rem]">
          <p className="text-gray-300 font-black text-2xl uppercase tracking-widest italic">Aucun modèle trouvé...</p>
        </div>
      )}
    </div>
  );
}