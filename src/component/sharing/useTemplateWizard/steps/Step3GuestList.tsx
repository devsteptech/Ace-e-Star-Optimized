
export default function Step3GuestList({
    onUpload,
}: {
    onUpload: (f: File | null) => void;
}) {


    const downloadTemplate = () => {
        const csv =
            "name,relation\n" +
            "John Smith,Organizer\n" +
            "Sarah Johnson,Mother\n" +
            "Michael Brown,Father\n";

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "guest_list.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };
    return (
        <div className="w-full max-w-[980px] mx-auto">
            <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-6 sm:p-8">
                <div className="text-[13px] font-semibold text-[#111827]">Guest List</div>
                <div className="text-[12px] text-[#6b7280] mt-1">
                    Import or add guests manually
                </div>

                <label className="mt-5 cursor-pointer block w-full rounded-xl border border-[#cbd5e1] bg-white p-6 sm:p-8">
                    <input
                        type="file"
                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        className="hidden"
                        onChange={(e) => onUpload(e.target.files?.[0] ?? null)}
                    />

                    <div className="w-full flex flex-col items-center justify-center text-center">
                        <div className="text-[#94a3b8]">
                            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14 2v6h6"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 17V11"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M9.5 13.5 12 11l2.5 2.5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div className="mt-3 text-[13px] font-medium text-[#475569]">
                            Upload guest list (CSV or Excel)
                        </div>

                        <div className="mt-1 text-[11px] text-[#94a3b8]">
                            Download template:{" "}
                            <button type="button" onClick={downloadTemplate} className="underline font-medium">
                                Name, Relation (CSV)
                            </button>
                        </div>

                        <div className="mt-5">
                            <span className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-[#e5e7eb] bg-white text-[#111827] text-[12px] font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d="M12 5v10"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M8 9l4-4 4 4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M5 19h14"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                Upload File
                            </span>
                        </div>
                    </div>
                </label>

                <div className="mt-6 flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-[#e5e7eb]" />
                    <div className="text-[12px] text-[#6b7280] whitespace-nowrap">
                        or add guests manually later
                    </div>
                    <div className="h-[1px] flex-1 bg-[#e5e7eb]" />
                </div>

                <div className="mt-6 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-4 flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[#155DFC] text-white grid place-items-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M20 6 9 17l-5-5"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div>
                        <div className="text-[12px] font-medium text-[#1C398E]">
                            You can add guests later
                        </div>
                        <div className="text-[12px] text-[#1C398E]">
                            You&apos;ll be able to add and manage guests from the check-in dashboard.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}