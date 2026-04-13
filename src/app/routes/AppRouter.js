import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(PublicOnly, {}), children: [_jsx(Route, { path: "/", element: _jsx(GetStarted, {}) }), _jsx(Route, { path: "/WhoYouAre", element: _jsx(WhoYouAre, {}) })] }), _jsxs(Route, { element: _jsx(PublicOnlyAdminLogin, {}), children: [_jsx(Route, { path: "/AdminLogin", element: _jsx(AdminLogin, {}) }), _jsx(Route, { path: "/adminlogin", element: _jsx(AdminLogin, {}) })] }), _jsxs(Route, { element: _jsx(PublicOnlyUserLogin, {}), children: [_jsx(Route, { path: "/UserLogin", element: _jsx(UserLogin, {}) }), _jsx(Route, { path: "/userlogin", element: _jsx(UserLogin, {}) })] }), _jsx(Route, { element: _jsx(RequireAdminAuth, {}), children: _jsxs(Route, { path: "/app", element: _jsx(AppLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/app/adminDashboard", replace: true }) }), _jsx(Route, { path: "adminDashboard", element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "templatesDashboard", element: _jsx(TemplatesDashboard, {}) }), _jsx(Route, { path: "eventsDashboard", element: _jsx(EventsDashboard, {}) }), _jsx(Route, { path: "EventsDashboard", element: _jsx(EventsDashboard, {}) }), _jsx(Route, { path: "reportsDashboard", element: _jsx(ReportsDashboard, {}) }), _jsx(Route, { path: "ReportsDashboard", element: _jsx(ReportsDashboard, {}) })] }) }), _jsx(Route, { element: _jsx(RequireUserAuth, {}), children: _jsx(Route, { path: "/app/userdashboard", element: _jsx(UserLayout, {}), children: _jsx(Route, { index: true, element: _jsx(UserDashboard, {}) }) }) }), _jsx(Route, { path: "*", element: adminToken ? (_jsx(Navigate, { to: "/app/adminDashboard", replace: true })) : userToken ? (_jsx(Navigate, { to: "/app/userdashboard", replace: true })) : (_jsx(Navigate, { to: "/WhoYouAre", replace: true })) })] }));
}
