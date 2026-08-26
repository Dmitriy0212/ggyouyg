import type { Camper } from "@/lib/api";

export default function CamperCard({ camper }: { camper: Camper }) {
  const image = camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original;
  return <article className="card">
    {image ? <img src={image} alt={camper.name} /> : <div />}
    <div>
      <div style={{display:"flex",justifyContent:"space-between",gap:16}}><h2>{camper.name}</h2><strong>€{camper.price.toLocaleString()}</strong></div>
      <div className="meta"><span>★ {camper.rating}</span><span>{camper.location}</span><span>{camper.transmission}</span><span>{camper.engine}</span></div>
      <p className="muted">{camper.description}</p>
      <a className="btn" href={`/catalog/${camper.id}`} target="_blank" rel="noreferrer">Show more</a>
    </div>
  </article>;
}
