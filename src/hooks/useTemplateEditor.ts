import { EventType, TagSize, TemplateDraft, TemplateStep } from "@/types/templateEditorTypes";
import { useMemo, useState } from "react";

function uid() {
    return Math.random().toString(36).slice(2, 10);
}


const DEFAULT_GUEST_FIELDS = [
    { id: "name", label: "Your Name", fieldName: "name" },
    { id: "relation", label: "Your Relation", fieldName: "relation" },
];

function makeInitialDraft(): TemplateDraft {
    return {
        templateName: "",
        eventType: "Wedding",

        guestFields: DEFAULT_GUEST_FIELDS.map((f) => ({ ...f })),

        enableCheckoutTag: false,

        checkInTagSize: "8x2",
        checkOutTagSize: "8x2",
        checkOutTagText: "",

        thumbnailUrl: "",
        screenBgUrl: "",
        screenLogoUrl: "",
        checkInBgUrl: "",
        checkInLogoUrl: "",
        checkOutBgUrl: "",
        checkOutLogoUrl: "",
    };
}


function normalizeLoadedDraft(d: TemplateDraft): TemplateDraft {
    const base = makeInitialDraft();

    const rawFields = Array.isArray((d as any)?.guestFields) ? (d as any).guestFields : [];
    const guestFields =
        rawFields.length > 0
            ? rawFields.map((f: any, idx: number) => ({
                id: String(f?.id || `${idx}_${uid()}`),
                label: String(f?.label ?? ""),
                fieldName: String(f?.fieldName ?? ""),
            }))
            : base.guestFields;

    const enableCheckoutTag = !!(d as any)?.enableCheckoutTag;

    return {
        ...base,
        ...d,
        guestFields,

        enableCheckoutTag,
        ...(enableCheckoutTag
            ? {}
            : {
                checkOutBgUrl: "",
                checkOutLogoUrl: "",
                checkOutTagText: "",
            }),
    };
}

export function useTemplateEditor() {
    const [step, setStep] = useState<TemplateStep>(1);

    const [draft, setDraft] = useState<TemplateDraft>(() => makeInitialDraft());

    const maxStep: TemplateStep = draft.enableCheckoutTag ? 4 : 3;

    const canContinue = useMemo(() => {
        if (step === 1) {
            return draft.templateName.trim().length > 0 && draft.eventType?.length > 0;
        }
        return true;
    }, [step, draft.templateName, draft.eventType]);

    const next = () => setStep((nextStep) => (nextStep < maxStep ? ((nextStep + 1) as TemplateStep) : nextStep));
    const back = () => setStep((backStep) => (backStep > 1 ? ((backStep - 1) as TemplateStep) : backStep));

    const reset = () => {
        setStep(1);

        setDraft(makeInitialDraft());
    };

    const loadDraft = (d: TemplateDraft) => {
        setStep(1);
        setDraft(normalizeLoadedDraft(d));
    };

    const setTemplateName = (v: string) => setDraft((p:TemplateDraft) => ({ ...p, templateName: v }));
    const setEventType = (v: EventType) => setDraft((p:TemplateDraft) => ({ ...p, eventType: v }));

    const addField = () =>
        setDraft((p:TemplateDraft) => ({
            ...p,
            guestFields: [...p.guestFields, { id: uid(), label: "", fieldName: "" }],
        }));

    const moveField = (id: string, dir: "up" | "down") =>
        setDraft((p:TemplateDraft) => {
            const idx = p.guestFields.findIndex((x) => x.id === id);
            if (idx < 0) return p;
            const nextIdx = dir === "up" ? idx - 1 : idx + 1;
            if (nextIdx < 0 || nextIdx >= p.guestFields.length) return p;
            const copy = [...p.guestFields];
            const tmp = copy[idx];
            copy[idx] = copy[nextIdx];
            copy[nextIdx] = tmp;
            return { ...p, guestFields: copy };
        });

    const removeField = (id: string) =>
        setDraft((p:TemplateDraft) => ({ ...p, guestFields: p.guestFields.filter((x) => x.id !== id) }));

    const updateFieldLabel = (id: string, label: string) =>
        setDraft((p:TemplateDraft) => ({
            ...p,
            guestFields: p.guestFields.map((x) => (x.id === id ? { ...x, label } : x)),
        }));

    const updateFieldName = (id: string, fieldName: string) =>
        setDraft((p:TemplateDraft) => ({
            ...p,
            guestFields: p.guestFields.map((x) => (x.id === id ? { ...x, fieldName } : x)),
        }));

    const setEnableCheckoutTag = (v: boolean) =>
        setDraft((p:TemplateDraft) => ({
            ...p,
            enableCheckoutTag: v,
            ...(v ? {} : { checkOutBgUrl: "", checkOutLogoUrl: "", checkOutTagText: "" }),
        }));

    const setCheckInTagSize = (v: TagSize) => setDraft((p:TemplateDraft) => ({ ...p, checkInTagSize: v }));
    const setCheckOutTagSize = (v: TagSize) => setDraft((p:TemplateDraft) => ({ ...p, checkOutTagSize: v }));
    const setCheckOutTagText = (v: string) => setDraft((p:TemplateDraft) => ({ ...p, checkOutTagText: v }));

    const setThumbnailUrl = (url: string) => setDraft((p:TemplateDraft) => ({ ...p, thumbnailUrl: url }));
    const setScreenBgUrl = (url: string) => setDraft((p:TemplateDraft) => ({ ...p, screenBgUrl: url }));
    const setScreenLogoUrl = (url: string) => setDraft((p:TemplateDraft) => ({ ...p, screenLogoUrl: url }));
    const setCheckInBgUrl = (url: string) => setDraft((p:TemplateDraft) => ({ ...p, checkInBgUrl: url }));
    const setCheckInLogoUrl = (url: string) => setDraft((p:TemplateDraft) => ({ ...p, checkInLogoUrl: url }));
    const setCheckOutBgUrl = (url: string) => setDraft((p:TemplateDraft) => ({ ...p, checkOutBgUrl: url }));
    const setCheckOutLogoUrl = (url: string) => setDraft((p:TemplateDraft) => ({ ...p, checkOutLogoUrl: url }));

    return {
        step,
        draft,
        canContinue,
        next,
        back,
        reset,
        loadDraft,

        setTemplateName,
        setEventType,
        addField,
        moveField,
        removeField,
        updateFieldLabel,
        updateFieldName,
        setEnableCheckoutTag,

        setCheckInTagSize,
        setCheckOutTagSize,
        setCheckOutTagText,

        setThumbnailUrl,
        setScreenBgUrl,
        setScreenLogoUrl,
        setCheckInBgUrl,
        setCheckInLogoUrl,
        setCheckOutBgUrl,
        setCheckOutLogoUrl,
    };
}