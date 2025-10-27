"use client"

import { useParams } from 'next/navigation';
import { useComments as useGetQuestions } from '../../comments/api/get-comments';
import { useCreateComment as useCreateQuestion } from '../../comments/api/create-comment';
import { SearchParamModal } from '@/components/ui';
import { DiscussionList, DiscussionForm, DiscussionSkeleton } from '@/components/discussion';
import { useState } from 'react';
import { Comment as Question } from '@/types/api';

const INITIAL_DISPLAY_COUNT = 3;

const QuestionsModal = () =>
{
    const params = useParams();
    const courseId = params.id as string;
    const [newQuestions, setNewQuestions] = useState<Question[]>([]);
    const [showAll, setShowAll] = useState(false);

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetQuestions({
        courseId,
    });

    const { mutate: createQuestion, isPending: isSubmitting } = useCreateQuestion({
        onSuccess: (newQuestion: Question) =>
        {
            // Add new comment to local state (optimistic update)
            setNewQuestions((prev) => [newQuestion, ...prev]);
            setNewQuestion('');
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('newQuestion', '');
            }
        },
    });

    // Flatten all comments from all pages and combine with new comments
    const fetchedComments = data?.pages.flatMap((page) => page.comments) || [];
    const allComments = [...newQuestions, ...fetchedComments];
    const totalComments = (data?.pages[0]?.total || 0) + newQuestions.length;

    // Show only first 3 comments initially
    const displayedComments = showAll ? allComments : allComments.slice(0, INITIAL_DISPLAY_COUNT);
    const hasMoreToShow = allComments.length > INITIAL_DISPLAY_COUNT && !showAll;

    const handleSubmit = (content: string) =>
    {
        createQuestion({
            courseId,
            userName: 'Student Name Goes Here',
            content,
        });
    };
    const getInitialQuestion = () =>
    {
        if (typeof window === 'undefined') return '';
        return sessionStorage.getItem('newQuestion') || ''
    };
    const [newQuestion, setNewQuestion] = useState(getInitialQuestion());
    const onChangeQuestion = (content: string) =>
    {
        if (typeof window === 'undefined') return;
        sessionStorage.setItem('newQuestion', content);
    };
    
    return (
        <SearchParamModal
            title="Questions"
            paramKey='questionOpened'
        >
            <>
                {isLoading ? (
                    <div>
                        <DiscussionSkeleton />
                        <DiscussionSkeleton />
                        <DiscussionSkeleton />
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {displayedComments.length} of {totalComments} comments
                        </div>
                        <DiscussionList
                            items={displayedComments}
                            emptyMessage="No comments yet. Be the first to comment!"
                        />

                        {/* Load More button after initial 3 comments */}
                        {hasMoreToShow && (
                            <div className="py-8 text-center">
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="px-6 py-3 bg-white border-2 border-teal-500 text-teal-500 font-medium rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                    Load More Questions
                                </button>
                            </div>
                        )}

                        {/* Manual load more button (only when showing all) */}
                        {showAll && hasNextPage && (
                            <div className="py-8 text-center">
                                {isFetchingNextPage ? (
                                    <div>
                                        <DiscussionSkeleton />
                                        <DiscussionSkeleton />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => fetchNextPage()}
                                        className="px-6 py-3 bg-white border-2 border-teal-500 text-teal-500 font-medium rounded-lg hover:bg-teal-50 transition-colors"
                                    >
                                        Load More Questions
                                    </button>
                                )}
                            </div>
                        )}

                        <DiscussionForm
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            placeholder="Write a question"
                            submitButtonText="Submit Question"
                            content={newQuestion}
                            setContent={setNewQuestion}
                            onChange={onChangeQuestion}
                        />
                    </>
                )}
            </>
        </SearchParamModal>
    );
};

export default QuestionsModal;
