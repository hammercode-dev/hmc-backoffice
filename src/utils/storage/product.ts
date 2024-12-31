import { Product } from "@/modules/events";

type ProductMap = Record<string, Product>;

export const products: ProductMap = {
  "100": {
    id: "100",
    name: "Iphone 6",
    price: 200,
    createdAt: new Date().toISOString(),
  },
  "200": {
    id: "200",
    name: "Iphone 7",
    price: 220,
    createdAt: new Date().toISOString(),
  },
  "300": {
    id: "300",
    name: "Samsung Galaxy 12",
    price: 300,
    createdAt: new Date().toISOString(),
  },
  "400": {
    id: "400",
    name: "Iphone 9",
    price: 260,
    createdAt: new Date().toISOString(),
  },
};

const DB_KEY = "__wt-products" as const;

function persistProductMap(data: ProductMap) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function retrieveProductMap(): ProductMap {
  return JSON.parse(localStorage.getItem(DB_KEY) || "{}");
}

export const productStorage = {
  init() {
    if (!localStorage.getItem(DB_KEY)) {
      persistProductMap(products);
    }
  },
  reset() {
    persistProductMap(products);
  },
  getAll(): Product[] {
    const data = retrieveProductMap();
    return Object.values(data).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },
  getById(id: string): Product | null {
    const data = retrieveProductMap();
    return data[id] || null;
  },
  add(product: Product): Product {
    const data = retrieveProductMap();
    data[product.id] = product;
    persistProductMap(data);

    return product;
  },
  update(product: Product): Product {
    const data = retrieveProductMap();
    data[product.id] = product;
    persistProductMap(data);

    return product;
  },
  remove(id: string): string {
    const data = retrieveProductMap();
    delete data[id];
    persistProductMap(data);

    return id;
  },
} as const;
