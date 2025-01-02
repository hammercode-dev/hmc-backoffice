import { Payment } from "@/modules/payment";

export interface GetPaymentListResponse {
  data: Payment[];
}

export interface UpdatePaymentStatusParams {
  status: "paid" | "pending";
}

export interface UpdatePaymentStatusResponse {
  success: boolean;
  message: string;
}
