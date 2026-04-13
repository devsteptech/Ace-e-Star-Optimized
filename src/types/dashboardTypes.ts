import { Guest } from "./guestTypes";


export type DashboardEvent = {
    id: string;
    name: string;
    venue: string;
    eventDate: string;
};

export type DashboardData = {
    event: DashboardEvent | null;
    checkedIn: number;
    expected: number;
    attendance: number;
    activeEvents: number;
    totalGuests: number;
    guests: Guest[];
};