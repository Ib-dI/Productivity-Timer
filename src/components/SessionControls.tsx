interface SessionControlsProps {
  sessionType: string;
  setSessionType: (type: string) => void;
  resetTimer: () => void;
}

export default function SessionControls({
  sessionType,
  setSessionType,
  resetTimer
}: SessionControlsProps) {
  return (
    <div className="mb-3 flex items-center space-x-4">
      <button className={`rounded-lg px-4 py-2 ${
        sessionType === "focus" ? "bg-gray-700" : "bg-gray-500"
      }`}
      onClick={() => {
        resetTimer()
        setSessionType("focus")
      }}
      >
        Focus
      </button>
      <button className={`rounded-lg px-4 py-2 ${
        sessionType === "shortBreak" ? "bg-gray-700" : "bg-gray-500"
      }`}
      onClick={() => {
        resetTimer()
        setSessionType("shartBreak")
      }}
      >
        Short Break
      </button>
      <button className={`rounded-lg px-4 py-2 ${
        sessionType === "longBreak" ? "bg-gray-700" : "bg-gray-500"
      }`}
      onClick={() => {
        resetTimer()
        setSessionType("longBreak")
      }}
      >
        Long Break
      </button>
    </div>
  )
}