import axios from "axios";
import { MatchDoc } from "../firebase/matches";
import ActualTips from "./ActualTips";
import Header from "./Header";
import RoundPanel from "./RoundPanel";
import { useEffect, useState } from "react";
import getTodayMatches from "../actions/todayMatches";
import LiveMatches from "./LiveMatches";

export interface TodayScore {
  duration: string;
  fullTime: {away: any, home: any}
  halfTime: {away: any, home: any}
  winner: any
}
export interface TodayCompetition {
  code: string;
  emblem: string;
  id: number;
  name: string;
  type: string
}
export interface TodayTeam {
  crest: string;
  id: number;
  name: string;
  shortName: string;
  tla: string
}
export interface TodayMatch {
  id: number;
  area: {code: string, flag: string, id: number, name: string};
  awayTeam: TodayTeam;
  competition: TodayCompetition;
  homeTeam: TodayTeam;
  lastUpdated: string;
  matchDay: number;
  score: TodayScore;
  utcDate: string
}

interface HomeProps {
  matchData: MatchDoc[];
}

const Home = ({ matchData }: HomeProps) => {
  const [isAfterMatch, setIsAfterMatch] = useState(true);
  const [todayMatches, setTodayMatches] = useState<TodayMatch[]>([]);

  useEffect(() => {
    if (matchData.length > 0 && matchData[0].partidas.length > 0) {
      const now = new Date();
      const data = matchData[0].partidas[0].data;
      const hora = matchData[0].partidas[0].hora;
      const matchDate = formatDateTime(data, hora);
      const isAfterMatch = now > matchDate;

      if (isAfterMatch) {
        setIsAfterMatch(true);
      }
    }
  }, [matchData]);

  const formatDateTime = (data: string, hora: string): Date => {
    const [dia, mes] = data.split("/");
    const [horaStr, minutoStr] = hora.split(":");

    const ano = new Date().getFullYear();
    const formattedDate = new Date(
      ano,
      parseInt(mes) - 1,
      parseInt(dia),
      parseInt(horaStr),
      parseInt(minutoStr)
    );

    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodayMatches();
      setTodayMatches(data.matches);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {!isAfterMatch === true ? (
        <RoundPanel matchData={matchData} />
      ) : (
        <>
          <LiveMatches todayMatches={todayMatches} />
          <ActualTips />
        </>
      )}
    </div>
  );
};

export default Home;
