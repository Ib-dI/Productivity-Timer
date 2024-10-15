import { motion } from "framer-motion";
import MotionNumber from "motion-number";

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

export default function TimerDisplay({ minutes, seconds }: TimerDisplayProps) {
  return (
    <motion.div className="font-ui my-6 text-6xl font-bold sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl">
      {minutes < 60 ? (
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
  );
}
