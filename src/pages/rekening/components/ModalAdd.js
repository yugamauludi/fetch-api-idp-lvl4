import { useState, useEffect } from "react";
import { X } from "lucide-react";

const peopleData = [
  { id: 1, name: "John Doe", nik: "09812938912", alamat: "Jakarta Selatan" },
  { id: 2, name: "Jane Smith", nik: "121298487483", alamat: "Jakarta Barat" },
  { id: 3, name: "Bob Johnson", nik: "3123212441244", alamat: "Jakarta Timur" },
  { id: 4, name: "Yuga", nik: "8374893127839", alamat: "Jakarta Pusat" },
  { id: 5, name: "Ipul", nik: "2312432545687", alamat: "Tangerang Selatan" },
  { id: 6, name: "Rina", nik: "3454554772167", alamat: "Jakarta Selatan" },
  { id: 7, name: "Budi", nik: "4563557563278", alamat: "Jakarta Barat" },
  { id: 8, name: "Siti", nik: "5678554t34789", alamat: "Jakarta Timur" },
  { id: 9, name: "Joko", nik: "6794674537890", alamat: "Jakarta Selatan" },
  { id: 10, name: "Dewi", nik: "7898345658301", alamat: "Jakarta Timur" },
  { id: 11, name: "Rizky", nik: "890357785312", alamat: "Jakarta Utara" },
  { id: 12, name: "Tina", nik: "9012345674235", alamat: "Jakarta Barat" },
  { id: 13, name: "Sanjaya", nik: "010896334234", alamat: "Tangerang Selatan" },
];

export default function RekeningModal({ onClose, onAddData, existingData }) {
  const [selectedPerson, setSelectedPerson] = useState({ id: "", name: "", nik: "", alamat: "" });
  const [norek, setNorek] = useState("");
  const [jenis, setJenis] = useState("");

  useEffect(() => {
    if (existingData) {
      setSelectedPerson({ id: existingData.id || 1, name: existingData.name, nik: existingData.nik, alamat: existingData.alamat });
      setNorek(existingData.norek || "");
      setJenis(existingData.jenis || "");
    }
  }, [existingData]);

  const handleNameChange = (e) => {
    const selected = peopleData.find((person) => person.name === e.target.value);
    setSelectedPerson(selected || { name: "", nik: "", alamat: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPerson.name && norek && jenis) {
      onAddData({
        karyawanId: selectedPerson.id,
        name: selectedPerson.name,
        alamat: selectedPerson.alamat,
        norek: norek,
        jenis: jenis
      });
      onClose();
    } else {
      alert("Semua field harus diisi!");
    }
  };

  const inputClasses =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {existingData ? "Edit Class" : "Add New Class"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <select
              id="name"
              value={selectedPerson.name}
              onChange={handleNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a name</option>
              {peopleData.map((person) => (
                <option key={person.id} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>

          {/* Alamat */}
          <div className="mb-4">
            <label htmlFor="alamat" className="block text-gray-700 text-sm font-bold mb-2">
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              value={selectedPerson.alamat}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
              readOnly
            />
          </div>

          {/* Jenis Pelatihan */}
          <div className="mb-4">
            <label htmlFor="jenis" className="block text-gray-700 text-sm font-bold mb-2">
              Jenis
            </label>
            <input
              type="text"
              id="jenis"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          {/* No Rekening */}
          <div className="mb-4">
            <label htmlFor="norek" className="block text-gray-700 text-sm font-bold mb-2">
              No Rekening
            </label>
            <input
              type="text"
              id="norek"
              value={norek}
              onChange={(e) => setNorek(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          {/* Tombol Submit */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}