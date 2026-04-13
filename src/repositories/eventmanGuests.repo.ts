import { get, post, put, del } from "@/repositories/http";

export type WalkInPayload = {
    name: string;
    relation: string;
    action: "checkin" | "checkout";
};

export type GuestRow = {
    id?: string;
    _id?: string;
    name: string;
    relation: string;
    status: string;
    checkInTime?: string;
    type?: string;
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

    checkIn: (payload: { name: string; relation: string }) =>
        post<any>(`/api/eventman/checkin`, payload, { authMode: "user" }),

    checkOut: (payload: { name: string; relation: string }) =>
        post<any>(`/api/eventman/checkout`, payload, { authMode: "user" }),
};