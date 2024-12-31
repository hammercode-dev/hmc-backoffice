import { User } from "@/modules/auth";

const AUTH_KEY = "__hmc-backoffice-auth-key";

export interface UserRecord extends User {
  password: string;
}

export const authStorage = {
  storeKey(key: string) {
    localStorage.setItem(AUTH_KEY, key);
  },
  getKey() {
    return localStorage.getItem(AUTH_KEY) || "";
  },
  evictKey() {
    localStorage.removeItem(AUTH_KEY);
  },
} as const;
