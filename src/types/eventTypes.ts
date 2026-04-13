export type EventStatus = "On Going" | "Completed";
export type EventTemplateType = "Wedding" | "Birthday" | "Funeral";

export type EventItem = {
    id: string;
    name: string;
    date: string;
    template?: string;
    startTime?: string;
    status?: "On Going" | "Completed";
    endTime?: string;

    logoUrl?: string;
    eventManagerEmail?: string;
};