"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import
{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogDescription } from "@radix-ui/react-dialog";

interface SearchParamModalProps
{
    paramKey?: string;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    contentClassName?: string;
    showCloseButton?: boolean;
    hideTitle?: boolean;
}

/**
 * A reusable modal that opens automatically when a given query param exists in the URL.
 */
export const SearchParamModal: React.FC<SearchParamModalProps> = ({
    paramKey = "modal",
    title = "",
    children,
    onClose,
    contentClassName = "",
    showCloseButton = true,
    hideTitle = false,
}) =>
{
    const searchParams = useSearchParams();
    const router = useRouter();

    const modalParam = searchParams.get(paramKey);
    const [open, setOpen] = React.useState(false);

    // Auto open if the param exists
    React.useEffect(() =>
    {
        setOpen(!!modalParam);
    }, [modalParam]);

    const handleClose = () =>
    {
        setOpen(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete(paramKey);
        router.replace(`?${params.toString()}`, { scroll: false });
        onClose?.();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose} >
            <DialogContent
                className={`h-screen w-screen max-h-screen !max-w-screen supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:max-h-[100dvh] ${contentClassName}`}
                showCloseButton={showCloseButton}
                onInteractOutside={(e) =>
                {
                    // Prevent closing when clicking outside the modal
                    e.preventDefault();
                }}
            >
                {!hideTitle ? (
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="sr-only">{title}</DialogDescription>
                    </DialogHeader>
                ) : (
                    <VisuallyHidden>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="sr-only">{title}</DialogDescription>
                    </VisuallyHidden>
                )}

                <div className="w-full h-full overflow-auto">{children}</div>

            </DialogContent>
        </Dialog>
    );
};