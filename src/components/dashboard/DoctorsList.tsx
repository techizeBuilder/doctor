import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: string;
  phone: string;
}

export const DoctorsList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doctors'));
        const doctorsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Doctor));
        setDoctors(doctorsData);
      } catch (error) {
        toast.error('Failed to fetch doctors');
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId: string) => {
    try {
      await deleteDoc(doc(db, 'doctors', doctorId));
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      toast.success('Doctor deleted successfully');
    } catch (error) {
      toast.error('Failed to delete doctor');
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search doctors..."
          className="px-4 py-2 border rounded-md w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.experience} years</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div>{doctor.email}</div>
                    <div className="text-sm text-gray-500">{doctor.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};