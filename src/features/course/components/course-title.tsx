
'use client';

import { useCourse } from '@/features/course/api/get-course';
import React from 'react'
import { Course } from '@/types/api';
import { notFound } from 'next/navigation';

const CourseTitle = ({ courseId, className }: { courseId: string, className?: string }) =>
{
    const { data } = useCourse({
        courseId,
    })
    const course: Course | undefined = data?.data;
    
    if (!course) return notFound();

    return (
        <h1 className={`text-3xl font-bold lg:text-4xl ${className}`}>{course?.title}</h1>
    )
}

export default CourseTitle