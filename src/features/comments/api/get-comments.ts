import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { CommentsResponse } from '@/types/api';

const COMMENTS_PER_PAGE = 10;

export const getComments = async ({
    skip = 0,
    limit = COMMENTS_PER_PAGE,
}: {
    skip?: number;
    limit?: number;
}): Promise<CommentsResponse> => {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    // Using DummyJSON comments API with pagination
    return api.get(`comments`, {
        params: {
            limit,
            skip,
        },
    });
};

type UseCommentsOptions = {
    courseId: string;
    enabled?: boolean;
};

export const useComments = ({ courseId: _courseId, enabled = true }: UseCommentsOptions) => {
    return useInfiniteQuery({
        queryKey: ['comments'] as const,
        queryFn: ({ pageParam }) =>
            getComments({
                skip: pageParam as number,
                limit: COMMENTS_PER_PAGE,
            }),
        getNextPageParam: (lastPage): number | undefined => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? nextSkip : undefined;
        },
        initialPageParam: 0,
        enabled,
    });
};
