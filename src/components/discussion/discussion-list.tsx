import { Comment } from '@/types/api';
import {DiscussionItem} from './discussion-item';

type DiscussionListProps = {
    items: Comment[];
    emptyMessage?: string;
};

export const DiscussionList = ({ items, emptyMessage = "No items yet. Be the first to contribute!" }: DiscussionListProps) => {
    if (items.length === 0) {
        return (
            <div className="py-8 text-center text-gray-500">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-200">
            {/* map items with index bcs items id is not unique it's dummy data */}
            {items.map((item,index) => (
                <DiscussionItem key={index} comment={item} />
            ))}
        </div>
    );
};