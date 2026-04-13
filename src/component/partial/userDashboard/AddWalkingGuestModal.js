import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { eventmanGuestsRepo } from "@/repositories/eventmanGuests.repo";
import { downloadTagPdf } from "../../../services/tagPdf";
const DEFAULT_FIELDS = [
    { id: "name", label: "Your Name", fieldName: "name" },
    { id: "relation", label: "Your Relation", fieldName: "relation" },
];
export default function AddWalkingGuestModal({ open, onClose, fields, enableCheckoutTag, eventName, eventLogoUrl, screenLogoUrl, checkInTag, checkOutTag, checkOutTagText, }) {
    const safeFields = fields && fields.length ? fields : DEFAULT_FIELDS;
    const allowCheckout = enableCheckoutTag ?? true;
    const initial = useMemo(() => {
        const obj = {};
        safeFields.forEach((f) => (obj[f.fieldName] = ""));
        return obj;
    }, [safeFields]);
    const [form, setForm] = useState(initial);
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
    useEffect(() => {
        if (!open)
            return;
        setForm(initial);
    }, [open, initial]);
    if (!open)
        return null;
    const setField = (key, value) => {
        setForm((p) => ({ ...p, [key]: value }));
    };
    const norm = (s) => String(s ?? "").trim().toLowerCase();
    const pickKey = (want) => {
        const f = safeFields.find((x) => {
            const candidates = [x.id, x.fieldName, x.label].map(norm);
            return candidates.includes(want) || candidates.some((c) => c.includes(want));
        });
        return f?.fieldName;
    };
    const nameKey = pickKey("name");
    const relationKey = pickKey("relation");
    const getNameRelation = () => {
        const nameVal = String(form[nameKey ?? "name"] ?? "").trim();
        const relationVal = String(form[relationKey ?? "relation"] ?? "").trim();
        return { nameVal, relationVal };
    };
    const getLogoForTag = (tagLogo) => {
        return eventLogoUrl || tagLogo || screenLogoUrl || "";
    };
    const submit = async (action) => {
        const { nameVal, relationVal } = getNameRelation();
        if (!nameVal || !relationVal) {
            // alert("name and relation are required");
            return;
        }
        try {
            await eventmanGuestsRepo.walkIn({
                name: nameVal,
                relation: relationVal,
                action,
            });
            if (action === "checkin") {
                await downloadTagPdf({
                    mode: "checkin",
                    eventName,
                    bgUrl: checkInTag.bgUrl,
                    logoUrl: getLogoForTag(checkInTag.logoUrl),
                    tagSize: checkInTag.size,
                    fields: safeFields,
                    values: form,
                    fileName: `${eventName}_checkin_${nameVal}.pdf`,
                });
            }
            else {
                await downloadTagPdf({
                    mode: "checkout",
                    eventName,
                    bgUrl: checkOutTag.bgUrl,
                    logoUrl: getLogoForTag(checkOutTag.logoUrl),
                    tagSize: checkOutTag.size,
                    fields: safeFields,
                    values: form,
                    checkOutText: checkOutTagText,
                    fileName: `${eventName}_checkout_${nameVal}.pdf`,
                });
            }
            window.dispatchEvent(new Event("guests:changed"));
            onClose();
        }
        catch (e) {
            // alert(e?.message || "Walk-in failed");
        }
    };
    const inputClass = "w-full h-10 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 text-[13px] text-black outline-none focus:border-[#FCC125]";
    return (_jsxs("div", { className: "fixed inset-0 z-[999] grid place-items-center", children: [_jsx("button", { type: "button", className: "absolute inset-0 bg-black/30", "aria-label": "Close walking guest modal", onClick: onClose }), _jsxs("div", { role: "dialog", "aria-modal": "true", className: "relative w-[92%] max-w-[720px] rounded-2xl bg-white border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6 sm:p-10", children: [_jsx("div", { className: "text-center text-[18px] sm:text-[20px] font-bold text-[#111827]", children: "Add Walking Guest" }), _jsxs("div", { className: "mt-6 space-y-5", children: [safeFields.map((f) => (_jsxs("div", { children: [_jsx("div", { className: "text-[13px] font-semibold text-[#111827] mb-2", children: f.label || "Field" }), _jsx("input", { value: form[f.fieldName] || "", onChange: (e) => setField(f.fieldName, e.target.value), placeholder: f.label || "Enter value", className: inputClass })] }, f.id))), _jsx("div", { className: "pt-2 grid grid-cols-! gap-4", children: _jsx("button", { type: "button", onClick: () => submit("checkin"), className: "cursor-pointer w-full h-11 rounded-lg text-white font-semibold\r\n                bg-gradient-to-b from-[#008236] to-[#00A63E]\r\n                hover:brightness-105 active:brightness-95 transition", children: "Check In" }) })] })] })] }));
}
