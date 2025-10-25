"use client"

import * as React from 'react';
import { useFormikContext } from 'formik';
import { formatTime } from '@/utils/format-time';
import { Clock } from 'lucide-react';

interface QuizTimerProps
{
    totalTime: number;
    onTimeEnd: () => void;
    isSubmitted: boolean;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({
    totalTime,
    onTimeEnd,
    isSubmitted,
}) =>
{
    const [timeLeft, setTimeLeft] = React.useState<number>(totalTime);
    const [shouldSubmit, setShouldSubmit] = React.useState(false);
    const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
    const formik = useFormikContext();

    // Handle form submission when time runs out
    React.useEffect(() =>
    {
        if (shouldSubmit && !isSubmitted)
        {
            const submitForm = async () =>
            {
                await formik.submitForm();
                onTimeEnd?.();
            };
            submitForm();
            setShouldSubmit(false);
        }
    }, [shouldSubmit, formik, onTimeEnd, isSubmitted]);

    // Timer effect
    React.useEffect(() =>
    {
        if (isSubmitted) return;

        timerRef.current = setInterval(() =>
        {
            setTimeLeft((prev) =>
            {
                const newTime = prev - 1;
                if (newTime <= 0)
                {
                    setShouldSubmit(true);
                    return 0;
                }
                return newTime;
            });
        }, 1000);

        return () =>
        {
            if (timerRef.current)
            {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isSubmitted]);

    // Reset timer when totalTime changes
    React.useEffect(() =>
    {
        setTimeLeft(totalTime);
        return () =>
        {
            if (timerRef.current)
            {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [totalTime]);

    return (
        <div className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
        </div>
    );
};
