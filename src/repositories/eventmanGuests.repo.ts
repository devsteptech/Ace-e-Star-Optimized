import { get, post, put, del } from "@/repositories/http";

export type FeedbackItem = {
    label: string;
    value: string;
};

export type FieldsMap = Record<string, string>;

export type WalkInPayload = {
    name: string;
    relation: string;
    action: "checkin" | "checkout";
    fields?: FieldsMap;              
    feedback?: FeedbackItem[];
};

export type CheckInPayload = {
    name: string;
    relation: string;
    fields?: FieldsMap;              
    feedback?: FeedbackItem[];
};

export type CheckOutPayload = {
    name: string;
    relation: string;
    fields?: FieldsMap;      
};

export type GuestRow = {
    id?: string;
    _id?: string;
    name: string;
    relation: string;
    status: string;
    checkInTime?: string;
    type?: string;

    fields?: FieldsMap;
};

function normalizeList(data: any): GuestRow[] {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.guests)) return data.guests;
    if (Array.isArray(data?.data)) return data.data;
    return [];
}

export const eventmanGuestsRepo = {
    async list(): Promise<GuestRow[]> {
        const data = await get<any>("/api/eventman/guests", { authMode: "user" });
        return normalizeList(data);
    },

    edit: (id: string, payload: { name: string; relation: string }) =>
        put<any>(`/api/eventman/guests/${id}`, payload, { authMode: "user" }),

    remove: (id: string) =>
        del<any>(`/api/eventman/guests/${id}`, { authMode: "user" }),

    walkIn: (payload: WalkInPayload) =>
        post<any>(`/api/eventman/walkin`, payload, { authMode: "user" }),

    checkIn: (payload: CheckInPayload) =>
        post<any>(`/api/eventman/checkin`, payload, { authMode: "user" }),

    checkOut: (payload: CheckOutPayload) =>
        post<any>(`/api/eventman/checkout`, payload, { authMode: "user" }),
};