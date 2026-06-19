import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, 
  ZoomOut, 
  Move, 
  MousePointer2, 
  RefreshCcw, 
  PanelRightClose, 
  PanelRightOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Trash2,
  Cable,
  Plug,
  X,
  Building,
  Building2,
  School,
  HelpCircle,
  PlusCircle
} from 'lucide-react';
import MapTools from '@/src/components/topology/MapTools';
import NodeInspector from '@/src/components/topology/NodeInspector';
import TopologyCanvas from '@/src/components/topology/TopologyCanvas';
import { cn } from '@/src/lib/utils';

export interface TopologyNode {
  id: string;
  label: string;
  type: 'router' | 'switch';
  x: string;
  y: string;
  status: 'online' | 'warning' | 'offline';
  model: string;
  ip: string;
  room: string;
  mac?: string;
  uptime?: string;
}

export interface TopologyCable {
  id: string;
  fromNodeId: string;
  fromPort: string;
  toNodeId: string;
  toPort: string;
  color: string;
  cableType: 'Cat6 UTP' | 'Cat5e' | 'Fiber Optic' | 'Console Serial';
}

export interface SchoolBuilding {
  id: string;
  name: string;
  code: string;
  description: string;
  blueprintTheme: 'default' | 'vocational' | 'library' | 'custom';
}

const INITIAL_TOPOLOGY_NODES: TopologyNode[] = [
  { id: 'CR-HQ-01', label: 'CORE-ROUT-01', type: 'router', x: '50%', y: '18%', status: 'online', model: 'Cisco ISR 4461', ip: '10.0.0.1', room: 'Ruang Server Pusat', mac: 'BC:FE:D9:11:AA:02', uptime: '142d active' },
  { id: 'DS-DIST-01', label: 'DIST-SW-01', type: 'switch', x: '50%', y: '42%', status: 'online', model: 'Cat-C9500-24Y4C', ip: '10.0.0.2', room: 'Ruang Distribusi Tengah', mac: 'BC:FE:D9:11:AB:15', uptime: '45d active' },
  { id: 'ACC-FL1-W', label: 'ACC-FL1-W', type: 'switch', x: '25%', y: '72%', status: 'online', model: 'C9200L-48T-4G', ip: '10.0.1.10', room: 'Lab Komp Barat (Ruang 104)', mac: 'BC:FE:D9:22:10:FF', uptime: '12d active' },
  { id: 'ACC-FL1-E', label: 'ACC-FL1-E', type: 'switch', x: '75%', y: '72%', status: 'online', model: 'C9200L-48T-4G', ip: '10.0.1.11', room: 'Lab Komp Timur (Ruang 105)', mac: 'BC:FE:D9:22:11:AA', uptime: '12d active' },
];

const INITIAL_TOPOLOGY_CABLES: TopologyCable[] = [
  { id: 'tc-1', fromNodeId: 'CR-HQ-01', fromPort: 'Gig1/0/1', toNodeId: 'DS-DIST-01', toPort: 'Gig1/1/1', color: '#ea580c', cableType: 'Fiber Optic' },
  { id: 'tc-2', fromNodeId: 'DS-DIST-01', fromPort: 'Gig1/2/1', toNodeId: 'ACC-FL1-W', toPort: 'Gig1/0/1', color: '#2563eb', cableType: 'Cat6 UTP' },
  { id: 'tc-3', fromNodeId: 'DS-DIST-01', fromPort: 'Gig1/2/2', toNodeId: 'ACC-FL1-E', toPort: 'Gig1/0/1', color: '#2563eb', cableType: 'Cat6 UTP' },
];

