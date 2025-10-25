// hooks/use-quiz-submission.ts
import * as React from 'react';
import type { QuizResultItem, SubmitQuizInput } from '@/types/api';

interface UseQuizSubmissionProps
{
    quiz: any;
    clearProgress: () => void;
    submitQuiz: (payload: SubmitQuizInput) => void;
}

export const useQuizSubmission = ({ quiz, clearProgress, submitQuiz }: UseQuizSubmissionProps) =>
{
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [results, setResults] = React.useState<QuizResultItem[]>([]);
    const [userAnswers, setUserAnswers] = React.useState<Record<string, number>>({});

    const handleSubmit = React.useCallback((responseData?: any, payload?: SubmitQuizInput) =>
    {
        // If we have response data (from API), process it
        if (responseData)
        {
            setScore(responseData.score);
            setResults(responseData.results);

            // Map user answers to option indices
            const ua: Record<string, number> = {};
            responseData.results.forEach((r: QuizResultItem) =>
            {
                const q = quiz.questions.find((question: any) => question.id === r.questionId);
                if (!q) return;

                const idx = r.userOption
                    ? q.options.findIndex((o: string) => o === r.userOption)
                    : -1;

                if (idx >= 0) ua[r.questionId] = idx;
            });

            setUserAnswers(ua);
            setIsSubmitted(true);
            clearProgress();
        }
        // If we have payload, submit to API
        else if (payload)
        {
            submitQuiz(payload);
        }
    }, [quiz.questions, clearProgress, submitQuiz]);

    const resetQuiz = React.useCallback(() =>
    {
        setIsSubmitted(false);
        setUserAnswers({});
        setResults([]);
        setScore(0);
        clearProgress();
    }, [clearProgress]);

    return {
        isSubmitted,
        score,
        results,
        userAnswers,
        handleSubmit,
        resetQuiz
    };
};