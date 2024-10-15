
import Pomodoro from "./components/Pomodoro";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-100">
      {/* <Timer workDuration={workDuration} breakDuration={breakDuration} />
      <TimerForm onSetDurations={handleSetDurations}/> */}
    <Pomodoro />
    </div>
  )
}