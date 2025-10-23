import { getCourse } from '@/features/course/api/get-course';
import TopicVideo from '@/features/topics/components/topic-video';
import TopicsSection from '@/features/topics/components/topics-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) =>
{
    const courseId = (await params).id;

    const course = await getCourse({ courseId });

    return {
        title: course.data?.title,
        description: course.data?.title,
    };
};

const CourseDetailsPage = async () =>
{
    return (
        <>
            <TopicVideo />

            <section className={`lg:col-start-2 lg:row-span-2`}>
                <Suspense fallback={<Skeleton />}>
                    <TopicsSection />
                </Suspense>
            </section>

            <section className={`bg-blue-300 p-4 lg:col-start-1 row-start-2`}>
                links
                <br />
                Course materials
            </section>
        </>
    );
}

export default CourseDetailsPage