import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import MotionNumber from "motion-number";

interface Durations {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes par défaut
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionType, setSessionType] = useState<string>("focus");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); // Référence pour stocker l'intervalle
  const audioRef = useRef<HTMLAudioElement | null>(null); // Définir audioRef

  const durations: Durations = useMemo(
    () => ({
      focus: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
    }),
    []
  );

  const totalTime = durations[sessionType as keyof Durations];

  // Réinitialiser le timer lorsque le type de session change
  useEffect(() => {
    setTimeLeft(totalTime);
    setIsPaused(false);
    setIsRunning(false);
    clearInterval(intervalRef.current as ReturnType<typeof setInterval>); // Nettoyer l'intervalle
  }, [sessionType, totalTime]);

  // Fonction pour démarrer le timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      setTimeLeft((prevTime) => prevTime - 1); // Décrémenter immédiatement le temps restant
  
      // Démarrer l'intervalle immédiatement
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current as ReturnType<typeof setInterval>); // Arrêter le timer si le temps est écoulé
            playAlarm(); // Jouer la sonnerie
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Mise à jour toutes les secondes
    }
  };

  // Fonction pour jouer la sonnerie
  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // Fonction pour mettre en pause le timer
  const pauseTimer = () => {
    setIsPaused(true);
    setIsRunning(false);
    clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
  };

  // Fonction pour reprendre le timer
  const resumeTimer = () => {
    setIsPaused(false);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>); // Arrêter le timer si le temps est écoulé
          playAlarm(); // Jouer la sonnerie
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Mise à jour toutes les secondes
  };

  // Fonction pour réinitialiser le timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    clearInterval(intervalRef.current as ReturnType<typeof setInterval>); // Stopper l'intervalle
    setTimeLeft(totalTime); // Réinitialiser le temps restant
  };

  const adjustTime = (amount: number) => {
    setTimeLeft((prev) => Math.max(0, prev + amount));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progressPercentage = Math.min(
    (timeLeft / totalTime) * 100,
    100
  );
  return (
    <motion.div className="mx-auto flex max-w-lg flex-col items-center justify-center rounded-[75px] bg-gray-900 p-9 text-white shadow-md">
      <audio ref={audioRef} src="/alarm/alarm.mp3" />
      <div className="mb-3 flex items-center space-x-4">
        <button
          className={`rounded-lg px-4 py-2 ${sessionType === "focus" ? "bg-gray-700" : "bg-gray-500"}`}
          onClick={() => {
            resetTimer();
            setSessionType("focus");
          }}
        >
          Focus
        </button>
        <button
          className={`rounded-lg px-4 py-2 ${sessionType === "shortBreak" ? "bg-gray-700" : "bg-gray-500"}`}
          onClick={() => {
            resetTimer();
            setSessionType("shortBreak");
          }}
        >
          Short Break
        </button>
        <button
          className={`rounded-lg px-4 py-2 ${sessionType === "longBreak" ? "bg-gray-700" : "bg-gray-500"}`}
          onClick={() => {
            resetTimer();
            setSessionType("longBreak");
          }}
        >
          Long Break
        </button>
      </div>

      {/* Timer affichage */}
      <motion.div className="font-ui my-6 text-6xl font-bold sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl">
        {timeLeft < 60 ? (
          <MotionNumber
            value={seconds}
            format={{
              minimumIntegerDigits: 2,
              useGrouping: false,
            }}
          />
        ) : (
          <>
            <MotionNumber
              value={minutes}
              format={{
                minimumIntegerDigits: 2,
                useGrouping: false,
              }}
            />
            <span>:</span>
            <MotionNumber
              value={seconds}
              format={{
                minimumIntegerDigits: 2,
                useGrouping: false,
              }}
            />
          </>
        )}
      </motion.div>


      {/* Progress Bar */}
      <div className="mb-6 h-1 w-full rounded-full bg-gray-300">
        <motion.div
          className="h-1 rounded-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        />
      </div>

      <div className="mb-8 flex space-x-4">
        <button
          onClick={() => adjustTime(25 * 60)}
          className="rounded-lg bg-transparent px-4 py-2 transition hover:bg-gray-800"
        >
          + 25 min
        </button>
        <button
          onClick={() => adjustTime(10 * 60)}
          className="rounded-lg bg-transparent px-4 py-2 transition hover:bg-gray-800"
        >
          + 10 min
        </button>
        <button
          onClick={() => adjustTime(5 * 60)}
          className="rounded-lg bg-transparent px-4 py-2 transition hover:bg-gray-800"
        >
          + 5 min
        </button>
        <button
          onClick={() => adjustTime(1 * 60)}
          className="rounded-lg bg-transparent px-4 py-2 transition hover:bg-gray-800"
        >
          + 1 min
        </button>
      </div>

      <div className="flex space-x-4">
        {!isRunning && !isPaused && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={startTimer}
            className="rounded-lg bg-blue-500 px-6 py-2 text-lg"
          >
            Start
          </motion.button>
        )}

        {isRunning && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={pauseTimer}
            className="rounded-lg bg-blue-500 px-6 py-2 text-lg"
          >
            Pause
          </motion.button>
        )}

        {!isRunning && isPaused && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={resumeTimer}
            className="rounded-lg bg-blue-500 px-6 py-2 text-lg"
          >
            Resume
          </motion.button>
        )}

        {(isRunning || isPaused) && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={resetTimer}
            className="rounded-lg bg-red-500 px-6 py-2 text-lg"
          >
            Reset
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
