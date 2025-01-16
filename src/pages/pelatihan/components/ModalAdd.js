import { useState, useEffect } from 'react'

export default function EmployeeModal({ onClose, onAddData, existingData }) {
  const [formData, setFormData] = useState({
    pelatihan: '',
    pengajar: '',
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
                <label htmlFor="pelatihan" className="block text-sm font-medium text-gray-700">Pelatihan</label>
                <input
                  type="text"
                  id="pelatihan"
                  name="pelatihan"
                  value={formData.pelatihan}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
            </div>
            <div>
                <label htmlFor="pengajar" className="block text-sm font-medium text-gray-700">Pengajar</label>
                <input
                  type="text"
                  id="pengajar"
                  name="pengajar"
                  value={formData.pengajar}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
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