import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, addToCart, getCartTotal, getItemCount } = useCart();
  const navigate = useNavigate();

  const livraison = 2000; 
  const totalGeneral = getCartTotal() + livraison;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-orange-600" />
        </motion.div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Votre panier est vide</h2>
        <p className="text-gray-400 font-medium mb-8 text-sm uppercase tracking-widest">Le style n'attend pas.</p>
        <button onClick={() => navigate('/products')} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all">
          Découvrir la collection
        </button>
      </div>
    );
  }

  return (
    // max-w-5xl recentre tout le panier au milieu
    <div className="pb-20 max-w-5xl mx-auto px-6">
      
      <header className="mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black tracking-tighter"
        >
          MON <span className="text-orange-600 italic">PANIER</span>.
        </motion.h1>
        <div className="h-1.5 w-12 bg-gray-900 mx-auto mt-4 rounded-full"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LISTE DES ARTICLES (Centrée à 7 colonnes) */}
        <div className="lg:col-span-7 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex items-center gap-6 bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm"
              >
                {/* Petite Image Carrée */}
                <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden flex-shrink-0 bg-gray-50">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>

                {/* Infos article */}
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-black text-gray-900 truncate">{item.name}</h3>
                  <p className="text-orange-600 font-black text-sm">{item.price.toLocaleString()} FCFA</p>
                  
                  {/* Contrôles Quantité Mini */}
                  <div className="flex items-center gap-4 mt-3 bg-gray-50 w-fit px-3 py-1 rounded-xl">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-orange-600 transition-colors"><Minus size={14} /></button>
                    <span className="font-black text-sm">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="text-gray-400 hover:text-orange-600 transition-colors"><Plus size={14} /></button>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-lg font-black text-gray-900">{(item.price * item.quantity).toLocaleString()}</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* RÉSUMÉ COMMANDE (Plus compact à 5 colonnes) */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50">
            <h2 className="text-xl font-black mb-8 uppercase tracking-tighter">Récapitulatif</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm font-bold text-gray-500">
                <span>Articles ({getItemCount()})</span>
                <span className="text-gray-900">{getCartTotal().toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-500">
                <span>Livraison</span>
                <span className="text-gray-900">{livraison.toLocaleString()} FCFA</span>
              </div>
              <div className="border-t border-dashed border-gray-100 pt-4 flex justify-between items-end">
                <span className="text-sm font-black uppercase text-gray-400">Total à payer</span>
                <span className="text-3xl font-black text-orange-600">{totalGeneral.toLocaleString()} <span className="text-xs">FCFA</span></span>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-3 group">
              Valider la commande <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Badges de confiance compacts */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-2xl">
                <ShieldCheck size={18} className="text-green-600 mb-1" />
                <span className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">Sécurisé</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-2xl">
                <Truck size={18} className="text-orange-600 mb-1" />
                <span className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">Express 24h</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Modes acceptés : Wave • Orange Money • Cash
          </p>
        </div>

      </div>
    </div>
  );
}