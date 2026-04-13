import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/helper/authStorage";
export default function RequireUserAuth() {
    const adminToken = authStorage.getAdminToken();
    const userToken = authStorage.getUserToken();
    if (!userToken && adminToken)
        return _jsx(Navigate, { to: "/app/adminDashboard", replace: true });
    if (!userToken)
        return _jsx(Navigate, { to: "/WhoYouAre", replace: true });
    return _jsx(Outlet, {});
}
