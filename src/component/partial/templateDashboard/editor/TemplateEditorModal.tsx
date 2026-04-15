import { useEffect, useRef, useState } from "react";
import StepTimeline from "./StepTimeline";
import Step1ScreenTemplate from "./steps/Step1ScreenTemplate";
import Step2CheckInTag from "./steps/Step2CheckInTag";
import Step3CheckOutTag from "./steps/Step3CheckOutTag";
import Step4Finalizing from "./steps/Step4Finalizing";
import LiveScreenPreview from "./preview/LiveScreenPreview";
import type { TemplateDraft, TemplateStep } from "../../../../types/templateEditorTypes";
import { uploadImageApi } from "@/repositories/uploads.repo";
import { templatesRepo } from "@/repositories/templates.repo";
import { useTemplateEditor } from "@/hooks/useTemplateEditor";


export default function TemplateEditorModal({
    open,
    onClose,
    onSubmit,
    templateId,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit?: (draft: TemplateDraft, templateId?: string) => void;
    templateId?: string | null;
}) {
    const editor = useTemplateEditor();

    const [guestListOpen, setGuestListOpen] = useState(false);
    const [walkingGuestOpen, setWalkingGuestOpen] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);

    const screenBgRef = useRef<HTMLInputElement>(null);
    const screenLogoRef = useRef<HTMLInputElement>(null);
    const thumbnailRef = useRef<HTMLInputElement>(null);

    const checkInBgRef = useRef<HTMLInputElement>(null);
    const checkInLogoRef = useRef<HTMLInputElement>(null);

    const checkOutBgRef = useRef<HTMLInputElement>(null);
    const checkOutLogoRef = useRef<HTMLInputElement>(null);

    async function handleUpload(file: File, onDone: (url: string) => void) {
        setUploading(true);
        try {
            const url = await uploadImageApi(file);
            onDone(url);
        } finally {
            setUploading(false);
        }
    }

    useEffect(() => {
        if (!open) return;

        if (!templateId) return;

        setLoadingEdit(true);
        templatesRepo.getDraft(templateId)
            .then((d) => editor.loadDraft(d))
            .catch(() => { })
            .finally(() => setLoadingEdit(false));
    }, [open, templateId]);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                editor.reset();
                onClose();
            }
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

    const maxStep: TemplateStep = editor.draft.enableCheckoutTag ? 4 : 3;
    const isFinal = editor.step === maxStep;

    const backBtnClass =
        editor.step === 1
            ? "cursor-pointer h-10 px-10 rounded-lg bg-[#2f2f2f] text-white text-[12px] font-semibold"
            : "cursor-pointer h-10 px-10 rounded-lg bg-[#575757] text-white text-[12px] font-semibold";

    const rightBtnClass = isFinal
        ? "cursor-pointer h-10 px-10 rounded-lg bg-[#5b5b5b] text-white text-[12px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        : "cursor-pointer h-10 px-10 rounded-lg text-white font-semibold text-[12px] bg-[linear-gradient(90deg,#ff3389_0%,#ff6dc2_100%)] disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <div className="fixed inset-0 z-[999]">
            <button
                type="button"
                className="absolute inset-0 bg-black/30"
                aria-label="Close template editor"
                onClick={() => {
                    editor.reset();
                    onClose();
                }}
            />

            <input
                ref={screenBgRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file) return;
                    handleUpload(file, editor.setScreenBgUrl).catch(() => { });
                }}
            />
            <input
                ref={screenLogoRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file) return;
                    handleUpload(file, editor.setScreenLogoUrl).catch(() => { });
                }}
            />
            <input
                ref={thumbnailRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file) return;
                    handleUpload(file, editor.setThumbnailUrl).catch(() => { });
                }}
            />

            <input
                ref={checkInBgRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file) return;
                    handleUpload(file, editor.setCheckInBgUrl).catch(() => { });
                }}
            />
            <input
                ref={checkInLogoRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file) return;
                    handleUpload(file, editor.setCheckInLogoUrl).catch(() => { });
                }}
            />

            <input
                ref={checkOutBgRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file) return;
                    handleUpload(file, editor.setCheckOutBgUrl).catch(() => { });
                }}
            />
            <input
                ref={checkOutLogoRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file) return;
                    handleUpload(file, editor.setCheckOutLogoUrl).catch(() => { });
                }}
            />

            <div className="relative h-full w-full p-3 sm:p-6">
                <div className="relative mx-auto max-w-[1280px] w-full h-full bg-white rounded-2xl border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden">
                    <div className="h-full w-full p-4 sm:p-6 flex flex-col">
                        <div className="text-center text-[14px] sm:text-[16px] font-bold text-[#111827]">
                            Template Editor
                        </div>

                        <div className="mt-4">
                            <StepTimeline step={editor.step} enableCheckoutTag={editor.draft.enableCheckoutTag} />
                        </div>

                        <div className="mt-6 flex-1 min-h-0 overflow-y-auto modal-scroll pb-6">
                            {loadingEdit ? (
                                <div className="p-6 text-center text-[13px] text-[#6b7280]">
                                    Loading template...
                                </div>
                            ) : (
                                <>
                                    {editor.step === 1 && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                            <div className="space-y-4">
                                                <Step1ScreenTemplate
                                                    draft={editor.draft}
                                                    onTemplateName={editor.setTemplateName}
                                                    onEventType={editor.setEventType}
                                                    // onAddField={editor.addField}
                                                    onMoveField={editor.moveField}
                                                    onRemoveField={editor.removeField}
                                                    onUpdateFieldLabel={editor.updateFieldLabel}
                                                    onUpdateFieldName={editor.updateFieldName}
                                                    onToggleCheckoutTag={editor.setEnableCheckoutTag}
                                                    onAddBackground={() => screenBgRef.current?.click()}
                                                    onAddLogo={() => screenLogoRef.current?.click()}
                                                    onAddPhoto={() => thumbnailRef.current?.click()}
                                                    uploading={uploading}
                                                />
                                            </div>

                                            <LiveScreenPreview draft={editor.draft} />
                                        </div>
                                    )}

                                    {editor.step === 2 && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                            <Step2CheckInTag
                                                draft={editor.draft}
                                                variant="details"
                                                tagSize={editor.draft.checkInTagSize}
                                                onTagSizeChange={editor.setCheckInTagSize}
                                                onAddBackground={() => checkInBgRef.current?.click()}
                                                onAddLogo={() => checkInLogoRef.current?.click()}
                                                uploading={uploading}
                                            />
                                            <Step2CheckInTag
                                                draft={editor.draft}
                                                variant="preview"
                                                tagSize={editor.draft.checkInTagSize}
                                            />
                                        </div>
                                    )}

                                    {editor.step === 3 && editor.draft.enableCheckoutTag && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                            <Step3CheckOutTag
                                                draft={editor.draft}
                                                variant="details"
                                                tagSize={editor.draft.checkOutTagSize}
                                                onTagSizeChange={editor.setCheckOutTagSize}
                                                text={editor.draft.checkOutTagText}
                                                onTextChange={editor.setCheckOutTagText}
                                                onAddBackground={() => checkOutBgRef.current?.click()}
                                                onAddLogo={() => checkOutLogoRef.current?.click()}
                                                uploading={uploading}
                                            />
                                            <Step3CheckOutTag
                                                draft={editor.draft}
                                                variant="preview"
                                                tagSize={editor.draft.checkOutTagSize}
                                                text={editor.draft.checkOutTagText}
                                            />
                                        </div>
                                    )}

                                    {isFinal && (
                                        <Step4Finalizing
                                            draft={editor.draft}
                                            onOpenGuestList={() => setGuestListOpen(true)}
                                            onOpenWalkingGuest={() => setWalkingGuestOpen(true)}
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        <div className="pt-5 border-t border-[#f0f0f0] flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    if (editor.step === 1) {
                                        editor.reset();
                                        onClose();
                                    } else {
                                        editor.back();
                                    }
                                }}
                                className={backBtnClass}
                            >
                                {editor.step === 1 ? "Cancel" : "Back"}
                            </button>

                            <button
                                type="button"
                                disabled={!editor.canContinue || uploading || loadingEdit}
                                onClick={() => {
                                    if (!isFinal) return editor.next();
                                    onSubmit?.(editor.draft, templateId || undefined);
                                    editor.reset();
                                    onClose();
                                }}
                                className={rightBtnClass}
                            >
                                {isFinal ? (uploading ? "Uploading..." : "Finish") : "Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <GuestListModal
                isOpen={guestListOpen}
                onClose={() => setGuestListOpen(false)}
                fields={editor.draft.guestFields}
            />

            <AddWalkingGuestModal
                open={walkingGuestOpen}
                onClose={() => setWalkingGuestOpen(false)}
                fields={editor.draft.guestFields}
                enableCheckoutTag={editor.draft.enableCheckoutTag}
            /> */}
        </div>
    );
}