import * as React from 'react';

type Props = {
  questionText: string;
  options: string[];
  isSelected: (opt: string) => boolean;
  onToggle: (opt: string) => void;
};

export const QuestionContent: React.FC<Props> = ({ questionText, options, isSelected, onToggle }) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="text-blue-600 font-bold text-lg mb-6">Question</div>
      <div className="flex flex-col space-y-3">
        <div className="mb-3">
          <p className="text-gray-900 text-lg leading-relaxed font-medium">{questionText}</p>
        </div>

        <div className="space-y-3">
          {options.map((option, idx) => {
            const selected = isSelected(option);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onToggle(option)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-colors flex items-center gap-3 ${
                  selected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selected ? 'bg-white border-white' : 'bg-white border-gray-300'
                  }`}
                >
                  {selected && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
