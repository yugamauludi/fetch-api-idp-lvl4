import { useEffect, useState } from "react";
import ExerciseModal from "./components/ModalAdd";
import Swal from "sweetalert2";
import ModalDetail from "./components/ModalDetail";

export default function Kelas() {
  const [dataKelas, setDataKelas] = useState([
    {
      id: 1,
      name: "John Doe",
      NIK: "09812938912",
      pelatihan: "English Course",
    },
    { id: 2, name: "Jane Smith", NIK: "121298487483", pelatihan: "Springboot" },
    {
      id: 3,
      name: "Bob Johnson",
      NIK: "3123212441244",
      pelatihan: "Fullstack Javascript",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const formdata = new FormData();
      const requestOptions = {
        method: "GET",
        body: formdata,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:9090/v1/karyawan-training/list?page=0&size=10",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        if (result.data && result.data.content) {
          const formattedData = result.data.content.map((item) => ({
            id: item.id,
            name: item.karyawan.name,
            NIK: item.karyawan.karyawanDetail.nik,
            pelatihan: item.training.tema,
          }));
          setDataKelas(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;


  const handleAddData = async (newData) => {
    try {
      const payload = {
        id: editingData ? editingData.id : undefined, // Jika edit, gunakan ID
        karyawan: { id: newData.karyawanId },
        training: { id: newData.trainingId },
        training_date: newData.trainingDate || currentDate,
      };

      console.log(payload, "<<<payload");
      

      const requestOptions = {
        method: editingData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      const url = editingData
        ? "{{host}}/v1/karyawan-training/update"
        : "{{host}}/v1/karyawan-training/save";

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        if (editingData) {
          setDataKelas(
            dataKelas.map((employee) =>
              employee.id === editingData.id
                ? { ...employee, ...newData }
                : employee
            )
          );
        } else {
          setDataKelas([
            ...dataKelas,
            { ...newData, id: dataKelas.length + 1 },
          ]);
        }
      }
      setEditingData(null);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEditClick = (employee) => {
    setEditingData(employee);
    setIsModalOpen(true);
  };

  const handleDetailClick = (employee) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9090/v1/karyawan-training/${employee.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          const formattedData = {
            id: result.data.id,
            name: result.data.karyawan.name,
            NIK: result.data.karyawan.karyawanDetail.nik,
            pelatihan: result.data.training.tema,
          };
          setDetailData(formattedData);
        }
        setIsDetailModalOpen(true);
      })
      .catch((error) => {
        setDetailData(employee);
        setIsDetailModalOpen(true);
      });
  };

  const handleDeleteClick = async (employee) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${employee.name}'s data. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `{{host}}/v1/karyawan/delete/${employee.id}`,
          requestOptions
        );

        if (!response.ok) {
          setDataKelas(dataKelas.filter((data) => data.id !== employee.id));
          Swal.fire(
            "Deleted!",
            `${employee.name}'s data has been deleted.`,
            "success"
          );
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        Swal.fire("Error!", "Failed to delete employee.", "error");
      }
    }
  };

  return (
    <div
      className="container mx-auto w-full px-4 sm:px-8"
      style={{ marginTop: "50px" }}
    >
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
                        <p className="text-gray-900 whitespace-no-wrap">
                          {index + 1}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.NIK}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.pelatihan}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleDetailClick(employee)}
                      className="text-green-600 hover:underline mr-2"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleEditClick(employee)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(employee)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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
