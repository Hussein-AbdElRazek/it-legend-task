import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Comment, CreateCommentInput } from '@/types/api';
import { useNotifications } from '@/components/ui/notifications';

export const createComment = async (
    data: CreateCommentInput,
): Promise<Comment> => {
    // DummyJSON format: POST /comments/add
    // Note: DummyJSON doesn't actually save the comment, just returns it in response
    const response = await api.post<Comment>(`comments/add`, {
        body: data.content,
        postId: 1, // Mock postId
        userId: 5, // Mock userId
    });
    
    return response;
};

type UseCreateCommentOptions = {
    onSuccess?: (newComment: Comment) => void;
};

export const useCreateComment = ({ onSuccess }: UseCreateCommentOptions = {}) => {
    const { addNotification } = useNotifications();

    return useMutation({
        mutationFn: createComment,
        onSuccess: (newComment) => {
            // Don't invalidate - we'll handle optimistic update in the component
            //in real example will be 
            // queryClient.invalidateQueries({
            //    queryKey: ['comments', courseId],
            //});
            addNotification({
                type: 'success',
                title: 'Success',
                message: 'Comment submitted successfully',
            });
            onSuccess?.(newComment);
        },
        onError: (error: Error) => {
            addNotification({
                type: 'error',
                title: 'Submission Failed',
                message: error.message || 'Failed to submit comment',
            });
        },
    });
};
