
import { Breadcrumbs } from '@/components/ui'
import CourseTitle from './course-title';
import { QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { getCourseQueryOptions } from '@/features/course/api/get-course';
import { HydrationBoundary } from '@tanstack/react-query';

const CourseHeader = async ({ courseId }: { courseId: string }) =>
{

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        getCourseQueryOptions(courseId),
    );

    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydratedState}>
            <header className="px-4 py-4 bg-[#f5f9fa] lg:px-8">
                <Breadcrumbs
                    items={[
                        { label: 'Courses', href: '/courses' },
                        { label: 'Course Details' }
                    ]}
                />
                <CourseTitle courseId={courseId} />
            </header>
        </HydrationBoundary>
    )
}

export default CourseHeader