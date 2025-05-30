import DetailsClient from "./DetailsClient";

const REGIONS = "us,uk,eu";
const MARKETS = "h2h";
const DATE_FORMAT = "iso";
const ODDS_FORMAT = "decimal";

async function fetchEventOdds(sport: string, odd: string) {
  const url = `https://api.the-odds-api.com/v4/sports/${sport}/events/${odd}/odds?apiKey=${process.env.API_KEY}&regions=${REGIONS}&markets=${MARKETS}&dateFormat=${DATE_FORMAT}&oddsFormat=${ODDS_FORMAT}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function DetailsPage({
  params,
}: {
  params: { sport: string; odd: string };
}) {
  const event = await fetchEventOdds(params.sport, params.odd);
  return <DetailsClient event={event} />;
}
