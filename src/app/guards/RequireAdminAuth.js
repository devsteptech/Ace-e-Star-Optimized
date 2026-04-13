import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/helper/authStorage";
export default function RequireAdminAuth() {
    const adminToken = authStorage.getAdminToken();
    const userToken = authStorage.getUserToken();
    if (!adminToken && userToken)
        return _jsx(Navigate, { to: "/app/userdashboard", replace: true });
    if (!adminToken)
        return _jsx(Navigate, { to: "/WhoYouAre", replace: true });
    return _jsx(Outlet, {});
}
