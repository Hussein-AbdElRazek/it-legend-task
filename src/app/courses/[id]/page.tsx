import { getCourse } from '@/features/course/api/get-course';
import TopicVideo from '@/features/topics/components/topic-video';
import TopicsSection from '@/features/topics/components/topics-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui';
import CourseLinks from '@/features/course/components/course-links';
import CourseMaterials from '@/features/course/components/course-materials';

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
            <div className='grid gap gap-12 lg:gap-18'>
                <TopicVideo />
                <section className={`lg:col-start-1`}>
                    <CourseMaterials />
                </section>
                <section>
                    <h1>Comments</h1>
                </section>
            </div>

            <section className={`lg:col-start-2 lg:row-span-2`}>
                <Suspense fallback={<Skeleton />}>
                    <TopicsSection />
                </Suspense>
            </section>
        </>
    );
}

export default CourseDetailsPage