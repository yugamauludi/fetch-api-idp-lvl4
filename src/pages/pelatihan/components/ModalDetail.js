import { X } from 'lucide-react';

export default function DetailModal({ onClose, detailData }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4">Detail Class Data</h2>
                {detailData && (
                    <div>
                        <p className="mb-2"><strong>Pelatihan :</strong> {detailData.tema}</p>
                        <p className="mb-2"><strong>Nama Pengajar:</strong> {detailData.pengajar}</p>
                    </div>
                )}
            </div>
        </div>
    );
}