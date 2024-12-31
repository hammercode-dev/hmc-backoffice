import { TechEvent } from "@/modules/events";

export type GetEventListParams = {
  start?: string;
  end?: string;
};

export type GetEventListResponse = {
  data: Array<TechEvent>;
  pagination: {
    page: number;
    total_page: number;
    total: number;
  };
};
