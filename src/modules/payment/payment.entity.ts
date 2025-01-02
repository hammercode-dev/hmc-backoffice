export interface Payment {
  id: number;
  method: "flip" | "manual_transfer" | "cash";
  payee_name: string;
  payee_email: string;
  payee_phone?: string;
  amount: number;
  ref_id?: string;
  /**
   * Only preset if the method is 'flip'
   */
  payment_link?: string;
  /**
   * File url is receipt uploaded by payee. only preset if the method is 'manual_transfer'
   */
  file_url?: string;
  status: "pending" | "paid";
  paid_at?: string
  created_at: string;
  meta: { type: "event" | "class"; id: number };
}
