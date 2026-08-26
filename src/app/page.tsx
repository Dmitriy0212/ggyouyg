import Link from "next/link";

export default function Home() {
  return <><header className="header"><div className="container nav"><div className="logo">TravelTrucks</div><nav className="navlinks"><Link href="/">Home</Link><Link href="/catalog">Catalog</Link></nav></div></header><main className="hero"><div className="container heroContent"><h1>Campers for your next adventure</h1><p>Find a camper that fits your trip and explore the road with comfort and freedom.</p><Link className="btn" href="/catalog">View Now</Link></div></main><footer className="footer">TravelTrucks</footer></>;
}
