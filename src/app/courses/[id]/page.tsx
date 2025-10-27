import { getCourse } from '@/features/course/api/get-course';
import TopicVideo from '@/features/topics/components/topic-video';
import QuestionsModal from '@/features/questions/components/questions-modal';
import LeaderboardModal from '@/features/leaderboard/components/leaderboard-section';
import TopicsSection from '@/features/topics/components/topics-section';
import Comments from '@/features/comments/components/comments';
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

const CourseDetailsPage =  () =>
{
    return (
        <>
            <TopicVideo />
            <TopicsSection />
            <CourseMaterials />
            <Comments />
            <QuestionsModal />
            <LeaderboardModal />
        </>
    );
}

export default CourseDetailsPage