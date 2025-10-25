"use client"

import * as React from 'react'
import { SearchParamModal } from '@/components/ui'
import { useQuiz } from '../api/get-quiz'
import { notFound, useParams, useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui'
import QuizContent from './quiz-wrapper'

const TopicQuizModal = () =>
{
    const searchParams = useSearchParams();
    const quizId = searchParams.get('quizId');
    const params = useParams();
    const { data, isLoading } = useQuiz({
        params: {
            courseId: params.id as string,
            quizId: quizId!,
        },
        queryConfig: { enabled: !!quizId }
    })
    const quiz = data?.data;

    if (!quiz && !isLoading && !!quizId) return notFound();

    return (
        <SearchParamModal
            paramKey='quizId'
            title={quiz?.title || "Quiz"}
        >
            {isLoading && (
                <div className="w-full h-[70vh] max-h-full max-w-full">
                    <Skeleton />
                </div>
            )}
            {!isLoading && quiz && (
                <QuizContent quiz={quiz} />
            )}
        </SearchParamModal>
    )
}


export default TopicQuizModal
