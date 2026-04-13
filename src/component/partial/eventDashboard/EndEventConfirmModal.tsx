import { useEffect } from "react";

export default function EndEventConfirmModal({
    open,
    onClose,
    onConfirm,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
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

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close end event modal"
                onClick={onClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative w-[92%] max-w-[360px] rounded-2xl bg-white border border-[#ececec]
                   shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6"
            >
                <div className="text-center text-[14px] font-bold text-[#111827] leading-snug">
                    Are You Sure you want to <br /> End the Event?
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="cursor-pointer h-10 rounded-md bg-[#6b7280] text-white text-[12px] font-semibold"
                    >
                        Yes
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer h-10 rounded-md bg-[#f87171] text-white text-[12px] font-semibold"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}