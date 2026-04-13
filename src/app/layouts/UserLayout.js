import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
export default function UserLayout() {
    return (_jsxs("div", { className: "min-h-screen bg-[#f6f7fb]", children: [_jsx(UserHeader, {}), _jsx("div", { className: "mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "py-6", children: _jsx("main", { className: "w-full", children: _jsx(Outlet, {}) }) }) })] }));
}
