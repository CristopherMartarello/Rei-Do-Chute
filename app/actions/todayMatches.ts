"use server";

const token = process.env.NEXT_PUBLIC_API_TOKEN;
const startDate = new Date('2024-07-19T00:00:00Z');

export default async function getTodayMatches() {

  const currentDate = new Date();

  const diffTime = currentDate.getTime() - startDate.getTime();

  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  const round = 18 + Math.floor(diffDays / 3.5);
  const response = await fetch(`https://api.football-data.org/v4/competitions/BSA/matches?matchday=${round}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token || '',
    },
  });
  const result = await response.json();
  return result;
}
