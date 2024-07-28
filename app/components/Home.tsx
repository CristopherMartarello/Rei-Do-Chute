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
  status: string;
}

interface HomeProps {
  matchData: MatchDoc[];
}

const Home = ({ matchData }: HomeProps) => {
  const [isAfterMatch, setIsAfterMatch] = useState(false); // Inicialize como false
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
    const fetchMatchesAndCheckTime = async () => {
      const data = await getTodayMatches();
      setTodayMatches(data.matches);

      if (data.matches.length > 0) {
        const now = new Date();
        const firstMatchTime = new Date(data.matches[0].utcDate);
        const isAfterMatch = now > firstMatchTime;
        setIsAfterMatch(isAfterMatch);
        //pra testar habilita o set abaixo
        //setIsAfterMatch(true);
      }
    };

    fetchMatchesAndCheckTime();
  }, []);

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  return (
    <div>
      <Header />
      {}
      {isAfterMatch ? (
        <>
          <ButtonOptions onOptionClick={handleViewChange} />
          {view === "aoVivo" && <LiveMatches todayMatches={todayMatches} />}
          {view === "palpites" &&
            (actualTips && actualTips.length > 0 ? (
              <ActualTips todayMatches={todayMatches} />
            ) : (
              <RoundPanel matchData={matchData} todayMatches={todayMatches}/>
            ))}
        </>
      ) : (
        <RoundPanel matchData={matchData} todayMatches={todayMatches}/>
      )}
    </div>
  );
};

export default Home;
