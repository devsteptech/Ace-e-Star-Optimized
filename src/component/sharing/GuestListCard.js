import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
function StatusPill({ status }) {
    const checked = status === "Checked In";
    return (_jsxs("span", { className: `inline-flex items-center gap-2 h-6 px-3 rounded-sm text-[11px] font-semibold ${checked ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#e5e7eb] text-[#111827]"}`, children: [checked ? (_jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: "M20 6 9 17l-5-5", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }) })) : (_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [_jsx("path", { d: "M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z", stroke: "currentColor", strokeWidth: "2" }), _jsx("path", { d: "M12 6v6l4 2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] })), status] }));
}
export default function GuestListCard({ title = "Guest List", subtitle, guests = [
    { name: "John Smith", status: "Checked In", checkInTime: "6:15 PM" },
    { name: "Sarah Johnson", status: "Checked In", checkInTime: "6:18 PM" },
    { name: "Michael Brown", status: "Pending", checkInTime: "-" },
    { name: "Emily Davis", status: "Checked In", checkInTime: "6:22 PM" },
    { name: "Robert Wilson", status: "Checked In", checkInTime: "6:25 PM" },
], loading = false, eventName, hideViewDetail = false, }) {
    const sub = subtitle ?? eventName ?? "Sarah & Michael's Wedding";
    const [query, setQuery] = useState("");
    const filteredGuests = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return guests;
        return guests.filter((g) => {
            const hay = `${g.name} ${g.status} ${g.checkInTime}`.toLowerCase();
            return hay.includes(q);
        });
    }, [guests, query]);
    return (_jsxs("div", { className: "bg-white border border-[#ececec] rounded-2xl shadow-sm", children: [_jsxs("div", { className: "p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-[16px] font-bold text-[#0A0A0A]", children: title }), _jsx("div", { className: "text-[12px] text-[#0A0A0A] mt-0", children: sub })] }), _jsx("div", { className: "flex items-center justify-between gap-4", children: _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]", children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [_jsx("path", { d: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z", stroke: "currentColor", strokeWidth: "2" }), _jsx("path", { d: "M21 21l-4.35-4.35", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })] }) }), _jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search guests...", disabled: loading, className: "sm:w-[260px] w-[220px] h-9 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] pl-9 pr-3 text-[13px] text-black outline-none focus:border-[#FCC125] disabled:opacity-70" })] }) })] }), _jsx("div", { className: "px-4 sm:px-4 pb-3 sm:pb-4 overflow-x-auto", children: _jsxs("table", { className: "w-full min-w-[550px] sm:min-w-[760px] md:min-w-full lg:min-w-[900px] text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-[13px] lg:text-[14px] text-[#0A0A0A] border-b border-[#f0f0f0]", children: [_jsx("th", { className: "py-2.5 lg:py-3 font-semibold", children: "Name" }), _jsx("th", { className: "py-2.5 lg:py-3 font-semibold", children: "Status" }), _jsx("th", { className: "py-2.5 lg:py-3 font-semibold", children: "Check-in Time" }), _jsx("th", { className: "py-2.5 lg:py-3 font-semibold text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "text-[13px] text-[#0A0A0A]", children: loading
                                ? Array.from({ length: 5 }).map((_, idx) => (_jsxs("tr", { className: "border-b border-[#f0f0f0] last:border-b-0", children: [_jsx("td", { className: "py-3 lg:py-4", children: _jsx("div", { className: "h-4 w-[180px] bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-3 lg:py-4", children: _jsx("div", { className: "h-6 w-[110px] bg-[#ececec] rounded-sm animate-pulse" }) }), _jsx("td", { className: "py-3 lg:py-4", children: _jsx("div", { className: "h-4 w-[90px] bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-3 lg:py-4 text-right", children: _jsx("div", { className: "ml-auto h-7 lg:h-8 w-[110px] bg-[#ececec] rounded-md animate-pulse" }) })] }, idx)))
                                : filteredGuests.map((g) => (_jsxs("tr", { className: "border-b border-[#f0f0f0] last:border-b-0", children: [_jsx("td", { className: "py-3 lg:py-4", children: g.name }), _jsx("td", { className: "py-3 lg:py-4", children: _jsx(StatusPill, { status: g.status }) }), _jsx("td", { className: "py-3 lg:py-4 text-[#0A0A0A]", children: g.checkInTime }), _jsx("td", { className: "py-3 lg:py-4 text-right", children: _jsx("button", { type: "button", className: `cursor-pointer h-7 lg:h-8 px-3 lg:px-4 rounded-md bg-[linear-gradient(90deg,#FFC145_0%,#FF6900_100%)] text-white text-[10px] lg:text-[11px] font-semibold shadow-sm ${hideViewDetail ? "hidden" : ""}`, children: "View Details" }) })] }, `${g.name}-${g.checkInTime}`))) })] }) })] }));
}
