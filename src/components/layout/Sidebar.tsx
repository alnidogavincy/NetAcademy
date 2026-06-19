import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Network, 
  Router, 
  ShieldCheck, 
  Settings, 
  BookOpen, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import ItachiAvatar from '../ItachiAvatar';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Network, label: 'Topology Map', href: '/topology' },
  { icon: Router, label: 'Devices', href: '/devices' },
  { icon: ShieldCheck, label: 'User Access', href: '/users' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const secondaryNavItems = [
  { icon: BookOpen, label: 'Documentation', href: '/docs' },
  { icon: LogOut, label: 'Sign Out', href: '/login' },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-sidebar-bg border-r border-sidebar-border flex flex-col shrink-0 text-sidebar-text z-20">
      <div className="h-16 flex items-center px-6 gap-3 border-b border-sidebar-border/50">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded-full" />
        </div>
        <span className="text-white font-bold tracking-tight text-lg">NetAcademy</span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 px-3">Network Architecture</div>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              isActive 
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                : "hover:bg-slate-900 hover:text-slate-200"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                <span className="font-medium text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 px-3">System Resources</div>
        {secondaryNavItems.slice(0, 1).map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-slate-900 hover:text-slate-200"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span className="font-medium text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-sidebar-border/50">
        <NavLink 
          to="/profile" 
          className="flex items-center gap-3 mb-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold overflow-hidden group-hover:border-primary transition-all">
            <ItachiAvatar className="w-full h-full" />
          </div>
          <div className="overflow-hidden">
            <div className="text-sm text-white font-medium truncate group-hover:text-primary transition-colors">Admin User</div>
            <div className="text-xs text-slate-500 truncate lowercase font-bold tracking-tight">@network_admin</div>
          </div>
        </NavLink>
        <NavLink 
          to="/login"
          className="w-full py-2.5 bg-slate-900 hover:bg-red-950/30 hover:text-red-400 text-[10px] font-bold text-slate-400 rounded border border-slate-800 transition-all flex items-center justify-center gap-2 tracking-widest uppercase"
        >
          <LogOut className="w-3 h-3" />
          TERMINATE SESSION
        </NavLink>
      </div>
    </aside>
  );
}
