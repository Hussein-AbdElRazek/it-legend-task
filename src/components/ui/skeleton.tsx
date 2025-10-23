export const Skeleton = () =>
{
    return (
        <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
        </div>
    )
}
