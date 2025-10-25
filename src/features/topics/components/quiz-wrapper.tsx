"use client"

import * as React from 'react';
import { useParams } from 'next/navigation';
import { z } from 'zod';
import { useQuiz } from '../api/get-quiz';
import { useSubmitQuiz } from '../api/submit-quiz';
import { FormikContainer } from '@/components/inputs';
import { useQuizState } from '../hooks/use-quiz-state';
import { useQuizSubmission } from '../hooks/use-quiz-sumbition';
import { useQuizNavigation } from '../hooks/use-quiz-navigation';
import QuizView from '@/features/topics/components/quiz-view';
import { QuizResults } from '@/features/topics/components/quiz-results';

// Validation schema
const quizValidationSchema = z.object({
    answers: z.array(z.object({
        question_id: z.string().optional(),
        option_ids: z.array(z.string()).optional(),
    }))
});

type QuizWrapperProps = {
    quiz: NonNullable<ReturnType<typeof useQuiz>['data']>['data'];
};

const QuizWrapper: React.FC<QuizWrapperProps> = ({ quiz }) =>
{
    const params = useParams();
    const formikRef = React.useRef<any>(null);

    // Track submission state for time end handler
    const isSubmittedRef = React.useRef(false);

    // Flag to trigger submission outside of render
    const [shouldAutoSubmit, setShouldAutoSubmit] = React.useState(false);

    // Auto-submit when time ends (sets flag instead of calling submitForm directly)
    const handleTimeEnd = React.useCallback(() =>
    {
        if (!isSubmittedRef.current)
        {
            setShouldAutoSubmit(true);
        }
    }, []);

    // Quiz state management
    const {
        answers: savedAnswers,
        currentQuestion,
        formattedTime,
        updateAnswer,
        setCurrentQuestion,
        clearProgress
    } = useQuizState(quiz.id, quiz.totalTimeSeconds, handleTimeEnd);

    // Submission handling
    const {
        isSubmitted,
        score,
        results,
        userAnswers,
        handleSubmit,
        resetQuiz: resetSubmission
    } = useQuizSubmission({
        quiz,
        clearProgress,
        submitQuiz: useSubmitQuiz({
            onSuccess: (data) =>
            {
                handleSubmit(data.data);
            }
        }).mutate
    });

    // Keep ref in sync with state
    React.useEffect(() =>
    {
        isSubmittedRef.current = isSubmitted;
    }, [isSubmitted]);

    // Handle auto-submit after render
    React.useEffect(() =>
    {
        if (shouldAutoSubmit && formikRef.current && !isSubmittedRef.current)
        {
            // Use setTimeout to ensure this happens after current render cycle
            const timer = setTimeout(() =>
            {
                formikRef.current?.submitForm();
            }, 0);

            setShouldAutoSubmit(false);

            return () => clearTimeout(timer);
        }
    }, [shouldAutoSubmit]);

    // Navigation
    const { goToQuestion } = useQuizNavigation(setCurrentQuestion, quiz.questions.length);

    // Form submission
    const onFormSubmit = React.useCallback((values: z.infer<typeof quizValidationSchema>) =>
    {
        if (isSubmitted) return;

        const validAnswers = (values.answers || []).filter(
            (answer): answer is { question_id: string; option_ids: string[] } =>
                !!answer.question_id && !!answer.option_ids?.length
        );

        handleSubmit(undefined, {
            courseId: params.id as string,
            quizId: quiz.id,
            answers: validAnswers
        });
    }, [isSubmitted, handleSubmit, params.id, quiz.id]);

    // Reset handler
    const handleReset = React.useCallback(() =>
    {
        resetSubmission();
        goToQuestion(0);
    }, [resetSubmission, goToQuestion]);

    // Initial form values
    const initialValues = React.useMemo(() => ({
        answers: quiz.questions.map(q => ({
            question_id: q.id,
            option_ids: savedAnswers[q.id] || [],
        }))
    }), [quiz.questions, savedAnswers]);

    if (isSubmitted)
    {
        return (
            <QuizResults
                title={quiz.title}
                totalQuestions={quiz.questions.length}
                score={score}
                questions={quiz.questions}
                results={results}
                userAnswers={userAnswers}
                onRetry={handleReset}
            />
        );
    }

    return (
        <FormikContainer
            formikRef={formikRef}
            initialValues={initialValues}
            validationSchema={quizValidationSchema as any}
            onSubmit={onFormSubmit}
            enableReinitialize
        >
            {(formik) => (
                <QuizView
                    quiz={quiz}
                    currentQuestion={currentQuestion}
                    formattedTime={formattedTime}
                    isSubmitted={isSubmitted}
                    formik={formik}
                    goToQuestion={goToQuestion}
                    updateAnswer={updateAnswer}
                />
            )}
        </FormikContainer>
    );
};

export default QuizWrapper;