import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import ToastProvider from "@/components/ToastProvider";

export const metadata: Metadata = { title: "TravelTrucks — Camper rentals", description: "Find and book a camper for your next trip." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers><ToastProvider />{children}</Providers></body></html>;
}
