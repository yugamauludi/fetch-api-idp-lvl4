import { useState } from 'react';
import ExerciseModal from './components/ModalAdd';
import Swal from 'sweetalert2';
import ModalDetail from './components/ModalDetail'

export default function Kelas() {
    const [dataKelas, setDataKelas] = useState([
      { id: 1, name: "John Doe", NIK: "09812938912", pelatihan: "English Course" },
      { id: 2, name: "Jane Smith", NIK: "121298487483", pelatihan: "Springboot" },
      { id: 3, name: "Bob Johnson", NIK: "3123212441244", pelatihan: "Fullstack Javascript" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [detailData, setDetailData] = useState(null);

  
    const handleAddData = (newData) => {
      if (editingData) {
        setDataKelas(dataKelas.map(employee =>
          employee.id === editingData.id ? { ...employee, ...newData } : employee
        ));
      } else {
        setDataKelas([...dataKelas, { ...newData, id: dataKelas.length + 1 }]);
      }
      setEditingData(null);
  };

  const handleEditClick = (employee) => {
    setEditingData(employee);
    setIsModalOpen(true);
  };    

  const handleDetailClick = (employee) => {
    setDetailData(employee)
    setIsDetailModalOpen(true)
  };


  const handleDeleteClick = (employee) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${employee.name}'s data. This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the employee if confirmed
        setDataKelas(dataKelas.filter(data => data.id !== employee.id));
        Swal.fire(
          'Deleted!',
          `${employee.name}'s data has been deleted.`,
          'success'
        );
      }
    });
  };


  return (
    <div className="container mx-auto w-full px-4 sm:px-8" style={{ marginTop: "50px" }}>
      <div className="py-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold leading-tight">Class List</h2>
        <button 
          onClick={() => {
            setEditingData(null);
            setIsModalOpen(true);
          }}
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-4 py-2"
        >
          Tambah Data
        </button>
      </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  No
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  NIK
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pelatihan
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataKelas.map((employee, index) => (
                <tr key={employee.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{employee.name}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{employee.NIK}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{employee.pelatihan}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleDetailClick(employee)} className="text-green-600 hover:underline mr-2">Detail</button>
                    <button onClick={() => handleEditClick(employee)} className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDeleteClick(employee)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ExerciseModal 
          onClose={() => {
            setIsModalOpen(false);
            setEditingData(null); // Reset editing data on close
          }}
          onAddData={handleAddData}
          existingData={editingData}
        />
      )}
      {isDetailModalOpen && (
        <ModalDetail 
          onClose={() => {
            setIsDetailModalOpen(false);
            setDetailData(null);
          }}
          detailData={detailData}
        />
      )}
    </div>
  );
}