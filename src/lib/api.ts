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
  headers: { "Content-Type": "application/json" },
});

export type CamperFilters = {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
  page?: number;
  limit?: number;
};

export async function getCampers(filters: CamperFilters = {}) {
  const params = Object.fromEntries(
    Object.entries({ ...filters, limit: filters.limit ?? 4 }).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  );

  const { data } = await api.get<CamperList>("/campers", { params });
  return data;
}

export async function getCamper(id: string) {
  const { data } = await api.get<Camper>(`/campers/${encodeURIComponent(id)}`);
  return data;
}

// The provided campers API is read-only for the booking flow used in this task.
// Keep the booking request isolated so it can be replaced with the exact booking
// endpoint when it is exposed by the backend contract.
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
