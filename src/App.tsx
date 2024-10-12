// import { useState } from "react";
// import Timer from "./components/Timer";
// import TimerForm from "./components/TimerForm";
import Pomodoro from "./components/Pomodoro";

export default function App() {
  // const [workDuration, setWorkDuration] = useState(25)
  // const [breakDuration, setBreakDuration] = useState(5)


  // const handleSetDurations = (newWorkDuration: number, newBreakDuration: number) => {
  //   setWorkDuration(newWorkDuration)
  //   setBreakDuration(newBreakDuration)
  // }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-100">
      {/* <Timer workDuration={workDuration} breakDuration={breakDuration} />
      <TimerForm onSetDurations={handleSetDurations}/> */}
    <Pomodoro />
    </div>
  )
}