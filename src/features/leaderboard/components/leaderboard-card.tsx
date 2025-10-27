"use client";

import { LeaderboardUser } from '@/types/api';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardCardProps {
    user: LeaderboardUser;
    isCurrentUser?: boolean;
}

const LeaderboardCard = ({ user, isCurrentUser }: LeaderboardCardProps) => {
    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
        if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
        return null;
    };

    const getRankBadgeColor = (rank: number) => {
        if (rank === 1) return 'bg-yellow-500 text-white';
        if (rank === 2) return 'bg-gray-400 text-white';
        if (rank === 3) return 'bg-amber-600 text-white';
        return 'bg-gray-200 text-gray-700';
    };

    return (
        <div
            className={`flex items-center gap-2 lg:gap-4 p-4 rounded-lg transition-all duration-300 ${
                isCurrentUser
                    ? 'bg-blue-50 border-2 border-blue-400 shadow-md'
                    : 'bg-white border border-gray-200 hover:shadow-md'
            }`}
        >
            {/* Rank Badge */}
            <div className="flex items-center justify-center min-w-[48px]">
                {user.rank <= 3 ? (
                    <div className="flex items-center justify-center">
                        {getRankIcon(user.rank)}
                    </div>
                ) : (
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${getRankBadgeColor(
                            user.rank
                        )}`}
                    >
                        {user.rank}
                    </div>
                )}
            </div>

            {/* User Avatar */}
            <div className="flex-shrink-0">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                        {user.name}
                    </h3>
                    {isCurrentUser && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full">
                            You
                        </span>
                    )}
                </div>
                <div className="mt-1 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                            style={{ width: `${user.progress}%` }}
                        />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 min-w-[45px] text-right">
                        {user.progress}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardCard;
