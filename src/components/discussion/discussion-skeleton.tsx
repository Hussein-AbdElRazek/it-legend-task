export const DiscussionSkeleton = () => {
    return (
        <div className="flex gap-4 py-6 border-b border-gray-200 last:border-b-0 animate-pulse">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
            </div>
            <div className="flex-1 min-w-0 space-y-3">
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-3 bg-gray-200 rounded w-4/6" />
                </div>
            </div>
        </div>
    );
};