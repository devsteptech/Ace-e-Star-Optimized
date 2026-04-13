import { get, post, put, del } from "@/repositories/http";
import type { TemplateDraft } from "@/types/templateEditorTypes";
import type { Template } from "@/types/templateTypes";

type BackendTemplate = any;

function uid() {
    return Math.random().toString(36).slice(2, 10);
}

function mapDraftToPayload(draft: TemplateDraft) {
    return {
        templateName: draft.templateName,
        eventType: draft.eventType,
        guestFields: draft.guestFields,
        enableCheckoutTag: draft.enableCheckoutTag,

        thumbnailUrl: draft.thumbnailUrl,

        screen: {
            headerBgUrl: draft.screenBgUrl,
            bodyBgUrl: draft.screenBgUrl,
            logoUrl: draft.screenLogoUrl,
        },

        checkInTag: {
            size: draft.checkInTagSize,
            bgUrl: draft.checkInBgUrl,
            logoUrl: draft.checkInLogoUrl,
        },

        checkOutTag: {
            size: draft.checkOutTagSize,
            bgUrl: draft.checkOutBgUrl,
            logoUrl: draft.checkOutLogoUrl,
        },

        checkOutTagText: draft.checkOutTagText,
    };
}

function mapBackendTemplateToDraft(t: BackendTemplate): TemplateDraft {
    return {
        templateName: t?.templateName ?? "",
        eventType: t?.eventType ?? "Wedding",

        guestFields:
            Array.isArray(t?.guestFields) && t.guestFields.length
                ? t.guestFields.map((f: any) => ({
                    id: f.id ?? uid(),
                    label: f.label ?? "",
                    fieldName: f.fieldName ?? "",
                }))
                : [{ id: uid(), label: "", fieldName: "" }],

        enableCheckoutTag: !!t?.enableCheckoutTag,

        checkInTagSize: t?.checkInTag?.size ?? "8x2",
        checkOutTagSize: t?.checkOutTag?.size ?? "8x2",
        checkOutTagText: t?.checkOutTagText ?? "",

        thumbnailUrl: t?.thumbnailUrl ?? "",

        screenBgUrl: t?.screen?.headerBgUrl ?? "",
        screenLogoUrl: t?.screen?.logoUrl ?? "",

        checkInBgUrl: t?.checkInTag?.bgUrl ?? "",
        checkInLogoUrl: t?.checkInTag?.logoUrl ?? "",

        checkOutBgUrl: t?.checkOutTag?.bgUrl ?? "",
        checkOutLogoUrl: t?.checkOutTag?.logoUrl ?? "",
    };
}

export const templatesRepo = {
    list() {
        return get<Template[]>("/api/templates", { authMode: "admin" });
    },

    async create(draft: TemplateDraft) {
        const res = await post<{ card: Template }>(
            "/api/templates",
            mapDraftToPayload(draft),
            { authMode: "admin" }
        );
        return res.card;
    },

    async update(id: string, draft: TemplateDraft) {
        const res = await put<{ card: Template }>(
            `/api/templates/${id}`,
            mapDraftToPayload(draft),
            { authMode: "admin" }
        );
        return res.card;
    },

    remove(id: string) {
        return del<{ message: string }>(`/api/templates/${id}`, { authMode: "admin" });
    },

    async getDraft(id: string) {
        const doc = await get<BackendTemplate>(`/api/templates/${id}`, { authMode: "admin" });
        return mapBackendTemplateToDraft(doc);
    },
};