import { NavLink } from "react-router-dom";

const base =
    "group w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition";
const inactive = "text-[#374151] hover:bg-[#E5E5E5] hover:text-[#374151]";
const active =
    "bg-[#ff2aa1] text-white shadow-[0_10px_30px_rgba(255,42,161,0.25)]";

const iconBase = "w-[18px] h-[18px] object-contain transition";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function SidebarNav() {
    return (
        <nav className="space-y-2">
            <NavLink to="/app/adminDashboard" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                {({ isActive }) => (
                    <>
                        <span className="w-5 h-5 grid place-items-center">
                            <img
                                src="/images/livedashboard.svg"
                                alt="Live Dashboard"
                                className={`${iconBase} ${isActive ? "brightness-0 invert" : ""}`}
                            />
                        </span>
                        Live Dashboard
                    </>
                )}
            </NavLink>

            <NavLink to="/app/templatesDashboard" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                {({ isActive }) => (
                    <>
                        <span className="w-5 h-5 grid place-items-center">
                            <img
                                src="/images/templates.svg"
                                alt="Templates"
                                className={`${iconBase} ${isActive ? "brightness-0 invert" : ""}`}
                            />
                        </span>
                        Templates
                    </>
                )}
            </NavLink>

            <NavLink to="/app/EventsDashboard" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                {({ isActive }) => (
                    <>
                        <span className="w-5 h-5 grid place-items-center">
                            <img
                                src="/images/events.svg"
                                alt="Events"
                                className={`${iconBase} ${isActive ? "brightness-0 invert" : ""}`}
                            />
                        </span>
                        Events
                    </>
                )}
            </NavLink>

            <NavLink to="/app/ReportsDashboard" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
                {({ isActive }) => (
                    <>
                        <span className="w-5 h-5 grid place-items-center">
                            <img
                                src="/images/reports.svg"
                                alt="Reports"
                                className={`${iconBase} ${isActive ? "brightness-0 invert" : ""}`}
                            />
                        </span>
                        Reports
                    </>
                )}
            </NavLink>
        </nav>
    );
}

export default function AppSidebar({ isOpen, onClose }: Props) {
    return (
        <>
            <aside className="w-[240px] shrink-0 hidden lg:block">
                <div className="bg-white border-r-1 border-[#ececec] p-4 h-full">
                    <SidebarNav />
                </div>
            </aside>

            <div
                className={`lg:hidden fixed inset-0 z-40 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu overlay"
                    className={`absolute inset-0 bg-black/35 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                        }`}
                />

                <div
                    className={`absolute left-0 top-0 h-full w-full bg-white border-r border-[#ececec] p-4
          shadow-[0_30px_80px_rgba(0,0,0,0.25)]
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <img
                            src="/images/ace-logo.png"
                            alt="Ace E Star"
                            className="h-9 w-auto object-contain"
                        />

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-10 h-10 grid place-items-center rounded-lg hover:bg-[#f3f4f6]"
                            aria-label="Close menu"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M6 6l12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                                <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <div onClick={onClose}>
                        <SidebarNav />
                    </div>
                </div>
            </div>
        </>
    );
}