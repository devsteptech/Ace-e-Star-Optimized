import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/helper/authStorage";

export default function PublicOnlyAdminLogin() {
    const adminToken = authStorage.getAdminToken();
    const userToken = authStorage.getUserToken();

    if (adminToken) return <Navigate to="/app/adminDashboard" replace />;
    if (userToken) return <Navigate to="/app/userdashboard" replace />;

    return <Outlet />;
}