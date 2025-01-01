import { http, HttpResponse } from 'msw';
import { GetEventListResponse } from '@/api/event-api.types'
import { TechEvent } from '@/modules/events';

const data: TechEvent[] = [
  {
    id: 1,
    title: "Golang & Flutter Workshop",
    venue_name: "Dinas Perpustakaan",
    start_date: "2035-01-02T16:00:00.000Z",
    end_date: "2035-01-03T16:00:00.000Z",
    slug: "golang-and-flutter-workshop",
    price: 25000,
    attendee: 20,
    capacity: 20,
    is_online: true,
    is_published: true,
    type: 'workshop',
    image_url: '',
    description: '',
  },
  {
    id: 2,
    title: "Testing React App with RTL",
    venue_name: "Telkom Palu",
    start_date: "2035-02-02T16:00:00.000Z",
    end_date: "2035-02-03T16:00:00.000Z",
    slug: "react-testing-app-with-rtl",
    price: 15000,
    attendee: 20,
    capacity: 40,
    is_online: true,
    is_published: true,
    type: 'techtalk',
    image_url: '',
    description: '',
  },
]

const success: GetEventListResponse = {
  data,
  pagination: {
    page: 1,
    total: 2,
    total_page: 1,
  }
}

const handlers = [
  http.get('https://lms-be-development.hammercode.org/api/v1/admin/events', () => {
    return HttpResponse.json(success);
  }),
]

export { handlers }
