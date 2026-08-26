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
  AC?: boolean; bathroom?: boolean; kitchen?: boolean; TV?: boolean; radio?: boolean; refrigerator?: boolean; microwave?: boolean; gas?: boolean; water?: boolean;
};

type CamperList = { total: number; items: Camper[] };

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || "https://campers-api.goit.study" });

export async function getCampers(params: Record<string, string | number | undefined>) {
  const { data } = await api.get<CamperList>("/campers", { params });
  return data;
}

export async function getCamper(id: string) {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
}

export async function bookCamper(id: string, payload: { name: string; email: string; bookingDate: string; comment: string }) {
  const { data } = await api.post(`/campers/${id}/booking`, payload);
  return data;
}
