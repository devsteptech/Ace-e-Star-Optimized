import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsxs("div", { className: "min-h-screen bg-[#f6f7fb]", children: [_jsx(AppHeader, { onMenuClick: () => setSidebarOpen(true) }), _jsx("div", { className: "mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex gap-6 py-6", children: [_jsx(AppSidebar, { isOpen: sidebarOpen, onClose: () => setSidebarOpen(false) }), _jsx("main", { className: "flex-1 min-w-0", children: _jsx(Outlet, {}) })] }) })] }));
}
