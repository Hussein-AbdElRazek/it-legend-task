"use client"

type DiscussionFormProps = {
    onSubmit: (content: string) => void;
    isSubmitting?: boolean;
    placeholder?: string;
    submitButtonText?: string;
    content: string;
    setContent: (content: string) => void;
    onChange?: (content: string) => void;
};

export const DiscussionForm = ({
    onSubmit,
    isSubmitting = false,
    placeholder = "Write a comment",
    submitButtonText = "Submit Review",
    content,
    setContent,
    onChange,
}: DiscussionFormProps) =>
{
    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        if (!content.trim() || isSubmitting) return;

        onSubmit(content.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8">
            <textarea
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    onChange?.(e.target.value);
                }}
                placeholder={placeholder}
                className="w-full p-4  bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] rounded resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                rows={4}
                disabled={isSubmitting}
            />
            <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="mt-4 px-8 py-3 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
                {isSubmitting ? (
                    <span>Submitting...</span>
                ) : (
                    <>
                        {submitButtonText}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </>
                )}
            </button>
        </form>
    );
};