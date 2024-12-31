export interface TechEvent {
  id: number;
  title: string;
  /**
   * Unique slug to be used in event link
   */
  slug: string;
  price: number;
  start_date: string;
  end_date?: string;
  venue_name: string;
  attendee: number;
  capacity: number;
}
