import React from 'react';
import { Bell, HelpCircle, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ItachiAvatar from '../ItachiAvatar';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm fixed top-0 right-0 left-64">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-slate-900 leading-tight">Interactive School Network Topology</h1>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">NOC-1 ACTIVE ONLINE</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Total Nodes</div>
            <div className="text-lg font-black leading-none text-slate-900">142</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-100" />
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Traffic Load</div>
            <div className="text-lg font-black leading-none text-blue-600">24%</div>
          </div>
        </div>
        
        <div className="h-8 w-[1px] bg-slate-200" />
        
        <Link to="/profile" className="flex items-center gap-3 pl-2 group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">Admin User</p>
            <p className="text-[10px] text-slate-400 font-bold">Network Admin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden group-hover:border-primary transition-all shadow-sm">
            <ItachiAvatar className="w-full h-full" />
          </div>
        </Link>
      </div>
    </header>
  );
}
