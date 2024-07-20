import { useEffect, useState } from "react";
import { MatchDoc } from "../firebase/matches";
import ActualTips from "./ActualTips";
import Header from "./Header";
import RoundPanel from "./RoundPanel";
import getTodayMatches from "../actions/todayMatches";
import LiveMatches from "./LiveMatches";
import ButtonOptions from "./ButtonOptions";
import { useAuthContext } from "../context/AuthContext";
import { getActualTipsFromUser, getUserByAuthId } from "../firebase/user";
import { UserTip } from "../utils/user-tips/usecase/user-tips.dto";

export interface TodayScore {
  duration: string;
  fullTime: { away: any; home: any };
  halfTime: { away: any; home: any };
  winner: any;
}
export interface TodayCompetition {
  code: string;
  emblem: string;
  id: number;
  name: string;
  type: string;
}
export interface TodayTeam {
  crest: string;
  id: number;
  name: string;
  shortName: string;
  tla: string;
}
export interface TodayMatch {
  id: number;
  area: { code: string; flag: string; id: number; name: string };
  awayTeam: TodayTeam;
  competition: TodayCompetition;
  homeTeam: TodayTeam;
  lastUpdated: string;
  matchday: number;
  score: TodayScore;
  utcDate: string;
}

interface HomeProps {
  matchData: MatchDoc[];
}

const Home = ({ matchData }: HomeProps) => {
  const [isAfterMatch, setIsAfterMatch] = useState(true);
  const [todayMatches, setTodayMatches] = useState<TodayMatch[]>([]);
  const [view, setView] = useState<string>("aoVivo");

  const { userAuth } = useAuthContext();
  const [actualTips, setActualTips] = useState<UserTip[]>();

  useEffect(() => {
    handleUserActualTips();
  }, []);

  const handleUserActualTips = async () => {
    if (!userAuth) return;
    const userDoc = await getUserByAuthId(userAuth.uid);
    const actualTips = await getActualTipsFromUser(userDoc.id);
    setActualTips(actualTips);
  };

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

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  return (
    <div>
      <Header />
      <ButtonOptions onOptionClick={handleViewChange} />
      {view === "aoVivo" && <LiveMatches todayMatches={todayMatches} />}
      {view === "palpites" &&
        (actualTips && actualTips.length > 0 ? (
          <ActualTips />
        ) : (
          <>
            {/*adicionar o isAfter aqui depois, só tirei pra desenvolver*/}
            <RoundPanel matchData={matchData} />
          </>
        ))}
    </div>
  );
};

export default Home;
