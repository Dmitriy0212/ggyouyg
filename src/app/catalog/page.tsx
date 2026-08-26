"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import CamperCard from "@/components/CamperCard";
import { getCampers } from "@/lib/api";

const PAGE_SIZE = 4;
const bodies = ["alcove", "fullyIntegrated", "panelTruck", "integrated"];

export default function CatalogPage() {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");

  const filters = { location, form, engine, transmission };

  const query = useInfiniteQuery({
    queryKey: ["campers", filters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCampers({ ...filters, page: pageParam, limit: PAGE_SIZE }),
    getNextPageParam: (last, all) => {
      const loaded = last.items?.length ?? 0;
      if (loaded < PAGE_SIZE) return undefined;
      return all.length + 1;
    },
  });

  const items = query.data?.pages.flatMap((page) => page.items ?? []) ?? [];

  const reset = () => {
    setLocation("");
    setForm("");
    setEngine("");
    setTransmission("");
  };

  return (
    <>
      <header className="header">
        <div className="container nav">
          <div className="logo">TravelTrucks</div>
          <nav className="navlinks">
            <a href="/">Home</a>
            <a href="/catalog">Catalog</a>
          </nav>
        </div>
      </header>

      <main className="page">
        <div className="container catalogGrid">
          <aside className="filters">
            <div className="field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City"
              />
            </div>

            <div className="field">
              <label>Body type</label>
              <div className="choices">
                {bodies.map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={`choice ${form === value ? "active" : ""}`}
                    onClick={() => setForm(form === value ? "" : value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="engine">Engine</label>
              <select id="engine" value={engine} onChange={(event) => setEngine(event.target.value)}>
                <option value="">Any</option>
                <option value="diesel">Diesel</option>
                <option value="petrol">Petrol</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="transmission">Transmission</label>
              <select
                id="transmission"
                value={transmission}
                onChange={(event) => setTransmission(event.target.value)}
              >
                <option value="">Any</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <button className="btn" onClick={reset} type="button">
              Reset filters
            </button>
          </aside>

          <section>
            <h1>Campers</h1>

            {query.isLoading && <div className="spinner">Loading campers…</div>}
            {query.isError && <div className="error">Unable to load campers. Please try again.</div>}

            <div className="cards">
              {items.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </div>

            {!query.isLoading && !query.isError && !items.length && <p>No campers found.</p>}

            {query.hasNextPage && (
              <button
                className="btn loadMore"
                disabled={query.isFetchingNextPage}
                onClick={() => query.fetchNextPage()}
                type="button"
              >
                {query.isFetchingNextPage ? "Loading…" : "Load More"}
              </button>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
