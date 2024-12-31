import { http, HttpResponse } from 'msw';
import { GetEventListResponse } from '../../src/api/event.types'
const success: GetEventListResponse = {
  data: [
    { id: 1, title: 'Awesome event', price: 15000, capacity: 100 },
    { id: 2, title: 'Another event', price: 20000, capacity: 20 },
  ],
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
