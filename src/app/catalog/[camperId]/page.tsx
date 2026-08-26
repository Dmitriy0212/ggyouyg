"use client";
import { use, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getCamper, bookCamper } from "@/lib/api";
import type { BookingPayload } from "@/lib/api";

export default function CamperDetails({ params }: { params: Promise<{ camperId: string }> }) {
  const { camperId } = use(params);
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [date,setDate]=useState(""); const [comment,setComment]=useState("");
  const query=useQuery({queryKey:["camper",camperId],queryFn:()=>getCamper(camperId)});
  const booking=useMutation({mutationFn:(payload:BookingPayload)=>bookCamper(payload),onSuccess:()=>{toast.success("Booking submitted successfully!");setName("");setEmail("");setDate("");setComment("");},onError:()=>toast.error("Could not submit booking.")});
  if(query.isLoading) return <main className="page"><div className="container spinner">Loading camper…</div></main>;
  if(query.isError||!query.data) return <main className="page"><div className="container error">Camper not found.</div></main>;
  const c=query.data;
  return <main className="details"><div className="container"><a href="/catalog">← Back to catalog</a><h1>{c.name}</h1><div className="meta"><span>★ {c.rating}</span><span>{c.location}</span><strong>€{c.price.toLocaleString()}</strong></div><div className="gallery">{c.gallery?.map((g,i)=><img key={i} src={g.original||g.thumb} alt={`${c.name} ${i+1}`} />)}</div><div className="detailsLayout"><section className="detailsBox"><h2>{c.name}</h2><p>{c.description}</p><h3>Specifications</h3><div className="meta"><span>Form: {c.form}</span><span>Length: {c.length}</span><span>Width: {c.width}</span><span>Height: {c.height}</span><span>Tank: {c.tank}</span><span>Consumption: {c.consumption}</span><span>Engine: {c.engine}</span><span>Transmission: {c.transmission}</span></div><h2>Reviews</h2>{c.reviews?.map((r,i)=><article className="review" key={i}><strong>{r.reviewer_name}</strong><div className="stars">{"★".repeat(Math.max(0,Math.min(5,r.reviewer_rating)))}{"☆".repeat(Math.max(0,5-r.reviewer_rating))}</div><p>{r.comment}</p></article>)}</section><form className="booking" onSubmit={e=>{e.preventDefault();if(!name||!email||!date)return toast.error("Fill in all required fields.");booking.mutate({camperId:c.id,name,email,date,comment});}}><h2>Book your camper</h2><p className="muted">Choose your dates and leave your contact details.</p><div className="field"><label>Name</label><input required value={name} onChange={e=>setName(e.target.value)} /></div><div className="field"><label>Email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div><div className="field"><label>Booking date</label><input required type="date" value={date} onChange={e=>setDate(e.target.value)} /></div><div className="field"><label>Comment</label><textarea rows={4} value={comment} onChange={e=>setComment(e.target.value)} /></div><button className="btn" disabled={booking.isPending}>{booking.isPending?"Sending…":"Send booking"}</button></form></div></div></main>;
}
