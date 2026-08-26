"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import CamperCard from "@/components/CamperCard";
import { getCampers } from "@/lib/api";

const PAGE_SIZE = 4;
const bodies = ["alcove", "fullyIntegrated", "panelTruck", "integrated"];

export default function CatalogPage() {
  const [location,setLocation]=useState(""); const [form,setForm]=useState(""); const [engine,setEngine]=useState(""); const [transmission,setTransmission]=useState("");
  const filters={location,form,engine,transmission};
  const query=useInfiniteQuery({queryKey:["campers",filters],initialPageParam:1,queryFn:({pageParam})=>getCampers({...filters,page:pageParam,limit:PAGE_SIZE}),getNextPageParam:(last,all)=>last.items.length===PAGE_SIZE?all.length+1:undefined});
  const items=query.data?.pages.flatMap(p=>p.items)??[];
  const reset=()=>{setLocation("");setForm("");setEngine("");setTransmission("")};
  return <><header className="header"><div className="container nav"><div className="logo">TravelTrucks</div><nav className="navlinks"><a href="/">Home</a><a href="/catalog">Catalog</a></nav></div></header><main className="page"><div className="container catalogGrid"><aside className="filters"><div className="field"><label>Location</label><input value={location} onChange={e=>setLocation(e.target.value)} placeholder="City"/></div><div className="field"><label>Body type</label><div className="choices">{bodies.map(v=><button type="button" key={v} className={`choice ${form===v?"active":""}`} onClick={()=>setForm(form===v?"":v)}>{v}</button>)}</div></div><div className="field"><label>Engine</label><select value={engine} onChange={e=>setEngine(e.target.value)}><option value="">Any</option><option value="diesel">Diesel</option><option value="petrol">Petrol</option></select></div><div className="field"><label>Transmission</label><select value={transmission} onChange={e=>setTransmission(e.target.value)}><option value="">Any</option><option value="automatic">Automatic</option><option value="manual">Manual</option></select></div><button className="btn" onClick={reset}>Reset filters</button></aside><section><h1>Campers</h1>{query.isLoading&&<div className="spinner">Loading campers…</div>}{query.isError&&<div className="error">Unable to load campers. Please try again.</div>}<div className="cards">{items.map(c=><CamperCard key={c.id} camper={c}/>)}</div>{!query.isLoading&&!items.length&&<p>No campers found.</p>}{query.hasNextPage&&<button className="btn loadMore" disabled={query.isFetchingNextPage} onClick={()=>query.fetchNextPage()}>{query.isFetchingNextPage?"Loading…":"Load More"}</button>}</section></div></main></>;
}
