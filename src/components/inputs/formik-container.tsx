"use client";

import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { ReactNode } from "react";
import { z } from "zod";

import { handleScrollToError } from "@/utils/handle-scroll-to-error";

interface FormikContainerProps<T extends FormikValues> {
    initialValues: T;
    validationSchema: z.ZodSchema<T>;
    onSubmit: (values: T, formikHelpers?: FormikHelpers<T>) => void;
    getFormik?: (formik: FormikProps<T>) => void;
    children: ReactNode | ((formik: FormikProps<T>) => ReactNode);
    className?: string;
    enableReinitialize?: boolean;
    formikRef?: React.RefObject<FormikProps<T>>;
}

/**
 * A Formik container component with the following features:
 * - Handles form submission and validation
 * - Enables reinitialization of form values
 * - Passes the formik object to a callback for access to form state
 * - A convenience wrapper for the Formik component
 */
export const FormikContainer = <T extends FormikValues>({
    initialValues = {} as T,
    validationSchema,
    onSubmit,
    children,
    enableReinitialize = true,
    className,
    formikRef
    }: FormikContainerProps<T>) => {
    // Convert Zod schema to Formik validate function
    const validate = (values: T) => {
        try {
            validationSchema.parse(values);
            return {};
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<string, any> = {};
                error.issues.forEach((issue) => {
                    const path = issue.path.join('.');
                    errors[path] = issue.message;
                });
                return errors;
            }
            return {};
        }
    };

    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
            enableReinitialize={enableReinitialize}
            validateOnChange={false}
        >
            {(formik) => {
                if (
                    Object.keys(formik.errors).length > 0 &&
                    formik.isSubmitting
                ) {
                    handleScrollToError(formik.errors, formik.isSubmitting);
                }

                return (
                    <Form className={className || ""}>
                        {typeof children === "function"
                            ? children(formik)
                            : children}
                    </Form>
                );
            }}
        </Formik>
    );
};
