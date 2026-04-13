import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/helper/authStorage";

export default function RequireUserAuth() {
    const adminToken = authStorage.getAdminToken();
    const userToken = authStorage.getUserToken();

    if (!userToken && adminToken) return <Navigate to="/app/adminDashboard" replace />;
    if (!userToken) return <Navigate to="/WhoYouAre" replace />;

    return <Outlet />;
}