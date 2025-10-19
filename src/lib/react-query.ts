import { UseMutationOptions, DefaultOptions, UseQueryOptions } from '@tanstack/react-query';

export const queryConfig = {
    queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60,
    },
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: unknown[]) => Promise<unknown>> =
    Awaited<ReturnType<FnType>>;

// Data-centric QueryConfig: pass the query data type TData directly
export type QueryConfig<TData> = Omit<
    UseQueryOptions<TData, Error, TData, string[]>,
    'queryKey' | 'queryFn'
>;

export type MutationConfig<
    MutationFnType extends (...args: unknown[]) => Promise<unknown>,
> = UseMutationOptions<
    ApiFnReturnType<MutationFnType>,
    Error,
    Parameters<MutationFnType>[0]
>;