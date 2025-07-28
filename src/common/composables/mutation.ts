import type { ApiResponse } from "../interfaces/api";

export type MutationOptions<P, R> = {
  mutationFn: (p: P) => Promise<R>;
  onSuccess?: (res: R) => void;
  onError?: (err: any) => void;
  successMessage?: ((res: R) => string) | string;
};

export const useMutation = <P, T, R = ApiResponse<T>>({
  mutationFn,
  onSuccess,
  onError,
  successMessage,
}: MutationOptions<P, R>) => {
  const isLoading = ref(false);

  const mutate = async (
    p: P,
    options?: Omit<MutationOptions<P, R>, "mutationFn">
  ) => {
    isLoading.value = true;
    try {
      const res = await mutationFn(p);
      (options?.onSuccess || onSuccess)?.(res as R);
      if (successMessage || options?.successMessage) {
        useNuxtApp().$toast.success(successMessage || options?.successMessage);
      }

      isLoading.value = false;
    } catch (error: any) {
      (options?.onError || onError)?.(error);
      const message =
        error?.response?._data?.message ??
        error?.message ??
        "Something went wrong";

      useNuxtApp().$toast.error(message);
      isLoading.value = false;
    }
  };

  return { isLoading, mutate };
};
