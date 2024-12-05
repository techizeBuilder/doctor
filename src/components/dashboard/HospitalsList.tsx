import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

interface Hospital {
  id: string;
  name: string;
  type: string;
  beds: string;
  address: string;
  phone: string;
  email: string;
}

export const HospitalsList = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'hospitals'));
        const hospitalsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Hospital));
        setHospitals(hospitalsData);
      } catch (error) {
        toast.error('Failed to fetch hospitals');
      }
    };

    fetchHospitals();
  }, []);

  const handleDelete = async (hospitalId: string) => {
    try {
      await deleteDoc(doc(db, 'hospitals', hospitalId));
      setHospitals(hospitals.filter(hospital => hospital.id !== hospitalId));
      toast.success('Hospital deleted successfully');
    } catch (error) {
      toast.error('Failed to delete hospital');
    }
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search hospitals..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredHospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td className="px-6 py-4 whitespace-nowrap">{hospital.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    hospital.type === 'General' ? 'bg-green-100 text-green-800' :
                    hospital.type === 'Specialty' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {hospital.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{hospital.beds}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div>{hospital.email}</div>
                    <div className="text-sm text-gray-500">{hospital.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{hospital.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(hospital.id)}
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