import { useEffect, useState } from "react";

type Props = {
    open: boolean;
    initialName?: string;
    initialRelation?: string;
    onClose: () => void;
    onSave: (payload: { name: string; relation: string }) => void;
};

export default function EditGuestModal({
    open,
    initialName = "",
    initialRelation = "",
    onClose,
    onSave,
}: Props) {
    const [name, setName] = useState(initialName);
    const [relation, setRelation] = useState(initialRelation);

    useEffect(() => {
        if (!open) return;
        setName(initialName);
        setRelation(initialRelation);
    }, [open, initialName, initialRelation]);

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

    if (!open) return null;

    const inputClass =
        "w-full h-12 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 text-[13px] text-black outline-none focus:border-[#FCC125]";

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close edit modal"
                onClick={onClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative w-[94%] max-w-[760px] mx-3 rounded-2xl bg-white border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6 sm:p-10"
            >
                <div className="text-center text-[22px] sm:text-[26px] font-bold text-[#111827]">
                    Edit Guest List
                </div>

                <div className="mt-8 space-y-6">
                    <div>
                        <div className="text-[16px] font-semibold text-[#111827] mb-2">
                            Your Name
                        </div>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Your Name"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <div className="text-[16px] font-semibold text-[#111827] mb-2">
                            Your Relation
                        </div>
                        <input
                            value={relation}
                            onChange={(e) => setRelation(e.target.value)}
                            placeholder="Your Relation"
                            className={inputClass}
                        />
                    </div>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                onSave({ name, relation });
                                onClose();
                            }}
                            className="cursor-pointer h-12 rounded-lg text-white font-semibold
                         bg-gradient-to-b from-[#008236] to-[#00A63E]
                         hover:brightness-105 active:brightness-95 transition"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer h-12 rounded-lg text-white font-semibold
                         bg-gradient-to-b from-[#E0656A] to-[#9B353A]
                         hover:brightness-105 active:brightness-95 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}