import {  queryOptions, useSuspenseQuery, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { CourseTopics } from '@/types/api';

export const getTopics = async ({
    courseId,
}: {
    courseId: string;
    }): Promise<{ data: CourseTopics }> =>
{
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    // in real api will be /topics/${courseId}
    // so now i use dummyjson.com 
    if (courseId)
    {
        return api.get(`c/b2e7-8eb9-45b1-877f`);
    }
    throw new Error('Missing courseId');
};

export const getTopicQueryOptions = (courseId: string) =>
{
    return queryOptions({
        queryKey: ['topics', courseId],
        queryFn: () => getTopics({ courseId }),
    });
};

type UseTopicOptions = {
    params: {
        courseId: string;
    };
    queryConfig?: QueryConfig<{ data: CourseTopics }>;
};

export const useTopics = ({
    params,
    queryConfig,
}: UseTopicOptions) =>
{
    return useQuery({
        ...getTopicQueryOptions(params.courseId),
        ...queryConfig,
    });
};