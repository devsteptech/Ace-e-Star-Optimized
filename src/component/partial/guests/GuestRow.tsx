import type { GuestListItem } from "../../../types/guestListTypes";

type GuestField = { id: string; label: string; fieldName: string };

function StatusPill({ status }: { status: GuestListItem["status"] }) {
    const checked = status === "Checked In";
    return (
        <span
            className={`inline-flex items-center gap-2 h-6 px-3 rounded-full text-[11px] font-semibold ${checked ? "bg-[#dcfce7] text-[#008236]" : "bg-[#e5e7eb] text-[#030213]"
                }`}
        >
            {checked ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M20 6 9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M12 6v6l4 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
            {status}
        </span>
    );
}

function TypePill({ type }: { type: GuestListItem["type"] }) {
    const walkIn = type === "Walk-in";
    return (
        <span
            className={`inline-flex items-center h-6 px-3 rounded-md text-[11px] font-medium border ${walkIn ? "border-[#bfdbfe] text-[#155DFC] bg-white" : "border-[#e5e7eb] text-[#0A0A0A] bg-white"
                }`}
        >
            {type}
        </span>
    );
}

const norm = (s: any) => String(s ?? "").trim().toLowerCase();

function isNameField(f: GuestField) {
    const c = [f.id, f.fieldName, f.label].map(norm);
    return c.includes("name") || c.some((x) => x === "your name" || x.includes("name"));
}
function isRelationField(f: GuestField) {
    const c = [f.id, f.fieldName, f.label].map(norm);
    return c.includes("relation") || c.some((x) => x.includes("relation"));
}

export default function GuestRow({
    item,
    fields,
    onEdit,
    onDelete,
}: {
    item: GuestListItem;
    fields: GuestField[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    const getVal = (f: GuestField) => {
        if (isNameField(f)) return item.name || "-";
        if (isRelationField(f)) return item.relation || "-";

        const obj = item.fields || {};
        if (obj[f.fieldName] !== undefined) return String(obj[f.fieldName] ?? "-");

        const k = Object.keys(obj).find((kk) => norm(kk) === norm(f.fieldName));
        if (k) return String(obj[k] ?? "-");

        return "-";
    };

    return (
        <tr className="border-b border-[#f0f0f0] last:border-b-0 whitespace-nowrap">
            {fields.map((f) => (
                <td key={f.id} className="py-4 text-[13px] text-[#0A0A0A]">
                    {getVal(f)}
                </td>
            ))}

            <td className="py-4">
                <StatusPill status={item.status} />
            </td>
            <td className="py-4 text-[13px] text-[#475569]">{item.checkInTime}</td>
            <td className="py-4">
                <TypePill type={item.type} />
            </td>

            <td className="py-4 text-right">
                <button
                    type="button"
                    onClick={() => onEdit(item.id)}
                    className="cursor-pointer w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white grid place-items-center"
                    aria-label="Edit"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 20h9" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
                        <path
                            d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
                            stroke="#0A0A0A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </td>

            <td className="py-4 text-right">
                <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="cursor-pointer w-10 h-10 rounded-lg border border-[#fecaca] bg-white grid place-items-center"
                    aria-label="Delete"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M3 6h18" stroke="#E7000B" strokeWidth="2" strokeLinecap="round" />
                        <path d="M8 6V4h8v2" stroke="#E7000B" strokeWidth="2" strokeLinecap="round" />
                        <path d="M7 6l1 16h8l1-16" stroke="#E7000B" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}