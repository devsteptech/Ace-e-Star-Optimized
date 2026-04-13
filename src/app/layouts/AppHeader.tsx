import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStorage } from "@/helper/authStorage";
import { adminLogoutApi } from "@/repositories/auth.repo";

type Props = {
    onMenuClick?: () => void;
};

function decodeJwtPayload(token: string): any | null {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
        return JSON.parse(atob(padded));
    } catch {
        return null;
    }
}

export default function AppHeader({ onMenuClick }: Props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const token = authStorage.getAdminToken();

    const adminInfo = useMemo(() => {
        if (!token) return { name: "Admin", email: "admin@gmail.com" };
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
        } catch {
        } finally {
            authStorage.clearAdminToken();
            setLoading(false);
            navigate("/AdminLogin", { replace: true });
        }
    };

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-[#ececec]">
            <div className="mx-auto max-w-[1280px] w-full px-4 sm:0">
                <div className="h-16 flex items-center w-full justify-between gap-0">
                    <div className="flex items-center gap-0 min-w-[150px]">
                        {onMenuClick && (
                            <button
                                type="button"
                                onClick={onMenuClick}
                                className="lg:hidden w-10 h-10 grid place-items-center rounded-lg hover:bg-[#f3f4f6]"
                                aria-label="Open menu"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M4 7h16" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 12h16" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 17h16" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}

                        <img
                            src="/images/ace-logo.png"
                            alt="Ace E Star"
                            className="h-10 w-auto object-contain cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 min-w-[200px] justify-end">
                        <button type="button" className="grid hidden sm:block place-items-center" aria-label="Settings">
                            <img
                                src="/images/setting.svg"
                                alt="Settings"
                                className="cursor-pointer w-[18px] h-[18px] object-contain"
                            />
                        </button>

                        <div className="h-[35px] w-[1px] hidden sm:block bg-[#E5E7EB]"></div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loading}
                            className="cursor-pointer flex items-center gap-2 disabled:opacity-60"
                            aria-label="Logout"
                            title="Logout"
                        >
                            <div className="text-right leading-tight">
                                <div className="text-[12px] font-semibold text-[#111827]">
                                    {adminInfo.name}
                                </div>
                                <div className="text-[10px] text-[#6b7280]">
                                    {adminInfo.email}
                                </div>
                            </div>

                            <span className="cursor-pointer w-9 h-9 grid place-items-center" aria-hidden="true">
                                <img
                                    src="/images/signout.svg"
                                    alt="Logout"
                                    className="w-[18px] h-[18px] object-contain"
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}