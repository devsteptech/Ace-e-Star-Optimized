import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
// import AppHeader from "./AppHeader";
// import AppSidebar from "./AppSidebar";
export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsx("div", { className: "min-h-screen bg-[#f6f7fb]", children: _jsx("div", { className: "mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "flex gap-6 py-6", children: _jsx("main", { className: "flex-1 min-w-0", children: _jsx(Outlet, {}) }) }) }) }));
}
