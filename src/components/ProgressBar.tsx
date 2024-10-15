import { motion } from "framer-motion"


interface ProgressBarProps {
  progressPercentage: number;
}

export default function ProgressBar({ progressPercentage }: ProgressBarProps) {
  return (
    <div className="mb-6 h-1 w-full rounded-full bg-gray-300">
      <motion.div
      className="h-1 rounded-full bg-ambar-500"
      initial={{ width:0 }}
      animate={{ width: `${progressPercentage}%`}}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      />
    </div>
  )
}