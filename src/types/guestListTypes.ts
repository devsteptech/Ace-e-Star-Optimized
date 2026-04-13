export type GuestStatus = "Checked In" | "Checked Out" | "Pending" | string;
export type GuestType = "Pre-registered" | "Walk-in" | string;

export type GuestListItem = {
    id: string;

    name: string;
    relation: string;

    fields?: Record<string, string>;

    status: GuestStatus;
    checkInTime: string;
    type: GuestType;
};