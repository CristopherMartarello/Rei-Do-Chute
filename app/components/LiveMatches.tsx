import { TodayMatch } from "./Home";

interface LiveMatchesProps {
  todayMatches: TodayMatch[];
}

const LiveMatches = ({ todayMatches }: LiveMatchesProps) => {
  console.log(todayMatches);
  return (
    <div className="flex flex-col">
      {todayMatches.map((match) => (
        <span key={match.id} className="bg-red-200">
          {match.homeTeam.name} vs {match.awayTeam.name}
        </span>
      ))}
    </div>
  );
};

export default LiveMatches;
