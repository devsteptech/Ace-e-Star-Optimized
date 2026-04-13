import type { TagSize, TemplateDraft } from "../../../../../types/templateEditorTypes";

const sizeMap: Record<TagSize, { w: number; h: number }> = {
    "8x2": { w: 520, h: 120 },
    "6x2": { w: 420, h: 120 },
    "4x2": { w: 320, h: 120 },
};

function CardTitle({ title }: { title: string }) {
    return (
        <div className="text-center">
            <div className="text-[16px] sm:text-[18px] font-bold text-[#111827]">
                {title}
            </div>
            <div className="text-[11px] text-[#6b7280] mt-1">
                Preview how the Screen will look
            </div>
        </div>
    );
}

function LiveScreenPreviewFinal({
    draft,
    onOpenGuestList,
    onOpenWalkingGuest,
}: {
    draft: TemplateDraft;
    onOpenGuestList: () => void;
    onOpenWalkingGuest: () => void;
}) {
    const headerBg = "/bg-images/previewheaderbg.png";
    const hasLogo = !!draft.screenLogoUrl;

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[430px] flex flex-col items-center justify-center">
            <CardTitle title="Live Screen Preview" />

            <div className="mt-10 w-full flex justify-center">
                <div className="w-full max-w-[520px]">
                    <div className="rounded-2xl overflow-hidden border border-[#ececec] shadow-[0_18px_55px_rgba(0,0,0,0.18)] bg-white">
                        <div
                            className="relative bg-cover bg-center bg-no-repeat px-5 py-6 text-white"
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
                                    <div className="mt-1 text-[16px] font-extrabold leading-tight text-[#111827]">
                                        {draft.templateName || "EVENT NAME"}
                                    </div>
                                </div>

                                <div />
                            </div>
                        </div>

                        <div className="p-5 bg-white">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold bg-gradient-to-b from-[#008236] to-[#00A63E]"
                                >
                                    Check In
                                </button>

                                {draft.enableCheckoutTag ? (
                                    <button
                                        type="button"
                                        className="cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold bg-gradient-to-b from-[#E0656A] to-[#9B353A]"
                                    >
                                        Check Out
                                    </button>
                                ) : null}

                                <button
                                    type="button"
                                    onClick={onOpenGuestList}
                                    className="cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold bg-[linear-gradient(90deg,#ffc145_0%,#dba61f_100%)]"
                                >
                                    Guest List
                                </button>

                                <button
                                    type="button"
                                    onClick={onOpenWalkingGuest}
                                    className="cursor-pointer w-full h-10 rounded-lg text-white text-[12px] font-semibold bg-[linear-gradient(90deg,#ffc145_0%,#dba61f_100%)]"
                                >
                                    Add Walking Guest
                                </button>
                            </div>

                            <div className="mt-3 text-center text-[11px] text-[#6b7280]">
                                Preview how the Screen will look
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CheckInTagPreviewFinal({
    draft,
    tagSize,
}: {
    draft: TemplateDraft;
    tagSize: TagSize;
}) {
    const size = sizeMap[tagSize];

    const bg = draft.checkInBgUrl || "/bg-images/previewheaderbg.png";
    const logo = draft.checkInLogoUrl || draft.screenLogoUrl;

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[205px] flex flex-col items-center justify-center">
            <CardTitle title="Check In Tag Preview" />

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
                                {logo ? (
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-16 w-auto object-contain"
                                    />
                                ) : null}
                            </div>

                            <div className="text-center">
                                <div className="text-[11px] font-extrabold tracking-wide text-[#111827] uppercase">
                                    {draft.templateName || "Event Name"}
                                </div>

                                <div className="mt-2 text-[18px] sm:text-[20px] font-extrabold text-[#111827] leading-tight">
                                    John Smith
                                </div>

                                <div className="text-[12px] font-medium text-[#374151] opacity-80 leading-tight">
                                    Groom&apos;s Uncle
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

function CheckOutTagPreviewFinal({
    draft,
    tagSize,
    text,
}: {
    draft: TemplateDraft;
    tagSize: TagSize;
    text: string;
}) {
    const size = sizeMap[tagSize];
    const message = text?.trim().length ? text : "Thank You For Coming";

    const bg = draft.checkOutBgUrl || "/bg-images/checkoutbg.png";
    const logo = draft.checkOutLogoUrl || draft.screenLogoUrl;

    return (
        <div className="bg-white border border-[#ececec] rounded-2xl shadow-sm p-4 sm:p-6 min-h-[205px] flex flex-col items-center justify-center">
            <CardTitle title="Check Out Tag Preview" />

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
                                {logo ? (
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-16 w-auto object-contain"
                                    />
                                ) : null}
                            </div>

                            <div className="text-center">
                                <div className="text-[11px] font-extrabold tracking-wide text-[#111827] uppercase">
                                    {draft.templateName || "Event Name"}
                                </div>

                                <div className="mt-2 text-[16px] sm:text-[18px] font-extrabold text-[#111827] leading-tight">
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

export default function Step4Finalizing({
    draft,
    onOpenGuestList,
    onOpenWalkingGuest,
}: {
    draft: TemplateDraft;
    onOpenGuestList: () => void;
    onOpenWalkingGuest: () => void;
}) {
    return (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <LiveScreenPreviewFinal
                draft={draft}
                onOpenGuestList={onOpenGuestList}
                onOpenWalkingGuest={onOpenWalkingGuest}
            />

            <div className="space-y-5">
                <CheckInTagPreviewFinal draft={draft} tagSize={draft.checkInTagSize} />

                {draft.enableCheckoutTag && (
                    <CheckOutTagPreviewFinal
                        draft={draft}
                        tagSize={draft.checkOutTagSize}
                        text={draft.checkOutTagText}
                    />
                )}
            </div>
        </div>
    );
}