export enum DeviceStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  WARNING = 'WARNING',
}

export enum DeviceType {
  ROUTER = 'Router',
  SWITCH = 'Switch',
  ACCESS_POINT = 'Access Point',
  PC = 'PC',
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  ip: string;
  mac: string;
  location: string;
  status: DeviceStatus;
  cpuUsage?: number;
  ramUsage?: number;
  storageUsage?: number;
  uptime?: string;
  firmware?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: 'Administrator' | 'Guru' | 'Siswa';
  deptClass: string;
  status: 'Active' | 'Inactive';
}

export interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  eventType: string;
  description: string;
}
