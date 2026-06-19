import React from 'react';
import { Plus, Search, Shield, School, GraduationCap, Users as UsersIcon, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_USERS } from '@/src/constants';
import { cn } from '@/src/lib/utils';

export default function Users() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Access Control</h2>
          <p className="text-slate-500 text-sm mt-1">Manage administrative permissions and student network credentials.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold py-2.5 px-6 shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Register New Account
        </button>
      </div>

      {/* Mini Stats Hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStatCard label="Total Staff & Students" value="1,248" Icon={UsersIcon} color="text-blue-600 bg-blue-50/50 border-blue-100" />
        <MiniStatCard label="Root Admins" value="12" Icon={Shield} color="text-slate-900 bg-slate-50 border-slate-200" />
        <MiniStatCard label="Instructors" value="45" Icon={School} color="text-emerald-600 bg-emerald-50/50 border-emerald-100" />
        <MiniStatCard label="Student Nodes" value="1,191" Icon={GraduationCap} color="text-amber-600 bg-amber-50/50 border-amber-100" />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none outline-none">
            <option>All Permissions</option>
            <option>Root Admin</option>
            <option>Instructor</option>
            <option>Standard Member</option>
          </select>
        </div>

        {/* Access Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Identity</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Role Path</th>
                <th className="px-6 py-4">Affiliation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all">
                  <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{user.username}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase tracking-tight">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.deptClass}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-1.5 h-1.5 rounded-full", user.status === 'Active' ? "bg-emerald-500" : "bg-slate-300")} />
                      <span className={cn("text-[10px] font-bold uppercase", user.status === 'Active' ? "text-emerald-600" : "text-slate-400")}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 text-blue-600 font-bold hover:bg-blue-50 rounded transition-colors text-xs">
                      MODIFY
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function MiniStatCard({ label, value, Icon, color }: any) {
  return (
    <div className={cn("border p-5 rounded-2xl shadow-sm flex flex-col gap-3 group transition-all", color)}>
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-1 opacity-70">{label}</span>
        <div className="transition-transform group-hover:scale-110">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-bold tracking-tight leading-none">{value}</div>
    </div>
  );
}
