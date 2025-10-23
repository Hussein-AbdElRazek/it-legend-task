"use client"

import { VideoPlayer } from '@/components/ui'
import { useTopic } from '@/features/topics/api/get-topic';
import { CourseTopics, Topic } from '@/types/api';
import { notFound, useParams } from 'next/navigation';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTopicsQuery } from '@/features/topics/api/get-topics';
import { useEffect, useState } from 'react';
import { VideoPlayerSkeleton } from '@/components/ui';
import usePlayerSize from '@/features/topics/hooks/use-player-size';

const TopicVideo = () =>
{
    const courseId = useParams().id as string;

    if (!courseId) return notFound();

    const searchParams = useSearchParams();
    const router = useRouter();
    const searchParamsTopicId = searchParams.get('topicId') as string || "";
    const [topicId, setTopicId] = useState<string>(searchParamsTopicId);

    // get topics to extract first topic id if searchParamsTopicId is not provided
    const { refetch } = useTopicsQuery({
        params: {
            courseId,
        },
        queryConfig: { enabled: false }
    })

    useEffect(() =>
    {
        if (!searchParamsTopicId)
        {
            refetch().then((res) =>
            {
                if (!res.data?.data?.topics[0]?.chapterTopics?.length) return notFound();
                // assume first topic is intro video
                if (res.data?.data?.topics[0]?.chapterTopics[0]?.type !== 'video') return notFound();
                const firstTopicId = res.data?.data?.topics[0]?.chapterTopics[0]?.id;
                setTopicId(firstTopicId);
                router.push(`?topicId=${firstTopicId}`);
            })
        }
    }, [searchParamsTopicId])

    const { data, isPending, isFetching } = useTopic({
        params: {
            courseId: courseId,
            topicId: topicId,
        },
        queryConfig: {
            enabled: Boolean(!!courseId && !!topicId),

        }
    })

    // handle topicId change refetch topic
    useEffect(() =>
    {
        if (searchParamsTopicId && searchParamsTopicId !== topicId)
        {
            setTopicId(searchParamsTopicId);
        }
    }, [searchParamsTopicId, topicId])

    const topic: Topic | undefined = data?.data;
    const isWide = usePlayerSize();

    if (!topic && !isPending && !isFetching) return notFound();
    if (isPending || isFetching)
    {
        return (
            <section className={`sticky top-0 z-20 lg:row-start-1 lg:static ${isWide ? 'lg:col-span-2' : 'lg:col-start-1'}`}>
                <VideoPlayerSkeleton />
            </section>
        )
    }
    return (
        <section className={`sticky top-0 z-20 lg:row-start-1 lg:static ${isWide ? 'lg:col-span-2' : 'lg:col-start-1'}`}>
            <VideoPlayer
                src={topic?.video || ""}
                title={topic?.title}
                poster={topic?.poster || ""} />
        </section>
    )
}

export default TopicVideo