import { Middleware } from "@reduxjs/toolkit";
import { authApiSlice } from "../auth/authApiSlice";

const authMiddleware: Middleware =
  (storeAPI) => (dispatch) => (action: any) => {
    const endpointName = action?.meta?.arg?.endpointName;
    if (endpointName) {
      const payload = action.payload?.data;
      if (payload?.message === "User Not Logged In!") {
        storeAPI.dispatch(authApiSlice.util.resetApiState());
        localStorage.removeItem("userInfo");
        window.location.href = "/admin/auth/login"; // Reloads the window after clearing storage
      }
    }

    return dispatch(action);
  };

export default authMiddleware;
