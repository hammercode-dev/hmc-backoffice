import { WarrantyClaim } from "@/modules/warranty-claim";
import { products } from "./product";

type ClaimMap = Record<string, WarrantyClaim>;

const claims: ClaimMap = {
  "123": {
    id: "123",
    customer: { id: "123", name: "John Doe", email: "johndoe@gmail.com" },
    product: products["100"],
    description: "product is broken",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  "124": {
    id: "124",
    customer: { id: "123", name: "John Doe", email: "johndoe@gmail.com" },
    product: products["200"],
    description: "product is broken",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  "125": {
    id: "125",
    customer: { id: "124", name: "Alex", email: "alex@gmail.com" },
    product: products["300"],
    description: "product is broken",
    status: "rejected",
    createdAt: new Date().toISOString(),
  },
  "126": {
    id: "126",
    customer: { id: "124", name: "Mark", email: "mark@gmail.com" },
    product: products["400"],
    description: "product is broken",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
};

const DB_KEY = "__wt-warranty-claims" as const;

function persistClaimMap(data: ClaimMap) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function retrieveClaimMap(): ClaimMap {
  return JSON.parse(localStorage.getItem(DB_KEY) || "{}");
}

export const warrantyClaimStorage = {
  init() {
    if (!localStorage.getItem(DB_KEY)) {
      persistClaimMap(claims);
    }
  },
  reset() {
    persistClaimMap(claims);
  },
  getAll(): WarrantyClaim[] {
    const data = retrieveClaimMap();
    return Object.values(data);
  },
  updateStatus(id: string, status: "rejected" | "approved"): WarrantyClaim {
    const data = retrieveClaimMap();
    const claim = data[id];
    if (!claim) throw new Error(`Warranty claim with ID: ${id} is not exist`);

    if (claim.status !== "pending")
      throw new Error(`Status should be pending before approval/rejection`);

    claim.status = status;

    persistClaimMap(data);

    return data[id];
  },
} as const;
