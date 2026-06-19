import React from 'react';
import { X, Wifi, Terminal, Activity, ChevronRight, Hash, Clock, Smartphone, Router, Network } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NodeInspectorProps {
  node: any;
  onClose: () => void;
  onDelete: () => void;
}

export default function NodeInspector({ node, onClose, onDelete }: NodeInspectorProps) {
  if (!node) {
    return (
      <aside className="w-80 bg-white border-l border-slate-200 flex flex-col z-40 items-center justify-center p-8 text-center bg-slate-50/30">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
          <Smartphone className="w-8 h-8" />
        </div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-tight">No Active Node</h3>
        <p className="text-[10px] text-slate-400 mt-1">Select a device from the map to inspect its real-time properties.</p>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col z-40 h-full">
      <div className="h-14 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center px-6 shrink-0">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Node Properties</h3>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Identity Section */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-inner shrink-0 text-3xl">
            {node.type === 'router' ? <Router className="w-7 h-7" /> : <Network className="w-7 h-7" />}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xl font-bold text-slate-900 leading-tight truncate">{node.label}</h4>
            <p className="text-xs text-slate-500 mt-0.5 truncate">{node.model || 'Cisco Catalyst 9300'}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <div className={cn("w-2 h-2 rounded-full", node.status === 'online' ? "bg-emerald-500 animate-pulse" : "bg-red-500")} />
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", node.status === 'online' ? "text-emerald-600" : "text-red-600")}>
                {node.status === 'online' ? 'Operational' : 'Critical Hub'}
              </span>
            </div>
          </div>
        </div>

        {/* Technical Matrix */}
        <div className="grid grid-cols-2 gap-3">
          <DetailCard label="IP Address" value={node.ip || "10.1.20.14"} Icon={Activity} />
          <DetailCard label="MAC Address" value={node.mac || "00:1A:2B:3C"} Icon={Hash} />
          <DetailCard label="Active VLAN" value="102 (Staff)" Icon={Smartphone} />
          <DetailCard label="System Uptime" value={node.uptime || "14d 03h"} Icon={Clock} />
        </div>

        {/* Interface Stack */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-3 h-3" /> Active Interfaces
          </h4>
          <div className="space-y-2">
            <InterfaceItem name="Gi1/0/1" label="Uplink" status="1.0 Gbps" speed="high" />
            <InterfaceItem name="Gi1/0/2" label="LAN-02" status="100 Mbps" speed="normal" />
            <InterfaceItem name="Gi1/0/3" label="Empty" status="Down" speed="off" />
          </div>
        </div>

        {/* Contextual Actions */}
        <div className="space-y-3 pt-6 border-t border-slate-100 mt-auto">
          <button className="w-full group flex items-center justify-between px-5 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
            <span className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-blue-400" />
              Configure Node
            </span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onDelete}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100 transition-all border border-red-100"
          >
            REMOVE FROM REGISTRY
          </button>
        </div>
      </div>
    </aside>
  );
}

function DetailCard({ label, value, Icon }: any) {
  return (
    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
      <span className="text-xs font-bold text-slate-900 font-mono truncate">{value}</span>
    </div>
  );
}

function InterfaceItem({ name, label, status, speed }: any) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg border transition-all",
      speed === 'off' ? "bg-slate-50/50 border-slate-100 opacity-60" : "bg-white border-slate-200 shadow-sm"
    )}>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-900">{name}</span>
        <span className="text-[10px] text-slate-500">{label}</span>
      </div>
      <span className={cn(
        "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter",
        speed === 'high' && "bg-emerald-50 text-emerald-600",
        speed === 'normal' && "bg-blue-50 text-blue-600",
        speed === 'off' && "bg-slate-200 text-slate-500"
      )}>
        {status}
      </span>
    </div>
  );
}
