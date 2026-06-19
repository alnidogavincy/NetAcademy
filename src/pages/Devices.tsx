import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  ShieldCheck, 
  ArrowRight,
  Database,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import AddAssetModal from '../components/topology/AddAssetModal';

const INITIAL_DEVICES = [
  { id: '1', name: 'CORE-SW-01', model: 'Cisco Catalyst 9500', ip: '10.0.0.1', status: 'online', type: 'switch', lastOnline: 'online' },
  { id: '2', name: 'HQ-ROUTER-01', model: 'Cisco ISR 4431', ip: '192.168.1.1', status: 'online', type: 'router', lastOnline: 'online' },
  { id: '3', name: 'ACC-SW-FLOOR1', model: 'Cisco Catalyst 9200L', ip: '10.0.1.5', status: 'warning', type: 'switch', lastOnline: '2h ago' },
  { id: '4', name: 'WAP-GUEST-01', model: 'Cisco Aironet 2802', ip: '10.0.5.10', status: 'offline', type: 'wifi', lastOnline: '14d ago' },
  { id: '5', name: 'SERVER-DATACENTER-01', model: 'Dell PowerEdge R740', ip: '10.20.0.10', status: 'online', type: 'server', lastOnline: 'online' },
];

export default function Devices() {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleAddDevice = (newAsset: any) => {
    const device = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAsset,
      status: 'online',
      lastOnline: 'online'
    };
    setDevices(prev => [device, ...prev]);
  };

  const filteredDevices = devices.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.model.toLowerCase().includes(search.toLowerCase()) ||
    d.ip.includes(search)
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Infrastructure Inventory</h2>
          <p className="text-xs text-slate-500 font-medium">Manage and monitor all hardware assets in the network.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> ADD NEW HARDWARE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Hardware" value={devices.length.toString()} sub="Registered assets" color="text-slate-900" />
        <StatCard label="Online Now" value={devices.filter(d => d.status === 'online').length.toString()} sub="Active nodes" color="text-emerald-600" />
        <StatCard label="Offline/Warning" value={devices.filter(d => d.status !== 'online').length.toString()} sub="Needs attention" color="text-red-500" />
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, model or IP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" /> FILTERS
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">EXPORT CSV</button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse border-spacing-0">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Device Identity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specifications</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Info</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status / Last Active</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDevices.map((device) => (
                <tr key={device.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm border",
                        device.status === 'online' ? "bg-emerald-50 border-emerald-100 text-emerald-600" : 
                        device.status === 'warning' ? "bg-amber-50 border-amber-100 text-amber-600" :
                        "bg-slate-100 border-slate-200 text-slate-400"
                      )}>
                        <DeviceIcon type={device.type} />
                      </div>
                      <div>
                        <Link to={`/devices/${device.id}`} className="text-sm font-bold text-slate-900 hover:text-primary transition-colors block leading-tight">
                          {device.name}
                        </Link>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{device.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-600">{device.model}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Enterprise Hardware</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md w-fit">
                      {device.ip}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", 
                        device.status === 'online' ? "bg-emerald-500 animate-pulse" : 
                        device.status === 'warning' ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : 
                        "bg-slate-300"
                      )} />
                      <span className={cn("text-xs font-bold", 
                        device.status === 'online' ? "text-emerald-600" : 
                        device.status === 'warning' ? "text-amber-600" : 
                        "text-slate-400"
                      )}>
                        {device.lastOnline}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-900">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <Link 
                        to={`/devices/${device.id}`}
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-primary"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDevices.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200 border-2 border-dashed border-slate-200">
                <Search className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No devices matching search</p>
            </div>
          )}
        </div>
      </div>

      <AddAssetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddDevice}
      />
    </motion.div>
  );
}

function StatCard({ label, value, sub, color }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</h3>
      <div className={cn("text-3xl font-black", color)}>{value}</div>
      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{sub}</p>
    </div>
  );
}

function DeviceIcon({ type }: { type: string }) {
  switch (type.toLowerCase()) {
    case 'router': return <Zap className="w-6 h-6" />;
    case 'switch': return <Activity className="w-6 h-6" />;
    case 'server': return <Database className="w-6 h-6" />;
    default: return <Laptop className="w-6 h-6" />;
  }
}
