import { authStorage } from "./auth";

export const storage = {
  auth: authStorage,
} as const;
