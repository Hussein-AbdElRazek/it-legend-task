"use client"

import { useParams } from 'next/navigation';
import { useComments } from '../api/get-comments';
import { useCreateComment } from '../api/create-comment';
import { SectionTitle } from '@/components/ui';
import { DiscussionList, DiscussionForm, DiscussionSkeleton } from '@/components/discussion';
import { useState } from 'react';
import { Comment } from '@/types/api';

const INITIAL_DISPLAY_COUNT = 3;

const Comments = () =>
{
    const params = useParams();
    const courseId = params.id as string;
    const [newComments, setNewComments] = useState<Comment[]>([]);
    const [showAll, setShowAll] = useState(false);

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useComments({
        courseId,
    });

    const { mutate: createComment, isPending: isSubmitting } = useCreateComment({
        onSuccess: (newComment) =>
        {
            // Add new comment to local state (optimistic update)
            setNewComments((prev) => [newComment, ...prev]);
            setNewComment('');
        },
    });

    // Flatten all comments from all pages and combine with new comments
    const fetchedComments = data?.pages.flatMap((page) => page.comments) || [];
    const allComments = [...newComments, ...fetchedComments];
    const totalComments = (data?.pages[0]?.total || 0) + newComments.length;

    // Show only first 3 comments initially
    const displayedComments = showAll ? allComments : allComments.slice(0, INITIAL_DISPLAY_COUNT);
    const hasMoreToShow = allComments.length > INITIAL_DISPLAY_COUNT && !showAll;

    const handleSubmit = (content: string) =>
    {
        createComment({
            courseId,
            userName: 'Student Name Goes Here',
            content,
        });
    };
    const [newComment, setNewComment] = useState('');
    return (
        <section
            id="comments"
            className={`scroll-mt-[80vw] sm:scroll-mt-0 lg:col-start-1 lg:row-start-3`}
        >
            <SectionTitle title="Comments" />
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
                                    Load More Comments
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
                                        Load More Comments
                                    </button>
                                )}
                            </div>
                        )}

                        <DiscussionForm
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            placeholder="Write a comment"
                            submitButtonText="Submit Review"
                            content={newComment}
                            setContent={setNewComment}
                        />
                    </>
                )}
            </>
        </section>
    );
};

export default Comments;
