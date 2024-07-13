import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { TodayMatch } from "./Home";
import Image from "next/image";

interface LiveMatchesProps {
  todayMatches: TodayMatch[];
}

const LiveMatches = ({ todayMatches }: LiveMatchesProps) => {
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
            {todayMatches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col p-3 m-2 gap-[10px] bg-neutral-800 rounded-xl w-full max-w-md"
              >
                {/* <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center justify-center w-20 h-20">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Image
                        src={match.homeTeam.crest}
                        alt={"Logo do Time 1"}
                        width={65}
                        height={65}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-white mx-4">vs</span>
                  <div className="flex items-center justify-center w-20 h-20">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Image
                        src={match.awayTeam.crest}
                        alt={"Logo do Time 2"}
                        width={65}
                        height={65}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div> */}
                <div className="px-1">
                  <Divider className="bg-zinc-700" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-center justify-center text-white text-lg mb-2 gap-2">
                    <span className="font-semibold text-sm">
                      {match.homeTeam.name}
                    </span>{" "}
                    <span className="flex font-semibold items-center justify-center w-8 h-8 bg-yellow-800">{match.score.fullTime.home}</span> x{" "}
                    <span className="flex font-semibold items-center justify-center w-8 h-8 bg-yellow-800">{match.score.fullTime.away}</span>{" "}
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
