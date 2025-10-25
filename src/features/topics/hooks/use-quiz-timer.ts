


// hooks/use-quiz-timer.ts
import * as React from 'react';

export const useQuizTimer = (initialTime: number, onTimeEnd: () => void) =>
{
    const [timeLeft, setTimeLeft] = React.useState(initialTime);
    const [isRunning, setIsRunning] = React.useState(true);
    const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    React.useEffect(() =>
    {
        if (!isRunning) return;

        timerRef.current = setInterval(() =>
        {
            setTimeLeft(prev =>
            {
                if (prev <= 1)
                {
                    clearInterval(timerRef.current!);
                    onTimeEnd();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () =>
        {
            if (timerRef.current)
            {
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning, onTimeEnd]);

    const pause = React.useCallback(() => setIsRunning(false), []);
    const resume = React.useCallback(() => setIsRunning(true), []);
    const reset = React.useCallback((newTime: number) =>
    {
        setTimeLeft(newTime);
        setIsRunning(false);
    }, []);

    return { timeLeft, setTimeLeft, isRunning, pause, resume, reset };
};
