import { DeviceStatus, DeviceType, Device, User, LogEntry } from './types';

export const COLORS = {
  primary: '#003f87',
  secondary: '#006e25',
  tertiary: '#553e00',
  error: '#ba1a1a',
  background: '#f8f9fa',
  surface: '#ffffff',
  outline: '#727784',
};

export const MOCK_DEVICES: Device[] = [
  {
    id: '1',
    name: 'Core-Router-01',
    type: DeviceType.ROUTER,
    ip: '192.168.1.1',
    mac: '00:1A:2B:3C:4D:5E',
    location: 'Server Room A',
    status: DeviceStatus.UP,
    cpuUsage: 45,
    ramUsage: 78,
    storageUsage: 32,
    uptime: '45d 12h 34m',
    firmware: 'v2.4.1-stable',
  },
  {
    id: '2',
    name: 'Dist-Switch-02',
    type: DeviceType.SWITCH,
    ip: '192.168.1.2',
    mac: '00:1A:2B:3C:4D:5F',
    location: 'Wiring Closet B',
    status: DeviceStatus.UP,
  },
  {
    id: '3',
    name: 'AP-Library-01',
    type: DeviceType.ACCESS_POINT,
    ip: '192.168.2.15',
    mac: '00:1A:2B:3C:4D:60',
    location: 'Main Library',
    status: DeviceStatus.WARNING,
  },
  {
    id: '4',
    name: 'Lab-PC-01',
    type: DeviceType.PC,
    ip: '192.168.3.101',
    mac: 'A1:B2:C3:D4:E5:F6',
    location: 'Lab Room 101',
    status: DeviceStatus.DOWN,
  },
];

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Budi Santoso',
    username: 'bsantoso_admin',
    role: 'Administrator',
    deptClass: 'IT Operations',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Siti Aminah, M.Kom',
    username: 'saminah',
    role: 'Guru',
    deptClass: 'Computer Science',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Agus Setiawan',
    username: 'asetiawan_12A',
    role: 'Siswa',
    deptClass: 'Class 12-A TKJ',
    status: 'Inactive',
  },
  {
    id: '4',
    name: 'Rina Wulandari',
    username: 'rwulandari_11B',
    role: 'Siswa',
    deptClass: 'Class 11-B RPL',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Hendra Pratama',
    username: 'hpratama_guru',
    role: 'Guru',
    deptClass: 'Network Infrastructure',
    status: 'Active',
  },
];

export const MOCK_LOGS: LogEntry[] = [
  {
    id: '1',
    timestamp: '2023-10-27 14:32:01',
    user: 'admin.user',
    eventType: 'Config Change',
    description: 'Updated BGP routing table metrics.',
  },
  {
    id: '2',
    timestamp: '2023-10-27 10:15:44',
    user: 'SYSTEM',
    eventType: 'Alert',
    description: 'High CPU usage detected (85% for >5m).',
  },
  {
    id: '3',
    timestamp: '2023-10-26 22:00:00',
    user: 'SYSTEM',
    eventType: 'Backup',
    description: 'Automated configuration backup successful.',
  },
  {
    id: '4',
    timestamp: '2023-10-25 09:12:30',
    user: 'tech.support',
    eventType: 'Login',
    description: 'Successful SSH login from 10.0.0.45.',
  },
];
