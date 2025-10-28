import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Topic } from '@/types/api';

export const getTopic = async ({
    courseId,
    topicId,
}: {
    courseId: string;
    topicId: string;
}): Promise<{ data: Topic }> =>
{
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // in real api will be /topics/${courseId}/${topicIndex}
    // so now i use dummyjson.com 
    if (courseId && topicId)
    {
        if (topicId === '1')
        {
            return api.get(`c/5f12-1f87-4320-9185`);
        }
         else
        {
            return api.get(`c/63b8-6ffd-428c-bcf1`);
        }
    }
    throw new Error('Missing courseId or topicId');
};

export const getTopicQueryOptions = (courseId: string, topicId: string) =>
{
    return queryOptions({
        queryKey: ['topics', courseId, topicId],
        queryFn: () => getTopic({ courseId, topicId }),
    });
};

type UseTopicOptions = {
    params: {
        courseId: string;
        topicId: string;
    };
    queryConfig?: QueryConfig<{ data: Topic }>;
};

export const useTopic = ({
    params,
    queryConfig,
}: UseTopicOptions) =>
{
    return useQuery({
        ...getTopicQueryOptions(params.courseId, params.topicId),
        ...queryConfig,
    });
};