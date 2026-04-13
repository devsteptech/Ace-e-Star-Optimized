export type EventManConfigResponse = {
    event: { id: string; name: string; logoUrl: string; templateId: string; templateType: string };
    template: {
        templateName: string;
        eventType: string;
        enableCheckoutTag: boolean;
        guestFields: { id: string; label: string; fieldName: string }[];
        screen: { headerBgUrl?: string; bodyBgUrl?: string; logoUrl?: string };
        checkInTag: { size?: string; bgUrl?: string; logoUrl?: string };
        checkOutTag: { size?: string; bgUrl?: string; logoUrl?: string };
        checkOutTagText: string;
    };
};