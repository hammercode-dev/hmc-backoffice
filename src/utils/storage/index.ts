import { authStorage } from "./auth";
import { productStorage } from "./product";
import { warrantyClaimStorage } from "./warranty-claim";

export const storage = {
  auth: authStorage,
  product: productStorage,
  warrantyClaim: warrantyClaimStorage,
} as const;
