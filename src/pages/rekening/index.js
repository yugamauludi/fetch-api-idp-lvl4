import { useEffect, useState } from "react";
import RekeningModal from "./components/ModalAdd";
import Swal from "sweetalert2";
import ModalDetail from "./components/ModalDetail";

export default function Rekening() {
  const [dataRekening, setDataRekening] = useState([
    {
      id: 1,
      name: "John Doe",
      norek: "09812938912",
      jenis: "BCA",
    },
    {
      id: 2,
      name: "Bob Johnson",
      norek: "3123212441244",
      jenis: "CIMB Niaga",
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
          "http://localhost:9090/v1/rekening/list?page=0&size=10",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        if (result.data && result.data.content) {
          const formattedData = result.data.content.map((item) => ({
            id: item.id,
            name: item.karyawan.nama,
            norek: item.karyawan.karyawanDetail.norek,
            jenis: item.training.norek,
          }));
          setDataRekening(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddData = async (newData) => {
    try {
      const payload = {
        id: editingData ? editingData.id : undefined,
        nama: newData.name,
        jenis: newData.jenis,
        norek: newData.norek,
        alamat: newData.alamat,
        karyawan: { id: Number(newData.karyawanId) },
      };

      const requestOptions = {
        method: editingData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      const url = editingData
        ? "{{host}}/v1/rekening/update"
        : "{{host}}/v1/rekening/save";

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        if (editingData) {
          setDataRekening(
            dataRekening.map((employee) =>
              employee.id === editingData.id
                ? { ...employee, ...newData }
                : employee
            )
          );
        } else {
          setDataRekening([
            ...dataRekening,
            { ...newData, id: dataRekening.length + 1 },
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

  const handleDetailClick = (data) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:9090/v1/rekening/${data.id}`, requestOptions)
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
        setDetailData(data);
        setIsDetailModalOpen(true);
      });
  };

  const handleDeleteClick = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${data.name}'s data. This action cannot be undone!`,
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
          `http://localhost:9090/v1/karyawan/delete/${data.id}`,
          requestOptions
        );

        if (response.ok) {
          // ✅ Jika API sukses, hapus dari state
          setDataRekening((prevData) =>
            prevData.filter((item) => item.id !== data.id)
          );
          Swal.fire(
            "Deleted!",
            `${data.name}'s data has been deleted.`,
            "success"
          );
        } else {
          throw new Error("Failed to delete from API");
        }
      } catch (error) {
        console.error("Error deleting data:", error);

        // ✅ Jika API gagal, hapus secara lokal
        setDataRekening((prevData) =>
          prevData.filter((item) => item.id !== data.id)
        );

        Swal.fire(
          "Warning!",
          "Could not delete from API, but removed locally.",
          "warning"
        );
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
                  Jenis
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Norek
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataRekening.map((employee, index) => (
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
                      {employee.jenis}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.norek}
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
        <RekeningModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingData(null);
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
