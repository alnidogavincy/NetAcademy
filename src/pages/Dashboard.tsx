import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Router, 
  Network, 
  Activity, 
  CheckCircle, 
  Terminal, 
  Download, 
  X,
  Cpu,
  Thermometer,
  ShieldCheck,
  Plus,
  Trash2,
  Tv,
  DoorOpen,
  Eye,
  Settings as SettingsIcon,
  Cable,
  Plug,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Node {
  id: string;
  label: string;
  type: 'router' | 'switch' | 'laptop';
  top: string;
  left: string;
  status: 'online' | 'warning' | 'offline';
  model: string;
  ip: string;
  cpu: string;
  temp: string;
  uptime: string;
  room: string;
}

interface JaringanCable {
  id: string;
  fromNodeId: string;
  fromPort: string;
  toNodeId: string;
  toPort: string;
  color: string;
  cableType: 'Cat6 UTP' | 'Cat5e' | 'Fiber Optic' | 'Console Serial';
}

const INITIAL_NODES: Node[] = [
  { id: 'CR-HQ-01', label: 'CORE-ROUTER-01', type: 'router', top: '15%', left: '78%', status: 'online', model: 'Cisco ISR 4431', ip: '10.0.0.1', cpu: '12%', temp: '42°C', uptime: '142d', room: 'Ruang Server NOC' },
  { id: 'SW-CORE-01', label: 'CORE-SWITCH-01', type: 'switch', top: '32%', left: '78%', status: 'online', model: 'Cisco Catalyst 9500', ip: '10.0.0.2', cpu: '18%', temp: '46°C', uptime: '45d', room: 'Ruang Server NOC' },
  { id: 'SW-ACC-CLASS', label: 'CLIENT-SWITCH-A', type: 'switch', top: '38%', left: '38%', status: 'online', model: 'Cisco Catalyst 9200L', ip: '10.0.1.5', cpu: '8%', temp: '38°C', uptime: '12d', room: 'Meja Switch Lab' },
  { id: 'TEACHER-PC', label: 'TEACHER-PC-01', type: 'laptop', top: '22%', left: '25%', status: 'online', model: 'Intel Master NUC vPro', ip: '192.168.1.100', cpu: '4%', temp: '35°C', uptime: '3d', room: 'Meja Instruksi Guru' },
  { id: 'STUDENT-A01', label: 'STUDENT-WS-A01', type: 'laptop', top: '65%', left: '20%', status: 'online', model: 'Lenovo ThinkCentre Neo', ip: '192.168.1.51', cpu: '10%', temp: '40°C', uptime: '2h', room: 'Meja Komputer Praktik A' },
  { id: 'STUDENT-A02', label: 'STUDENT-WS-A02', type: 'laptop', top: '65%', left: '42%', status: 'online', model: 'Lenovo ThinkCentre Neo', ip: '192.168.1.52', cpu: '14%', temp: '41°C', uptime: '1h', room: 'Meja Komputer Praktik A' },
  { id: 'STUDENT-B01', label: 'STUDENT-WS-B01', type: 'laptop', top: '65%', left: '65%', status: 'online', model: 'Dell Precision Pro', ip: '192.168.1.61', cpu: '9%', temp: '39°C', uptime: '4h', room: 'Meja Komputer Praktik B' },
  { id: 'STUDENT-B02', label: 'STUDENT-WS-B02', type: 'laptop', top: '65%', left: '85%', status: 'online', model: 'Dell Precision Pro', ip: '192.168.1.62', cpu: '5%', temp: '37°C', uptime: '5h', room: 'Meja Komputer Praktik B' },
];

const INITIAL_CABLES: JaringanCable[] = [
  { id: 'cb-1', fromNodeId: 'CR-HQ-01', fromPort: 'Gig1/0/1', toNodeId: 'SW-CORE-01', toPort: 'Gig1/1/1', color: '#ea580c', cableType: 'Fiber Optic' },
  { id: 'cb-2', fromNodeId: 'SW-CORE-01', fromPort: 'Gig1/1/24', toNodeId: 'SW-ACC-CLASS', toPort: 'Gig1/0/1', color: '#2563eb', cableType: 'Cat6 UTP' },
  { id: 'cb-3', fromNodeId: 'SW-ACC-CLASS', fromPort: 'Fa0/1', toNodeId: 'TEACHER-PC', toPort: 'WiredLAN', color: '#ca8a04', cableType: 'Cat5e' },
  { id: 'cb-4', fromNodeId: 'SW-ACC-CLASS', fromPort: 'Fa0/2', toNodeId: 'STUDENT-A01', toPort: 'WiredLAN', color: '#ca8a04', cableType: 'Cat5e' },
  { id: 'cb-5', fromNodeId: 'SW-ACC-CLASS', fromPort: 'Fa0/3', toNodeId: 'STUDENT-B01', toPort: 'WiredLAN', color: '#ca8a04', cableType: 'Cat5e' },
];

