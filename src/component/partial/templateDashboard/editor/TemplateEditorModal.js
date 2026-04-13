import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import StepTimeline from "./StepTimeline";
import Step1ScreenTemplate from "./steps/Step1ScreenTemplate";
import Step2CheckInTag from "./steps/Step2CheckInTag";
import Step3CheckOutTag from "./steps/Step3CheckOutTag";
import Step4Finalizing from "./steps/Step4Finalizing";
import LiveScreenPreview from "./preview/LiveScreenPreview";
import { uploadImageApi } from "@/repositories/uploads.repo";
import { templatesRepo } from "@/repositories/templates.repo";
import { useTemplateEditor } from "@/hooks/useTemplateEditor";
export default function TemplateEditorModal({ open, onClose, onSubmit, templateId, }) {
    const editor = useTemplateEditor();
    const [guestListOpen, setGuestListOpen] = useState(false);
    const [walkingGuestOpen, setWalkingGuestOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const screenBgRef = useRef(null);
    const screenLogoRef = useRef(null);
    const thumbnailRef = useRef(null);
    const checkInBgRef = useRef(null);
    const checkInLogoRef = useRef(null);
    const checkOutBgRef = useRef(null);
    const checkOutLogoRef = useRef(null);
    async function handleUpload(file, onDone) {
        setUploading(true);
        try {
            const url = await uploadImageApi(file);
            onDone(url);
        }
        finally {
            setUploading(false);
        }
    }
    useEffect(() => {
        if (!open)
            return;
        if (!templateId)
            return;
        setLoadingEdit(true);
        templatesRepo.getDraft(templateId)
            .then((d) => editor.loadDraft(d))
            .catch(() => { })
            .finally(() => setLoadingEdit(false));
    }, [open, templateId]);
    useEffect(() => {
        if (!open)
            return;
        const onKeyDown = (e) => {
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
    if (!open)
        return null;
    const maxStep = editor.draft.enableCheckoutTag ? 4 : 3;
    const isFinal = editor.step === maxStep;
    const backBtnClass = editor.step === 1
        ? "cursor-pointer h-10 px-10 rounded-lg bg-[#2f2f2f] text-white text-[12px] font-semibold"
        : "cursor-pointer h-10 px-10 rounded-lg bg-[#575757] text-white text-[12px] font-semibold";
    const rightBtnClass = isFinal
        ? "cursor-pointer h-10 px-10 rounded-lg bg-[#5b5b5b] text-white text-[12px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        : "cursor-pointer h-10 px-10 rounded-lg text-white font-semibold text-[12px] bg-[linear-gradient(90deg,#ff3389_0%,#ff6dc2_100%)] disabled:opacity-60 disabled:cursor-not-allowed";
    return (_jsxs("div", { className: "fixed inset-0 z-[999]", children: [_jsx("button", { type: "button", className: "absolute inset-0 bg-black/30", "aria-label": "Close template editor", onClick: () => {
                    editor.reset();
                    onClose();
                } }), _jsx("input", { ref: screenBgRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file)
                        return;
                    handleUpload(file, editor.setScreenBgUrl).catch(() => { });
                } }), _jsx("input", { ref: screenLogoRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file)
                        return;
                    handleUpload(file, editor.setScreenLogoUrl).catch(() => { });
                } }), _jsx("input", { ref: thumbnailRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file)
                        return;
                    handleUpload(file, editor.setThumbnailUrl).catch(() => { });
                } }), _jsx("input", { ref: checkInBgRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file)
                        return;
                    handleUpload(file, editor.setCheckInBgUrl).catch(() => { });
                } }), _jsx("input", { ref: checkInLogoRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file)
                        return;
                    handleUpload(file, editor.setCheckInLogoUrl).catch(() => { });
                } }), _jsx("input", { ref: checkOutBgRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file)
                        return;
                    handleUpload(file, editor.setCheckOutBgUrl).catch(() => { });
                } }), _jsx("input", { ref: checkOutLogoRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
                    const file = e.target.files?.[0];
                    e.currentTarget.value = "";
                    if (!file)
                        return;
                    handleUpload(file, editor.setCheckOutLogoUrl).catch(() => { });
                } }), _jsx("div", { className: "relative h-full w-full p-3 sm:p-6", children: _jsx("div", { className: "relative mx-auto max-w-[1280px] w-full h-full bg-white rounded-2xl border border-[#ececec] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden", children: _jsxs("div", { className: "h-full w-full p-4 sm:p-6 flex flex-col", children: [_jsx("div", { className: "text-center text-[14px] sm:text-[16px] font-bold text-[#111827]", children: "Template Editor" }), _jsx("div", { className: "mt-4", children: _jsx(StepTimeline, { step: editor.step, enableCheckoutTag: editor.draft.enableCheckoutTag }) }), _jsx("div", { className: "mt-6 flex-1 min-h-0 overflow-y-auto modal-scroll pb-6", children: loadingEdit ? (_jsx("div", { className: "p-6 text-center text-[13px] text-[#6b7280]", children: "Loading template..." })) : (_jsxs(_Fragment, { children: [editor.step === 1 && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [_jsx("div", { className: "space-y-4", children: _jsx(Step1ScreenTemplate, { draft: editor.draft, onTemplateName: editor.setTemplateName, onEventType: editor.setEventType, onAddField: editor.addField, onMoveField: editor.moveField, onRemoveField: editor.removeField, onUpdateFieldLabel: editor.updateFieldLabel, onUpdateFieldName: editor.updateFieldName, onToggleCheckoutTag: editor.setEnableCheckoutTag, onAddBackground: () => screenBgRef.current?.click(), onAddLogo: () => screenLogoRef.current?.click(), onAddPhoto: () => thumbnailRef.current?.click(), uploading: uploading }) }), _jsx(LiveScreenPreview, { draft: editor.draft })] })), editor.step === 2 && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [_jsx(Step2CheckInTag, { draft: editor.draft, variant: "details", tagSize: editor.draft.checkInTagSize, onTagSizeChange: editor.setCheckInTagSize, onAddBackground: () => checkInBgRef.current?.click(), onAddLogo: () => checkInLogoRef.current?.click(), uploading: uploading }), _jsx(Step2CheckInTag, { draft: editor.draft, variant: "preview", tagSize: editor.draft.checkInTagSize })] })), editor.step === 3 && editor.draft.enableCheckoutTag && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [_jsx(Step3CheckOutTag, { draft: editor.draft, variant: "details", tagSize: editor.draft.checkOutTagSize, onTagSizeChange: editor.setCheckOutTagSize, text: editor.draft.checkOutTagText, onTextChange: editor.setCheckOutTagText, onAddBackground: () => checkOutBgRef.current?.click(), onAddLogo: () => checkOutLogoRef.current?.click(), uploading: uploading }), _jsx(Step3CheckOutTag, { draft: editor.draft, variant: "preview", tagSize: editor.draft.checkOutTagSize, text: editor.draft.checkOutTagText })] })), isFinal && (_jsx(Step4Finalizing, { draft: editor.draft, onOpenGuestList: () => setGuestListOpen(true), onOpenWalkingGuest: () => setWalkingGuestOpen(true) }))] })) }), _jsxs("div", { className: "pt-5 border-t border-[#f0f0f0] flex items-center justify-between", children: [_jsx("button", { type: "button", onClick: () => {
                                            if (editor.step === 1) {
                                                editor.reset();
                                                onClose();
                                            }
                                            else {
                                                editor.back();
                                            }
                                        }, className: backBtnClass, children: editor.step === 1 ? "Cancel" : "Back" }), _jsx("button", { type: "button", disabled: !editor.canContinue || uploading || loadingEdit, onClick: () => {
                                            if (!isFinal)
                                                return editor.next();
                                            onSubmit?.(editor.draft, templateId || undefined);
                                            editor.reset();
                                            onClose();
                                        }, className: rightBtnClass, children: isFinal ? (uploading ? "Uploading..." : "Finish") : "Continue" })] })] }) }) })] }));
}
