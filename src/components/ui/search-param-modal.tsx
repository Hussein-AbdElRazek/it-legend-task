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

interface SearchParamModalProps
{
    paramKey?: string;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    contentClassName?: string;
    showCloseButton?: boolean;
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
                className={`h-screen w-screen !max-h-screen !max-w-screen ${contentClassName}`}
                showCloseButton={showCloseButton}
                onInteractOutside={(e) => {
                    // Prevent closing when clicking outside the modal
                    e.preventDefault();
                }}
            >
                {title && <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>}

                <div className="w-full h-full overflow-auto">{children}</div>

            </DialogContent>
        </Dialog>
    );
};