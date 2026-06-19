import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Network } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 bg-surface-container-low overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover opacity-30 mix-blend-multiply transition-transform duration-10000 animate-pulse-slow"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2034&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 to-surface-container-lowest/90" />
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[420px] bg-surface rounded-xl shadow-xl border border-outline-variant p-10"
      >
        <header className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-4">
            <Network className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-on-surface mb-2 tracking-tight">NetAcademy</h1>
          <p className="text-on-surface-variant">Sistem Informasi Topologi Jaringan Sekolah Interaktif</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface">Username</label>
            <input 
              type="text" 
              placeholder="Masukkan NIK atau NISN"
              required
              className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-on-surface">Password</label>
              <button type="button" className="text-sm text-primary hover:underline">Lupa Password?</button>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <button 
            type="submit"
            className="w-full h-12 mt-2 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Masuk ke Sistem
          </button>
        </form>

        <footer className="mt-8 pt-6 border-t border-outline-variant flex justify-center items-center gap-2 text-on-surface-variant text-sm">
          <span>Akses Terbatas: Administrator & Siswa Terdaftar</span>
        </footer>
      </motion.main>
    </div>
  );
}
