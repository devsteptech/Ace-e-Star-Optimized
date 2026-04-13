export type AdminDashboardResponse = {
    event: null | { id: string; name: string; venue: string; eventDate: string };
    checkedIn: number;
    expected: number;
    attendance: number;
    activeEvents: number;
    totalGuests: number;
    guests: { name: string; status: string; checkInTime: string }[];
};