export default function TopologyMap() {
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);

  // Buildings state management
  const [buildings, setBuildings] = useState<SchoolBuilding[]>([
    { id: 'gedung-a', name: 'Gedung Utama (Balai Diklat)', code: 'GD-A', description: 'Gedung pusat administrasi dan Lab Komputer Terpadu.', blueprintTheme: 'default' },
    { id: 'gedung-b', name: 'Gedung IT Vocational & Workshop', code: 'GD-B', description: 'Gedung khusus praktikum teknologi informasi dan workshop jaringan.', blueprintTheme: 'vocational' },
    { id: 'gedung-c', name: 'Gedung Perpustakaan & IoT Corner', code: 'GD-C', description: 'Gedung literasi digital dan sandbox pengembangan IoT.', blueprintTheme: 'library' }
  ]);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('gedung-a');

  // Master Nodes & Cables mapped per Building ID
  const [buildingNodes, setBuildingNodes] = useState<Record<string, TopologyNode[]>>({
    'gedung-a': INITIAL_TOPOLOGY_NODES,
    'gedung-b': [
      { id: 'CR-VT-02', label: 'VT-CO-ROUTER-02', type: 'router', x: '50%', y: '18%', status: 'online', model: 'Cisco ISR 4431', ip: '192.168.20.1', room: 'Ruang Server Vokasi', mac: 'CC:AA:11:22:33:44', uptime: '12d active' },
      { id: 'SW-DIST-02', label: 'VT-DIST-SWITCH-02', type: 'switch', x: '50%', y: '45%', status: 'online', model: 'Cisco Catalyst 3850', ip: '192.168.20.2', room: 'Koridor Lab Vokasi', mac: 'CC:AA:11:22:33:55', uptime: '12d active' },
      { id: 'SW-LAB-CISCO', label: 'VT-ACC-CISCO', type: 'switch', x: '25%', y: '75%', status: 'online', model: 'Cisco Catalyst 2960X', ip: '192.168.20.10', room: 'Lab Jaringan Cisco (Ruang 201)', mac: 'CC:AA:11:22:33:66', uptime: '8d active' },
      { id: 'SW-LAB-IOT', label: 'VT-ACC-IOT', type: 'switch', x: '75%', y: '75%', status: 'online', model: 'Cisco Catalyst 2960X', ip: '192.168.21.10', room: 'Bengkel IoT & Robotic (Ruang 202)', mac: 'CC:AA:11:22:33:77', uptime: '5d active' }
    ],
    'gedung-c': [
      { id: 'CR-LIB-03', label: 'LIB-ROUTER-03', type: 'router', x: '50%', y: '22%', status: 'online', model: 'MikroTik CCR2004', ip: '172.16.10.1', room: 'NOC Perpustakaan Lantai 1', mac: 'DD:EE:FF:00:11:22', uptime: '90d active' },
      { id: 'SW-LIB-MAIN', label: 'LIB-SWITCH-MAIN', type: 'switch', x: '50%', y: '52%', status: 'online', model: 'TP-Link JetStream', ip: '172.16.10.2', room: 'Ruang Baca Utama', mac: 'DD:EE:FF:00:11:33', uptime: '45d active' },
      { id: 'SW-LIB-CORNER', label: 'LIB-COMP-CORNER', type: 'switch', x: '35%', y: '80%', status: 'online', model: 'HP ProCurve', ip: '172.16.10.15', room: 'Area Pojok Baca Digital', mac: 'DD:EE:FF:00:11:44', uptime: '2d active' },
    ]
  });

  const [buildingCables, setBuildingCables] = useState<Record<string, TopologyCable[]>>({
    'gedung-a': INITIAL_TOPOLOGY_CABLES,
    'gedung-b': [
      { id: 'vt-c1', fromNodeId: 'CR-VT-02', fromPort: 'Gig0/0', toNodeId: 'SW-DIST-02', toPort: 'Gig1/0/1', color: '#ea580c', cableType: 'Fiber Optic' },
      { id: 'vt-c2', fromNodeId: 'SW-DIST-02', fromPort: 'Gig1/0/23', toNodeId: 'SW-LAB-CISCO', toPort: 'Gig0/1', color: '#2563eb', cableType: 'Cat6 UTP' },
      { id: 'vt-c3', fromNodeId: 'SW-DIST-02', fromPort: 'Gig1/0/24', toNodeId: 'SW-LAB-IOT', toPort: 'Gig0/1', color: '#2563eb', cableType: 'Cat6 UTP' }
    ],
    'gedung-c': [
      { id: 'lib-c1', fromNodeId: 'CR-LIB-03', fromPort: 'ether1', toNodeId: 'SW-LIB-MAIN', toPort: 'port1', color: '#ea580c', cableType: 'Fiber Optic' },
      { id: 'lib-c2', fromNodeId: 'SW-LIB-MAIN', fromPort: 'port24', toNodeId: 'SW-LIB-CORNER', toPort: 'port1', color: '#2563eb', cableType: 'Cat6 UTP' },
    ]
  });

  // Current selected node
  const [selectedNode, setSelectedNode] = useState<TopologyNode | null>(INITIAL_TOPOLOGY_NODES[2]);

  // Current active nodes and cables
  const nodes = buildingNodes[selectedBuildingId] || [];
  const cables = buildingCables[selectedBuildingId] || [];

  // Safe setter helpers
  const setNodes = (updater: any) => {
    setBuildingNodes(prev => {
      const current = prev[selectedBuildingId] || [];
      const updated = typeof updater === 'function' ? updater(current) : updater;
      return { ...prev, [selectedBuildingId]: updated };
    });
  };

  const setCables = (updater: any) => {
    setBuildingCables(prev => {
      const current = prev[selectedBuildingId] || [];
      const updated = typeof updater === 'function' ? updater(current) : updater;
      return { ...prev, [selectedBuildingId]: updated };
    });
  };

  // State to manage additional cables
  const [showCableWizard, setShowCableWizard] = useState(false);
  const [sourceNodeId, setSourceNodeId] = useState('');
  const [sourcePort, setSourcePort] = useState('Fa0/24');
  const [targetNodeId, setTargetNodeId] = useState('');
  const [targetPort, setTargetPort] = useState('Fa0/24');
  const [cableType, setCableType] = useState<'Cat6 UTP' | 'Cat5e' | 'Fiber Optic' | 'Console Serial'>('Cat6 UTP');

  // Modal to add a new building
  const [showAddBuildingModal, setShowAddBuildingModal] = useState(false);
  const [newBuildingName, setNewBuildingName] = useState('');
  const [newBuildingCode, setNewBuildingCode] = useState('');
  const [newBuildingDesc, setNewBuildingDesc] = useState('');
  const [newBuildingBlueprint, setNewBuildingBlueprint] = useState<'default' | 'vocational' | 'library' | 'custom'>('default');

  const handleDeleteNode = () => {
    if (selectedNode) {
      const remainingNodes = nodes.filter(n => n.id !== selectedNode.id);
      const remainingCables = cables.filter(c => c.fromNodeId !== selectedNode.id && c.toNodeId !== selectedNode.id);
      
      setNodes(remainingNodes);
      setCables(remainingCables);
      setSelectedNode(null);
      alert(`Perangkat "${selectedNode.label}" telah dihapus secara fisik dari tata letak ruang.`);
    }
  };

  const handleCreateCable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceNodeId || !targetNodeId || sourceNodeId === targetNodeId) {
      alert("Tolong tentukan perangkat asal dan perangkat akhir yang valid!");
      return;
    }

    let col = '#2563eb';
    if (cableType === 'Cat5e') col = '#ca8a04';
    else if (cableType === 'Fiber Optic') col = '#ea580c';
    else if (cableType === 'Console Serial') col = '#0d9488';

    const newCable: TopologyCable = {
      id: `tc-${Date.now()}`,
      fromNodeId: sourceNodeId,
      fromPort: sourcePort,
      toNodeId: targetNodeId,
      toPort: targetPort,
      color: col,
      cableType: cableType
    };

    setCables((prev: TopologyCable[]) => [...prev, newCable]);
    setSourceNodeId('');
    setTargetNodeId('');
    setShowCableWizard(false);
    alert("Kabel baru pada peta topologi berhasil disambungkan!");
  };

  const handleCreateBuilding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBuildingName.trim() || !newBuildingCode.trim()) {
      alert("Silakan masukkan nama gedung dan kode unik gedung!");
      return;
    }

    const newId = `gedung-${Date.now()}`;
    const newB: SchoolBuilding = {
      id: newId,
      name: newBuildingName,
      code: newBuildingCode.toUpperCase(),
      description: newBuildingDesc || 'Gedung simulasi jaringan baru.',
      blueprintTheme: newBuildingBlueprint
    };

    setBuildings(prev => [...prev, newB]);

    // Initialize with template nodes depending on user's theme selection
    let templateNodes: TopologyNode[] = [];
    let templateCables: TopologyCable[] = [];

    if (newBuildingBlueprint === 'vocational') {
      templateNodes = [
        { id: `CR-${newB.code}-01`, label: `${newB.code}-CR-01`, type: 'router', x: '50%', y: '20%', status: 'online', model: 'Cisco ISR 4421', ip: '192.168.50.1', room: 'Server Room' },
        { id: `SW-${newB.code}-01`, label: `${newB.code}-SW-01`, type: 'switch', x: '50%', y: '50%', status: 'online', model: 'Cisco Catalyst 1000', ip: '192.168.50.2', room: 'Koridor Utama' }
      ];
      templateCables = [
        { id: `c-${Date.now()}`, fromNodeId: `CR-${newB.code}-01`, fromPort: 'Gig0/0', toNodeId: `SW-${newB.code}-01`, toPort: 'Gig1/0/1', color: '#2563eb', cableType: 'Cat6 UTP' }
      ];
    } else if (newBuildingBlueprint === 'library') {
      templateNodes = [
        { id: `CR-${newB.code}-01`, label: `${newB.code}-CR-01`, type: 'router', x: '50%', y: '25%', status: 'online', model: 'MikroTik Cloud Router', ip: '172.30.5.1', room: 'Ruang Server NOC' }
      ];
    } else if (newBuildingBlueprint === 'default') {
      templateNodes = [
        { id: `CR-${newB.code}-01`, label: `${newB.code}-CORE-01`, type: 'router', x: '50%', y: '20%', status: 'online', model: 'Cisco Core ISR 4K', ip: '10.50.0.1', room: 'Ruang Router Utama' },
        { id: `SW-${newB.code}-W`, label: `${newB.code}-SW-WEST`, type: 'switch', x: '30%', y: '65%', status: 'online', model: 'Cisco Catalyst 2960L', ip: '10.50.1.10', room: 'Lab Multimedia Barat' },
        { id: `SW-${newB.code}-E`, label: `${newB.code}-SW-EAST`, type: 'switch', x: '70%', y: '65%', status: 'online', model: 'Cisco Catalyst 2960L', ip: '10.50.1.11', room: 'Lab Multimedia Timur' }
      ];
      templateCables = [
        { id: `c1-${Date.now()}`, fromNodeId: `CR-${newB.code}-01`, fromPort: 'Gig1/0/1', toNodeId: `SW-${newB.code}-W`, toPort: 'Gig1/0/1', color: '#ea580c', cableType: 'Fiber Optic' },
        { id: `c2-${Date.now()}`, fromNodeId: `CR-${newB.code}-01`, fromPort: 'Gig1/0/2', toNodeId: `SW-${newB.code}-E`, toPort: 'Gig1/0/1', color: '#ea580c', cableType: 'Fiber Optic' }
      ];
    }

    setBuildingNodes(prev => ({ ...prev, [newId]: templateNodes }));
    setBuildingCables(prev => ({ ...prev, [newId]: templateCables }));

    setSelectedBuildingId(newId);
    setSelectedNode(templateNodes[0] || null);

    // Reset Form
    setNewBuildingName('');
    setNewBuildingCode('');
    setNewBuildingDesc('');
    setNewBuildingBlueprint('default');
    setShowAddBuildingModal(false);

    alert(`Gedung sekolah "${newB.name}" baru berhasil ditambahkan ke tata letak dan langsung aktif!`);
  };

  const activeBuilding = buildings.find(b => b.id === selectedBuildingId) || buildings[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-128px)] -m-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      {/* Topology Page Header */}
      <header className="h-14 md:h-16 border-b border-slate-100 bg-white flex items-center justify-between px-4 md:px-6 shrink-0 z-40">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Sidebar toggle buttons to allow expanding map fully */}
            <button
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              className={cn(
                "p-1.5 rounded hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900 border shrink-0",
                !isLeftSidebarOpen ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "border-slate-200"
              )}
              title={isLeftSidebarOpen ? "Sembunyikan Sidebar Kiri (Lebar)" : "Tampilkan Sidebar Kiri"}
            >
              {isLeftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            </button>
            
            <div className="flex flex-col justify-center min-w-0">
              <h2 className="text-[11px] sm:text-xs md:text-sm font-black text-slate-900 tracking-tight flex items-center gap-1 sm:gap-1.5 whitespace-nowrap min-w-0">
                <School className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0" />
                <span className="truncate">Peta Topologi Integrasi Sekolah</span>
              </h2>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5 md:mt-1 truncate max-w-[120px] sm:max-w-[200px] md:max-w-[280px]">
                Aktif: {activeBuilding.name} ({activeBuilding.code})
              </p>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-200 shrink-0" />
          
          <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 sm:p-1 rounded-lg border border-slate-200/50 shrink-0">
            <button className="p-1 px-1.5 hover:bg-white rounded transition-all text-slate-500 hover:text-slate-900"><ZoomOut className="w-3 h-3 md:w-3.5 md:h-3.5" /></button>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-900 px-0.5 sm:px-1 w-8 sm:w-10 text-center">100%</span>
            <button className="p-1 px-1.5 hover:bg-white rounded transition-all text-slate-500 hover:text-slate-900"><ZoomIn className="w-3 h-3 md:w-3.5 md:h-3.5" /></button>
            <div className="w-px h-3 bg-slate-300 mx-0.5 sm:mx-1" />
            <button className="p-1 px-1.5 bg-white shadow-sm rounded text-primary"><Move className="w-3 h-3 md:w-3.5 md:h-3.5" /></button>
            <button className="p-1 px-1.5 hover:bg-white rounded transition-all text-slate-500"><MousePointer2 className="w-3 h-3 md:w-3.5 md:h-3.5" /></button>
          </div>
        </div>

        {/* Core Controls & Switching Buildings */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Building Select Dropdown / Manager (Mengganti Gedung) */}
          <div className="flex items-center gap-1 sm:gap-2 bg-slate-55 border border-slate-200 rounded-xl px-2 sm:px-3 py-1 bg-slate-50">
            <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider hidden lg:inline">GEDUNG:</span>
            <select
              value={selectedBuildingId}
              onChange={(e) => {
                const bId = e.target.value;
                setSelectedBuildingId(bId);
                const firstNode = buildingNodes[bId]?.[0] || null;
                setSelectedNode(firstNode);
              }}
              className="bg-transparent border-none text-[10px] sm:text-xs font-black text-slate-800 focus:ring-0 cursor-pointer pr-1 py-0.5 max-w-[80px] sm:max-w-[120px] md:max-w-none truncate outline-none select-none"
            >
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Add Building Toggler */}
          <button 
            onClick={() => setShowAddBuildingModal(true)}
            className="p-1.5 sm:p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all outline-none"
            title="Tambah Gedung Baru ke Lingkungan Sekolah"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">GEDUNG</span>
          </button>

          <div className="w-px h-6 bg-slate-200 mx-0.5 hidden sm:block shrink-0" />

          {/* Cable sandbox wizard toggler */}
          <button
            onClick={() => setShowCableWizard(!showCableWizard)}
            className="p-1.5 sm:p-2 rounded-lg border text-[10px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-all outline-none"
          >
            <Cable className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden md:inline">SAMBUNG KABEL</span>
            <span className="md:hidden">KABEL</span>
          </button>

          <button 
            onClick={() => setIsInspectorOpen(!isInspectorOpen)}
            className={cn(
              "p-1.5 sm:p-2 rounded-lg border transition-all flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold outline-none shrink-0",
              isInspectorOpen ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            {isInspectorOpen ? <PanelRightClose className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <PanelRightOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
            <span className="hidden lg:inline">{isInspectorOpen ? 'TUTUP ATRIBUT' : 'BUKA ATRIBUT'}</span>
            <span className="lg:hidden">ATRIBUT</span>
          </button>
          
          <div className="w-px h-6 bg-slate-200 mx-0.5 sm:mx-1 shrink-0" />
          
          <button 
            onClick={() => {
              setBuildingNodes(prev => ({
                ...prev,
                [selectedBuildingId]: selectedBuildingId === 'gedung-a' ? INITIAL_TOPOLOGY_NODES : []
              }));
              setBuildingCables(prev => ({
                ...prev,
                [selectedBuildingId]: selectedBuildingId === 'gedung-a' ? INITIAL_TOPOLOGY_CABLES : []
              }));
              setSelectedNode(null);
              alert("Tata letak gedung aktif di-reset.");
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] sm:text-xs font-bold shadow-lg transition-all shrink-0"
          >
            <RefreshCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* Main split work area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left aspect asset toolbox (Expandable / Collapsible) */}
        <AnimatePresence>
          {isLeftSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 288, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="h-full flex overflow-hidden border-r border-slate-200"
            >
              <MapTools />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Topology Workspace Canvas rendered under classroom/school floor boundaries */}
        <TopologyCanvas 
          nodes={nodes}
          cables={cables}
          onNodesChange={setNodes}
          selectedNodeId={selectedNode?.id} 
          onSelect={setSelectedNode} 
          buildingId={selectedBuildingId}
          buildingTheme={activeBuilding.blueprintTheme}
        />

        {/* Inline wizard overlay to quickly attach cables */}
        <AnimatePresence>
          {showCableWizard && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute bottom-6 left-80 z-50 w-80 bg-white border border-slate-200 p-5 rounded-2xl shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-950 font-bold text-xs uppercase tracking-wider">
                  <Plug className="w-4 h-4 text-indigo-500" /> Sambungkan Kabel Port Baru
                </div>
                <button onClick={() => setShowCableWizard(false)} className="p-1 hover:bg-slate-105 rounded text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCable} className="space-y-3 text-[10px]">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] font-bold text-slate-400 uppercase">Device Asal</label>
                    <select 
                      value={sourceNodeId} 
                      onChange={(e) => setSourceNodeId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 font-bold text-slate-800"
                      required
                    >
                      <option value="">-- Asal --</option>
                      {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-slate-450 uppercase">Port Asal</label>
                    <input 
                      type="text" 
                      value={sourcePort} 
                      onChange={(e) => setSourcePort(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 font-mono font-bold"
                      placeholder="e.g. Gig1/0/2"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] font-bold text-slate-400 uppercase">Device Tujuan</label>
                    <select 
                      value={targetNodeId} 
                      onChange={(e) => setTargetNodeId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 font-bold"
                      required
                    >
                      <option value="">-- Tujuan --</option>
                      {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-slate-400 uppercase">Port Tujuan</label>
                    <input 
                      type="text" 
                      value={targetPort} 
                      onChange={(e) => setTargetPort(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 font-mono font-bold"
                      placeholder="e.g. Fa0/24"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-bold text-slate-400 uppercase mb-1">Standard Kabel Fisik</label>
                  <select
                    value={cableType}
                    onChange={(e) => setCableType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 font-bold text-[10px]"
                  >
                    <option value="Cat6 UTP">Cat 6 Ethernet (Biru)</option>
                    <option value="Cat5e">Cat 5e Ethernet (Kuning)</option>
                    <option value="Fiber Optic">Serat Optik (Jingga)</option>
                    <option value="Console Serial">Konsol Rollover (Hijau Lumut)</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition"
                >
                  Plug Cable Connection
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal: Tambah Gedung Baru */}
        <AnimatePresence>
          {showAddBuildingModal && (
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full shadow-2xl relative"
              >
                <button 
                  onClick={() => setShowAddBuildingModal(false)}
                  className="absolute top-5 right-5 p-1.5 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-emerald-55 text-emerald-600 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base leading-none">Tambah Gedung Jaringan</h3>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-extrabold">LINGKUNGAN BARU SEKOLAH</p>
                  </div>
                </div>

                <form onSubmit={handleCreateBuilding} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Nama Gedung</label>
                    <input 
                      type="text"
                      required
                      value={newBuildingName}
                      onChange={(e) => setNewBuildingName(e.target.value)}
                      placeholder="e.g. Gedung Seni & Multimedia"
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Kode Unik</label>
                      <input 
                        type="text"
                        required
                        value={newBuildingCode}
                        onChange={(e) => setNewBuildingCode(e.target.value)}
                        placeholder="e.g. GD-SENI"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-primary uppercase transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Tema Cetak Biru</label>
                      <select 
                        value={newBuildingBlueprint}
                        onChange={(e) => setNewBuildingBlueprint(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-primary transition-all"
                      >
                        <option value="default">Standard Lab Layout</option>
                        <option value="vocational">Vocational Workshop Floor</option>
                        <option value="library">Library Digital Sandbox</option>
                        <option value="custom">Gedung Kosong (Playground)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Deskripsi Tambahan</label>
                    <textarea 
                      value={newBuildingDesc}
                      onChange={(e) => setNewBuildingDesc(e.target.value)}
                      placeholder="e.g. Gedung pameran seni digital dengan integrasi wireless access point 450mbps."
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs font-bold outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button 
                      type="button"
                      onClick={() => setShowAddBuildingModal(false)}
                      className="px-4 py-2 hover:bg-slate-100 text-slate-500 rounded-xl text-xs font-bold transition-all"
                    >
                      Batal
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                      Bangun Gedung Baru
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Right Aspect dynamic Node Inspector */}
        <AnimatePresence>
          {isInspectorOpen && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative shadow-2xl z-40 h-full flex"
            >
              <NodeInspector 
                node={selectedNode} 
                onClose={() => setIsInspectorOpen(false)} 
                onDelete={handleDeleteNode} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
