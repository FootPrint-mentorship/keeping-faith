import { useStore } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import { LoginResponse } from "@/types/api/auth.types";
import { encryptedStore } from ".";

export interface AuthStore {
  loginResponse: LoginResponse | null;

  logout: () => void;
  setLoginResponse: (value: LoginResponse) => void;
}

const authStoreName = "useAuthStore";

export const authStore = createWithEqualityFn(
  persist<AuthStore>(
    (set) => ({
      // DEFAULT STATE
      loginResponse: null,

      //   ACTIONS OR MUTATORS
      logout: () => set(() => ({ loginResponse: null })),

      setLoginResponse: (loginResponse) => set(() => ({ loginResponse })),
    }),
    {
      name: authStoreName,
      storage: encryptedStore("localStorage"),
    }
  ),
  shallow
);

export const useAuthStore = () => {
  return useStore(authStore);
};
