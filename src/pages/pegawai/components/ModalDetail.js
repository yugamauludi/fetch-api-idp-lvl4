import { X } from 'lucide-react';

export default function DetailModal({ onClose, detailData }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4">Detail Employee Data</h2>
                {detailData && (
                    <div>
                        <p className="mb-2"><strong>Name:</strong> {detailData.name}</p>
                        <p className="mb-2"><strong>Alamat:</strong> {detailData?.address ?? detailData.alamat}</p>
                        <p className="mb-2"><strong>Tanggal Lahir:</strong> {detailData?.dob ?? detailData.tanggalLahir}</p>
                        <p className="mb-2"><strong>NIK:</strong> {detailData?.karyawanDetail?.nik ?? detailData.nik}</p>
                        <p className="mb-2"><strong>NPWP:</strong> {detailData?.karyawanDetail?.npwp ?? detailData.npwp}</p>
                        <p className="mb-2"><strong>Status:</strong> {detailData?.status ?? detailData.status}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
