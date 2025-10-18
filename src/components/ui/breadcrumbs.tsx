import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem
{
    label: string;
    href?: string;
}

interface BreadcrumbsProps
{
    items: BreadcrumbItem[];
    showHome?: boolean;
}

export const Breadcrumbs = ({ items, showHome = true }: BreadcrumbsProps) =>
{
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 mb-2 lg:mb-8">
                {showHome && (
                    <li className="flex items-center gap-2">
                        <Link
                            href="/"
                            className="font-light border-b border-transparent hover:border-current"
                        >
                            Home
                        </Link>
                        {items.length > 0 && (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </li>
                )}

                {items.map((item, index) =>
                {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-2">
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="font-light border-b border-transparent hover:border-current"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={isLast ? "font-medium" : "font-light"}>
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}