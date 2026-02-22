import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Chrome, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    username: '', // Django utilise 'username' par défaut
    password: '',
    email: ''     // Pour l'inscription
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Gestion des changements d'input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Efface l'erreur quand on tape
  };

  // Logique de soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const endpoint = isLogin 
      ? `${import.meta.env.VITE_API_URL}/api/login/` 
      : `${import.meta.env.VITE_API_URL}/api/register/`; // À créer dans Django

    try {
      const response = await axios.post(endpoint, formData);
      
      if (isLogin) {
        // Stockage des Tokens JWT
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        // Optionnel: Stocker le nom de l'utilisateur
        localStorage.setItem('username', formData.username);
        
        navigate('/'); // Redirection vers l'accueil
        window.location.reload(); // Pour forcer la Navbar à se mettre à jour
      } else {
        // Si inscription réussie, on bascule sur login
        setIsLogin(true);
        setError('Compte créé ! Connectez-vous.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Identifiants incorrects. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 lg:p-14 rounded-[4rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="text-center mb-12 relative z-10">
          <div className="w-16 h-16 bg-gray-900 rounded-3xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 rotate-3">
            H
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">
            {isLogin ? 'BONRETOUR.' : 'BIENVENUE.'}
          </h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">
            HackireShop Privilège
          </p>
        </div>

        {/* Message d'erreur dynamique */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-red-100">
            <AlertCircle size={16} /> {error}
          </motion.div>
        )}

        <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Nom d'utilisateur</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-600 transition-colors" size={18} />
              <input 
                name="username"
                type="text" 
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Ex: modou_style"
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[2rem] focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-50 outline-none transition-all font-medium"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email (Optionnel)</label>
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.sn"
                className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[2rem] outline-none font-medium"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Mot de passe</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-600 transition-colors" size={18} />
              <input 
                name="password"
                type="password" 
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[2rem] focus:bg-white focus:border-orange-200 focus:ring-4 focus:ring-orange-50 outline-none transition-all font-medium"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-gray-900 hover:bg-orange-600'} text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 group transition-all shadow-xl`}
          >
            {loading ? 'Traitement...' : isLogin ? 'Se connecter' : 'Créer un compte'} 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="flex items-center gap-4 my-10">
          <div className="flex-grow h-[1px] bg-gray-100"></div>
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Hackire Fashion</span>
          <div className="flex-grow h-[1px] bg-gray-100"></div>
        </div>

        <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">
          {isLogin ? "Pas encore de compte ?" : "Déjà membre ?"}
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="ml-2 text-orange-600 font-black hover:underline"
          >
            {isLogin ? 'S\'inscrire' : 'Connexion'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}