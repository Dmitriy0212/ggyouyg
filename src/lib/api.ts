import axios from "axios";

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  gallery: { thumb: string; original: string }[];
  reviews: { reviewer_name: string; reviewer_rating: number; comment: string }[];
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
};

type CamperList = {
  total: number;
  items: Camper[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://campers-api.goit.study";

export const api = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json" },
});

export type CamperFilters = {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
  page?: number;
  limit?: number;
};

export async function getCampers(filters: CamperFilters = {}): Promise<CamperList> {
  const params = Object.fromEntries(
    Object.entries({ ...filters, limit: filters.limit ?? 4 }).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  );

  const { data } = await api.get("/campers", { params });

  // The API can return its collection either directly or wrapped in `data`.
  // Normalize it here so the UI always receives { items, total }.
  const payload = data?.data ?? data;
  const items = Array.isArray(payload) ? payload : payload?.items ?? [];
  const total = Array.isArray(payload) ? items.length : Number(payload?.total ?? items.length);

  return { items, total };
}

export async function getCamper(id: string): Promise<Camper> {
  const { data } = await api.get<Camper>(`/campers/${encodeURIComponent(id)}`);
  return data?.data ?? data;
}

export type BookingPayload = {
  camperId: string;
  name: string;
  email: string;
  date: string;
  comment: string;
};

export async function bookCamper(payload: BookingPayload) {
  const { data } = await api.post("/bookings", payload);
  return data;
}
