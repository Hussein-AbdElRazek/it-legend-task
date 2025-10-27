import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { LeaderboardResponse } from '@/types/api';

export const getLeaderboard = async ({
    courseId,
}: {
    courseId: string;
}): Promise<LeaderboardResponse> => {
    // In real API will be /leaderboard/${courseId}
    // Using dummyjson.com for now
    if (courseId) {
        return api.get(`c/4c36-508b-4bc0-8bb3`);
    }
    throw new Error('Missing courseId');
};

export const getLeaderboardQueryOptions = (courseId: string) => {
    return queryOptions({
        queryKey: ['leaderboard', courseId],
        queryFn: () => getLeaderboard({ courseId }),
    });
};

type UseLeaderboardOptions = {
    params: {
        courseId: string;
    };
    queryConfig?: QueryConfig<LeaderboardResponse>;
};

export const useLeaderboard = ({
    params,
    queryConfig,
}: UseLeaderboardOptions) => {
    return useQuery({
        ...getLeaderboardQueryOptions(params.courseId),
        ...queryConfig,
    });
};
