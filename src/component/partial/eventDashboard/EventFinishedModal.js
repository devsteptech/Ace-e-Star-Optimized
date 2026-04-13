import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
export default function EventFinishedModal({ open, onClose, eventName, onDownload, }) {
    useEffect(() => {
        if (!open)
            return;
        const onKeyDown = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);
    if (!open)
        return null;
    const fileName = `${eventName}.pdf`;
    return (_jsxs("div", { className: "fixed inset-0 z-[999] grid place-items-center", children: [_jsx("button", { type: "button", className: "absolute inset-0 bg-black/30", "aria-label": "Close event finished modal", onClick: onClose }), _jsxs("div", { role: "dialog", "aria-modal": "true", className: "relative w-[92%] max-w-[380px] rounded-2xl bg-white border border-[#ececec]\r\n                   shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-14 h-14 rounded-full bg-[#91bf69] grid place-items-center", children: _jsx("svg", { width: "40", height: "40", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: "M20 6 9 17l-5-5", stroke: "white", strokeWidth: "2.8", strokeLinecap: "round", strokeLinejoin: "round" }) }) }) }), _jsx("div", { className: "mt-3 text-center text-[13px] font-extrabold text-[#111827]", children: "Event Finished" }), _jsx("div", { className: "mt-5 flex justify-center", children: _jsxs("div", { className: "w-[150px] rounded-xl border border-[#ececec] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.12)] p-4 text-center", children: [_jsx("div", { className: "mx-auto w-12 h-12 rounded-md bg-[#eef2f7] grid place-items-center", children: _jsx("div", { className: "w-8 h-8 rounded bg-white border border-[#e5e7eb] grid place-items-center", children: _jsx("span", { className: "text-[11px] font-extrabold text-[#ef4444]", children: "PDF" }) }) }), _jsx("div", { className: "mt-3 text-[11px] font-semibold text-[#111827] leading-tight", children: fileName })] }) }), _jsxs("div", { className: "mt-6 space-y-3", children: [_jsx("button", { type: "button", onClick: onDownload, className: "cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold\r\n                       bg-gradient-to-r from-[#FFC145] to-[#FD8F01]", children: "Download Report" }), _jsx("button", { type: "button", onClick: onClose, className: "cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold bg-[#F25741]", children: "Cancel" })] })] })] }));
}
