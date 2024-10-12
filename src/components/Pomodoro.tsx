import { useState, useEffect, useMemo } from "react";
interface Durations {
  focus: number;
  shortBreak: number;
  longBreak: number
}

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes par défaut
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // État pour savoir si le timer est en pause
  const [sessionType, setSessionType] = useState<string>("focus"); // "focus", "shortBreak", "longBreak"

  // Les durées en secondes pour chaque type de session
  const durations: Durations = useMemo(() => ({
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  }), []);

  // Calcul du temps total pour la session en cours
  const totalTime = durations[sessionType as keyof Durations];

  useEffect(() => {
    setTimeLeft(durations[sessionType as keyof Durations]);
    setIsPaused(false); // Réinitialiser l'état de pause lors du changement de session
    setIsRunning(false); // Arrêter le timer lors du changement de session
  }, [sessionType, durations]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isRunning && !isPaused && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [isRunning, isPaused, timeLeft]);

  // Démarrer ou reprendre le timer
  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false); // Assurer que le timer n'est plus en pause
  };

  // Mettre le timer en pause
  const pauseTimer = () => setIsPaused(true);
  // Reprendre le timer après une pause
  const resumeTimer = () => setIsPaused(false);

  // Réinitialiser le timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false); // Remet le timer à l'état non-pausé
    setTimeLeft(durations[sessionType as keyof Durations]); // Remet le timer à la durée initiale de la session active
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  };

  const adjustTime = (amount: number) => setTimeLeft((prev) => Math.max(0, prev + amount));
  
  // Calcul du pourcentage de progression
  const progressPercentage = (timeLeft / totalTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-lg rounded-3xl p-9 bg-gray-900 shadow-md text-white">
      {/* Boutons de session */}
      <div className="flex items-center space-x-4 mb-3">
        <button
          className={`py-2 px-4 rounded-lg ${sessionType === "focus" ? "bg-gray-700" : "bg-gray-500"}`}
          onClick={() => {
            resetTimer(); // Remet le timer à la valeur initiale lors du changement de session
            setSessionType("focus");
          }}
        >
          Focus
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${sessionType === "shortBreak" ? "bg-gray-700" : "bg-gray-500"}`}
          onClick={() => {
            resetTimer();
            setSessionType("shortBreak");
          }}
        >
          Short Break
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${sessionType === "longBreak" ? "bg-gray-700" : "bg-gray-500"}`}
          onClick={() => {
            resetTimer();
            setSessionType("longBreak");
          }}
        >
          Long Break
        </button>
      </div>

      {/* Timer affichage */}
      <div className="my-6 text-6xl font-bold font-ui  sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl">{formatTime(timeLeft)}</div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-1 mb-6">
        <div
          className="h-1 rounded-full bg-blue-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Boutons d'ajustement */}
      <div className="flex space-x-4 mb-8">
        <button onClick={() => adjustTime(25 * 60)} className="bg-gray-700 py-2 px-4 rounded-lg">
          + 25 min
        </button>
        <button onClick={() => adjustTime(10 * 60)} className="bg-gray-700 py-2 px-4 rounded-lg">
          + 10 min
        </button>
        <button onClick={() => adjustTime(5 * 60)} className="bg-gray-700 py-2 px-4 rounded-lg">
          + 5 min
        </button>
        <button onClick={() => adjustTime(1 * 60)} className="bg-gray-700 py-2 px-4 rounded-lg">
          + 1 min
        </button>
      </div>

      {/* Boutons Start/Pause/Reset */}
      <div className="flex space-x-4">
        {/* Bouton Start */}
        {!isRunning && !isPaused && (
          <button
            onClick={startTimer}
            className="bg-blue-500 py-2 px-6 rounded-lg text-lg"
          >
            Start
          </button>
        )}

        {/* Bouton Pause/Resume */}
        {isRunning && (
          <button
            onClick={isPaused ? resumeTimer : pauseTimer}
            className="bg-blue-500 py-2 px-6 rounded-lg text-lg"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}

        {/* Bouton Reset, visible dès que le timer a démarré */}
        {(isRunning || isPaused) && (
          <button
            onClick={resetTimer}
            className="bg-red-500 py-2 px-6 rounded-lg text-lg"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
