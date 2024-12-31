import { TechEvent } from "@/modules/events";
import { GetEventListParams, GetEventListResponse } from "./event-api.types";

const events: TechEvent[] = [
  {
    id: 3,
    title: "Golang & Flutter Workshop",
    venue_name: "Dinas Perpustakaan",
    start_date: "2025-01-02T16:00:00.000Z",
    end_date: "2025-01-03T16:00:00.000Z",
    slug: "golang-and-flutter-workshop",
    price: 25000,
    attendee: 20,
    capacity: 20,
  },
  {
    id: 2,
    title: "Testing React App with RTL",
    venue_name: "Telkom Palu",
    start_date: "2025-02-02T16:00:00.000Z",
    slug: "react-testing-app-with-rtl",
    price: 15000,
    attendee: 35,
    capacity: 40,
  },
  {
    id: 1,
    title: "Palu Dev Day 2025",
    venue_name: "Hotel Santika",
    start_date: "2025-11-29T16:00:00.000Z",
    slug: "react-testing-app-with-rtl",
    price: 35000,
    attendee: 0,
    capacity: 300,
  },
];

export const eventApi = {
  getAll(params: GetEventListParams): Promise<GetEventListResponse> {
    return Promise.resolve({
      data: events,
      meta: params,
      pagination: {
        page: 1,
        total: 2,
        total_page: 1,
      },
    });
  },
} as const;