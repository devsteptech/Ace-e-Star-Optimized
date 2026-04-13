import type { TemplateDraft } from "../../../../../types/templateEditorTypes";

export default function LiveScreenPreview({ draft }: { draft: TemplateDraft }) {

    const headerBg = "/bg-images/previewheaderbg.png";

    const bodyBg = draft.screenBgUrl || "/bg-images/userdashboardbg.png";

    const hasLogo = !!draft.screenLogoUrl;

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="text-[18px] font-bold text-[#111827]">Live Screen Preview</div>
            <div className="text-[11px] text-[#6b7280]">Preview how the Screen will look</div>

            <div className="mt-4 rounded-2xl border border-[#ececec] bg-white shadow-sm overflow-hidden">
             
                <div
                    className="relative bg-cover bg-center bg-no-repeat px-4 py-4 text-white"
                    style={{ backgroundImage: `url('${headerBg}')` }}
                >
                    <div className="grid grid-cols-[70px_1fr_70px] items-center">
                       
                        <div className="flex items-center justify-start">
                            {hasLogo ? (
                                <img
                                    src={draft.screenLogoUrl}
                                    alt="Logo"
                                    className="h-16 w-auto object-contain"
                                />
                            ) : null}
                        </div>

                        <div className="text-center">
                            <div className="text-[9px] tracking-[0.25em] font-semibold opacity-95">
                                WELCOME TO
                            </div>
                            <div className="text-[14px] font-extrabold leading-tight">
                                {draft.templateName || "EVENT NAME"}
                            </div>
                        </div>

                        <div />
                    </div>
                </div>

                <div
                    className="p-4 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${bodyBg}')` }}
                >
                    <div className="w-full max-w-[420px] mx-auto text-left space-y-3">
                        {draft.guestFields.map((f) => (
                            <div key={f.id} className="space-y-1">
                                <div className="text-[11px] font-semibold text-[#111827]">
                                    {f.label || "Label"}
                                </div>

                                <input
                                    disabled
                                    placeholder={f.fieldName || "Field"}
                                    className="w-full h-10 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 text-[12px] text-[#111827] outline-none"
                                />
                            </div>
                        ))}

                        <div className="pt-2">
                            {draft.enableCheckoutTag ? (
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="h-10 rounded-lg text-white text-[12px] font-semibold bg-gradient-to-b from-[#008236] to-[#00A63E]"
                                    >
                                        Check In
                                    </button>
                                    <button
                                        type="button"
                                        className="h-10 rounded-lg text-white text-[12px] font-semibold bg-gradient-to-b from-[#E0656A] to-[#9B353A]"
                                    >
                                        Check Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="w-full h-10 rounded-lg text-white text-[12px] font-semibold bg-gradient-to-b from-[#008236] to-[#00A63E]"
                                >
                                    Check In
                                </button>
                            )}
                        </div>

                        <div className="pt-2 text-[11px] text-[#6b7280]">
                            Event Type: <span className="font-semibold">{draft.eventType}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}