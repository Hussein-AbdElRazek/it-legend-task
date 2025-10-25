import { useMutation } from '@tanstack/react-query';
import { useNotifications } from '@/components/ui/notifications';
import type { QuizResultItem, SubmitQuizInput, SubmitQuizResponse } from '@/types/api';

export const submitQuiz = async ({
    courseId,
    quizId,
    answers,
}: SubmitQuizInput): Promise<SubmitQuizResponse> =>
{
    // Mock delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In real implementation, this would be:
    // return api.post(`quizzes/${courseId}/${quizId}/submit`, { answers });
    
    // Mock server-side answer key (not exposed via get-quiz)
    const correctOptionsByQuestion: Record<string, string> = {
        '1': 'New Delhi',
        '2': 'Ganges',
        '3': 'Jawaharlal Nehru',
        '4': 'Shimla',
        '5': 'Gujarat',
        '6': 'Jaipur',
        '7': 'Bengal Tiger',
        '8': 'Kerala',
        '9': '4',
        '10': 'Taj Mahal'
    };

    let score = 0;
    const results: QuizResultItem[] = answers.map((a) => {
        const userOption = a.option_ids?.[0];
        const correctOption = correctOptionsByQuestion[a.question_id];
        const isCorrect = !!userOption && userOption === correctOption;
        if (isCorrect) score += 1;
        return {
            questionId: a.question_id,
            correctOption,
            userOption,
            isCorrect,
        };
    });

    const totalQuestions = Object.keys(correctOptionsByQuestion).length;
    const percentage = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;

    // Mock response
    return {
        data: {
            score,
            totalQuestions,
            percentage,
            results,
        }
    };
};

type UseSubmitQuizOptions = {
    onSuccess?: (data: SubmitQuizResponse) => void;
};

export const useSubmitQuiz = ({ onSuccess }: UseSubmitQuizOptions = {}) =>
{
    const { addNotification } = useNotifications();
    
    return useMutation({
        mutationFn: submitQuiz,
        onSuccess: (data) => {
            addNotification({
                type: 'success',
                title: 'Quiz Submitted',
                message: `You scored ${data.data.score}/${data.data.totalQuestions} (${data.data.percentage}%)`,
            });
            onSuccess?.(data);
        },
        onError: (error: Error) => {
            addNotification({
                type: 'error',
                title: 'Submission Failed',
                message: error.message || 'Failed to submit quiz',
            });
        },
    });
};

