import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
export default function DeleteConfirmModal({ open, title = "Are you sure you want\nto delete?", confirmText = "Yes", cancelText = "No", onClose, onConfirm, }) {
    useEffect(() => {
        if (!open)
            return;
        const onKeyDown = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);
    if (!open)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-[999] grid place-items-center", children: [_jsx("button", { type: "button", className: "absolute inset-0 bg-black/30", "aria-label": "Close", onClick: onClose }), _jsxs("div", { role: "dialog", "aria-modal": "true", className: "relative w-[320px] sm:w-[360px] rounded-2xl bg-white border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6", children: [_jsx("p", { className: "text-center text-[16px] font-semibold text-[#111827] leading-snug whitespace-pre-line", children: title }), _jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4", children: [_jsx("button", { type: "button", onClick: () => {
                                    onConfirm();
                                    onClose();
                                }, className: "cursor-pointer h-11 rounded-lg text-white font-semibold\r\n             bg-gradient-to-b from-[#008236] to-[#00A63E]\r\n             hover:brightness-105 active:brightness-95 transition", children: confirmText }), _jsx("button", { type: "button", onClick: onClose, className: "cursor-pointer h-11 rounded-lg text-white font-semibold\r\n             bg-gradient-to-b from-[#E0656A] to-[#9B353A]\r\n             hover:brightness-105 active:brightness-95 transition", children: cancelText })] })] })] }));
}
