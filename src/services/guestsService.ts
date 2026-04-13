import { eventmanGuestsRepo } from "@/repositories/eventmanGuests.repo";
import type { GuestListItem } from "../types/guestListTypes";

function normalizeType(t: any): string {
    const s = String(t ?? "").toLowerCase();
    if (s.includes("walk")) return "Walk-in";
    return t ? String(t) : "Pre-registered";
}

export async function fetchGuestList(): Promise<GuestListItem[]> {
    const rows = await eventmanGuestsRepo.list();

    return (rows || []).map((g: any, idx: number) => ({
        id: String(g.id || g._id || idx),

        name: String(g.name || ""),
        relation: String(g.relation || ""),

        fields: g.fields && typeof g.fields === "object" ? g.fields : undefined,

        status: String(g.status || "Pending"),
        checkInTime: String(g.checkInTime || "-"),
        type: normalizeType(g.type),
    }));
}