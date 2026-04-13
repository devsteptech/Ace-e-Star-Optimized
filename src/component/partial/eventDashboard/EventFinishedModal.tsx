import { useEffect } from "react";

export default function EventFinishedModal({
    open,
    onClose,
    eventName,
    onDownload,
}: {
    open: boolean;
    onClose: () => void;
    eventName: string;
    onDownload: () => void;
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

    const fileName = `${eventName}.pdf`;

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close event finished modal"
                onClick={onClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative w-[92%] max-w-[380px] rounded-2xl bg-white border border-[#ececec]
                   shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6"
            >
                <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#91bf69] grid place-items-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M20 6 9 17l-5-5"
                                stroke="white"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                <div className="mt-3 text-center text-[13px] font-extrabold text-[#111827]">
                    Event Finished
                </div>

                <div className="mt-5 flex justify-center">
                    <div className="w-[150px] rounded-xl border border-[#ececec] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.12)] p-4 text-center">
                        <div className="mx-auto w-12 h-12 rounded-md bg-[#eef2f7] grid place-items-center">
                            <div className="w-8 h-8 rounded bg-white border border-[#e5e7eb] grid place-items-center">
                                <span className="text-[11px] font-extrabold text-[#ef4444]">PDF</span>
                            </div>
                        </div>

                        <div className="mt-3 text-[11px] font-semibold text-[#111827] leading-tight">
                            {fileName}
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <button
                        type="button"
                        onClick={onDownload}
                        className="cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold
                       bg-gradient-to-r from-[#FFC145] to-[#FD8F01]"
                    >
                        Download Report
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold bg-[#F25741]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}