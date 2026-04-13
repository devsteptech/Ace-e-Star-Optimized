import { get, post, put, del } from "@/repositories/http";
function normalizeList(data) {
    if (Array.isArray(data))
        return data;
    if (Array.isArray(data?.guests))
        return data.guests;
    if (Array.isArray(data?.data))
        return data.data;
    return [];
}
export const eventmanGuestsRepo = {
    async list() {
        const data = await get("/api/eventman/guests", { authMode: "user" });
        return normalizeList(data);
    },
    edit: (id, payload) => put(`/api/eventman/guests/${id}`, payload, { authMode: "user" }),
    remove: (id) => del(`/api/eventman/guests/${id}`, { authMode: "user" }),
    walkIn: (payload) => post(`/api/eventman/walkin`, payload, { authMode: "user" }),
    checkIn: (payload) => post(`/api/eventman/checkin`, payload, { authMode: "user" }),
    checkOut: (payload) => post(`/api/eventman/checkout`, payload, { authMode: "user" }),
};
