import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReportRow from "./ReportRow";
export default function ReportsTableCard({ loading, reports, onViewReport, onDownloadReport, }) {
    return (_jsx("div", { className: "bg-white border border-[#ececec] rounded-2xl shadow-sm", children: _jsx("div", { className: "p-5 overflow-x-auto", children: _jsxs("table", { className: "w-full min-w-[660px] text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-[12px] text-[#0A0A0A] border-b border-[#f0f0f0]", children: [_jsx("th", { className: "py-3 font-semibold", children: "Name" }), _jsx("th", { className: "py-3 font-semibold", children: "Template" }), _jsx("th", { className: "py-3 font-semibold", children: "Date" }), _jsx("th", { className: "py-3 font-semibold", children: "Time" }), _jsx("th", { className: "py-3 font-semibold text-right" }), _jsx("th", { className: "py-3 font-semibold text-right" })] }) }), _jsx("tbody", { children: loading
                            ? Array.from({ length: 8 }).map((_, i) => (_jsxs("tr", { className: "border-b border-[#f0f0f0] last:border-b-0", children: [_jsx("td", { className: "py-4", children: _jsx("div", { className: "h-4 w-[240px] bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-4", children: _jsx("div", { className: "h-4 w-[90px] bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-4", children: _jsx("div", { className: "h-4 w-[90px] bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-4", children: _jsx("div", { className: "h-4 w-[120px] bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-4 text-right", children: _jsx("div", { className: "ml-auto h-4 w-[80px] bg-[#ececec] rounded animate-pulse" }) }), _jsx("td", { className: "py-4 text-right", children: _jsx("div", { className: "ml-auto h-8 w-[90px] bg-[#ececec] rounded animate-pulse" }) })] }, i)))
                            : reports.map((r) => (_jsx(ReportRow, { item: r, onView: (id) => {
                                    if (onViewReport)
                                        return onViewReport(id);
                                    console.log("View Report:", id);
                                }, onDownload: (id) => {
                                    if (onDownloadReport)
                                        return onDownloadReport(id);
                                    console.log("Download:", id);
                                } }, r.id))) })] }) }) }));
}
