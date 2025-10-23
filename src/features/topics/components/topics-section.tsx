"use client";

import { SectionTitle } from '@/components/ui'
import Progress from '@/features/topics/components/progress'
import ChapterTopic from './chapter-topic'
import { Chapter, CourseTopics } from '@/types/api'
import { notFound } from 'next/navigation';
import { useTopics } from '../api/get-topics';
import { useParams } from 'next/navigation';


const TopicsSection = () =>
{
    const courseId = useParams().id as string;
    const { data } = useTopics({
        params: {
            courseId,
        },
    })
    const topics: CourseTopics | undefined = data?.data;

    if (!topics) return notFound();

    return (
        <>
            <SectionTitle title="Topics For This Course" />
            <Progress progress={topics.progress} />
            <div className="flex flex-col gap-8">
                {topics.topics.map((chapter: Chapter) => (
                    <ChapterTopic key={chapter.id} chapter={chapter} />
                ))}
            </div>
        </>
    )
}

export default TopicsSection
