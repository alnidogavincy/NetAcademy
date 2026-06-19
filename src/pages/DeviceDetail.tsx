import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCcw, 
  Settings as SettingsIcon, 
  Activity, 
  Cpu, 
  Database, 
  HardDrive 
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_DEVICES, MOCK_LOGS } from '@/src/constants';
import { cn } from '@/src/lib/utils';

export default function DeviceDetail() {
  const { id } = useParams();
  const device = MOCK_DEVICES.find(d => d.id === id) || MOCK_DEVICES[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/devices" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Devices
          </Link>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-on-surface">{device.name}</h2>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1.5 border border-secondary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              ONLINE
            </span>
          </div>
          <p className="text-on-surface-variant mt-2 font-mono text-xs tracking-tight">
            IP: {device.ip} | MAC: {device.mac}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 border border-primary text-primary rounded-lg font-bold text-sm hover:bg-primary-container/10 transition-colors flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reboot Device
          </button>
          <button className="px-5 py-2.5 bg-primary text-on-primary rounded-lg font-bold text-sm hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm">
            <SettingsIcon className="w-4 h-4" />
            Configure
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-6 border-b border-outline-variant pb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Hardware Specifications
            </h3>
            
            <div className="space-y-6">
              <SpecItem 
                label="CPU" 
                value="Intel Xeon E-2388G @ 3.20GHz (8 Cores)" 
                usage={device.cpuUsage || 45} 
                usageLabel={`${device.cpuUsage || 45}% Usage`}
                Icon={Cpu}
              />
              <SpecItem 
                label="RAM" 
                value="32GB DDR4 ECC" 
                usage={device.ramUsage || 78} 
                usageLabel="25.3GB Used (78%)"
                Icon={Database}
                color="bg-primary"
              />
              <SpecItem 
                label="Storage" 
                value="1TB NVMe SSD" 
                usage={device.storageUsage || 32} 
                usageLabel="320GB Used (32%)"
                Icon={HardDrive}
                color="bg-secondary"
              />
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-on-surface mb-4">System Info</h3>
            <div className="space-y-4">
              <InfoRow label="Uptime" value={device.uptime || "45d 12h"} />
              <InfoRow label="Firmware Version" value={device.firmware || "v2.4.1-stable"} />
              <InfoRow label="Location" value={device.location} />
            </div>
          </div>
        </div>

        {/* Right Column: Charts & Logs */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-lg p-6 shadow-sm h-80 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-on-surface">Bandwidth Usage</h3>
              <div className="flex gap-3">
                <span className="text-[10px] font-mono font-bold px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant">In: 450 Mbps</span>
                <span className="text-[10px] font-mono font-bold px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant">Out: 320 Mbps</span>
              </div>
            </div>
            
            {/* Simulated Chart */}
            <div className="flex-1 relative border-l border-b border-outline-variant flex items-end pt-4 pb-2 px-4 gap-2">
              <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-2 pointer-events-none">
                {[1, 2, 3].map(i => <div key={i} className="w-full border-t border-dashed border-outline-variant/30" />)}
              </div>
              
              <div className="flex-1 bg-primary/20 h-[40%] rounded-t border-t border-x border-primary/30" />
              <div className="flex-1 bg-primary h-[60%] rounded-t border-t border-x border-primary" />
              <div className="flex-1 bg-primary/40 h-[30%] rounded-t border-t border-x border-primary/50" />
              <div className="flex-1 bg-primary h-[80%] rounded-t border-t border-x border-primary" />
              <div className="flex-1 bg-primary/20 h-[50%] rounded-t border-t border-x border-primary/30" />
              <div className="flex-1 bg-primary h-[90%] rounded-t border-t border-x border-primary" />
            </div>
            
            <div className="flex justify-between mt-4 px-4">
              {['08:00', '09:00', '10:00', '11:00', '12:00'].map(t => (
                <span key={t} className="text-[10px] font-bold text-on-surface-variant">{t}</span>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <h3 className="font-bold text-on-surface">Activity Log</h3>
              <button className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
                View All Details
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-container-high/50 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline-variant">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">User/System</th>
                    <th className="p-4">Event Type</th>
                    <th className="p-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_LOGS.map((log, i) => (
                    <tr key={log.id} className={cn(
                      "border-b border-outline-variant transition-colors hover:bg-surface-container-low",
                      i % 2 === 1 && "bg-surface-container-lowest/50"
                    )}>
                      <td className="p-4 font-mono text-xs text-on-surface-variant">{log.timestamp}</td>
                      <td className="p-4 font-bold">{log.user}</td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          log.eventType === 'Alert' ? "bg-error-container text-error" : "bg-outline-variant/30 text-on-surface-variant"
                        )}>
                          {log.eventType}
                        </span>
                      </td>
                      <td className="p-4 text-on-surface-variant">{log.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SpecItem({ label, value, usage, usageLabel, Icon, color = "bg-primary" }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 text-on-surface-variant" />
        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-sm font-bold text-on-surface">{value}</p>
      <div className="w-full bg-outline-variant/30 rounded-full h-1.5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${usage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
      <p className="text-right font-mono text-[10px] text-on-surface-variant">{usageLabel}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-outline-variant/50 pb-2">
      <span className="text-sm text-on-surface-variant">{label}</span>
      <span className="text-sm font-mono font-bold text-on-surface">{value}</span>
    </div>
  );
}
