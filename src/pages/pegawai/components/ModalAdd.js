import { useState, useEffect } from 'react'

export default function EmployeeModal({ onClose, onAddData, existingData }) {
  const [formData, setFormData] = useState({
    name: '',
    alamat: '',
    tanggalLahir: '',
    nik: '',
    npwp: '',
    status: ''
  })

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddData(formData);
    onClose();
  };

  const inputClasses = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-10">
        <h2 className="text-2xl font-bold mb-4">Tambah Data Pegawai</h2>
        <form onSubmit={handleSubmit}>
        <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                <input
                  type="date"
                  id="tanggalLahir"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
                <input
                  type="text"
                  id="nik"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="npwp" className="block text-sm font-medium text-gray-700">NPWP</label>
                <input
                  type="text"
                  id="npwp"
                  name="npwp"
                  value={formData.npwp}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select status</option>
                  <option value="aktif">Aktif</option>
                  <option value="nonAktif">Non Aktif</option>
                </select>
              </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}