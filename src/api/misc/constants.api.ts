import { UserRole } from "@/types/api/auth.types";

export const apiConstants = Object.freeze({
  ACCOUNT_STATUS: {
    SUPER_ADMIN: "superadmin",
  },
});

interface Role {
  title: string;
  value: UserRole;
}

export const USER_ROLES_LIST: Role[] = [
  {
    title: "Regular User",
    value: "regular",
  },
  {
    title: "Super Admin",
    value: "superadmin",
  },
];
