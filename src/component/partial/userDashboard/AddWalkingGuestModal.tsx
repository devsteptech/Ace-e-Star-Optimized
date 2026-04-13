import { useEffect, useMemo, useState } from "react";
import { eventmanGuestsRepo } from "@/repositories/eventmanGuests.repo";
import { downloadTagPdf } from "../../../services/tagPdf";
import { TagSize } from "./TagPdfView";

type GuestField = { id: string; label: string; fieldName: string };

type Props = {
    open: boolean;
    onClose: () => void;
    fields?: GuestField[];
    enableCheckoutTag?: boolean;

    eventName: string;
    eventLogoUrl: string;
    screenLogoUrl: string;

    checkInTag: { size: TagSize; bgUrl: string; logoUrl: string };
    checkOutTag: { size: TagSize; bgUrl: string; logoUrl: string };
    checkOutTagText: string;
};

const DEFAULT_FIELDS: GuestField[] = [
    { id: "name", label: "Your Name", fieldName: "name" },
    { id: "relation", label: "Your Relation", fieldName: "relation" },
];

export default function AddWalkingGuestModal({
    open,
    onClose,
    fields,
    enableCheckoutTag,
    eventName,
    eventLogoUrl,
    screenLogoUrl,
    checkInTag,
    checkOutTag,
    checkOutTagText,
}: Props) {
    const safeFields = fields && fields.length ? fields : DEFAULT_FIELDS;
    const allowCheckout = enableCheckoutTag ?? true;

    const initial = useMemo(() => {
        const obj: Record<string, string> = {};
        safeFields.forEach((f) => (obj[f.fieldName] = ""));
        return obj;
    }, [safeFields]);

    const [form, setForm] = useState<Record<string, string>>(initial);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
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
        if (!open) return;
        setForm(initial);
    }, [open, initial]);

    if (!open) return null;

    const setField = (key: string, value: string) => {
        setForm((p) => ({ ...p, [key]: value }));
    };

    const norm = (s: any) => String(s ?? "").trim().toLowerCase();

    const pickKey = (want: "name" | "relation") => {
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

    const getLogoForTag = (tagLogo: string) => {
        return eventLogoUrl || tagLogo || screenLogoUrl || "";
    };

    const submit = async (action: "checkin" | "checkout") => {
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
            } else {
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
        } catch (e: any) {
            // alert(e?.message || "Walk-in failed");
        }
    };

    const inputClass =
        "w-full h-10 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 text-[13px] text-black outline-none focus:border-[#FCC125]";

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close walking guest modal"
                onClick={onClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative w-[92%] max-w-[720px] rounded-2xl bg-white border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6 sm:p-10"
            >
                <div className="text-center text-[18px] sm:text-[20px] font-bold text-[#111827]">
                    Add Walking Guest
                </div>

                <div className="mt-6 space-y-5">
                    {safeFields.map((f) => (
                        <div key={f.id}>
                            <div className="text-[13px] font-semibold text-[#111827] mb-2">
                                {f.label || "Field"}
                            </div>

                            <input
                                value={form[f.fieldName] || ""}
                                onChange={(e) => setField(f.fieldName, e.target.value)}
                                placeholder={f.label || "Enter value"}
                                className={inputClass}
                            />
                        </div>
                    ))}

                    <div className="pt-2 grid grid-cols-! gap-4">
                        <button
                            type="button"
                            onClick={() => submit("checkin")}
                            className="cursor-pointer w-full h-11 rounded-lg text-white font-semibold
                bg-gradient-to-b from-[#008236] to-[#00A63E]
                hover:brightness-105 active:brightness-95 transition"
                        >
                            Check In
                        </button>

                        {/* {allowCheckout ? (
              <button
                type="button"
                onClick={() => submit("checkout")}
                className="cursor-pointer h-11 rounded-lg text-white font-semibold
                  bg-gradient-to-b from-[#E0656A] to-[#9B353A]
                  hover:brightness-105 active:brightness-95 transition"
              >
                Check Out
              </button>
            ) : null} */}
                    </div>
                </div>
            </div>
        </div>
    );
}