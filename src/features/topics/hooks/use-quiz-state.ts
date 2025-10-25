import { useQuizTimer } from '@/features/topics/hooks/use-quiz-timer';
import { formatTime } from '@/utils/format-time';
import * as React from 'react';

interface QuizProgress
{
    answers: Record<string, string[]>;
    currentQuestion: number;
    timeLeft: number;
    timestamp: number;
    quizId: string;
}

// storage utilities
const QuizStorage = {
    getKey: (quizId: string) => `quiz_progress_${quizId}`,

    load: (quizId: string): QuizProgress | null =>
    {
        if (typeof window === 'undefined') return null;

        try
        {
            const saved = localStorage.getItem(QuizStorage.getKey(quizId));
            if (!saved) return null;

            const parsed = JSON.parse(saved) as QuizProgress;
            return parsed.quizId === quizId ? parsed : null;
        } catch (error)
        {
            console.error('Failed to parse saved progress:', error);
            return null;
        }
    },

    save: (quizId: string, progress: QuizProgress) =>
    {
        if (typeof window === 'undefined') return;

        localStorage.setItem(
            QuizStorage.getKey(quizId),
            JSON.stringify({ ...progress, timestamp: Date.now() })
        );
    },

    clear: (quizId: string) =>
    {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(QuizStorage.getKey(quizId));
    }
};

// Create initial progress state
const createInitialProgress = (quizId: string, totalTime: number): QuizProgress => ({
    answers: {},
    currentQuestion: 0,
    timeLeft: totalTime,
    timestamp: Date.now(),
    quizId
});

export const useQuizState = (
    quizId: string,
    totalTime: number,
    onTimeEnd?: () => void
) =>
{
    // Initialize progress from storage or create new
    const [progress, setProgress] = React.useState<QuizProgress>(() =>
    {
        const saved = QuizStorage.load(quizId);
        return saved || createInitialProgress(quizId, totalTime);
    });

    // Timer management
    const timer = useQuizTimer(progress.timeLeft, onTimeEnd || (() => { }));

    // Sync timer with progress
    React.useEffect(() =>
    {
        timer.setTimeLeft(progress.timeLeft);
    }, [progress.timeLeft]);

    // Save progress to localStorage
    React.useEffect(() =>
    {
        QuizStorage.save(quizId, { ...progress, timeLeft: timer.timeLeft });
    }, [progress, timer.timeLeft, quizId]);

    // Answer management
    const updateAnswer = React.useCallback((questionId: string, optionIds: string[]) =>
    {
        setProgress(prev => ({
            ...prev,
            answers: {
                ...prev.answers,
                [questionId]: optionIds
            }
        }));
    }, []);

    // Navigation
    const setCurrentQuestion = React.useCallback((index: number, totalQuestions: number) =>
    {
        setProgress(prev => ({
            ...prev,
            currentQuestion: Math.max(0, Math.min(totalQuestions - 1, index))
        }));
    }, []);

    // Clear all progress and reset timer
    const clearProgress = React.useCallback(() =>
    {
        QuizStorage.clear(quizId);
        setProgress(createInitialProgress(quizId, totalTime));
        timer.reset(totalTime);
    }, [quizId, totalTime, timer]);

    return {
        // State
        answers: progress.answers,
        currentQuestion: progress.currentQuestion,
        timeLeft: timer.timeLeft,
        formattedTime: formatTime(timer.timeLeft),
        isTimerRunning: timer.isRunning,

        // Actions
        updateAnswer,
        setCurrentQuestion,
        pauseTimer: timer.pause,
        resumeTimer: timer.resume,
        clearProgress
    };
};