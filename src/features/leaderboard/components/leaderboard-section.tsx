"use client";

import { SearchParamModal, Skeleton } from '@/components/ui';
import LeaderboardCard from './leaderboard-card';
import { useLeaderboard } from '../api/get-leaderboard';
import { useParams, useSearchParams } from 'next/navigation';
import CourseTitle from '@/features/course/components/course-title';
import Image from 'next/image';
import biceps from '@/features/leaderboard/assets/biceps.svg';
const LeaderboardModal = () => {
    const courseId = useParams().id as string;
    const searchParams = useSearchParams();
    const leaderboardOpened = searchParams.get('leaderboardOpened');
    const { data, isLoading, error } = useLeaderboard({
        params: {
            courseId,
        },
        queryConfig: {
            enabled: !!courseId && !!leaderboardOpened,
        },
    });

    return (
        <SearchParamModal
            paramKey="leaderboardOpened"
            title='leaderboard'
            hideTitle={true}
        >
            <div className="max-w-[600px] mx-auto border border-gray-200 rounded-lg p-4"> 
            <div className="text-center mb-6 !text-[#374785]">
                <CourseTitle courseId={courseId} className="!text-xl !font-semibold mb-2" />
                <h2 className="text-lg font-bold mb-4">Leaderboard</h2>
            </div>
            {isLoading && (
                <div className="space-y-3 p-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-20 w-full rounded-lg">
                            <Skeleton />
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && (error || !data?.data) && (
                <div className="p-6 bg-gray-50 rounded-lg text-center">
                    <p className="text-gray-600">
                        Unable to load leaderboard data
                    </p>
                </div>
            )}

            {!isLoading && data?.data && (
                    <div className="space-y-4 p-4">
                    {data.data.message && (
                            <div className="flex items-center justify-center gap-2 bg-[#F7FBFD] rounded-lg p-5  mb-14">
                            <p className="text-sm text-gray-600 mb-2 font-medium">{data.data.message}</p>
                            <Image src={biceps} alt="Biceps" width={50} height={50} />
                        </div>
                    )}
                    {/* Current User Card (if not in top users) */}
                    {data.data.currentUser && !data.data.users.find(u => u.id === data.data.currentUser?.id) && (
                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-2 font-medium">Your Position</p>
                            <LeaderboardCard user={data.data.currentUser} isCurrentUser={true} />
                        </div>
                    )}

                    {/* Top Users List */}
                    <div className="space-y-3">
                        {data.data.users.map((user) => (
                            <LeaderboardCard
                                key={user.id}
                                user={user}
                                isCurrentUser={data.data.currentUser?.id === user.id}
                            />
                        ))}
                    </div>

                    {data.data.users.length === 0 && (
                        <div className="p-8 bg-gray-50 rounded-lg text-center">
                            <p className="text-gray-600">No leaderboard data available yet</p>
                        </div>
                    )}
                </div>
            )}
            </div>
        </SearchParamModal>
    );
};

export default LeaderboardModal;
