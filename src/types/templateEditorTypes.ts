export type EventType = "Wedding" | "Birthday" | "Corporate" | "Other";

export type TagSize = "8x2" | "6x2" | "4x2";

export type GuestField = {
    id: string;
    label: string;
    fieldName: string;
};

export type TemplateDraft = {
    templateName: string;
    eventType: EventType;
    guestFields: GuestField[];
    enableCheckoutTag: boolean;

    checkInTagSize: TagSize;

    checkOutTagSize: TagSize;
    checkOutTagText: string;
    thumbnailUrl: string;

    screenBgUrl: string;
    screenLogoUrl: string;

    checkInBgUrl: string;
    checkInLogoUrl: string;

    checkOutBgUrl: string;
    checkOutLogoUrl: string;
};

export type TemplateStep = 1 | 2 | 3 | 4;