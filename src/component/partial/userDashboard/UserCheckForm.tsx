import { useEffect, useMemo, useState } from "react";
import { eventmanGuestsRepo } from "@/repositories/eventmanGuests.repo";
import { downloadTagPdf } from "../../../services/tagPdf";

type GuestField = { id: string; label: string; fieldName: string };
type TagSize = "8x2" | "6x2" | "4x2";

export default function UserCheckForm({
    fields,
    enableCheckoutTag,
    eventName,
    eventLogoUrl,
    screenLogoUrl,
    checkInTag,
    checkOutTag,
    checkOutTagText,
}: {
    fields: GuestField[];
    enableCheckoutTag: boolean;

    eventName: string;
    eventLogoUrl: string;
    screenLogoUrl: string;

    checkInTag: { size: TagSize; bgUrl: string; logoUrl: string };
    checkOutTag: { size: TagSize; bgUrl: string; logoUrl: string };
    checkOutTagText: string;
}) {
    const initial = useMemo(() => {
        const obj: Record<string, string> = {};
        fields.forEach((f) => (obj[f.fieldName] = ""));
        return obj;
    }, [fields]);

    const [form, setForm] = useState<Record<string, string>>(initial);
    const [loading, setLoading] = useState<null | "in" | "out">(null);

    useEffect(() => {
        setForm(initial);
    }, [initial]);

    const setField = (key: string, value: string) => {
        setForm((p) => ({ ...p, [key]: value }));
    };

    const norm = (s: any) => String(s ?? "").trim().toLowerCase();

    const pickKey = (want: "name" | "relation") => {
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

    const logoForTag = (tagLogo: string) => eventLogoUrl || tagLogo || screenLogoUrl || "";

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
        } catch (e: any) {
            // alert(e?.message || "Check-in failed");
        } finally {
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
        } catch (e: any) {
            // alert(e?.message || "Check-out failed");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="lg:w-full w-[94%] max-w-[520px] mx-auto">
            <div className="space-y-4">
                {fields.map((f) => (
                    <div key={f.id}>
                        <label className="block text-[12px] font-semibold text-[#111827] mb-2">
                            {f.label || "Field"}
                        </label>
                        <input
                            value={form[f.fieldName] || ""}
                            onChange={(e) => setField(f.fieldName, e.target.value)}
                            placeholder={f.label || "Enter value"}
                            className="w-full h-11 rounded-md border border-[#e5e7eb] bg-[#f7f7f7] px-4 text-[13px] text-[#111827] outline-none focus:border-[#FCC125]"
                        />
                    </div>
                ))}

                <div className="pt-2 grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={checkIn}
                        disabled={loading !== null}
                        className="cursor-pointer h-11 rounded-lg text-white font-semibold
              bg-gradient-to-b from-[#008236] to-[#00A63E]
              hover:brightness-105 active:brightness-95 transition"
                    >
                        {loading === "in" ? "Checking In..." : "Check In"}
                    </button>

                    {enableCheckoutTag ? (
                        <button
                            type="button"
                            onClick={checkOut}
                            disabled={loading !== null}
                            className="cursor-pointer h-11 rounded-lg text-white font-semibold
                bg-gradient-to-b from-[#E0656A] to-[#9B353A]
                hover:brightness-105 active:brightness-95 transition"
                        >
                            {loading === "out" ? "Checking Out..." : "Check Out"}
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}