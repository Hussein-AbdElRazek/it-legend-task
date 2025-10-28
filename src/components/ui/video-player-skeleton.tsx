export const VideoPlayerSkeleton = () =>
{
    return (
        <div
            className={`relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden`}
        >
            {/* Background shimmer effect */}
            <div className="absolute inset-0 bg-gray-200 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />

            {/* Center play button skeleton */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 md:w-24 h-16 md:h-24 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
                    <div className="md:w-8 w-6 md:h-8 h-6 bg-gray-300 rounded-sm" />
                </div>
            </div>

            {/* Bottom controls bar skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/50 bg-gradient-to-t from-white/70 to-transparent">
                {/* Progress bar */}
                <div className="mb-3">
                    <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-gray-400 rounded-full" />
                    </div>
                </div>

                {/* Control buttons */}
                <div className="hidden md:flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Play/Pause button */}
                        <div className="md:w-8 w-6 md:h-8 h-6 bg-gray-300 rounded animate-pulse" />

                        {/* Backward 10s button */}
                        <div className="md:w-8 w-6 md:h-8 h-6 bg-gray-300 rounded animate-pulse" />

                        {/* Forward 10s button */}
                        <div className="md:w-8 w-6 md:h-8 h-6 bg-gray-300 rounded animate-pulse" />

                        {/* Volume button */}
                        <div className="md:w-8 w-6 md:h-8 h-6 bg-gray-300 rounded animate-pulse" />

                        {/* Time display */}
                        <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
                    </div>

                    <div className="items-center gap-3 hidden md:flex">
                        {/* Settings button */}
                        <div className="md:w-8 w-6 md:h-8 h-6 bg-gray-300 rounded animate-pulse" />

                        {/* PIP button */}
                        <div className="md:w-8 w-6 md:h-8 h-6 bg-gray-300 rounded animate-pulse" />

                        {/* Fullscreen button */}
                        <div className="md:w-8 w-6 md:h-8 h-6 bg-gray-300 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};
