import { useMemo, useState } from "react";
function uid() {
    return Math.random().toString(36).slice(2, 10);
}
const DEFAULT_GUEST_FIELDS = [
    { id: "name", label: "Your Name", fieldName: "name" },
    { id: "relation", label: "Your Relation", fieldName: "relation" },
];
function makeInitialDraft() {
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
function normalizeLoadedDraft(d) {
    const base = makeInitialDraft();
    const rawFields = Array.isArray(d?.guestFields) ? d.guestFields : [];
    const guestFields = rawFields.length > 0
        ? rawFields.map((f, idx) => ({
            id: String(f?.id || `${idx}_${uid()}`),
            label: String(f?.label ?? ""),
            fieldName: String(f?.fieldName ?? ""),
        }))
        : base.guestFields;
    const enableCheckoutTag = !!d?.enableCheckoutTag;
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
    const [step, setStep] = useState(1);
    const [draft, setDraft] = useState(() => makeInitialDraft());
    const maxStep = draft.enableCheckoutTag ? 4 : 3;
    const canContinue = useMemo(() => {
        if (step === 1) {
            return draft.templateName.trim().length > 0 && draft.eventType?.length > 0;
        }
        return true;
    }, [step, draft.templateName, draft.eventType]);
    const next = () => setStep((nextStep) => (nextStep < maxStep ? (nextStep + 1) : nextStep));
    const back = () => setStep((backStep) => (backStep > 1 ? (backStep - 1) : backStep));
    const reset = () => {
        setStep(1);
        setDraft(makeInitialDraft());
    };
    const loadDraft = (d) => {
        setStep(1);
        setDraft(normalizeLoadedDraft(d));
    };
    const setTemplateName = (v) => setDraft((p) => ({ ...p, templateName: v }));
    const setEventType = (v) => setDraft((p) => ({ ...p, eventType: v }));
    const addField = () => setDraft((p) => ({
        ...p,
        guestFields: [...p.guestFields, { id: uid(), label: "", fieldName: "" }],
    }));
    const moveField = (id, dir) => setDraft((p) => {
        const idx = p.guestFields.findIndex((x) => x.id === id);
        if (idx < 0)
            return p;
        const nextIdx = dir === "up" ? idx - 1 : idx + 1;
        if (nextIdx < 0 || nextIdx >= p.guestFields.length)
            return p;
        const copy = [...p.guestFields];
        const tmp = copy[idx];
        copy[idx] = copy[nextIdx];
        copy[nextIdx] = tmp;
        return { ...p, guestFields: copy };
    });
    const removeField = (id) => setDraft((p) => ({ ...p, guestFields: p.guestFields.filter((x) => x.id !== id) }));
    const updateFieldLabel = (id, label) => setDraft((p) => ({
        ...p,
        guestFields: p.guestFields.map((x) => (x.id === id ? { ...x, label } : x)),
    }));
    const updateFieldName = (id, fieldName) => setDraft((p) => ({
        ...p,
        guestFields: p.guestFields.map((x) => (x.id === id ? { ...x, fieldName } : x)),
    }));
    const setEnableCheckoutTag = (v) => setDraft((p) => ({
        ...p,
        enableCheckoutTag: v,
        ...(v ? {} : { checkOutBgUrl: "", checkOutLogoUrl: "", checkOutTagText: "" }),
    }));
    const setCheckInTagSize = (v) => setDraft((p) => ({ ...p, checkInTagSize: v }));
    const setCheckOutTagSize = (v) => setDraft((p) => ({ ...p, checkOutTagSize: v }));
    const setCheckOutTagText = (v) => setDraft((p) => ({ ...p, checkOutTagText: v }));
    const setThumbnailUrl = (url) => setDraft((p) => ({ ...p, thumbnailUrl: url }));
    const setScreenBgUrl = (url) => setDraft((p) => ({ ...p, screenBgUrl: url }));
    const setScreenLogoUrl = (url) => setDraft((p) => ({ ...p, screenLogoUrl: url }));
    const setCheckInBgUrl = (url) => setDraft((p) => ({ ...p, checkInBgUrl: url }));
    const setCheckInLogoUrl = (url) => setDraft((p) => ({ ...p, checkInLogoUrl: url }));
    const setCheckOutBgUrl = (url) => setDraft((p) => ({ ...p, checkOutBgUrl: url }));
    const setCheckOutLogoUrl = (url) => setDraft((p) => ({ ...p, checkOutLogoUrl: url }));
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
