export type AdminUser = {
    id: string;
    role: "admin";
    email: string;
};

export type EventManUser = {
    email: string;
    role: "eventman";
    eventId: string;
    eventName: string;
};

export type AdminLoginResponse = {
    token: string;
    user: AdminUser;
};

export type EventManLoginResponse = {
    token: string;
    user: EventManUser;
};

export type MeResponse = {
    user: any;
};