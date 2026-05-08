import { useEffect } from "react";

export type FeedbackQuestion = { label: string; placeholder: string };

export default function FeedbackModal({
    open,
    questions,
    values,
    onChange,
    onSkip,
    onSubmit,
    submitting,
    onRequestClose,
}: {
    open: boolean;
    questions: FeedbackQuestion[];
    values: Record<string, string>;
    onChange: (label: string, value: string) => void;
    onSkip: () => void;
    onSubmit: () => void;
    submitting: boolean;
    onRequestClose: () => void;
}) {
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onRequestClose();
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onRequestClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close feedback modal"
                onClick={onRequestClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative w-[92%] max-w-[720px] rounded-2xl bg-white border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-6 sm:p-10"
            >
                <div className="text-center text-[16px] sm:text-[18px] font-bold text-[#111827]">
                    Feedback
                </div>

                <div className="mt-6 space-y-4">
                    {questions.map((q, idx) => (
                        <div key={`${q.label}-${idx}`}>
                            <label className="block text-[12px] font-semibold text-[#111827] mb-2">
                                {q.label}
                            </label>
                            <input
                                value={values[q.label] ?? ""}
                                onChange={(e) => onChange(q.label, e.target.value)}
                                placeholder={q.placeholder || "Enter value"}
                                className="w-full h-11 rounded-md border border-[#e5e7eb] bg-[#f7f7f7] px-4 text-[13px] text-[#111827] outline-none focus:border-[#FCC125]"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-7 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onSkip}
                        disabled={submitting}
                        className="cursor-pointer h-10 px-5 rounded-lg bg-white border border-[#e5e7eb] text-[#111827] text-[12px] font-semibold disabled:opacity-60"
                    >
                        Skip
                    </button>

                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={submitting}
                        className="cursor-pointer h-10 px-8 rounded-lg bg-[#5b5b5b] text-white text-[12px] font-semibold disabled:opacity-60"
                    >
                        {submitting ? "Saving..." : "Submit & Print"}
                    </button>
                </div>
            </div>
        </div>
    );
}