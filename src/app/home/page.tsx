import HomeClient from "./HomeClient";

async function fetchSports() {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/?apiKey=${process.env.API_KEY}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const sports = await fetchSports();
  return <HomeClient sports={sports} />;
}
