
"use client"

import { SearchParamModal } from '@/components/ui'
import React from 'react'
import { useTopicFile } from '../api/get-topic-file'
import { notFound, useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui'
import { useParams } from 'next/navigation'

const TopicFileModal = () =>
{
    const searchParams = useSearchParams();
    const fileId = searchParams.get('fileId');
    const params = useParams();
    const { data, isLoading } = useTopicFile({
        params: {
            courseId: params.id as string,
            fileId: fileId!,
        },
        queryConfig: { enabled: !!fileId }
    })
    const topicFile = data?.data;
    if (!topicFile && !isLoading && fileId) return notFound();

    return (
        <SearchParamModal
            paramKey='fileId'
            title={topicFile?.title}
            contentClassName='items-start justify-start flex flex-col'
        >
            {isLoading && (
                <div className="w-full h-[70vh] max-h-full max-w-full">
                    <Skeleton />
                </div>
            )}
            {!isLoading && topicFile && (
                <iframe
                    src={topicFile.file}
                    className="w-full h-full rounded-lg"
                />
            )}
        </SearchParamModal>
    )
}

export default TopicFileModal