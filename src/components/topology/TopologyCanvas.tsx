import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Router, Network, Laptop, HelpCircle, School, Tv, Layers, ShieldCheck, Database, Sliders } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { TopologyNode, TopologyCable } from '@/src/pages/TopologyMap';

interface TopologyCanvasProps {
  nodes: TopologyNode[];
  cables: TopologyCable[];
  onNodesChange: React.Dispatch<React.SetStateAction<TopologyNode[]>>;
  selectedNodeId?: string;
  onSelect?: (node: any) => void;
  buildingId: string;
  buildingTheme?: 'default' | 'vocational' | 'library' | 'custom';
}

export default function TopologyCanvas({ 
  nodes, 
  cables, 
  onNodesChange, 
  selectedNodeId, 
  onSelect,
  buildingId,
  buildingTheme = 'default'
}: TopologyCanvasProps) {
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrag = (nodeId: string, event: any, info: any) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const pxX = info.point.x - rect.left;
      const pxY = info.point.y - rect.top;
      
      // Convert with responsive percentage offset clamp
      const pctX = Math.max(3, Math.min(97, (pxX / rect.width) * 100));
      const pctY = Math.max(3, Math.min(97, (pxY / rect.height) * 100));
      
      onNodesChange(prev => prev.map(n => 
        n.id === nodeId ? { ...n, x: `${pctX}%`, y: `${pctY}%` } : n
      ));

      // Re-trigger selectivity update to represent latest coordinate in inspector
      const current = nodes.find(n => n.id === nodeId);
      if (current) {
        onSelect?.({ ...current, x: `${pctX}%`, y: `${pctY}%` });
      }
    }
  };

  // Render dynamic background blueprint room sectors depending on active building theme
  const renderRoomsBlueprint = () => {
    switch (buildingTheme) {
      case 'vocational':
        return (
          <>
            {/* Server Vokasi Room */}
            <div className="absolute top-[8%] left-[28%] w-[44%] h-[24%] bg-slate-900/[0.04] border border-orange-200 rounded-2xl p-2.5 pointer-events-none flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <Database className="w-3 h-3 text-orange-600" />
                <span className="text-[8px] font-black text-orange-600 tracking-wider">
                  NOC SERVER VOKASI & RAK STORAGE
                </span>
              </div>
              <div className="flex justify-between text-[7px] text-slate-400 font-bold">
                <span>IT-VOC Rack A</span>
                <span>Active Link 10 Gbps</span>
              </div>
            </div>

            {/* Corridor divider line */}
            <div className="absolute top-[46%] left-0 w-full h-[8%] border-y border-dashed border-slate-300/60 bg-slate-100/40 pointer-events-none flex items-center justify-center">
              <span className="text-[8px] font-bold text-slate-400 tracking-widest uppercase">
                LORONG DISTRIBUSI KABEL VOKASI LANTAI 2
              </span>
            </div>

            {/* Lab Cisco */}
            <div className="absolute bottom-[8%] left-[8%] w-[38%] h-[32%] bg-blue-500/[0.03] border border-blue-200 rounded-2xl p-3 pointer-events-none flex flex-col justify-between">
              <span className="text-[8px] font-black text-blue-600 tracking-wider uppercase">
                💻 RUANG LAB JARINGAN & CISCO ACADEMY
              </span>
              <div className="w-full border-b border-dashed border-blue-100 mt-1" />
              <div className="flex items-center justify-between text-[7px] text-slate-400">
                <span>Switch Catalyst Cluster</span>
                <span>Room capacity: 30 Node</span>
              </div>
            </div>

            {/* Bengkel IoT & Robotika */}
            <div className="absolute bottom-[8%] right-[8%] w-[38%] h-[32%] bg-amber-500/[0.03] border border-amber-200 rounded-2xl p-3 pointer-events-none flex flex-col justify-between">
              <span className="text-[8px] font-black text-amber-600 tracking-wider uppercase">
                🤖 BENGKEL PENGEMBANGAN IOT & ROBOTIKA
              </span>
              <div className="w-full border-b border-dashed border-amber-100 mt-1" />
              <div className="flex items-center justify-between text-[7px] text-slate-400">
                <span>Modul ESP32 & Arduino Mesh</span>
                <span>Freq: 2.4Ghz Grid</span>
              </div>
            </div>
          </>
        );

      case 'library':
        return (
          <>
            {/* Library Control Cabinet */}
            <div className="absolute top-[10%] left-[32%] w-[36%] h-[20%] bg-indigo-900/[0.04] border border-indigo-200 rounded-2xl p-2.5 pointer-events-none flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-indigo-700" />
                <span className="text-[8px] font-black text-indigo-700 tracking-wider">
                  KABINET DISTRIBUSI INTERNET PERPUSTAKAAN
                </span>
              </div>
              <span className="text-[6.5px] text-slate-400">Main Switch Rack & ISP Gateway Router</span>
            </div>

            {/* Corridor divider line */}
            <div className="absolute top-[44%] left-0 w-full h-[6%] border-y border-dashed border-slate-300/40 pointer-events-none flex items-center justify-center">
              <span className="text-[7px] font-bold text-slate-400 tracking-widest uppercase">
                AREA KORIDOR LITERASI CETAK & DIGITAL
              </span>
            </div>

            {/* Library Main Reading Hall */}
            <div className="absolute bottom-[8%] left-[8%] w-[42%] h-[34%] bg-slate-900/[0.02] border border-slate-200 rounded-2xl p-3 pointer-events-none flex flex-col justify-between">
              <span className="text-[8px] font-black text-slate-800 tracking-wider uppercase">
                📖 RUANG BACA UTAMA PERPUSTAKAAN (SILENT AREA)
              </span>
              <div className="w-full border-b border-dashed border-slate-200 mt-1" />
              <span className="text-[7px] font-bold text-slate-400">Wireless Grid Access & Smart Book Shelf</span>
            </div>

            {/* Digital Pojok Baca Area */}
            <div className="absolute bottom-[8%] right-[8%] w-[34%] h-[34%] bg-emerald-500/[0.03] border border-emerald-200 rounded-2xl p-3 pointer-events-none flex flex-col justify-between">
              <span className="text-[8px] font-black text-emerald-600 tracking-wider uppercase">
                🖥️ POJOK ELEKTRONIK & DIGITAL CORNER
              </span>
              <div className="w-full border-b border-dashed border-emerald-100 mt-1" />
              <span className="text-[7px] font-bold text-slate-400">PC Kiosk & Katalog Pintar</span>
            </div>
          </>
        );

      case 'custom':
        return (
          <>
            {/* General Open Concept Layout */}
            <div className="absolute inset-[6%] bg-slate-900/[0.01] border-2 border-dashed border-slate-200 rounded-[25px] flex flex-col justify-between p-4 pointer-events-none">
              <span className="text-[9px] bg-slate-800 text-white font-extrabold px-3 py-1 rounded-lg w-fit">
                CETAK BIRU LAB MULTI-FUNGSI (CUSTOM WORKSPACE)
              </span>
              <div className="grid grid-cols-2 gap-4 w-full h-[70%] mt-3">
                <div className="border border-dashed border-slate-350 rounded-xl bg-white/40 p-2.5 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-slate-400">SEKTOR KIRI (ZONE-A)</span>
                  <p className="text-[6.5px] text-slate-400">Area Fleksibel untuk Client & Access Switch</p>
                </div>
                <div className="border border-dashed border-slate-355 rounded-xl bg-white/40 p-2.5 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-slate-400">SEKTOR KANAN (ZONE-B)</span>
                  <p className="text-[6.5px] text-slate-400">Area untuk Core equipment & Rack Server Sekunder</p>
                </div>
              </div>
            </div>
          </>
        );

      case 'default':
      default:
        // Original standard blueprint
        return (
          <>
            {/* NOC Room / Central Server room outline (Top center block) */}
            <div className="absolute top-[8%] left-[30%] w-[40%] h-[24%] bg-slate-900/[0.04] border border-blue-200 rounded-2xl p-2.5 pointer-events-none flex flex-col justify-between">
              <span className="text-[8px] font-black text-blue-600 tracking-wider">
                RUANG CORE SWITCH & SERVER UTAMA SEKOLAH
              </span>
              <div className="flex justify-between text-[7px] text-slate-400 font-bold">
                <span>Rak Server NOC-1</span>
                <span>AC Temperature 18°C</span>
              </div>
            </div>

            {/* Corridor divider line (Horizontal middle corridor) */}
            <div className="absolute top-[46%] left-0 w-full h-[8%] border-y border-dashed border-slate-300/60 bg-slate-100/40 pointer-events-none flex items-center justify-center">
              <span className="text-[8px] font-bold text-slate-400 tracking-widest uppercase">
                SELASAR PENGHUBUNG & SALURAN KABEL (DUCTWAY) LANTAI 1
              </span>
            </div>

            {/* West Classroom Lab Section (Bottom Left block) */}
            <div className="absolute bottom-[8%] left-[8%] w-[38%] h-[32%] bg-emerald-500/[0.03] border border-emerald-200 rounded-2xl p-3 pointer-events-none flex flex-col justify-between">
              <span className="text-[8px] font-black text-emerald-600 tracking-wider uppercase">
                💻 RUANG LAB PRAKTIK KOMPUTER BARAT (104)
              </span>
              <div className="w-full border-b border-dashed border-emerald-200 mt-2" />
              <span className="text-[7px] font-bold text-slate-400">Distribusi ke 24 Client PC</span>
            </div>

            {/* East Classroom Lab Section (Bottom Right block) */}
            <div className="absolute bottom-[8%] right-[8%] w-[38%] h-[32%] bg-indigo-500/[0.03] border border-indigo-200 rounded-2xl p-3 pointer-events-none flex flex-col justify-between">
              <span className="text-[8px] font-black text-indigo-600 tracking-wider uppercase">
                🖥️ RUANG LAB PRAKTIK KOMPUTER TIMUR (105)
              </span>
              <div className="w-full border-b border-dashed border-indigo-200 mt-2" />
              <span className="text-[7px] font-bold text-slate-400">Distribusi ke 20 Client PC</span>
            </div>

            {/* Classroom Back Door indicator (Bottom Center) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-emerald-400 rounded-t pointer-events-none flex items-center justify-center">
              <span className="text-[6px] text-white font-black uppercase">PINTU DOUBLE</span>
            </div>
          </>
        );
    }
  };

  return (
    <main className="flex-1 bg-slate-50 relative overflow-hidden cursor-grab active:cursor-grabbing topo-grid flex flex-col">
      
      {/* Title block describing layout region */}
      <div className="absolute top-4 left-6 z-20 pointer-events-none">
        <span className="text-[10px] bg-slate-900 border border-slate-700 text-white font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          Denah Cetak Biru: {
            buildingTheme === 'vocational' ? 'Gedung IT Vocational' : 
            buildingTheme === 'library' ? 'Gedung Perpustakaan Digital' :
            buildingTheme === 'custom' ? 'Custom Lab Playfield' : 'Gedung Balai Diklat'
          }
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div 
          ref={canvasRef}
          className="relative w-full h-full border-4 border-dashed border-slate-300 rounded-[35px] bg-[#f8fafc] overflow-hidden shadow-inner flex items-center justify-center"
        >
          {/* === INTERACTIVE BLUEPRINT SECTORS (DYNAMICALLY RENDERED ROOMS) === */}
          {renderRoomsBlueprint()}

          {/* SVG Connection Cables Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {cables.map((cable) => {
              const src = nodes.find(n => n.id === cable.fromNodeId);
              const dst = nodes.find(n => n.id === cable.toNodeId);

              if (!src || !dst) return null;

              return (
                <g key={cable.id} className="cursor-pointer pointer-events-auto">
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={dst.x}
                    y2={dst.y}
                    stroke={cable.color}
                    strokeWidth="3.5"
                    strokeDasharray={cable.cableType === 'Fiber Optic' ? "8, 4" : cable.cableType === 'Console Serial' ? "3,3" : undefined}
                    opacity="0.85"
                  />
                  
                  {/* Real-time port markers displayed directly on connection cables */}
                  <foreignObject
                    x={`calc((${src.x} + ${dst.x}) / 2 - 45px)`}
                    y={`calc((${src.y} + ${dst.y}) / 2 - 10px)`}
                    width="90"
                    height="20"
                    className="overflow-visible"
                  >
                    <div className="mx-auto w-fit bg-slate-900 border border-slate-700/60 text-white rounded text-[7px] font-mono px-1.5 py-0.5 shadow-md flex flex-col items-center">
                      <span className="text-[6px] text-slate-300 tracking-tighter">
                        {src.label.split('-').pop()} [{cable.fromPort}]
                      </span>
                      <span className="text-amber-400 font-bold leading-none">
                        ⚡ {dst.label.split('-').pop()} [{cable.toPort}]
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Render Active Draggable Nodes with dynamic coordinate maps */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              dragElastic={0}
              onDrag={(e, info) => handleDrag(node.id, e, info)}
              onClick={() => onSelect?.(node)}
              className="absolute z-20 cursor-move"
              style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl bg-white shadow-xl border-2 flex items-center justify-center transition-all group",
                selectedNodeId === node.id 
                  ? "border-blue-600 ring-8 ring-blue-100 scale-105 shadow-blue-200" 
                  : "border-slate-200 hover:border-blue-400 hover:shadow-lg"
              )}>
                {node.type === 'router' ? (
                  <Router className="w-7 h-7 text-blue-600" />
                ) : (
                  <Network className="w-7 h-7 text-indigo-600" />
                )}
                
                {/* Active Status Flag */}
                <div className={cn(
                  "absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm",
                  node.status === 'online' ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                )} />
              </div>
              
              {/* Node Title Overlay */}
              <div className={cn(
                "absolute top-full mt-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[9px] font-black border tracking-tight shadow-md whitespace-nowrap transition-all",
                selectedNodeId === node.id 
                  ? "bg-blue-600 text-white border-blue-500" 
                  : "bg-white text-slate-700 border-slate-150"
              )}>
                {node.label}
              </div>

              {/* Subtitle describing specific room placement */}
              <div className="absolute top-[138%] left-1/2 -translate-x-1/2 uppercase tracking-wider text-[6.5px] font-bold text-slate-400 text-center whitespace-nowrap">
                {node.room ? (node.room.split(' ')[0] || 'Room') : 'Room'}
              </div>
            </motion.div>
          ))}

          {/* Left panel placeholder when list is completely empty */}
          {nodes.length === 0 && (
            <div className="relative text-center p-8 bg-white border border-slate-100 rounded-3xl max-w-sm shadow-xl z-20">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800 uppercase">Peta Jaringan Kosong</p>
              <p className="text-[10px] text-slate-400 mt-1">Gunakan tab di bagian atas untuk menyambungkan kabel, atau seret modul switch ke dalam peta untuk memulai perakitan.</p>
            </div>
          )}

        </div>
      </div>
      
    </main>
  );
}
