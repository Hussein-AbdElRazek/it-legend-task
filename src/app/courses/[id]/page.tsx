
import { getCourse } from '@/features/course/api/get-course';

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

const CourseDetailsPage = () =>
{

    return (
        <>
            <div className="bg-red-300 p-4 lg:col-start-1 lg:row-start-1">1</div>

            <div className="bg-green-300 p-4 lg:col-start-2 lg:row-span-2">2</div>

            <div className="bg-blue-300 p-4 lg:col-start-1 lg:row-start-2">3</div>
        </>
    )
}

export default CourseDetailsPage