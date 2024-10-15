import { useEffect, useState } from "react";


interface TimerProps {
  workDuration: number;
  breakDuration: number;
}

export default function Timer({
  workDuration = 25,
  breakDuration = 5,
}: TimerProps) {
  const [isWorkSession, setIsWorkSession] = useState(true); //Si on est dans une session
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(0);

  const totalTime = isWorkSession ? workDuration * 60 : breakDuration * 60; // Durée totale de la session


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isWorkSession) {
        setIsWorkSession(false);
        setTimeLeft(breakDuration * 60); // Commencer la pause
      } else {
        setIsWorkSession(true);
        setTimeLeft(workDuration * 60); // Recommencer une session de travail
        setCycle(cycle + 1); // Incrementer le cycle
      }
    }

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, isWorkSession, workDuration, breakDuration, cycle]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setTimeLeft(workDuration * 60);
    setCycle(0);
  };

  // Formatage du temps en minutes:secondes
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  };

  // Calcul du pourcentage de progression
  const progressPercentage = (timeLeft / totalTime) * 100;

  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-9 text-center shadow-lg">
      <h1 className="mb-4 text-4xl font-bold">
        {isWorkSession ? "Travail" : "Pause"}
      </h1>
      <div className="my-8 gap-2 text-6xl font-bold font-ui sm:my-8 sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl">
        {formatTime(timeLeft)}
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-1 mb-6">
        <div
          className={`h-1 rounded-full ${isWorkSession ? "bg-blue-500" : "bg-green-500"}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          className="transitition rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={toggleTimer}
        >
          {isRunning ? "Pause" : "Démarrer"}
        </button>
        <button
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          onClick={resetTimer}
        >
          Réinitialiser
        </button>

        <div className="mt-4 text-gray-500">Cycles complétés : {cycle}</div>
      </div>
    </div>
  );
}
