import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';
import { UsersList } from '../components/dashboard/UsersList';
import { AddUser } from '../components/dashboard/AddUser';
import { AddDoctor } from '../components/dashboard/AddDoctor';
import { AddHospital } from '../components/dashboard/AddHospital';
import { DoctorsList } from '../components/dashboard/DoctorsList';
import { HospitalsList } from '../components/dashboard/HospitalsList';

export const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/hospitals" element={<HospitalsList />} />
          <Route path="/add-hospital" element={<AddHospital />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Healthcare Admin Dashboard</h1>
      <p className="text-gray-600">Manage doctors, hospitals, and users from the sidebar menu.</p>
    </div>
  );
};