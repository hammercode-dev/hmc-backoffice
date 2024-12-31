import { GetEventListParams, GetEventListResponse } from "./event.types";

export const eventApi = {
  getAll(params: GetEventListParams): Promise<GetEventListResponse> {
    return Promise.resolve({
      data: [],
      meta: params,
      pagination: {
        page: 1,
        total: 2,
        total_page: 1,
      },
    });
  },
} as const;
