import { useState, useEffect } from "react";
import { X } from "lucide-react";

const peopleData = [
  { id: 1, name: "John Doe", nik: "09812938912" },
  { id: 2, name: "Jane Smith", nik: "121298487483" },
  { id: 3, name: "Bob Johnson", nik: "3123212441244" },
  { id: 4, name: "Yuga", nik: "8374893127839" },
  { id: 5, name: "Ipul", nik: "2312432545687" },
];

const exercises = [
  { id: 1, name: "Fullstack Javascript" },
  { id: 2, name: "Springboot" },
  { id: 3, name: "Backend (Java)" },
];

export default function ExerciseModal({ onClose, onAddData, existingData }) {
  const [selectedPerson, setSelectedPerson] = useState({ id: "", name: "", nik: "" });
  const [selectedExercise, setSelectedExercise] = useState({ id: "", name: "" });

  useEffect(() => {
    if (existingData) {
      const person = peopleData.find((p) => p.name === existingData.name) || { id: "", name: "", nik: "" };
      const exercise = exercises.find((ex) => ex.name === existingData.pelatihan) || { id: "", name: "" };

      setSelectedPerson(person);
      setSelectedExercise(exercise);
    }
  }, [existingData]);

  const handleNameChange = (e) => {
    const selected = peopleData.find((person) => person.id === parseInt(e.target.value));
    setSelectedPerson(selected || { id: "", name: "", nik: "" });
  };

  const handleExerciseChange = (e) => {
    const selected = exercises.find((ex) => ex.id === parseInt(e.target.value));
    setSelectedExercise(selected || { id: "", name: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPerson.id && selectedExercise.id) {
      onAddData({
        name: selectedPerson.name,
        NIK: selectedPerson.nik,
        pelatihan: selectedExercise.name,
        karyawanId: selectedPerson.id,
        trainingId: selectedExercise.id,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">{existingData ? "Edit Class" : "Add New Class"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <select
              id="name"
              value={selectedPerson.id}
              onChange={handleNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a name</option>
              {peopleData.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="nik" className="block text-gray-700 text-sm font-bold mb-2">
              NIK
            </label>
            <input
              type="text"
              id="nik"
              value={selectedPerson.nik}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
              readOnly
            />
          </div>
          <div className="mb-6">
            <label htmlFor="exercise" className="block text-gray-700 text-sm font-bold mb-2">
              Choose Exercise
            </label>
            <select
              id="exercise"
              value={selectedExercise.id}
              onChange={handleExerciseChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select an exercise</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
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
