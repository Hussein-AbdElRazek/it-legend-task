'use client';

export const ErrorFallback = () =>
{
    return (
        <div
            className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
            <button
                className="mt-4 cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white"
                onClick={() => window.location.assign(window.location.origin)}
            >
                Refresh
            </button>
        </div>
    );
};
