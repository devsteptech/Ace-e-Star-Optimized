import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function EditGuestModal({ open, initialName = "", initialRelation = "", onClose, onSave, }) {
    const [name, setName] = useState(initialName);
    const [relation, setRelation] = useState(initialRelation);
    useEffect(() => {
        if (!open)
            return;
        setName(initialName);
        setRelation(initialRelation);
    }, [open, initialName, initialRelation]);
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
    const inputClass = "w-full h-12 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 text-[13px] text-black outline-none focus:border-[#FCC125]";
    return (_jsxs("div", { className: "fixed inset-0 z-[999] grid place-items-center", children: [_jsx("button", { type: "button", className: "absolute inset-0 bg-black/30", "aria-label": "Close edit modal", onClick: onClose }), _jsxs("div", { role: "dialog", "aria-modal": "true", className: "relative w-[94%] max-w-[760px] mx-3 rounded-2xl bg-white border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6 sm:p-10", children: [_jsx("div", { className: "text-center text-[22px] sm:text-[26px] font-bold text-[#111827]", children: "Edit Guest List" }), _jsxs("div", { className: "mt-8 space-y-6", children: [_jsxs("div", { children: [_jsx("div", { className: "text-[16px] font-semibold text-[#111827] mb-2", children: "Your Name" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Enter Your Name", className: inputClass })] }), _jsxs("div", { children: [_jsx("div", { className: "text-[16px] font-semibold text-[#111827] mb-2", children: "Your Relation" }), _jsx("input", { value: relation, onChange: (e) => setRelation(e.target.value), placeholder: "Your Relation", className: inputClass })] }), _jsxs("div", { className: "pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx("button", { type: "button", onClick: () => {
                                            onSave({ name, relation });
                                            onClose();
                                        }, className: "cursor-pointer h-12 rounded-lg text-white font-semibold\r\n                         bg-gradient-to-b from-[#008236] to-[#00A63E]\r\n                         hover:brightness-105 active:brightness-95 transition", children: "Save Changes" }), _jsx("button", { type: "button", onClick: onClose, className: "cursor-pointer h-12 rounded-lg text-white font-semibold\r\n                         bg-gradient-to-b from-[#E0656A] to-[#9B353A]\r\n                         hover:brightness-105 active:brightness-95 transition", children: "Cancel" })] })] })] })] }));
}
