import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/helper/authStorage";

export default function PublicOnlyUserLogin() {
    const adminToken = authStorage.getAdminToken();
    const userToken = authStorage.getUserToken();

    if (userToken) return <Navigate to="/app/userdashboard" replace />;
    if (adminToken) return <Navigate to="/app/adminDashboard" replace />;

    return <Outlet />;
}