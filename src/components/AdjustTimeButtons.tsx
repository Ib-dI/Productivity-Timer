interface AdjustTimeButtonsProps {
  adjustTime: (amount: number) => void;
}

export default function AdjustTimeButtons({
  adjustTime,
}: AdjustTimeButtonsProps) {
  return (
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
  );
}
