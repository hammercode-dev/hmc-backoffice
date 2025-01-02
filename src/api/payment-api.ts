// TODO: implement the real API call
import { Payment } from "@/modules/payment";
import {
  GetPaymentListResponse,
  UpdatePaymentStatusParams,
  UpdatePaymentStatusResponse,
} from "./payment-api.types";

const payments: Payment[] = [
  {
    id: 1,
    method: "manual_transfer",
    payee_name: "John",
    payee_email: "john@gmail.com",
    payee_phone: "+62234234234",
    amount: 15000,
    file_url: "https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY",
    status: "pending",
    created_at: "2024-01-01T00:00:00.000Z",
    meta: { type: "event", id: 1 },
  },
  {
    id: 2,
    method: "flip",
    payee_name: "Mark",
    payee_email: "mark@gmail.com",
    payee_phone: "+62234234234",
    amount: 15000,
    payment_link: 'https:flip.com/$hmcode/abc',
    status: "paid",
    created_at: "2024-01-01T00:00:00.000Z",
    meta: { type: "event", id: 1 },
  },
  {
    id: 3,
    method: "flip",
    payee_name: "Harry",
    payee_email: "harry@gmail.com",
    payee_phone: "+62234234234",
    amount: 15000,
    payment_link: 'https:flip.com/$hmcode/abc',
    status: "paid",
    created_at: "2024-01-01T00:00:00.000Z",
    meta: { type: "class", id: 1 },
  },
];

export const paymentApi = {
  getPayments(): Promise<GetPaymentListResponse> {
    return Promise.resolve({
      data: payments,
    });
  },
  /**
   * Update payment status of a payment with "manual_transfer" method
   * @param id Payment ID
   * @param params
   * @returns
   */
  updateStatus(
    id: string,
    params: UpdatePaymentStatusParams,
  ): Promise<UpdatePaymentStatusResponse> {
    console.log("Updating payment status for ID:", id, params);
    return Promise.resolve({
      success: true,
      message: "Successfully updated the payment status",
    });
  },
} as const;
