import { FormikErrors } from "formik";

/**
 * Scrolls to the first error element in the form, if there is one.
 */
export const handleScrollToError = (
    errors: FormikErrors<any>,
    isSubmitting: boolean
): void => {
    const firstErrorId = Object.keys(errors)[0];

    if (!firstErrorId || !isSubmitting) {
        return;
    }

    // Try to find the element by ID
    let errorElement = document.getElementById(firstErrorId);

    // If not found by exact ID, try to find elements that start with the error ID
    if (!errorElement) {
        const elements = document.querySelectorAll(`[id^="${firstErrorId}"]`);
        if (elements.length > 0) {
            // Find the first visible element
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i] as HTMLElement;
                if (element.offsetParent !== null) {
                    // Check if element is visible
                    errorElement = element;
                    break;
                }
            }
        }
    }

    if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};
