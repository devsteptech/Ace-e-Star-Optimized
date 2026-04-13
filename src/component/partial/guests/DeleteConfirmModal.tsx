import { useEffect } from "react";

type Props = {
    open: boolean;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteConfirmModal({
    open,
    title = "Are you sure you want\nto delete?",
    confirmText = "Yes",
    cancelText = "No",
    onClose,
    onConfirm,
}: Props) {
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close"
                onClick={onClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative w-[320px] sm:w-[360px] rounded-2xl bg-white border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6"
            >
                <p className="text-center text-[16px] font-semibold text-[#111827] leading-snug whitespace-pre-line">
                    {title}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="cursor-pointer h-11 rounded-lg text-white font-semibold
             bg-gradient-to-b from-[#008236] to-[#00A63E]
             hover:brightness-105 active:brightness-95 transition"
                    >
                        {confirmText}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer h-11 rounded-lg text-white font-semibold
             bg-gradient-to-b from-[#E0656A] to-[#9B353A]
             hover:brightness-105 active:brightness-95 transition"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}