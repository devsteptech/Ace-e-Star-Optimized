import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function templateColor(template) {
    if (template === "Wedding")
        return "text-[#DC6F74]";
    if (template === "Birthday")
        return "text-[#008236]";
    return "text-[#111827]";
}
export default function ReportRow({ item, onView, onDownload, }) {
    return (_jsxs("tr", { className: "border-b border-[#f0f0f0] last:border-b-0 whitespace-nowrap", children: [_jsx("td", { className: "py-3 md:py-4 text-[12px] sm:text-[13px] font-medium text-[#0A0A0A] truncate", children: item.name }), _jsx("td", { className: `py-3 md:py-4 text-[12px] sm:text-[13px] font-medium ${templateColor(item.template)}`, children: item.template }), _jsx("td", { className: "py-3 md:py-4 text-[12px] sm:text-[13px] text-[#475569]", children: item.date }), _jsx("td", { className: "py-3 md:py-4 text-[12px] sm:text-[13px] text-[#475569]", children: item.time }), _jsx("td", { className: "py-3 md:py-4 text-right", children: _jsx("button", { type: "button", onClick: () => onView(item.id), className: "cursor-pointer text-[11px] sm:text-[12px] font-semibold text-[#2F4E92]", children: "View Report" }) }), _jsx("td", { className: "py-3 md:py-4 text-right", children: _jsx("button", { type: "button", onClick: () => onDownload(item.id), className: "cursor-pointer h-7 sm:h-8 px-4 sm:px-5 rounded-md bg-[#FF4B4B] text-white text-[10px] sm:text-[11px] font-semibold shadow-sm", children: "Download" }) })] }));
}
