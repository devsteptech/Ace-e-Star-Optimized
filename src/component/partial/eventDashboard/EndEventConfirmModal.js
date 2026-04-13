import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
export default function EndEventConfirmModal({ open, onClose, onConfirm, }) {
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
    return (_jsxs("div", { className: "fixed inset-0 z-[999] grid place-items-center", children: [_jsx("button", { type: "button", className: "absolute inset-0 bg-black/30", "aria-label": "Close end event modal", onClick: onClose }), _jsxs("div", { role: "dialog", "aria-modal": "true", className: "relative w-[92%] max-w-[360px] rounded-2xl bg-white border border-[#ececec]\r\n                   shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6", children: [_jsxs("div", { className: "text-center text-[14px] font-bold text-[#111827] leading-snug", children: ["Are You Sure you want to ", _jsx("br", {}), " End the Event?"] }), _jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4", children: [_jsx("button", { type: "button", onClick: () => {
                                    onConfirm();
                                    onClose();
                                }, className: "cursor-pointer h-10 rounded-md bg-[#6b7280] text-white text-[12px] font-semibold", children: "Yes" }), _jsx("button", { type: "button", onClick: onClose, className: "cursor-pointer h-10 rounded-md bg-[#f87171] text-white text-[12px] font-semibold", children: "No" })] })] })] }));
}
