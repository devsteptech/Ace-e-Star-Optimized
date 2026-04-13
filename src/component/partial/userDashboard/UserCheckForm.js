import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { eventmanGuestsRepo } from "@/repositories/eventmanGuests.repo";
import { downloadTagPdf } from "../../../services/tagPdf";
export default function UserCheckForm({ fields, enableCheckoutTag, eventName, eventLogoUrl, screenLogoUrl, checkInTag, checkOutTag, checkOutTagText, }) {
    const initial = useMemo(() => {
        const obj = {};
        fields.forEach((f) => (obj[f.fieldName] = ""));
        return obj;
    }, [fields]);
    const [form, setForm] = useState(initial);
    const [loading, setLoading] = useState(null);
    useEffect(() => {
        setForm(initial);
    }, [initial]);
    const setField = (key, value) => {
        setForm((p) => ({ ...p, [key]: value }));
    };
    const norm = (s) => String(s ?? "").trim().toLowerCase();
    const pickKey = (want) => {
        const f = fields.find((x) => {
            const candidates = [x.id, x.fieldName, x.label].map(norm);
            return candidates.includes(want) || candidates.some((c) => c.includes(want));
        });
        return f?.fieldName;
    };
    const nameKey = pickKey("name");
    const relationKey = pickKey("relation");
    const getPayload = () => {
        const name = String(form[nameKey ?? "name"] ?? "").trim();
        const relation = String(form[relationKey ?? "relation"] ?? "").trim();
        return { name, relation };
    };
    const logoForTag = (tagLogo) => eventLogoUrl || tagLogo || screenLogoUrl || "";
    const checkIn = async () => {
        setLoading("in");
        try {
            const { name, relation } = getPayload();
            if (!name || !relation) {
                // alert("name and relation required");
                return;
            }
            await eventmanGuestsRepo.checkIn({ name, relation });
            await downloadTagPdf({
                mode: "checkin",
                eventName,
                bgUrl: checkInTag.bgUrl,
                logoUrl: logoForTag(checkInTag.logoUrl),
                tagSize: checkInTag.size,
                fields,
                values: form,
                fileName: `${eventName}_checkin_${name}.pdf`,
            });
            window.dispatchEvent(new Event("guests:changed"));
            setForm(initial);
        }
        catch (e) {
            // alert(e?.message || "Check-in failed");
        }
        finally {
            setLoading(null);
        }
    };
    const checkOut = async () => {
        setLoading("out");
        try {
            const { name, relation } = getPayload();
            if (!name || !relation) {
                // alert("name and relation required");
                return;
            }
            await eventmanGuestsRepo.checkOut({ name, relation });
            await downloadTagPdf({
                mode: "checkout",
                eventName,
                bgUrl: checkOutTag.bgUrl,
                logoUrl: logoForTag(checkOutTag.logoUrl),
                tagSize: checkOutTag.size,
                fields,
                values: form,
                checkOutText: checkOutTagText,
                fileName: `${eventName}_checkout_${name}.pdf`,
            });
            window.dispatchEvent(new Event("guests:changed"));
            setForm(initial);
        }
        catch (e) {
            // alert(e?.message || "Check-out failed");
        }
        finally {
            setLoading(null);
        }
    };
    return (_jsx("div", { className: "lg:w-full w-[94%] max-w-[520px] mx-auto", children: _jsxs("div", { className: "space-y-4", children: [fields.map((f) => (_jsxs("div", { children: [_jsx("label", { className: "block text-[12px] font-semibold text-[#111827] mb-2", children: f.label || "Field" }), _jsx("input", { value: form[f.fieldName] || "", onChange: (e) => setField(f.fieldName, e.target.value), placeholder: f.label || "Enter value", className: "w-full h-11 rounded-md border border-[#e5e7eb] bg-[#f7f7f7] px-4 text-[13px] text-[#111827] outline-none focus:border-[#FCC125]" })] }, f.id))), _jsxs("div", { className: "pt-2 grid grid-cols-2 gap-4", children: [_jsx("button", { type: "button", onClick: checkIn, disabled: loading !== null, className: "cursor-pointer h-11 rounded-lg text-white font-semibold\r\n              bg-gradient-to-b from-[#008236] to-[#00A63E]\r\n              hover:brightness-105 active:brightness-95 transition", children: loading === "in" ? "Checking In..." : "Check In" }), enableCheckoutTag ? (_jsx("button", { type: "button", onClick: checkOut, disabled: loading !== null, className: "cursor-pointer h-11 rounded-lg text-white font-semibold\r\n                bg-gradient-to-b from-[#E0656A] to-[#9B353A]\r\n                hover:brightness-105 active:brightness-95 transition", children: loading === "out" ? "Checking Out..." : "Check Out" })) : null] })] }) }));
}
