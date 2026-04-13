import type { TemplateStep } from "../../../../types/templateEditorTypes";

export default function StepTimeline({
    step,
    enableCheckoutTag,
}: {
    step: TemplateStep;
    enableCheckoutTag: boolean;
}) {
    const steps = enableCheckoutTag
        ? ([
            { key: 1 as TemplateStep, num: 1, label: "User Screen Template" },
            { key: 2 as TemplateStep, num: 2, label: "Check In Tag Template" },
            { key: 3 as TemplateStep, num: 3, label: "Check Out Tag Template" },
            { key: 4 as TemplateStep, num: 4, label: "Finalizing" },
        ] as const)
        : ([
            { key: 1 as TemplateStep, num: 1, label: "User Screen Template" },
            { key: 2 as TemplateStep, num: 2, label: "Check In Tag Template" },
            { key: 3 as TemplateStep, num: 3, label: "Finalizing" },
        ] as const);

    const StepItem = ({ num, label, done }: { num: number; label: string; done: boolean }) => (
        <div className="flex flex-col items-center gap-2">
            <div
                className={[
                    "w-7 h-7 rounded-md grid place-items-center text-[12px] font-bold border",
                    done
                        ? "bg-[#f6b426] border-[#f6b426] text-white"
                        : "bg-white border-[#e5e7eb] text-[#6b7280]",
                ].join(" ")}
            >
                {num}
            </div>

            <div className="text-[10px] font-medium text-[#6b7280] whitespace-nowrap text-center">
                {label}
            </div>
        </div>
    );

    return (
        <div className="w-full">
            
            <div className="sm:hidden grid grid-cols-2 gap-x-6 gap-y-5 max-w-[520px] mx-auto">
                {steps.map((s) => (
                    <div key={s.num} className="flex justify-center">
                        <StepItem num={s.num} label={s.label} done={s.num <= step} />
                    </div>
                ))}
            </div>

            
            <div className="hidden sm:block w-full max-w-[900px] mx-auto px-4">
                <div className="flex items-start">
                    {steps.map((s, idx) => {
                        const isDoneOrActive = step >= s.key;
                        const leftActive = step >= s.key;
                        const rightActive = step > s.key;

                        return (
                            <div key={s.num} className="relative flex-1 flex flex-col items-center">
                                {idx !== 0 && (
                                    <div
                                        className={[
                                            "absolute top-[14px] left-0 right-1/2 h-[2px] z-0",
                                            leftActive ? "bg-[#f6b426]" : "bg-[#e5e7eb]",
                                        ].join(" ")}
                                    />
                                )}

                                {idx !== steps.length - 1 && (
                                    <div
                                        className={[
                                            "absolute top-[14px] left-1/2 right-0 h-[2px] z-0",
                                            rightActive ? "bg-[#f6b426]" : "bg-[#e5e7eb]",
                                        ].join(" ")}
                                    />
                                )}

                                <div
                                    className={[
                                        "relative z-10 w-7 h-7 rounded-md grid place-items-center text-[12px] font-bold border",
                                        isDoneOrActive
                                            ? "bg-[#f6b426] border-[#f6b426] text-white"
                                            : "bg-white border-[#e5e7eb] text-[#6b7280]",
                                    ].join(" ")}
                                >
                                    {s.num}
                                </div>

                                <div className="mt-2 text-[10px] sm:text-[11px] font-medium text-[#6b7280] whitespace-nowrap">
                                    {s.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}