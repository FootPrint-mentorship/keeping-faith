import { JSX } from "react";
import { useStore } from "zustand";

import { UserRole } from "@/types/api/auth.types";
import { authStore } from "../stores/auth.store";

interface Props {
  children: JSX.Element;
  role: UserRole;
}

const RequireAuthLayout = ({ children, role }: Props): JSX.Element => {
  const { loginResponse, logout } = useStore(authStore);
  // const router = useRouter();
  console.log(logout, role);
  // useEffect(() => {
  //   if (!loginResponse?.access) {
  //     appToast.Warning("Session expired. Please login again.");
  //     router?.replace(routes.LOGIN_PAGE);
  //   }
  // }, [loginResponse?.access]);

  // useEffect(() => {
  //   if (!!loginResponse?.user?.role && loginResponse?.user?.role !== role) {
  //     appToast.Warning("Unauthorized access. Please login with admin details.");
  //     logout?.();
  //   }
  // }, [loginResponse?.user?.role]);

  return loginResponse?.access ? children : <></>;
};

export default RequireAuthLayout;
