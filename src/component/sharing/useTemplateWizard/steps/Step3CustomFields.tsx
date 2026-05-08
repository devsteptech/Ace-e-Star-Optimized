export type CustomField = {
    id: string;
    label: string;
    placeholder: string;
};

const makeId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
        ? (crypto as any).randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function Step3CustomFields({
    fields,
    onChange,
}: {
    fields: CustomField[];
    onChange: (v: CustomField[]) => void;
}) {
    const inputClass =
        "w-full h-10 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 text-[12px] text-black outline-none focus:border-[#FCC125]";

    const defaultLabel = (idx: number) => `Question ${idx + 1}`;
    const defaultPlaceholder = () => `Enter your answer`;

    return (
        <div className="w-full max-w-[980px] mx-auto">
            <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-[13px] font-semibold text-[#111827]">Questions</div>
                        <div className="text-[12px] text-[#6b7280] mt-1">
                            Add/remove Questions you want to collect
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            const idx = fields.length;
                            onChange([
                                ...fields,
                                {
                                    id: makeId(),
                                    label: defaultLabel(idx),
                                    placeholder: defaultPlaceholder(),
                                },
                            ]);
                        }}
                        className="h-9 cursor-pointer px-4 rounded-lg bg-white border border-[#e5e7eb] text-[#111827] text-[11px] font-semibold"
                    >
                        + Add Question
                    </button>
                </div>

                {fields.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-5 text-[12px] text-[#6b7280]">
                        No Questions added. Click <b>Add Question</b> to create one.
                    </div>
                ) : (
                    <div className="mt-6 space-y-3">
                        {fields.map((f, idx) => (
                            <div
                                key={f.id}
                                className="rounded-xl border border-[#e5e7eb] bg-white p-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-[12px] font-medium text-[#111827] mb-2">
                                            Label
                                        </div>
                                        <input
                                            value={f.label}
                                            onChange={(e) => {
                                                const next = [...fields];
                                                next[idx] = { ...f, label: e.target.value };
                                                onChange(next);
                                            }}
                                            onBlur={() => {
                                                const v = String(f.label ?? "").trim();
                                                if (v) return;
                                                const next = [...fields];
                                                next[idx] = { ...f, label: defaultLabel(idx) };
                                                onChange(next);
                                            }}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <div className="text-[12px] font-medium text-[#111827] mb-2">
                                            Placeholder
                                        </div>
                                        <input
                                            value={f.placeholder}
                                            onChange={(e) => {
                                                const next = [...fields];
                                                next[idx] = { ...f, placeholder: e.target.value };
                                                onChange(next);
                                            }}
                                            onBlur={() => {
                                                const v = String(f.placeholder ?? "").trim();
                                                if (v) return;
                                                const next = [...fields];
                                                next[idx] = { ...f, placeholder: defaultPlaceholder() };
                                                onChange(next);
                                            }}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <button
                                        type="button"
                                        onClick={() => onChange(fields.filter((x) => x.id !== f.id))}
                                        className="h-9 px-4 rounded-lg bg-white border border-[#fee2e2] text-[#b91c1c] text-[11px] font-semibold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}