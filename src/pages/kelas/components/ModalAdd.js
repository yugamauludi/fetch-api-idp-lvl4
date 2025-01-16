
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const peopleData = [
  {name: "John Doe", nik: "09812938912"},
  {name: "Jane Smith", nik: "121298487483"},
  {name: "Bob Johnson", nik: "3123212441244"},
  { name: "Yuga", nik: "8374893127839" },
  { name: "Ipul", nik: "2312432545687" },
  { name: "Rina", nik: "3454554772167" },
  { name: "Budi", nik: "4563557563278" },
  { name: "Siti", nik: "5678554t34789" },
  { name: "Joko", nik: "6794674537890" },
  { name: "Dewi", nik: "7898345658301" },
  { name: "Rizky", nik: "890357785312" },
  { name: "Tina", nik: "9012345674235" },
  { name: "Sanjaya", nik: "010896334234" }
];  

const exercises = ['Fullstack Javascript', 'Springboot', 'Backend (Java)', 'English Course', 'Leadership']

export default function ExerciseModal({ onClose, onAddData, existingData }) {
    const [selectedPerson, setSelectedPerson] = useState({ name: '', nik: '' });
    const [exercise, setExercise] = useState('');

    useEffect(() => {
        if (existingData) {
          setSelectedPerson({ name: existingData.name, nik: existingData.NIK });
          setExercise(existingData.pelatihan);
        }
    }, [existingData]);    
  
    const handleNameChange = (e) => {
        const selected = peopleData.find(person => person.name === e.target.value);
        setSelectedPerson(selected || { name: '', nik: '' });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedPerson.name && exercise) {
            onAddData({ name: selectedPerson.name, NIK: selectedPerson.nik, pelatihan: exercise });
            onClose();
        }
    };
    
  
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">{existingData ? 'Edit Class' : 'Add New Class'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <select
                    id="name"
                    value={selectedPerson.name}
                    onChange={handleNameChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    >
                    <option value="">Select a name</option>
                    {peopleData.map((person) => (
                        <option key={person.name} value={person.name}>
                        {person.name}
                        </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="nik" className="block text-gray-700 text-sm font-bold mb-2">NIK</label>
                <input
                  type="text"
                  id="nik"
                  value={selectedPerson.nik}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <label htmlFor="exercise" className="block text-gray-700 text-sm font-bold mb-2">Choose Exercise</label>
                <select
                  id="exercise"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select an exercise</option>
                  {exercises.map((ex) => (
                    <option key={ex} value={ex}>
                      {ex}
                    </option>
                  ))}
                </select>
              </div>
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
    