import { OtherUserData } from "@/types/api/superadmin.types";
import { useStore } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";

interface Props {
  selectedUser: OtherUserData | null;
  setSelectedUser: (value: OtherUserData | null) => void;
}

const superAdminStore = createWithEqualityFn<Props>((set) => ({
  // DEFAULT STATE
  selectedUser: null,

  setSelectedUser: (selectedUser) => set(() => ({ selectedUser })),
}));

export const useSuperAdminStore = () => {
  return useStore(superAdminStore);
};
