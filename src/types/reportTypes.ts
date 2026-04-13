export type ReportTemplate = "Wedding" | "Birthday" | "Funeral" | "Corporate" | "Other";

export type ReportItem = {
    id: string;
    name: string;
    template: ReportTemplate;
    date: string;
    time: string;
};