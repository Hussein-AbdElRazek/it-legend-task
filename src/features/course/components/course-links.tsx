"use client"

import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { BookOpen, MessageSquare, HelpCircle, Trophy } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'

const CourseLinks = () =>
{
    const searchParams = useSearchParams();

    const getHref = (type: string) =>
    {
        const newSearchParams = new URLSearchParams(searchParams);

        if (type === 'question')
        {
            newSearchParams.set('questionOpened', 'true');
            return `?${newSearchParams.toString()}`;
        }
        else if (type === 'leaderboard')
        {
            newSearchParams.set('leaderboardOpened', 'true');
            return `?${newSearchParams.toString()}`;
        } else
        {
            return '';
        }
    }

    const navItems = [
        {
            label: 'Curriculum',
            href: '#curriculum',
            icon: <BookOpen />
        },
        {
            label: 'Discussions',
            href: '#comments',
            icon: <MessageSquare />
        },
        {
            label: 'Q&A',
            href: getHref('question'),
            icon: <HelpCircle />
        },
        {
            label: 'Leaderboard',
            href: getHref('leaderboard'),
            icon: <Trophy />
        },
    ];

    return (
        <TooltipProvider>
            <nav className="bg-white border-b border-gray-200">
                <ul className="flex flex-wrap items-center gap-4">
                    {navItems.map((item) =>
                    {
                        return (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className={`
                                        flex flex-col items-center py-3 w-full
                                        transition-colors duration-200
                                        hover:text-blue-600
                                         text-gray-600
                                         group
                                    `}
                                >
                                    <span className={`
                                        flex items-center justify-center 
                                        w-10 h-10 rounded-full mb-1
                                         group-hover:border-2 group-hover:border-blue-600
                                        border border-gray-300
                                        transition-colors duration-200
                                    `}>
                                        {React.cloneElement(item.icon, {
                                            className: `w-5 h-5 group-hover:text-blue-600 text-gray-600 transition-colors duration-200`
                                        })}
                                    </span>
                                    <span className="text-xs font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </TooltipProvider>
    )
}

export default CourseLinks