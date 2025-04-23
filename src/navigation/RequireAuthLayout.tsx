import { JSX, useEffect } from "react";
import { useStore } from "zustand";
import { useRouter } from "next/router";

import { UserRole } from "@/types/api/auth.types";
import { appToast } from "@/utils/appToast";
import { authStore } from "../stores/auth.store";
import routes from "./routes";

interface Props {
  children: JSX.Element;
  role: UserRole;
}

const RequireAuthLayout = ({ children, role }: Props): JSX.Element => {
  const { loginResponse, logout } = useStore(authStore);
  const router = useRouter();

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
