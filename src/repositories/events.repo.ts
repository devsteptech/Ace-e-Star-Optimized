import { get, post } from "@/repositories/http";
import { api } from "@/config/axios";
import type { EventItem } from "@/types/eventTypes";

export function listEventsApi() {
  return get<EventItem[]>("/api/events", { authMode: "admin" });
}

export function createEventApi(payload: {
  templateId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  description: string;
  expectedGuests: string;
  eventManagerEmail: string;
  logoUrl: string;
}) {
  return post<{ message: string; eventId: string }>("/api/events", payload, { authMode: "admin" });
}

export async function validateGuestsFileApi(templateId: string, file: File) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("templateId", templateId);

  const res = await api.post("/api/events/guests/validate", fd, { authMode: "admin" } as any);

  const data = res?.data;
  if (!data || data.ok !== true) {
    throw new Error(data?.message || "Invalid guest file");
  }

  return data;
}

export async function importGuestsApi(eventId: string, file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await api.post(`/api/events/${eventId}/guests/import`, fd, { authMode: "admin" } as any);
  return res.data;
}

export function getEventCredentialsApi(eventId: string) {
  return get<{ eventManagerEmail: string; password: string | number; logoUrl?: string }>(
    `/api/events/${eventId}/credentials`,
    { authMode: "admin" }
  );
}

export function endEventApi(eventId: string) {
  return post<EventItem>(`/api/events/${eventId}/end`, undefined, { authMode: "admin" });
}