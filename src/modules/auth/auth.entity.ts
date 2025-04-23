export type Role = "admin" | "staff"

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
}
