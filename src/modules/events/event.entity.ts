export type TechEventType =
  | 'techtalk'
  | 'workshop'
  | 'conference'

export interface TechEvent {
  id: number;
  title: string;
  type: TechEventType;
  /**
   * Unique slug to be used in event link
   */
  slug: string;
  is_published: boolean;
  is_online: boolean;
  price: number;
  image_url: string;
  description: string;
  join_link?: string;
  start_date: string;
  end_date?: string;
  venue_name: string;
  attendee: number;
  capacity: number;
}

export interface EventAttendee {
  id: number
  name: string
  email: string
  phone?: string | null
  attend_at?: string | null
  registered_at: string
  payment: {
    ref_id?: string
    method: 'flip' | 'manual_transfer' | 'cash' | 'free'
    file_url?: string | null
    amount: number
    status: 'pending' | 'paid'
    paid_at?: string | null
  }
}
