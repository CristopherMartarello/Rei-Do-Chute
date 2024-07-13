"use server";

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export default async function getTodayMatches() {
  const response = await fetch(`https://api.football-data.org/v4/matches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token || '',
    },
  });
  const result = await response.json();
  return result;
}
