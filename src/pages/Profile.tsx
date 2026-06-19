import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Camera, Save, Bell, Lock } from 'lucide-react';
import ItachiAvatar from '../components/ItachiAvatar';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@netacademy.edu',
    role: 'Network Administrator',
    avatar: 'custom-itachi'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Sidebar */}
        <div className="w-full md:w-72 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl bg-black">
                <ItachiAvatar className="w-full h-full" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-8 h-8" />
              </div>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">{profile.name}</h2>
            <p className="text-slate-500 text-sm font-medium">{profile.role}</p>
            <div className="mt-6 w-full pt-6 border-t border-slate-100">
               <button 
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                {isEditing ? 'CANCEL EDIT' : 'EDIT PROFILE'}
              </button>
            </div>
          </div>

          <nav className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <button className="w-full px-6 py-4 flex items-center gap-3 text-sm font-bold text-blue-600 bg-blue-50 border-l-4 border-blue-600">
              <User className="w-4 h-4" /> Personal Info
            </button>
            <button className="w-full px-6 py-4 flex items-center gap-3 text-sm font-medium text-slate-600 hover:bg-slate-50 border-l-4 border-transparent transition-all">
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button className="w-full px-6 py-4 flex items-center gap-3 text-sm font-medium text-slate-600 hover:bg-slate-50 border-l-4 border-transparent transition-all">
              <Lock className="w-4 h-4" /> Security
            </button>
          </nav>
        </div>

        {/* Main Form */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
            <p className="text-xs text-slate-500 mt-1">Manage your account details and profile exposure.</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    defaultValue={profile.name}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-60"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    disabled={!isEditing}
                    defaultValue={profile.email}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Role</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  disabled
                  defaultValue={profile.role}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all opacity-60"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
               {isEditing && (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  DISCARD
                </button>
               )}
               <button 
                disabled={!isEditing}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