export default function Dashboard() {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [cables, setCables] = useState<JaringanCable[]>(INITIAL_CABLES);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Connection Creation Form State
  const [sourceNodeId, setSourceNodeId] = useState('');
  const [sourcePort, setSourcePort] = useState('Fa0/1');
  const [targetNodeId, setTargetNodeId] = useState('');
  const [targetPort, setTargetPort] = useState('Fa0/1');
  const [cableType, setCableType] = useState<'Cat6 UTP' | 'Cat5e' | 'Fiber Optic' | 'Console Serial'>('Cat6 UTP');

  const [activeTab, setActiveTab] = useState<'properties' | 'cable_control'>('properties');
  const [highlightedCable, setHighlightedCable] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (nodeId: string, event: any, info: any) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = info.point.x - rect.left;
      const y = info.point.y - rect.top;

      // convert to percents and clamp safely
      const pctX = Math.max(2, Math.min(98, (x / rect.width) * 100));
      const pctY = Math.max(2, Math.min(98, (y / rect.height) * 100));

      setNodes(prev => prev.map(n => 
        n.id === nodeId ? { ...n, left: `${pctX}%`, top: `${pctY}%` } : n
      ));

      // Synchronize inspected node positioning details
      if (selectedNode && selectedNode.id === nodeId) {
        setSelectedNode(prev => prev ? { ...prev, left: `${pctX}%`, top: `${pctY}%` } : null);
      }
    }
  };

  const handleAddCable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceNodeId || !targetNodeId || sourceNodeId === targetNodeId) {
      alert("Silakan pilih perangkat asal dan tujuan yang valid!");
      return;
    }

    // Assign beautiful color schemes based on the selected cable standard
    let selectedColor = '#2563eb'; // Blue - Cat6
    if (cableType === 'Cat5e') selectedColor = '#ca8a04'; // Yellow
    else if (cableType === 'Fiber Optic') selectedColor = '#ea580c'; // Intense Orange
    else if (cableType === 'Console Serial') selectedColor = '#0d9488'; // Teal

    const newCable: JaringanCable = {
      id: `cb-${Date.now()}`,
      fromNodeId: sourceNodeId,
      fromPort: sourcePort,
      toNodeId: targetNodeId,
      toPort: targetPort,
      color: selectedColor,
      cableType: cableType
    };

    setCables(prev => [...prev, newCable]);
    setSourceNodeId('');
    setTargetNodeId('');
    alert("Kabel jaringan baru berhasil dipasang!");
  };

  const deleteCable = (id: string) => {
    setCables(prev => prev.filter(c => c.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 flex flex-col min-h-screen"
    >
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Kelas Lab Komputer Utama & Server NOC
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Monitor tata letak fisik perangkat kelas, lakukan simulasi perkabelan port, dan geser posisi perangkat secara realtime.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black tracking-wider text-emerald-700 uppercase">AKSES PEMBELAJARAN AKTIF</span>
          </div>
          <button 
            onClick={() => {
              setNodes(INITIAL_NODES);
              setCables(INITIAL_CABLES);
              alert("Tata letak lab dan perkabelan dikembalikan ke posisi semula.");
            }}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            Reset Tata Letak
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Main interactive classroom layout panel */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex-1 flex flex-col">
            
            {/* Visual Classroom Guide */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Tv className="w-4 h-4 text-slate-500" /> AREA MEJA DEPAN (PAPAN TULIS & MEJA GURU)</span>
              <span className="flex items-center gap-1.5"><DoorOpen className="w-4 h-4 text-emerald-500" /> PINTU RUANG KOMPUTER 104</span>
            </div>

            {/* Immersive Classroom Grid Arena */}
            <div 
              id="classroom-grid"
              ref={containerRef}
              className="relative h-[540px] room-layout rounded-2xl border-2 border-slate-250 bg-slate-50 overflow-hidden cursor-crosshair shadow-inner"
            >
              
              {/* === VISUAL LAYOUT LANDMARKS (CLASSROOM BLUEPRINT) === */}
              
              {/* NOC Server Room Partition (Top Right Corner) */}
              <div className="absolute top-4 right-4 w-[28%] h-[35%] bg-slate-900/5 border-2 border-dashed border-indigo-200 rounded-2xl p-3 flex flex-col justify-between pointer-events-none">
                <span className="text-[9px] font-black text-indigo-500 tracking-wider uppercase bg-white/90 border border-indigo-150 px-2 py-0.5 rounded-full w-fit">
                  RUANG NOK / SERVER UTAMA
                </span>
                <span className="text-[8px] font-bold text-slate-400">Pintu Baja Tahan Api & AC Khusus NOC</span>
              </div>

              {/* Board / Projector Screens (Top Center-Left) */}
              <div className="absolute top-4 left-[15%] w-[42%] h-4 bg-slate-800 border-b border-slate-950 rounded-b-md shadow-md flex items-center justify-center pointer-events-none">
                <span className="text-[8px] font-black text-white/90 tracking-widest">
                  PAPAN PROYEKTOR & WHITEBOARD KELAS
                </span>
              </div>

              {/* Teacher master wooden bench outline */}
              <div className="absolute top-[12%] left-[10%] w-[25%] h-[16%] bg-amber-50/60 border border-amber-200 rounded-xl p-2 pointer-events-none flex flex-col justify-between">
                <span className="text-[8px] font-bold text-amber-600 uppercase">⚡ MEJA INSTRUKTUR / GURU</span>
                <div className="w-full h-1 bg-amber-200 rounded-full" />
              </div>

              {/* Student Desk Row A (Bottom Left) */}
              <div className="absolute bottom-[10%] left-[6%] w-[40%] h-[20%] bg-blue-50/40 border border-blue-250 rounded-2xl p-3 pointer-events-none flex flex-col justify-between">
                <span className="text-[8px] font-black text-blue-600 tracking-wider uppercase">
                  MEJA KOMPUTER PRAKTIKAN - BARIS A
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-1 bg-slate-200 rounded" />
                  <div className="h-1 bg-slate-200 rounded" />
                </div>
              </div>

              {/* Student Desk Row B (Bottom Right) */}
              <div className="absolute bottom-[10%] right-[6%] w-[40%] h-[20%] bg-blue-50/40 border border-blue-250 rounded-2xl p-3 pointer-events-none flex flex-col justify-between">
                <span className="text-[8px] font-black text-blue-600 tracking-wider uppercase">
                  MEJA KOMPUTER PRAKTIKAN - BARIS B
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-1 bg-slate-200 rounded" />
                  <div className="h-1 bg-slate-200 rounded" />
                </div>
              </div>

              {/* Interactive Windows along the Left and Back */}
              <div className="absolute top-1/2 left-0 w-2 h-24 bg-sky-200 -translate-y-1/2 border border-sky-400 rounded-r shadow-sm flex items-center justify-center [writing-mode:vertical-lr] pointer-events-none text-[8px] font-bold text-sky-700">Jendela Luar</div>
              
              {/* Classroom Back Door (Center Bottom) */}
              <div className="absolute bottom-0 right-[35%] w-16 h-2 bg-emerald-400 rounded-t border-t border-emerald-600 p-0 flex items-center justify-center pointer-events-none">
                <span className="text-[8px] text-white font-black">PINTU KELUAR LAB</span>
              </div>

              {/* === ACTIVE NETWORKING CABLES (SVG CANVAS LAYER) === */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {cables.map((cable) => {
                  const sourceNode = nodes.find(n => n.id === cable.fromNodeId);
                  const targetNode = nodes.find(n => n.id === cable.toNodeId);

                  if (!sourceNode || !targetNode) return null;

                  // Compute visual line offset dynamically
                  return (
                    <g 
                      key={cable.id} 
                      className="cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setHighlightedCable(cable.id)}
                      onMouseLeave={() => setHighlightedCable(null)}
                    >
                      <line
                        x1={sourceNode.left}
                        y1={sourceNode.top}
                        x2={targetNode.left}
                        y2={targetNode.top}
                        stroke={cable.color}
                        strokeWidth={highlightedCable === cable.id ? 5 : 3}
                        strokeDasharray={cable.cableType === 'Fiber Optic' ? "6, 4" : cable.cableType === 'Console Serial' ? "3,3" : undefined}
                        className="transition-all duration-200"
                        opacity={highlightedCable && highlightedCable !== cable.id ? 0.3 : 0.85}
                      />
                      
                      {/* Interactive Cable Midpoint Port Label Flag */}
                      <foreignObject
                        x={`calc((${sourceNode.left} + ${targetNode.left}) / 2 - 40px)`}
                        y={`calc((${sourceNode.top} + ${targetNode.top}) / 2 - 12px)`}
                        width="80"
                        height="24"
                        className="overflow-visible"
                      >
                        <div 
                          className={cn(
                            "mx-auto w-fit max-w-[80px] bg-slate-900/90 text-white text-[7px] font-mono px-1.5 py-0.5 rounded shadow-md border pointer-events-none transition-all scale-75 hover:scale-100",
                            highlightedCable === cable.id ? "border-primary-container scale-100 opacity-100" : "border-slate-700 opacity-60"
                          )}
                          style={{ borderColor: cable.color }}
                        >
                          <p className="truncate text-center">
                            {sourceNode.label.split('-').pop()} [{cable.fromPort}]
                          </p>
                          <p className="truncate text-center leading-none mt-0.5 opacity-80 text-amber-400">
                            ↔ {targetNode.label.split('-').pop()} [{cable.toPort}]
                          </p>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>

              {/* === DRAGGABLE NETWORK DEVICE NODES === */}
              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDrag={(e, info) => handleDrag(node.id, e, info)}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedNode(node)}
                  className="absolute flex flex-col items-center cursor-move z-20"
                  style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all border-2",
                    selectedNode?.id === node.id 
                      ? "bg-blue-600 text-white border-blue-400 ring-8 ring-blue-100 scale-105" 
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-400"
                  )}>
                    {node.type === 'router' ? (
                      <Router className="w-7 h-7" />
                    ) : node.type === 'switch' ? (
                      <Network className="w-7 h-7 text-indigo-600" />
                    ) : (
                      <Laptop className="w-7 h-7 text-slate-500" />
                    )}
                    
                    {/* Activity System Indicator */}
                    <div className={cn(
                      "absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white",
                      node.status === 'online' ? "bg-emerald-500" : "bg-amber-500"
                    )} />
                  </div>
                  
                  {/* Human-readable custom description and tag */}
                  <div className={cn(
                    "mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-tight shadow border transition-all truncate max-w-[120px]",
                    selectedNode?.id === node.id 
                      ? "bg-blue-600 text-white border-blue-500 font-extrabold" 
                      : "bg-white/95 text-slate-700 border-slate-200"
                  )}>
                    {node.label}
                  </div>
                  
                  <div className="text-[7px] text-slate-400 font-black tracking-widest mt-0.5 max-w-[100px] truncate">
                    {node.room}
                  </div>
                </motion.div>
              ))}

              {/* Help tip at the base of grid */}
              <div className="absolute bottom-3 left-4 bg-slate-900/80 backdrop-blur-sm border border-slate-750 px-3 py-1 rounded-lg text-[9px] font-bold text-slate-300 shadow-md flex items-center gap-1.5 pointer-events-none">
                <Plug className="w-3.5 h-3.5 text-blue-400" />
                TIPS: Geser icon perangkat untuk mengubah rute kabel jaringan secara langsung.
              </div>

            </div>
          </div>
        </div>

        {/* Right Tab Control Panels */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col h-full">
            
            {/* Sidebar headers */}
            <div className="border-b border-slate-100 flex p-1.5 bg-slate-50/50">
              <button 
                onClick={() => setActiveTab('properties')}
                className={cn(
                  "flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all",
                  activeTab === 'properties' 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-100" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                Atribut Perangkat
              </button>
              <button 
                onClick={() => setActiveTab('cable_control')}
                className={cn(
                  "flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5",
                  activeTab === 'cable_control' 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-100" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                <Cable className="w-3.5 h-3.5 text-blue-500 animate-pulse" /> Sandbox Kabel ({cables.length})
              </button>
            </div>

            {/* Tab: Hardware Properties panel */}
            <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto max-h-[500px]">
              {activeTab === 'properties' && (
                <>
                  {selectedNode ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 text-2xl font-black">
                          {selectedNode.type === 'router' ? <Router className="w-6 h-6" /> : selectedNode.type === 'switch' ? <Network className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">{selectedNode.room}</p>
                          <h4 className="text-lg font-black text-slate-900 leading-none mt-0.5">{selectedNode.label}</h4>
                          <span className="text-[10px] text-blue-600 font-mono font-bold">{selectedNode.model}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-blue-500" /> Beban Core CPU
                          </div>
                          <p className="text-sm font-black text-slate-900 mt-1">{selectedNode.cpu}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Thermometer className="w-3 h-3 text-red-500" /> Suhu Device
                          </div>
                          <p className="text-sm font-black text-slate-900 mt-1">{selectedNode.temp}</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IPv4 Address</span>
                          <span className="text-xs font-mono font-bold text-slate-700">{selectedNode.ip}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Durasi Aktif</span>
                          <span className="text-xs font-black text-slate-700">{selectedNode.uptime}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Koordinat Fisik</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded font-black">X: {selectedNode.left} / Y: {selectedNode.top}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          alert(`Membuka Terminal CLI Konsol Sekolah ke Host ${selectedNode.ip}...`);
                        }}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Terminal className="w-4 h-4 text-sky-400" /> BUAT KLI KONSOLE
                      </button>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center">
                      <HelpCircle className="w-10 h-10 text-slate-300 mb-2" />
                      <p className="text-xs font-bold uppercase tracking-wider">Belum Ada Node Terpilih</p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-[180px] mx-auto text-center leading-normal">
                        Silakan klik salah satu perangkat jaringan di peta kelas untuk melihat rincian spesifikasi perangkat.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Tab: Jaringan Cables Sandbox controller */}
              {activeTab === 'cable_control' && (
                <div className="space-y-6">
                  {/* Create New Cable Connection */}
                  <form onSubmit={handleAddCable} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-3.5">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Plug className="w-3.5 h-3.5" /> Pasang Sambungan Port Baru
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase">Perangkat Asal</label>
                        <select 
                          value={sourceNodeId} 
                          onChange={(e) => setSourceNodeId(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] font-bold"
                          required
                        >
                          <option value="">-- PILIH --</option>
                          {nodes.map(n => <option key={n.id} value={n.id}>{n.label.split('-').pop()}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase">Port Asal</label>
                        <input 
                          type="text" 
                          value={sourcePort} 
                          onChange={(e) => setSourcePort(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] font-mono font-bold"
                          placeholder="e.g. Gig1/0"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase">Perangkat Tujuan</label>
                        <select 
                          value={targetNodeId} 
                          onChange={(e) => setTargetNodeId(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] font-bold"
                          required
                        >
                          <option value="">-- PILIH --</option>
                          {nodes.map(n => <option key={n.id} value={n.id}>{n.label.split('-').pop()}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase">Port Tujuan</label>
                        <input 
                          type="text" 
                          value={targetPort} 
                          onChange={(e) => setTargetPort(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] font-mono font-bold"
                          placeholder="e.g. Fa0/12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-bold text-slate-400 uppercase">Jenis Kabel</label>
                      <div className="grid grid-cols-2 gap-1.5 mt-1">
                        {(['Cat6 UTP', 'Cat5e', 'Fiber Optic', 'Console Serial'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setCableType(type)}
                            className={cn(
                              "px-2.5 py-1.5 rounded border text-[9px] font-bold transition-all text-center",
                              cableType === type 
                                ? "bg-slate-900 text-white border-slate-850" 
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                            )}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5" /> Sambungkan Kabel
                    </button>
                  </form>

                  {/* Registered cables listing */}
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Kabel Terpasang di Ruangan ({cables.length})</p>
                    <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                      {cables.map((cable) => {
                        const fromNode = nodes.find(n => n.id === cable.fromNodeId);
                        const toNode = nodes.find(n => n.id === cable.toNodeId);
                        return (
                          <div 
                            key={cable.id} 
                            className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                            onMouseEnter={() => setHighlightedCable(cable.id)}
                            onMouseLeave={() => setHighlightedCable(null)}
                          >
                            <div className="flex items-center gap-2 text-[10px] overflow-hidden">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cable.color }} />
                              <div className="font-mono text-[8px] leading-tight truncate">
                                <span className="font-bold text-slate-800">{fromNode?.label.split('-').pop()}</span> ({cable.fromPort})
                                <span className="text-slate-400 font-sans mx-1">➜</span>
                                <span className="font-bold text-slate-800">{toNode?.label.split('-').pop()}</span> ({cable.toPort})
                              </div>
                            </div>
                            <button 
                              onClick={() => deleteCable(cable.id)}
                              className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                              title="Cabut kabel"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                      {cables.length === 0 && (
                        <p className="text-[10px] text-slate-400 italic py-4 text-center">Seluruh kabel telah dicabut. Tidak ada jalur aktif.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Real-time Lab Traffic and KPI statistics summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Beban Lalu Lintas Jaringan</p>
            <h4 className="text-lg font-black text-slate-900 leading-tight">410 Mbps / 1 Gbps</h4>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Integtias Jalur Fisik</p>
            <h4 className="text-lg font-black text-slate-900 leading-tight">100% Kabel Lulus Uji Ping</h4>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Proteksi Ruang Kursus Jaringan</p>
            <h4 className="text-lg font-black text-slate-900 leading-tight">WPA Enterprise Aktif</h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
