"use client"

import { Course } from '@/types/api'
import { Clock, FileText, Users, Globe } from 'lucide-react'
import { useCourse } from '@/features/course/api/get-course';
import { useParams } from 'next/navigation';
import { SectionTitle } from '@/components/ui';

const CourseMaterials = () =>
{
    const params = useParams();
    const courseId = params.id as string;

    const { data } = useCourse({
        courseId,
    })
    const course: Course | undefined = data?.data;

    if (!course) return null;

    const courseMaterials = [
        {
            title: 'Duration',
            value: course.duration,
            icon: Clock,
        },
        {
            title: 'Lessons',
            value: course.lessons,
            icon: FileText,
        },
        {
            title: 'Enrolled',
            value: course.enrolled,
            icon: Users,
        },
        {
            title: 'Language',
            value: course.language,
            icon: Globe,
        },
    ]

    return (
        <>
            <SectionTitle title="Course Materials" />

            <div className="bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-36 gap-y-6">
                    <div className="space-y-4">
                        {courseMaterials.map((material) => (
                            <div key={material.title} className="flex items-center justify-between gap-3 border-b border-gray-200 last:border-b-0 pb-4">
                                <div className="flex items-center gap-2">
                                    <material.icon className="w-5 h-5 text-gray-500 " />

                                    <span className="text-gray-600">{material.title}:</span>
                                </div>
                                <span className="font-medium text-gray-900">{material.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {courseMaterials.map((material) => (
                            <div key={material.title} className="flex items-center justify-between gap-3 border-b border-gray-200 last:border-b-0 pb-4">
                                <div className="flex items-center gap-2">
                                    <material.icon className="w-5 h-5 text-gray-500 " />

                                    <span className="text-gray-600">{material.title}:</span>
                                </div>
                                <span className="font-medium text-gray-900">{material.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseMaterials