import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/helper/authStorage";

export default function RequireAdminAuth() {
    const adminToken = authStorage.getAdminToken();
    const userToken = authStorage.getUserToken();

    if (!adminToken && userToken) return <Navigate to="/app/userdashboard" replace />;
    if (!adminToken) return <Navigate to="/WhoYouAre" replace />;

    return <Outlet />;
}