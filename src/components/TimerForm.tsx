import { FormEvent, useState } from "react";

interface TimerFormProps {
  onSetDurations: (workDuration: number, breakDuration: number) => void;
}

export default function TimerForm({ onSetDurations }: TimerFormProps) {
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSetDurations(workDuration, breakDuration)
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Durée de travail (minutes)</label>
        <input
        type="number"
        className="w-full p-2 border rounded-lg"
        value={workDuration}
        onChange={(e) => setWorkDuration(Number(e.target.value))}
        min={1}
        required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Durée de pause (minutes)</label>
        <input
        type="number"
        className="w-full p-2 border rounded-lg"
        value={breakDuration}
        onChange={(e) => setBreakDuration(Number(e.target.value))}
        min={1}
        required
        />
      </div>
      <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Mettre à jour les durées
      </button>
    </form>
  )
}