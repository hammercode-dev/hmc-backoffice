// TODO: implement the real API call

import { EventAttendee, TechEvent } from "@/modules/events";
import { GetEventAttendeeListResponse, GetEventListParams, GetEventListResponse } from "./event-api.types";

const events: TechEvent[] = [
  {
    id: 4,
    title: "Algo & DS for Web Dev",
    venue_name: "Dinas Perpustakaan",
    start_date: "2025-01-02T16:00:00.000Z",
    end_date: "2025-01-03T16:00:00.000Z",
    slug: "golang-and-flutter-workshop",
    price: 0,
    is_published: false,
    is_online: false,
    description: 'lorem',
    type: 'techtalk',
    image_url: '',
    attendee: 20,
    capacity: 20,
  },
  {
    id: 3,
    title: "Golang & Flutter Workshop",
    venue_name: "Dinas Perpustakaan",
    start_date: "2025-01-02T16:00:00.000Z",
    end_date: "2025-01-03T16:00:00.000Z",
    slug: "golang-and-flutter-workshop",
    price: 25000,
    is_published: true,
    is_online: false,
    description: 'lorem',
    type: 'workshop',
    image_url: '',
    attendee: 20,
    capacity: 20,
  },
  {
    id: 2,
    title: "Testing React App with RTL",
    venue_name: "Telkom Palu",
    start_date: "2025-02-02T16:00:00.000Z",
    slug: "react-testing-app-with-rtl",
    type: 'techtalk',
    price: 15000,
    is_published: true,
    is_online: false,
    description: 'lorem',
    image_url: '',
    attendee: 35,
    capacity: 40,
  },
  {
    id: 1,
    title: "Palu Dev Day 2025",
    venue_name: "Hotel Santika",
    start_date: "2025-11-29T16:00:00.000Z",
    slug: "react-testing-app-with-rtl",
    type: 'conference',
    price: 35000,
    is_published: true,
    is_online: false,
    description: 'lorem',
    image_url: '',
    attendee: 0,
    capacity: 300,
  },
];

const attendees: EventAttendee[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    registered_at: '2025-01-01T00:00:00.000Z',
    payment: {
      ref_id: '123',
      method: 'manual_transfer',
      file_url: 'https://img.com',
      amount: 20000,
      status: 'paid',
      paid_at: '2025-01-01T00:00:00.000Z',
    }
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'Jane@gmail.com',
    registered_at: '2025-01-01T00:00:00.000Z',
    payment: {
      ref_id: '123',
      method: 'manual_transfer',
      file_url: 'https://img.com',
      amount: 20000,
      status: 'paid',
      paid_at: '2025-01-01T00:00:00.000Z',
    }
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'Jane@gmail.com',
    registered_at: '2025-01-01T00:00:00.000Z',
    payment: {
      ref_id: '123',
      method: 'free',
      file_url: '',
      amount: 0,
      status: 'paid',
      paid_at: '2025-01-01T00:00:00.000Z',
    }
  }
]

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
  getAttendees(id: string): Promise<GetEventAttendeeListResponse> {
    console.log('Request get attendees for event: ', id)
    return Promise.resolve({
      data: attendees,
    })
  }
} as const;
