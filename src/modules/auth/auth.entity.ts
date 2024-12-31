export type Role = "admin" | "staff"

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}
