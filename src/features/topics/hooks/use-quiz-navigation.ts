
// hooks/use-quiz-navigation.ts
import * as React from 'react';

export const useQuizNavigation = (
    setCurrentQuestion: (index: number, total: number) => void,
    totalQuestions: number
) =>
{
    const goToQuestion = React.useCallback((index: number) =>
    {
        setCurrentQuestion(index, totalQuestions);
    }, [setCurrentQuestion, totalQuestions]);

    return { goToQuestion };
};