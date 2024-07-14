import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { TodayMatch } from "./Home";
import Image from "next/image";

interface LiveMatchesProps {
  todayMatches: TodayMatch[];
}

const LiveMatches = ({ todayMatches }: LiveMatchesProps) => {
  const getScore = (score: number | null) => (score === null ? 0 : score);

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-900">
      <Card className="m-2 bg-zinc-700">
        <CardBody>
          <div className="flex items-center mt-2 px-4 w-full">
            <Image
              src={"/LogoBrasileirao2024.png"}
              alt={"Logo do Brasileirão"}
              width={50}
              height={50}
              className="object-cover"
            />
            <div className="my-5 mx-2">
              <span className="font-semibold text-lg text-yellow-400">
                Brasileirão 2024
              </span>
            </div>
          </div>
          <div className="m-1">
            <Divider className="bg-yellow-400" />
          </div>
          <div className="flex flex-col space-y-1 items-center justify-center">
            {todayMatches //verifica se as partidas de hoje são do brasileirão
              .filter((match) => match.competition.name === "Campeonato Brasileiro Série A")
              .map((match) => (
                <div
                  key={match.id}
                  className="flex flex-col p-3 m-2 gap-[10px] bg-neutral-800 rounded-xl w-full max-w-md"
                >
                  <div className="px-1">
                    <Divider className="bg-zinc-700" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-center justify-center text-white text-lg mb-2 gap-2">
                      <span className="font-semibold text-sm">
                        {match.homeTeam.name}
                      </span>{" "}
                      <span className="flex font-semibold items-center justify-center w-8 h-8 bg-yellow-400">
                        {getScore(match.score.fullTime.home)}
                      </span> x{" "}
                      <span className="flex font-semibold items-center justify-center w-8 h-8 bg-yellow-400">
                        {getScore(match.score.fullTime.away)}
                      </span>{" "}
                      <span className="font-semibold text-sm">
                        {match.awayTeam.name}
                      </span>
                    </div>
                    <div className="text-center text-gray-400 text-sm">
                      {new Date(match.utcDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      | {match.competition.name}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LiveMatches;
