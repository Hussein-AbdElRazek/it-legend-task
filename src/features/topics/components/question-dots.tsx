import * as React from 'react';

type Props = {
  questions: { id: string }[];
  current: number;
  onJump: (index: number) => void;
  hasAnswer: (index: number) => boolean;
};

export const QuestionDots: React.FC<Props> = ({ questions, current, onJump, hasAnswer }) => {
  return (
    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-2 justify-center">
        {questions.map((q, index) => {
          const answered = hasAnswer(index);
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onJump(index)}
              className={`w-10 h-10 rounded-full font-medium transition-all ${
                current === index
                  ? 'bg-blue-600 text-white border-2 border-blue-600'
                  : answered
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
                    : 'bg-white text-gray-600 border-2 border-gray-300 hover:border-blue-300'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
