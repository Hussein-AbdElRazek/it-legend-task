import { getCourse } from '@/features/course/api/get-course';
import TopicVideo from '@/features/topics/components/topic-video';
import TopicsSection from '@/features/topics/components/topics-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui';
import CourseMaterials from '@/features/course/components/course-materials';
import Comments from '@/features/comments/components/comments';

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
                <section id="comments" className='scroll-mt-[70vw] lg:scroll-mt-0'>
                    <Comments />
                </section>
            </div>
            <section id="curriculum" className={`w-full h-full scroll-mt-[70vw] lg:col-start-2 lg:row-span-2  lg:scroll-mt-0`}>
                <Suspense fallback={<Skeleton />}>
                    <TopicsSection />
                </Suspense>
            </section>
        </>
    );
}

export default CourseDetailsPage