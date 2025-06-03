import HomeClient from "./HomeClient";
<<<<<<< Updated upstream
import { Sport, Event } from "@/types";

const REGIONS = "us,uk,eu";
const MARKETS = "h2h";
=======
>>>>>>> Stashed changes

async function fetchSports() {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/?apiKey=${process.env.API_KEY}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

<<<<<<< Updated upstream
async function fetchEventsForSports(sports: Sport[]) {
  const events: Record<string, Event[]> = {};

  // Process all sports but filter those with events later
  await Promise.all(
    sports.map(async (sport) => {
      try {
        const res = await fetch(
          `https://api.the-odds-api.com/v4/sports/${sport.key}/odds/?apiKey=${process.env.API_KEY}&regions=${REGIONS}&markets=${MARKETS}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        console.log(data);
        events[sport.key] = Array.isArray(data) ? data : [];
      } catch {
        events[sport.key] = [];
      }
    })
  );
  return events;
}

export default async function HomePage() {
  const sports = await fetchSports();
  const events = await fetchEventsForSports(sports);

  // Filter sports that have at least one event
  const sportsWithEvents = sports.filter(
    (sport: Sport) => events[sport.key]?.length > 0
  );

  return <HomeClient sports={sportsWithEvents} initialEvents={events} />;
=======
export default async function HomePage() {
  const sports = await fetchSports();
  return <HomeClient sports={sports} />;
>>>>>>> Stashed changes
}
