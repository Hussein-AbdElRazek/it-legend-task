import { useInfiniteQuery } from '@tanstack/react-query';
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
};

export const useComments = ({ courseId: _courseId }: UseCommentsOptions) => {
    return useInfiniteQuery({
        queryKey: ['comments'],
        queryFn: ({ pageParam = 0 }) =>
            getComments({
                skip: pageParam,
                limit: COMMENTS_PER_PAGE,
            }),
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? nextSkip : undefined;
        },
        initialPageParam: 0,
    });
};
