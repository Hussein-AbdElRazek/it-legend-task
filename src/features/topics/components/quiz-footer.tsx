import * as React from 'react';

type Props = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export const QuizFooter: React.FC<Props> = ({ current, total, onPrev, onNext, onSubmit, isSubmitting }) => {
  return (
    <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
      {current > 0 && (
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 text-blue-600 border-2 border-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
        >
          Previous
        </button>
      )}
      {current < total - 1 ? (
        <button
          type="button"
          onClick={onNext}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      )}
    </div>
  );
};
