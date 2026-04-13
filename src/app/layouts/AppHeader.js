import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStorage } from "@/helper/authStorage";
import { adminLogoutApi } from "@/repositories/auth.repo";
function decodeJwtPayload(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
        return JSON.parse(atob(padded));
    }
    catch {
        return null;
    }
}
export default function AppHeader({ onMenuClick }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const token = authStorage.getAdminToken();
    const adminInfo = useMemo(() => {
        if (!token)
            return { name: "Admin", email: "admin@gmail.com" };
        const payload = decodeJwtPayload(token);
        return {
            name: payload?.role === "admin" ? "Admin" : "Admin",
            email: payload?.email || "admin@gmail.com",
        };
    }, [token]);
    const handleLogout = async () => {
        const t = authStorage.getAdminToken();
        setLoading(true);
        try {
            if (t) {
                await adminLogoutApi(t);
            }
        }
        catch {
        }
        finally {
            authStorage.clearAdminToken();
            setLoading(false);
            navigate("/AdminLogin", { replace: true });
        }
    };
    return (_jsx("header", { className: "sticky top-0 z-30 bg-white border-b border-[#ececec]", children: _jsx("div", { className: "mx-auto max-w-[1280px] w-full px-4 sm:0", children: _jsxs("div", { className: "h-16 flex items-center w-full justify-between gap-0", children: [_jsxs("div", { className: "flex items-center gap-0 min-w-[150px]", children: [onMenuClick && (_jsx("button", { type: "button", onClick: onMenuClick, className: "lg:hidden w-10 h-10 grid place-items-center rounded-lg hover:bg-[#f3f4f6]", "aria-label": "Open menu", children: _jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [_jsx("path", { d: "M4 7h16", stroke: "#111827", strokeWidth: "2", strokeLinecap: "round" }), _jsx("path", { d: "M4 12h16", stroke: "#111827", strokeWidth: "2", strokeLinecap: "round" }), _jsx("path", { d: "M4 17h16", stroke: "#111827", strokeWidth: "2", strokeLinecap: "round" })] }) })), _jsx("img", { src: "/images/ace-logo.png", alt: "Ace E Star", className: "h-10 w-auto object-contain cursor-pointer" })] }), _jsxs("div", { className: "flex items-center gap-2 sm:gap-4 min-w-[200px] justify-end", children: [_jsx("button", { type: "button", className: "grid hidden sm:block place-items-center", "aria-label": "Settings", children: _jsx("img", { src: "/images/setting.svg", alt: "Settings", className: "cursor-pointer w-[18px] h-[18px] object-contain" }) }), _jsx("div", { className: "h-[35px] w-[1px] hidden sm:block bg-[#E5E7EB]" }), _jsxs("button", { type: "button", onClick: handleLogout, disabled: loading, className: "cursor-pointer flex items-center gap-2 disabled:opacity-60", "aria-label": "Logout", title: "Logout", children: [_jsxs("div", { className: "text-right leading-tight", children: [_jsx("div", { className: "text-[12px] font-semibold text-[#111827]", children: adminInfo.name }), _jsx("div", { className: "text-[10px] text-[#6b7280]", children: adminInfo.email })] }), _jsx("span", { className: "cursor-pointer w-9 h-9 grid place-items-center", "aria-hidden": "true", children: _jsx("img", { src: "/images/signout.svg", alt: "Logout", className: "w-[18px] h-[18px] object-contain" }) })] })] })] }) }) }));
}
