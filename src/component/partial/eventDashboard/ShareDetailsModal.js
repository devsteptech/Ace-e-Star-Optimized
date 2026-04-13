import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
export default function ShareDetailsModal({ open, onClose, eventName, username, password, imageUrl, }) {
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
    const safeImage = imageUrl || `${import.meta.env.BASE_URL}images/sharedetail.png`;
    return (_jsxs("div", { className: "fixed inset-0 z-[999] grid place-items-center", children: [_jsx("button", { type: "button", className: "absolute inset-0 bg-black/30", "aria-label": "Close share details modal", onClick: onClose }), _jsxs("div", { role: "dialog", "aria-modal": "true", className: "relative w-[92%] max-w-[380px] rounded-2xl bg-white border border-[#ececec]\r\n                   shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6", children: [_jsx("div", { className: "text-center text-[14px] font-bold text-[#111827]", children: "Login Details" }), _jsx("div", { className: "mt-4 flex justify-center", children: _jsx("div", { className: "w-[92px] h-[92px] rounded-full overflow-hidden bg-[#f3f4f6]", children: _jsx("img", { src: safeImage, alt: "Event", className: "w-full h-full object-cover", onError: (e) => {
                                    e.currentTarget.src = `${import.meta.env.BASE_URL}images/sharedetail.png`;
                                } }) }) }), _jsx("div", { className: "mt-4 text-center text-[24px] font-extrabold text-[#111827] leading-tight", children: eventName }), _jsxs("div", { className: "mt-5 space-y-3", children: [_jsxs("div", { className: "h-9 rounded-md text-white text-[12px] font-semibold flex items-center justify-center px-4 bg-gradient-to-r from-[#FF3389] to-[#FF6DC2]", children: ["Email : ", username || "-"] }), _jsxs("div", { className: "h-9 rounded-md text-white text-[12px] font-semibold flex items-center justify-center px-4 bg-[#008236]", children: ["Password : ", password || "-"] })] }), _jsx("div", { className: "mt-6", children: _jsx("button", { type: "button", onClick: onClose, className: "cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold bg-[#F25741]", children: "Cancel" }) })] })] }));
}
