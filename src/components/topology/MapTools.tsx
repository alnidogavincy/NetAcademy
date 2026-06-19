import React, { useState } from 'react';
import { Search, GripVertical, Plus, Laptop, Router, Wifi, CheckCircle2, Server } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import AddAssetModal from './AddAssetModal';

const INITIAL_UNPLACED = [
  { id: '1', name: "R-LAB-05", desc: "Cisco ISR 4431", type: 'router' },
  { id: '2', name: "SW-ACC-09", desc: "Cat 2960X-48TS", type: 'laptop' },
  { id: '3', name: "AP-FLOOR2-01", desc: "Aironet 2800i", type: 'wifi' },
];

const TYPE_ICONS: Record<string, any> = {
  router: Router,
  laptop: Laptop,
  wifi: Wifi,
  server: Server,
};

export default function MapTools() {
  const [unplacedAssets, setUnplacedAssets] = useState(INITIAL_UNPLACED);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAsset = (newAsset: { name: string; desc: string; type: string }) => {
    const asset = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAsset
    };
    setUnplacedAssets(prev => [asset, ...prev]);
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-30 h-full">
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search devices..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Topology Layers */}
        <div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Topology Layers</h3>
          <div className="space-y-1">
            <LayerItem label="Core Layer" count={4} checked color="bg-blue-100 text-blue-700" />
            <LayerItem label="Distribution Layer" count={12} checked color="bg-indigo-100 text-indigo-700" />
            <LayerItem label="Access Layer" count={34} checked color="bg-purple-100 text-purple-700" />
            <LayerItem label="Management (OOB)" count={2} color="bg-slate-100 text-slate-700" />
          </div>
        </div>

        {/* Unplaced Devices */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unplaced Assets</h3>
            <span className={cn(
              "text-[9px] px-2 py-0.5 rounded-full font-bold transition-all",
              unplacedAssets.length > INITIAL_UNPLACED.length ? "bg-primary text-white scale-110" : "bg-red-50 text-red-600"
            )}>
              {unplacedAssets.length} DEVICES
            </span>
          </div>
          <div className="space-y-2">
            {unplacedAssets.map((asset) => (
              <UnplacedItem 
                key={asset.id} 
                name={asset.name} 
                desc={asset.desc} 
                Icon={TYPE_ICONS[asset.type] || Router} 
              />
            ))}
            {unplacedAssets.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-xs text-slate-400">All assets are placed</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2.5 border-2 border-primary text-primary font-bold text-xs rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 group active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          Add New Asset
        </button>
      </div>

      <AddAssetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddAsset} 
      />
    </aside>
  );
}

function LayerItem({ label, count, checked, color }: any) {
  return (
    <label className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
      <input 
        type="checkbox" 
        defaultChecked={checked}
        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" 
      />
      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{label}</span>
      {count && <span className={cn("ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold", color)}>{count}</span>}
    </label>
  );
}

function UnplacedItem({ name, desc, Icon }: any) {
  return (
    <div className="p-3 border border-dashed border-slate-200 rounded-xl bg-white flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-primary/50 hover:bg-primary/5 group transition-all">
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-bold text-slate-900 leading-none truncate">{name}</p>
        <p className="text-[10px] text-slate-400 mt-1 truncate">{desc}</p>
      </div>
      <GripVertical className="w-4 h-4 text-slate-300" />
    </div>
  );
}
