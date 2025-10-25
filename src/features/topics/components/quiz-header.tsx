import * as React from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

type QuizHeaderProps = {
  current: number;
  max: number;
  onPrev: () => void;
  onNext: () => void;
  isSubmitted: boolean;
  formattedTime: string;
};

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  current,
  max,
  onPrev,
  onNext,
  isSubmitted,
  formattedTime
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="p-2 rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous question"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
        {!isSubmitted && (
          <div className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            { formattedTime}
          </div>
        )}
        <button
          onClick={onNext}
          disabled={current === max}
          className="p-2 rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next question"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
    </div>
  );
};
