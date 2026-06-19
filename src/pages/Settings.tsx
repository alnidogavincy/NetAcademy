import React, { useState } from 'react';
import { Settings as SettingsIcon, Sliders, Network, Shield, Database, Bell, Upload, Cloud } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Settings() {
  const [language, setLanguage] = useState('English (US)');

  const isIndo = language === 'Bahasa Indonesia';

  const t = {
    title: isIndo ? 'Pengaturan Sistem' : 'System Settings',
    desc: isIndo ? 'Konfigurasi parameter global, kebijakan keamanan, dan standar pemantauan jaringan.' : 'Configure global parameters, security policies, and network monitoring defaults.',
    general: isIndo ? 'Umum' : 'General',
    network: isIndo ? 'Konfigurasi Jaringan' : 'Network Config',
    security: isIndo ? 'Keamanan' : 'Security',
    db: isIndo ? 'Database & Cadangan' : 'Database & Backup',
    notif: isIndo ? 'Notifikasi' : 'Notifications',
    sysName: isIndo ? 'Nama Sistem' : 'System Name',
    sysNameDesc: isIndo ? 'Nama ini akan muncul di navigasi atas dan header notifikasi.' : 'This name appears in the top navigation and notification headers.',
    branding: isIndo ? 'Branding Sekolah' : 'School Branding',
    brandingDesc: isIndo ? 'Unggah logo untuk menyesuaikan antarmuka untuk institusi Anda.' : 'Upload a logo to customize the interface for your institution.',
    lang: isIndo ? 'Bahasa Utama' : 'Default Language',
    timezone: isIndo ? 'Zona Waktu' : 'System Timezone',
    save: isIndo ? 'Simpan Perubahan' : 'Save Changes',
    cancel: isIndo ? 'Batal' : 'Cancel',
    autoBackup: isIndo ? 'Cadangan Otomatis' : 'Automated Backups',
    daily: isIndo ? 'Harian' : 'Daily',
    weekly: isIndo ? 'Mingguan' : 'Weekly',
    disabled: isIndo ? 'Nonaktif' : 'Disabled',
    manualBackup: isIndo ? 'Cadangan Manual' : 'Manual Backup',
    manualBackupDesc: isIndo ? 'Buat cuplikan instan dari topologi jaringan dan basis data pengaturan.' : 'Create an immediate snapshot of the network topology and settings database.',
    genBackup: isIndo ? 'Hasilkan Cadangan' : 'Generate Backup'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-on-surface">{t.title}</h2>
        <p className="text-on-surface-variant mt-1 text-lg">{t.desc}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Settings Navigation */}
        <aside className="w-full lg:w-64 bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden sticky top-24">
          <nav className="flex flex-col text-sm">
            <SettingsItem label={t.general} Icon={Sliders} active />
            <SettingsItem label={t.network} Icon={Network} />
            <SettingsItem label={t.security} Icon={Shield} />
            <SettingsItem label={t.db} Icon={Database} />
            <div className="border-t border-outline-variant" />
            <SettingsItem label={t.notif} Icon={Bell} />
          </nav>
        </aside>

        {/* Panels */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {/* General Settings */}
          <section className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <header className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-3">
              <Sliders className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-on-surface">{t.general}</h3>
            </header>
            
            <div className="p-8 space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface">{t.sysName}</label>
                <input 
                  type="text" 
                  defaultValue="NetAcademy Lab Environment" 
                  className="w-full max-w-md bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="text-xs text-on-surface-variant leading-relaxed">{t.sysNameDesc}</p>
              </div>

              <div className="pt-8 border-t border-outline-variant space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-on-surface">{t.branding}</label>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{t.brandingDesc}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low flex items-center justify-center text-outline-variant">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <button className="bg-surface border border-outline-variant px-4 py-2 rounded-lg text-sm font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2">
                      <Cloud className="w-4 h-4" /> {isIndo ? 'Unggah Logo' : 'Upload Logo'}
                    </button>
                    <p className="text-[10px] text-outline uppercase font-bold tracking-widest">Recommended: 200x200px PNG or SVG. Max 2MB.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-outline-variant grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">{t.lang}</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option>English (US)</option>
                    <option>Bahasa Indonesia</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface">{t.timezone}</label>
                  <select className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>WIB (Western Indonesian Time)</option>
                  </select>
                </div>
              </div>
            </div>

            <footer className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
              <button className="px-6 py-2 rounded-lg text-sm font-bold hover:bg-surface-container-high transition-colors">{t.cancel}</button>
              <button className="px-8 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold shadow-md hover:bg-primary-container transition-all">{t.save}</button>
            </footer>
          </section>

          {/* Database Section */}
          <section className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <header className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-on-surface">{t.db}</h3>
            </header>
            
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-on-surface">{t.autoBackup}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <BackupOption label={t.daily} description="Every night at 02:00 UTC" active />
                  <BackupOption label={t.weekly} description="Sundays at 02:00 UTC" />
                  <BackupOption label={t.disabled} description="Not recommended" error />
                </div>
              </div>

              <div className="p-6 bg-surface-container-low border border-outline-variant rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-on-surface">{t.manualBackup}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{t.manualBackupDesc}</p>
                  <p className="font-mono text-[10px] text-primary/60 mt-2 italic">Last backup: 2023-10-24 14:32 UTC (Admin)</p>
                </div>
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all flex items-center gap-2 shrink-0">
                  <Cloud className="w-4 h-4" /> {t.genBackup}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

function SettingsItem({ label, Icon, active }: any) {
  return (
    <a 
      href={`#${label.toLowerCase()}`}
      className={cn(
        "px-6 py-4 flex items-center gap-3 transition-all border-l-4",
        active 
          ? "bg-primary-container/5 border-primary text-primary font-bold shadow-inner" 
          : "border-transparent text-on-surface-variant hover:bg-surface-container-low"
      )}
    >
      <Icon className={cn("w-4.5 h-4.5", active ? "fill-primary/10" : "")} />
      {label}
    </a>
  );
}

function BackupOption({ label, description, active, error }: any) {
  return (
    <div className={cn(
      "p-4 rounded-xl border-2 transition-all cursor-pointer relative",
      active ? "border-primary bg-primary-container/10 shadow-sm" : "border-outline-variant bg-surface hover:border-outline",
    )}>
      <p className={cn("text-xs font-bold leading-none mb-2", error && !active ? "text-error" : "text-on-surface")}>{label}</p>
      <p className="text-[10px] text-on-surface-variant leading-tight">{description}</p>
      {active && <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-on-primary">
          <Cloud className="w-2 h-2" />
        </div>}
    </div>
  );
}
