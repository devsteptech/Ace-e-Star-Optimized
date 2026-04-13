import { useEffect } from "react";
import { useGuests } from "../../../hooks/useGuests";
import GuestListHeader from "./GuestListHeader";
import GuestTableCard from "./GuestTableCard";

type GuestField = { id: string; label: string; fieldName: string };

type Props = {
    isOpen: boolean;
    onClose: () => void;
    fields?: GuestField[];
};

const DEFAULT_FIELDS: GuestField[] = [
    { id: "name", label: "Name", fieldName: "name" },
    { id: "relation", label: "Relation", fieldName: "relation" },
];

export default function GuestListModal({ isOpen, onClose, fields }: Props) {
    const { loading, guests, query, setQuery, reload } = useGuests();
    const safeFields = fields && fields.length ? fields : DEFAULT_FIELDS;

    useEffect(() => {
        if (!isOpen) return;
        reload();
    }, [isOpen, reload]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                onClick={onClose}
                aria-label="Close guest list"
                className="absolute inset-0 bg-black/30 cursor-pointer"
            />

            <div className="relative h-full w-full p-3 sm:p-6">
                <div className="relative mx-auto max-w-[1180px] w-full h-full bg-white rounded-2xl border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer absolute top-4 right-4 w-10 h-10 rounded-lg border border-[#e5e7eb] bg-white grid place-items-center"
                        aria-label="Close"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 6l12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="h-full w-full sm:mt-16 p-4 sm:p-6 flex flex-col gap-5">
                        <GuestListHeader loading={loading} query={query} onQueryChange={setQuery} />

                        <div className="flex-1 min-h-0 overflow-y-auto modal-scroll pr-1">
                            <GuestTableCard loading={loading} guests={guests} fields={safeFields} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}