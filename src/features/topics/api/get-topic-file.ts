import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { TopicFile } from '@/types/api';

export const getTopicFile = async ({
    courseId,
    fileId,
}: {
    courseId: string;
    fileId: string;
}): Promise<{ data: TopicFile }> =>
{
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // in real api will be /topics/${courseId}/${topicIndex}
    // so now i use dummyjson.com 
    if (courseId && fileId)
    {
        if (fileId === '6')
        {
            return api.get(`c/f895-6410-4b83-8341`);
        }
         else
        {
            return api.get(`c/cc6d-0e1b-4c2b-aa12`);
        }
    }
    throw new Error('Missing courseId or fileId');
};

export const getTopicQueryOptions = (courseId: string, fileId: string) =>
{
    return queryOptions({
        queryKey: ['topics', courseId, fileId],
        queryFn: () => getTopicFile({ courseId, fileId }),
    });
};

type UseTopicFileOptions = {
    params: {
        courseId: string;
        fileId: string;
    };
    queryConfig?: QueryConfig<{ data: TopicFile }>;
};

export const useTopicFile = ({
    params,
    queryConfig,
}: UseTopicFileOptions) =>
{
    return useQuery({
        ...getTopicQueryOptions(params.courseId, params.fileId),
        ...queryConfig,
    });
};