"use client"

import * as React from 'react';
import { QuizHeader } from './quiz-header';
import { QuestionDots } from './question-dots';
import { QuestionContent } from './question-content';
import { QuizFooter } from './quiz-footer';

const QuizView: React.FC<{
    quiz: any;
    currentQuestion: number;
    formattedTime: string;
    isSubmitted: boolean;
    formik: any;
    goToQuestion: (index: number) => void;
    updateAnswer: (questionId: string, optionIds: string[]) => void;
}> = ({ quiz, currentQuestion, formattedTime, isSubmitted, formik, goToQuestion, updateAnswer }) =>
    {
        const currentQuestionData = quiz.questions[currentQuestion];

        const handleOptionToggle = React.useCallback((opt: string) =>
        {
            const currentAnswer = formik.values.answers[currentQuestion];
            const newOptionIds = currentAnswer?.option_ids?.[0] === opt ? [] : [opt];

            updateAnswer(currentQuestionData.id, newOptionIds);
            formik.setFieldValue(`answers.${currentQuestion}`, {
                question_id: currentQuestionData.id,
                option_ids: newOptionIds,
            });
        }, [formik, currentQuestion, currentQuestionData.id, updateAnswer]);

        const hasAnswer = React.useCallback((i: number) =>
        {
            const a = formik.values.answers[i];
            return !!a?.option_ids && a.option_ids.length > 0;
        }, [formik.values.answers]);

        return (
            <div className="flex flex-col h-full max-w-[600px] m-auto">
                <QuizHeader
                    current={currentQuestion}
                    max={quiz.questions.length - 1}
                    onPrev={() => goToQuestion(currentQuestion - 1)}
                    onNext={() => goToQuestion(currentQuestion + 1)}
                    formattedTime={formattedTime}
                    isSubmitted={isSubmitted}
                />

                <QuestionDots
                    questions={quiz.questions}
                    current={currentQuestion}
                    onJump={goToQuestion}
                    hasAnswer={hasAnswer}
                />

                <QuestionContent
                    questionText={currentQuestionData.question}
                    options={currentQuestionData.options}
                    isSelected={(opt) => formik.values.answers[currentQuestion]?.option_ids?.[0] === opt}
                    onToggle={handleOptionToggle}
                />

                <QuizFooter
                    current={currentQuestion}
                    total={quiz.questions.length}
                    onPrev={() => goToQuestion(currentQuestion - 1)}
                    onNext={() => goToQuestion(currentQuestion + 1)}
                    onSubmit={() => formik.submitForm()}
                    isSubmitting={formik.isSubmitting}
                />
            </div>
        );
    };

export default QuizView;