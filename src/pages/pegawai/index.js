import { useState } from "react";
import ModalAdd from "./components/ModalAdd";
import ModalDetail from "./components/ModalDetail";
import Swal from 'sweetalert2';

export default function Pegawai() {
  const [dataPegawai, setDataPegawai] = useState([
    { id: 1, name: "John Doe", nik: "081264781564", tanggalLahir: "17/07/1990", npwp: 663554861, alamat: "Developer", status: "aktif" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleAddData = (newData) => {
    if (isEditMode) {
      setDataPegawai(dataPegawai.map(emp => emp.id === editingEmployee.id ? { ...newData, id: editingEmployee.id } : emp));
    } else {
      setDataPegawai([...dataPegawai, { ...newData, id: dataPegawai.length + 1 }]);
    }
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingEmployee(null);
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
        setDataPegawai(dataPegawai.filter(data => data.id !== employee.id));
        Swal.fire(
          'Deleted!',
          `${employee.name}'s data has been deleted.`,
          'success'
        );
      }
    });
  };

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const handleDetailClick = (employee) => {
    setDetailData(employee)
    setIsDetailModalOpen(true)
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsEditMode(true);
    setIsModalOpen(true);
  };


  return (
    <div className="container mx-auto w-full px-4 sm:px-8" style={{ marginTop: "50px" }}>
      <div className="py-8">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold leading-tight">Employee List</h2>
          <button onClick={() => setIsModalOpen(true)}
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-4 py-2">Tambah Data</button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  No
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  NIK
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPegawai.map((employee, index) => (
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
                    <p className="text-gray-900 whitespace-no-wrap">{employee.nik}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{employee.alamat}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{employee.status}</p>
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
        <ModalAdd 
          onClose={() => setIsModalOpen(false)}
          onAddData={handleAddData}
          existingData={editingEmployee}
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