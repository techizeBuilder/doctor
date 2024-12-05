import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  LayoutDashboard, 
  LogOut, 
  Stethoscope, 
  Building2, 
  PlusCircle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Users List', path: '/dashboard/users' },
    { icon: UserPlus, label: 'Add User', path: '/dashboard/add-user' },
    { icon: Stethoscope, label: 'Doctors List', path: '/dashboard/doctors' },
    { icon: PlusCircle, label: 'Add Doctor', path: '/dashboard/add-doctor' },
    { icon: Building2, label: 'Hospitals List', path: '/dashboard/hospitals' },
    { icon: PlusCircle, label: 'Add Hospital', path: '/dashboard/add-hospital' },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Healthcare Admin</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm ${
                    location.pathname === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={() => logout()}
          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};