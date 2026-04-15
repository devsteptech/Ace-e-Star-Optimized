import type { TagSize, TemplateDraft } from "../../../../../types/templateEditorTypes";

function PreviewTile({ label, url }: { label: string; url?: string | null }) {
    if (!url) return null;
    return (
        <div className="rounded-xl border border-[#ececec] bg-white p-3">
            <div className="text-[11px] font-semibold text-[#111827] mb-2">{label}</div>
            <div className="w-full h-[92px] rounded-lg overflow-hidden border border-[#e5e7eb] bg-[#f3f4f6]">
                <img src={url} alt={label} className="w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default function Step3CheckOutTag({
    draft,
    variant,
    tagSize,
    onTagSizeChange,
    text,
    onTextChange,

    onAddBackground,
    onAddLogo,
    uploading,
}: {
    draft: TemplateDraft;
    variant: "details" | "preview";
    tagSize: TagSize;
    onTagSizeChange?: (v: TagSize) => void;
    text: string;
    onTextChange?: (v: string) => void;

    onAddBackground?: () => void;
    onAddLogo?: () => void;
    uploading?: boolean;
}) {
    const selectClass =
        "w-full h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-[13px] text-black outline-none focus:border-[#FCC125] shadow-[0_10px_25px_rgba(0,0,0,0.08)]";

    const inputClass =
        "w-full h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-[13px] text-black outline-none focus:border-[#FCC125] shadow-[0_10px_25px_rgba(0,0,0,0.08)]";

    const sizeMap: Record<TagSize, { w: number; h: number }> = {
        "8x2": { w: 520, h: 120 },
        "6x2": { w: 420, h: 120 },
        "4x2": { w: 320, h: 120 },
    };

    if (variant === "details") {
        const hasAssets = !!(draft.checkOutBgUrl || draft.checkOutLogoUrl);

        return (
            <div className="space-y-5">
                <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-4 sm:p-5">
                    <div className="text-[14px] font-bold text-[#111827]">
                        Check Out Tag Template Details
                    </div>
                    <div className="text-[11px] text-[#6b7280] mt-1">
                        Configure your badge template settings
                    </div>

                    <div className="mt-4 space-y-4">
                        <div>
                            <div className="text-[12px] font-semibold text-[#111827] mb-2">
                                Select Tag Size
                            </div>

                            <div className="relative">
                                <select
                                    value={tagSize}
                                    onChange={(e) => onTagSizeChange?.(e.target.value as TagSize)}
                                    className={`${selectClass} pr-10 appearance-none`}
                                >
                                    <option value="8x2">8x2</option>
                                    <option value="6x2">6x2</option>
                                    <option value="4x2">4x2</option>
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
                        </div>

                        <div>
                            <div className="text-[12px] font-semibold text-[#111827] mb-2">
                                Write text
                            </div>
                            <input
                                value={text}
                                onChange={(e) => onTextChange?.(e.target.value)}
                                placeholder="Write text"
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-4 sm:p-5 min-h-fit">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            disabled={!!uploading}
                            className="cursor-pointer h-14 rounded-xl bg-[#2f2f2f] text-white text-[12px] font-semibold disabled:opacity-60"
                            onClick={() => onAddBackground?.()}
                        >
                            Add Background
                        </button>

                        <button
                            type="button"
                            disabled={!!uploading}
                            className="cursor-pointer h-14 rounded-xl bg-[#2f2f2f] text-white text-[12px] font-semibold disabled:opacity-60"
                            onClick={() => onAddLogo?.()}
                        >
                            Add Logo
                        </button>
                    </div>

                    {/* ✅ show uploaded images */}
                    {hasAssets && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <PreviewTile label="Check-Out Background" url={draft.checkOutBgUrl} />
                            <PreviewTile label="Check-Out Logo" url={draft.checkOutLogoUrl} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const size = sizeMap[tagSize];
    const message = text?.trim().length ? text : "Thank You For Coming";

    const bg = draft.checkOutBgUrl || "/bg-images/checkoutbg.png";
    const logo = draft.checkOutLogoUrl || draft.screenLogoUrl;

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-4 sm:p-5 min-h-fit flex flex-col items-center justify-center">
            <div className="text-center text-[16px] sm:text-[18px] font-bold text-[#111827]">
                Check Out Tag Preview
            </div>

            <div className="mt-8 w-full flex justify-center">
                <div
                    className="rounded-xl overflow-hidden border border-[#ececec] shadow-[0_18px_55px_rgba(0,0,0,0.18)]"
                    style={{ width: size.w, height: size.h, maxWidth: "100%" }}
                >
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat px-6 flex items-center"
                        style={{ backgroundImage: `url('${bg}')` }}
                    >
                        <div className="w-full grid grid-cols-[70px_1fr_70px] items-center">
                            <div className="flex items-center justify-start">
                                {logo ? <img src={logo} alt="Logo" className="h-16 w-auto object-contain" /> : null}
                            </div>

                            <div className="text-center">
                                <div className="text-[11px] font-extrabold tracking-wide text-[#111827] uppercase">
                                    {draft.templateName || "Event Name"}
                                </div>

                                <div className="mt-2 text-[16px] sm:text-[18px] font-extrabold text-[#111827]">
                                    {message}
                                </div>
                            </div>

                            <div />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}