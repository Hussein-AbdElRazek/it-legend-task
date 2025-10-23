"use client"

import { useState } from 'react'
import { ChapterTopic as ChapterTopicType, Chapter } from '@/types/api'
import { FileText, Lock, PlusIcon, MinusIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const TopicItem = ({ topic }: { topic: ChapterTopicType }) =>
{
    return (
        <>
            <div className="flex items-center gap-2 flex-1">
                <FileText className="w-4 h-4 shrink-0 text-gray-700" />
                <span className="text-md font-light text-gray-700">
                    {topic.title}
                </span>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-1.5 w-fit">
                {topic.type === 'quiz' && topic.questionsCount && (
                    <span className="p-1 text-sm text-[#1ab69d] bg-[#1ab69d12] font-medium">{topic.questionsCount} QUESTION</span>
                )}
                {topic.type === 'quiz' && topic.totalTimeString && (
                    <span className="p-1 text-sm text-[#ee4a62] bg-[#ee4a6312] font-medium">{topic.totalTimeString}</span>
                )}
                {topic.locked && (
                    <Lock className="w-4 h-4 text-gray-700" />
                )}
            </div>
        </>
    )
}

const ChapterTopic = ({ chapter }: { chapter: Chapter }) =>
{
    const searchParams = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleChapterTopic = () =>
    {
        setIsExpanded(prev => !prev);
    };

    const getHref = (topic: ChapterTopicType) =>
    {
        const newSearchParams = new URLSearchParams(searchParams);

        if (topic.type === 'video') return `?topicId=${topic.id}`;
        if (topic.type === 'quiz')
        {
            newSearchParams.set('quizId', topic.id);
            return `?${newSearchParams.toString()}`;
        }
        if (topic.type === 'file')
        {
            newSearchParams.set('fileId', topic.id);
            return `?${newSearchParams.toString()}`;
        }
        return '';
    }

    return (
        <div className="bg-white border border-gray-200 overflow-hidden">
            <button
                onClick={() => toggleChapterTopic()}
                className="cursor-pointer w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors lg:px-4"
            >
                <div className="text-left">
                    <h3 className="font-medium text-gray-900 text-xl">{chapter.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{chapter.description}</p>
                </div>
                {isExpanded ? (
                    <MinusIcon className="w-5 h-5 text-gray-900" />
                ) : (
                    <PlusIcon className="w-5 h-5 text-gray-900" />
                )}
            </button>

            {isExpanded && (
                <div className="border-t border-gray-200">
                    {chapter.chapterTopics.map((topic: ChapterTopicType) =>
                    (
                        topic.locked ? (
                            <div
                                key={topic.id}
                                className={`cursor-not-allowed opacity-50 px-8 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 last:border-b-0 lg:px-4`}
                            >
                                <TopicItem topic={topic} />
                            </div>
                        ) : (
                            <Link
                                href={getHref(topic)}
                                key={topic.id}
                                className={`cursor-pointer px-8 py-4 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 lg:px-4`}
                            >
                                <TopicItem topic={topic} />
                            </Link>
                        )
                    ))}
                </div>
            )}
        </div>
    )
}

export default ChapterTopic