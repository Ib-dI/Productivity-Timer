import { motion } from "framer-motion";

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
}

export default function TimerControls({
  isRunning,
  isPaused,
  startTimer,
  pauseTimer,
  resumeTimer,
  resetTimer,
}: TimerControlsProps) {
  return (
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
  );
}
