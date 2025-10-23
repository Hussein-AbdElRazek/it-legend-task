"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressProps
{
    progress: number;
}

export default function Progress({ progress }: ProgressProps)
{
    const [isVisible, setIsVisible] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        const observer = new IntersectionObserver(
            (entries) =>
            {
                entries.forEach((entry) =>
                {
                    if (entry.isIntersecting && !isVisible)
                    {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (progressRef.current) observer.observe(progressRef.current);

        return () =>
        {
            if (progressRef.current) observer.unobserve(progressRef.current);
        };
    }, [isVisible]);

    return (
        <div ref={progressRef} className="relative w-full overflow-visible mb-15">
            {/* Label */}
            <div
                className={`absolute top-[-45px] transform -translate-x-1/2 flex flex-col items-center transition-all duration-[2000ms] ease-in-out`}
                style={{
                    left: isVisible ? `${progress}%` : "0%",
                    marginLeft:
                        progress < 10 ? "24px" : progress > 90 ? "-24px" : "0",
                }}
            >
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 bg-white text-[11px] text-[#485293] cursor-default font-medium">
                    You
                </div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300 mt-0.5 mb-2"></div>
            </div>

            {/* Progress Bar */}
            <div className="relative mt-15">
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-[#6abd8a] rounded-full transition-all duration-[2000ms] ease-in-out`}
                        style={{
                            width: isVisible ? `${progress}%` : "0%",
                        }}
                    />
                </div>
            </div>

            {/* Percentage */}
            <div
                className={`absolute top-full mt-1 transform -translate-x-1/2 transition-all duration-[2000ms] ease-in-out`}
                style={{
                    left: isVisible ? `${progress}%` : "0%",
                    marginLeft:
                        progress < 10 ? "24px" : progress > 90 ? "-24px" : "0",
                }}
            >
                <span className="text-xs text-[#485293] font-semibold whitespace-nowrap">
                    {progress}%
                </span>
            </div>
        </div>
    );
}
