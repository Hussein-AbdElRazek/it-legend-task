import { Comment } from '@/types/api';

type DiscussionItemProps = {
    comment: Comment;
};

export const DiscussionItem = ({ comment }: DiscussionItemProps) => {
    const dummyDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return (
        <div className="flex gap-4 py-6 border-b border-gray-200 last:border-b-0">
            <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-500 bg-gradient-to-br from-teal-400 to-blue-500 overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center text-white font-semibold text-lg">
                        {comment.user.fullName.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="mb-4">
                    <h3 className="mb-2 font-semibold text-gray-900">{comment.user.fullName}</h3>
                    <p className="text-sm text-gray-600">{dummyDate}</p>
                </div>
                <p className="text-gray-600 leading-relaxed">{comment.body}</p>
            </div>
        </div>
    );
};
