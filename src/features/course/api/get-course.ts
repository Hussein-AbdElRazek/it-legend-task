import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Course } from '@/types/api';

export const getCourse =  ({
    courseId: _courseId,
}: {
    courseId: string;
}): Promise<{ data: Course }> =>
{
    // in real api will be /courses/${courseId}
    // so now i use dummyjson.com 
    return api.get(`c/c6c0-6593-4da0-b1df`);
};

export const getCourseQueryOptions = (courseId: string) =>
{
    return queryOptions({
        queryKey: ['courses', courseId],
        queryFn: () => getCourse({ courseId }),
    });
};

type UseCourseOptions = {
    courseId: string;
    queryConfig?: QueryConfig<{ data: Course }>;
};

export const useCourse = ({
    courseId,
    queryConfig,
}: UseCourseOptions) =>
{
    return useQuery({
        ...getCourseQueryOptions(courseId),
        ...queryConfig,
    });
};