import { authStore } from "@/stores/auth.store";
import { create } from "apisauce";

// import { appToast } from "@/utils/appToast";

export const DEFAULT_API_DATA_SIZE: Readonly<number> = 100;

const baseApi = create({
  // TODO  PUT THIS IN AN ENV
  baseURL: "https://keeping-faith-api.onrender.com/api/v1",
  paramsSerializer: { indexes: null },
});

baseApi.addAsyncRequestTransform(async (request) => {
  const { loginResponse } = authStore.getState();
  const userToken = loginResponse?.access;

  if (!!userToken) {
    if (request.headers)
      request.headers["authorization"] = `Bearer ${userToken}`;
  }
});

baseApi.addAsyncResponseTransform(async (response) => {
  const { logout } = authStore.getState();

  if (response?.status === 401) {
    logout();
    setTimeout(() => {
      // appToast.Warning(response?.data?.message ?? "Session Expired.");
    }, 1000);
  }
  if (response?.status === 403) {
    logout();
    setTimeout(() => {
      // appToast.Warning(response?.data?.message ?? "Not allowed.");
    }, 1000);
  }
});

export default baseApi;
