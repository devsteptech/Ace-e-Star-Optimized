import type { EventItem } from "../types/eventTypes";
import { endEventApi, listEventsApi } from "@/repositories/events.repo";

export async function fetchEvents(): Promise<EventItem[]> {
  return await listEventsApi();
}

export async function endEvent(id: string): Promise<EventItem> {
  return await endEventApi(id);
}