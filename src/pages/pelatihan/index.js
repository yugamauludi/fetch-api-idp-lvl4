import { useEffect, useState } from "react";
import ModalAdd from "./components/ModalAdd";
import ModalDetail from "./components/ModalDetail";
import Swal from "sweetalert2";

export default function Pelatihan() {
  const [dataPelatihan, setDataPelatihan] = useState([
    { id: 1, pengajar: "John Doe", tema: "Springboot" },
    { id: 2, pengajar: "Jane Smith", tema: "English Course" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:9090/v1/training/list?page=0&size=10",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        if (result.data && result.data.content) {
          const formattedData = result.data.content.map((item) => ({
            id: item.id,
            tema: item.tema,
            pengajar: item.pengajar,
          }));
          setDataPelatihan(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Swal.fire("Error", "Failed to fetch data from server", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddData = async (newData) => {
    try {
      const payload = {
        id: isEditMode ? editingEmployee.id : undefined,
        tema: newData.pelatihan,
        pengajar: newData.pengajar,
      };      

      const requestOptions = {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      const url = isEditMode
        ? "{{host}}/v1/training/update"
        : "{{host}}/v1/training/save";
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        if (isEditMode) {
          setDataPelatihan(
            dataPelatihan.map((emp) =>
              emp.id === editingEmployee.id
                ? { ...newData, id: editingEmployee.id }
                : emp
            )
          );
        } else {
          setDataPelatihan([
            ...dataPelatihan,
            { ...newData, id: dataPelatihan.length + 1 },
          ]);
        }
      }

      Swal.fire("Success", "Data saved successfully", "success");
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire("Error", "Failed to save data", "error");
    }
  };

  const handleDeleteClick = (course) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${course.pelatihan}'s data. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataPelatihan(dataPelatihan.filter((data) => data.id !== course.id));
        Swal.fire(
          "Deleted!",
          `${course.pelatihan}'s data has been deleted.`,
          "success"
        );
      }
    });
  };

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const handleDetailClick = (employee) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`localhost:9090/v1/training/${employee.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDetailData(result.data);
        setIsDetailModalOpen(true);
      })
      .catch((error) => {
        setDetailData(employee);
        setIsDetailModalOpen(true);
      });
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div
      className="container mx-auto px-4 sm:px-8"
      style={{ marginTop: "50px" }}
    >
      <div className="py-8">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold leading-tight">Course List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
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
                  Pelatihan
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pengajar
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPelatihan.map((employee, index) => (
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
                      {employee.tema || employee.pelatihan}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.pengajar}
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
