import type { IUserStoreState } from "~/modules/auth/interfaces";

const initialState: IUserStoreState = {
  userData: null,
};

export const useUserStore = defineStore("user", {
  state: () => initialState,
  actions: {
    async fetchUser() {
      const { data } = await useFetch("/api/user/me");
      this.userData = data.value?.data ?? null;
    },
  },
});
