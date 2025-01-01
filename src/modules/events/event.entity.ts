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
  start_date: string;
  end_date?: string;
  venue_name: string;
  attendee: number;
  capacity: number;
}
