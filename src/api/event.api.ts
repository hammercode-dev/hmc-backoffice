import { GetEventListResponse } from "./event.types";

export const eventApi = {
  getAll(params: ): Promise<GetEventListResponse> {
    return Promise.resolve({
      events: [],
      pagination: {
        page: 1,
        total: 2,
        total_page: 1,
      },
    });
  },
} as const;
