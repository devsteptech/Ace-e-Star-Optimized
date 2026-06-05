import { Template } from "@/types/templateTypes";

export default function Step1SelectEvent({
    loading,
    templates,
    selectedTemplateId,
    onChange,
    locked,

    includeGuestList,
    onIncludeGuestList,
}: {
    loading: boolean;
    templates: Template[];
    selectedTemplateId: string;
    onChange: (id: string) => void;
    locked: boolean;

    includeGuestList: boolean;
    onIncludeGuestList: (v: boolean) => void;
}) {
    const selectClass =
        "w-full h-9 rounded-lg border border-[#e5e7eb] bg-white px-4 text-[12px] text-black outline-none " +
        "focus:border-[#FCC125] shadow-[0_10px_25px_rgba(0,0,0,0.08)] pr-10 appearance-none disabled:opacity-70";

    const choiceBtn = (active: boolean) =>
        [
            "h-9 rounded-lg text-[11px] font-semibold border",
            active ? "bg-[#2f2f2f] text-white border-[#2f2f2f]" : "bg-white text-[#111827] border-[#e5e7eb]",
        ].join(" ");

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-5 min-h-[240px] flex flex-col items-center justify-center">
            <div className="text-[13px] font-bold text-[#111827] text-center">Select Event Template</div>
            <div className="text-[11px] text-[#6b7280] mt-1 text-center">
                Choose a template or start from scratch
            </div>

            <div className="mt-6 w-full max-w-[420px]">
                <div className="relative">
                    <select
                        value={selectedTemplateId}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={loading || locked}
                        className={selectClass}
                    >
                        <option value="" disabled>
                            {loading ? "Loading templates..." : "Choose template"}
                        </option>

                        {templates.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.title}
                            </option>
                        ))}
                    </select>

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </div>

                <div className="mt-6">
                    <div className="text-[12px] font-semibold text-[#111827]">Do you want to import Guest List file?</div>
                    <div className="text-[11px] text-[#6b7280] mt-1">
                        If No, event will run with Walk-in guests only.
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => onIncludeGuestList(true)} className={choiceBtn(includeGuestList)}>
                            Yes (Upload CSV/Excel)
                        </button>
                        <button type="button" onClick={() => onIncludeGuestList(false)} className={choiceBtn(!includeGuestList)}>
                            No (Walk-ins only)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}