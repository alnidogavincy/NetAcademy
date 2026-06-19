import React, { useState } from 'react';
import { X, Router, Laptop, Wifi, Server, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asset: { name: string; desc: string; type: string }) => void;
}

const ASSET_TYPES = [
  { id: 'router', label: 'Router', icon: Router },
  { id: 'laptop', label: 'Switch', icon: Laptop },
  { id: 'wifi', label: 'Access Point', icon: Wifi },
  { id: 'server', label: 'Server', icon: Server },
];

export default function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('router');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name, desc, type });
    setName('');
    setDesc('');
    setType('router');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-slate-200"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add New Asset</h3>
                <p className="text-xs text-slate-500 mt-0.5">Register a new device to the topology inventory.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Asset Name</label>
                  <input 
                    autoFocus
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. CORE-SW-02"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Specifications / Model</label>
                  <input 
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="e.g. Cisco Catalyst 9200L"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Device Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {ASSET_TYPES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setType(t.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                          type === t.id 
                            ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(37,99,235,0.05)]" 
                            : "bg-white border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                          type === t.id ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                        )}>
                          <t.icon className="w-4 h-4" />
                        </div>
                        <span className={cn(
                          "text-xs font-bold transition-colors",
                          type === t.id ? "text-primary" : "text-slate-600"
                        )}>
                          {t.label}
                        </span>
                        {type === t.id && <Check className="w-3 h-3 ml-auto text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-3 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2"
                >
                  REGISTER ASSET
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
