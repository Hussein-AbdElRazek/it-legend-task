import * as React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { QuizResultItem } from '@/types/api';

type Props = {
  title: string;
  totalQuestions: number;
  score: number;
  questions: { id: string; question: string; options: string[] }[];
  results: QuizResultItem[];
  userAnswers: Record<string, number>;
  onRetry: () => void;
};

export const QuizResults: React.FC<Props> = ({ title, totalQuestions, score, questions, results, userAnswers, onRetry }) => {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-[600px] m-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Quiz Complete!</h2>
        <p className="text-gray-600">Here are your results</p>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 text-center shadow-lg">
        <p className="text-lg mb-2 opacity-90">Your Score</p>
        <p className="text-5xl font-bold mb-2">{score}/{totalQuestions}</p>
        <p className="text-lg opacity-90">{Math.round((score / totalQuestions) * 100)}%</p>
      </div>

      <div className="space-y-4 max-h-[40vh] overflow-y-auto">
        {questions.map((question, index) => {
          const res = results.find(r => r.questionId === question.id);
          const userAnswer = userAnswers[question.id];
          const isCorrect = !!res?.isCorrect;

          return (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">{index + 1}. {question.question}</p>
                  {userAnswer !== undefined && (
                    <p className="text-sm text-gray-600">
                      Your answer: <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {question.options[userAnswer]}
                      </span>
                    </p>
                  )}
                  {!isCorrect && res && (
                    <p className="text-sm text-gray-600">
                      Correct answer: <span className="text-green-600 font-medium">{res.correctOption}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={onRetry} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
        Retry Quiz
      </button>
    </div>
  );
};
