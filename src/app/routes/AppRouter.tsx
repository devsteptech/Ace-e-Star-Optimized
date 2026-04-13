import { Navigate, Route, Routes } from "react-router-dom";
import PublicOnly from "@/app/guards/PublicOnly";
import RequireAdminAuth from "@/app/guards/RequireAdminAuth";
import RequireUserAuth from "@/app/guards/RequireUserAuth";
import PublicOnlyAdminLogin from "@/app/guards/PublicOnlyAdminLogin";
import PublicOnlyUserLogin from "@/app/guards/PublicOnlyUserLogin";
import { authStorage } from "@/helper/authStorage";
import AppLayout from "@/app/layouts/AppLayout";
import UserLayout from "@/app/layouts/UserLayout";
import GetStarted from "../pages/GetStarted";
import WhoYouAre from "../pages/WhoYouAre";
import AdminLogin from "../pages/AdminLogin";
import UserLogin from "../pages/UserLogin";
import AdminDashboard from "../pages/AdminDashboard";
import TemplatesDashboard from "../pages/TemplatesDashboard";
import EventsDashboard from "../pages/EventsDashboard";
import ReportsDashboard from "../pages/ReportsDashboard";
import UserDashboard from "../pages/UserDashboard";



export default function AppRouter() {
    const adminToken = authStorage.getAdminToken();
    const userToken = authStorage.getUserToken();

    return (
        <Routes>
            <Route element={<PublicOnly />}>
                <Route path="/" element={<GetStarted />} />
                <Route path="/WhoYouAre" element={<WhoYouAre />} />
            </Route>

            <Route element={<PublicOnlyAdminLogin />}>
                {/* support both /AdminLogin and /adminlogin */}
                <Route path="/AdminLogin" element={<AdminLogin />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
            </Route>

            <Route element={<PublicOnlyUserLogin />}>
                <Route path="/UserLogin" element={<UserLogin />} />
                <Route path="/userlogin" element={<UserLogin />} />
            </Route>

            <Route element={<RequireAdminAuth />}>
                <Route path="/app" element={<AppLayout />}>
                    <Route index element={<Navigate to="/app/adminDashboard" replace />} />
                    <Route path="adminDashboard" element={<AdminDashboard />} />
                    <Route path="templatesDashboard" element={<TemplatesDashboard />} />
                    <Route path="eventsDashboard" element={<EventsDashboard />} />
                    <Route path="EventsDashboard" element={<EventsDashboard />} />
                    <Route path="reportsDashboard" element={<ReportsDashboard />} />
                    <Route path="ReportsDashboard" element={<ReportsDashboard />} />
                </Route>
            </Route>

            <Route element={<RequireUserAuth />}>
                <Route path="/app/userdashboard" element={<UserLayout />}>
                    <Route index element={<UserDashboard />} />
                </Route>
            </Route>

            <Route
                path="*"
                element={
                    adminToken ? (
                        <Navigate to="/app/adminDashboard" replace />
                    ) : userToken ? (
                        <Navigate to="/app/userdashboard" replace />
                    ) : (
                        <Navigate to="/WhoYouAre" replace />
                    )
                }
            />
        </Routes>
    );
}