"use client";

import { SectionTitle, Skeleton } from '@/components/ui'
import Progress from '@/features/topics/components/progress'
import ChapterTopic from './chapter-topic'
import { Chapter, CourseTopics } from '@/types/api'
import { useTopics } from '../api/get-topics';
import { useParams } from 'next/navigation';
import TopicFileModal from './topic-file';
import TopicQuizModal from './topic-quiz';
import { usePlayerSize } from '@/contexts/player-size-context';

const TopicsSection = () =>
{
    const courseId = useParams().id as string;
    const { data, isLoading } = useTopics({
        params: {
            courseId,
        },
    })
    const topics: CourseTopics | undefined = data?.data;
    const { isWide } = usePlayerSize();

    return (
        <section
            id="curriculum"
            className={`w-full h-full scroll-mt-[80vw] sm:scroll-mt-0 ${isWide
                ? 'lg:col-start-2 lg:row-start-2 lg:row-span-2'
                : 'lg:col-start-2 lg:row-start-1 lg:row-span-3'
                }`}
        >
            {(isLoading && !topics) && <Skeleton />}
            {(!isLoading && topics) && (
                <>
                    <SectionTitle title="Topics For This Course" />
                    <Progress progress={topics.progress} />
                    <div className="flex flex-col gap-8">
                        {topics.topics.map((chapter: Chapter) => (
                            <ChapterTopic key={chapter.id} chapter={chapter} />
                        ))}
                    </div>
                    <TopicFileModal />
                    <TopicQuizModal />
                </>
            )}
        </section>
    )
}

export default TopicsSection
