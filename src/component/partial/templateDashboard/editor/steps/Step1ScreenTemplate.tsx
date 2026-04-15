import type { EventType, TemplateDraft } from "../../../../../types/templateEditorTypes";

function PreviewTile({
    label,
    url,
}: {
    label: string;
    url?: string | null;
}) {
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

export default function Step1ScreenTemplate({
    draft,
    onTemplateName,
    onEventType,
    onMoveField,
    onRemoveField,
    onUpdateFieldLabel,
    onUpdateFieldName,
    onToggleCheckoutTag,

    onAddBackground,
    onAddLogo,
    onAddPhoto,
    uploading,
}: {
    draft: TemplateDraft;
    onTemplateName: (v: string) => void;
    onEventType: (v: EventType) => void;
    onMoveField: (id: string, dir: "up" | "down") => void;
    onRemoveField: (id: string) => void;
    onUpdateFieldLabel: (id: string, label: string) => void;
    onUpdateFieldName: (id: string, fieldName: string) => void;
    onToggleCheckoutTag: (v: boolean) => void;

    onAddBackground: () => void;
    onAddLogo: () => void;
    onAddPhoto: () => void;
    uploading: boolean;
}) {
    const inputClass =
        "w-full h-10 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 text-[13px] text-black outline-none focus:border-[#FCC125]";

    const hasAnyScreenAsset = !!(draft.screenBgUrl || draft.screenLogoUrl || (draft as any).thumbnailUrl);

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-4 sm:p-5">
            <div className="text-[14px] font-bold text-[#111827]">Template Details</div>
            <div className="text-[11px] text-[#6b7280] mt-1">
                Configure your Screen template settings
            </div>

            <div className="mt-4 space-y-4">
                <div>
                    <div className="text-[12px] font-semibold text-[#111827] mb-2">Template Name</div>
                    <input
                        value={draft.templateName}
                        onChange={(e) => onTemplateName(e.target.value)}
                        placeholder="Enter template name"
                        className={inputClass}
                    />
                </div>

                <div>
                    <div className="text-[12px] font-semibold text-[#111827] mb-2">Event Type</div>

                    <div className="relative">
                        <select
                            value={draft.eventType}
                            onChange={(e) => onEventType(e.target.value as EventType)}
                            className={`${inputClass} pr-10 appearance-none`}
                        >
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Other">Other</option>
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

                <div className="pt-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[15px] font-bold text-[#111827]">Guest Information Fields</div>
                            <div className="text-[12px] text-[#6b7280]">Drag to reorder fields</div>
                        </div>
                    </div>

                    <div className="mt-3 space-y-3">
                        {draft.guestFields.map((f, idx) => (
                            <div
                                key={f.id}
                                className="rounded-xl border border-[#ececec] bg-white p-3 flex items-center gap-3"
                            >
                                <div className="flex flex-col gap-1">
                                    <button
                                        type="button"
                                        className="w-7 h-7 rounded-md border border-[#e5e7eb] bg-white text-[#111827] text-[12px] disabled:opacity-40"
                                        onClick={() => onMoveField(f.id, "up")}
                                        disabled={idx === 0}
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        className="w-7 h-7 rounded-md border border-[#e5e7eb] bg-white text-[#111827] text-[12px] disabled:opacity-40"
                                        onClick={() => onMoveField(f.id, "down")}
                                        disabled={idx === draft.guestFields.length - 1}
                                    >
                                        ↓
                                    </button>
                                </div>

                                <div className="flex-1 space-y-2">
                                    <input
                                        value={f.label}
                                        onChange={(e) => onUpdateFieldLabel(f.id, e.target.value)}
                                        placeholder="Label"
                                        className={inputClass}
                                    />
                                    <input
                                        value={f.fieldName}
                                        onChange={(e) => onUpdateFieldName(f.id, e.target.value)}
                                        placeholder="Field"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            disabled={uploading}
                            className="cursor-pointer h-10 rounded-lg bg-[#2f2f2f] text-white text-[12px] font-semibold disabled:opacity-60"
                            onClick={onAddBackground}
                        >
                            Add Background
                        </button>
                        <button
                            type="button"
                            disabled={uploading}
                            className="cursor-pointer h-10 rounded-lg bg-[#2f2f2f] text-white text-[12px] font-semibold disabled:opacity-60"
                            onClick={onAddLogo}
                        >
                            Add Logo
                        </button>
                    </div>

                    <button
                        type="button"
                        disabled={uploading}
                        className="mt-3 cursor-pointer w-full h-10 rounded-lg bg-[#2f2f2f] text-white text-[12px] font-semibold disabled:opacity-60"
                        onClick={onAddPhoto}
                    >
                        Add Photo (Grid Thumbnail)
                    </button>

                    {/* ✅ Uploaded assets preview (no flow change, just show) */}
                    {hasAnyScreenAsset && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <PreviewTile label="Screen Background" url={draft.screenBgUrl} />
                            <PreviewTile label="Screen Logo" url={draft.screenLogoUrl} />
                            <PreviewTile label="Thumbnail" url={(draft as any).thumbnailUrl} />
                        </div>
                    )}

                    <label className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#111827]">
                        <input
                            type="checkbox"
                            className="accent-[#FCC125]"
                            checked={draft.enableCheckoutTag}
                            onChange={(e) => onToggleCheckoutTag(e.target.checked)}
                        />
                        Check Out Tag
                    </label>
                </div>
            </div>
        </div>
    );
}