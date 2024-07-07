import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import MatchItem from "./MatchItem";
import { Match, MatchDoc } from "../firebase/matches";
import { useEffect, useState } from "react";

interface RoundPanelProps {
  matchData: MatchDoc[];
}

const RoundPanel = ({matchData}: RoundPanelProps) => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (matchData && matchData.length > 0) {
      setMatches(Object.values(matchData[0].partidas));
    }
  }, [matchData]);

  return (
    <div className="flex flex-col h-full w-full bg-neutral-900">
      {/*MAIN TITLE*/}
      <div className="flex justify-center m-8">
        <h1 className="font-semibold text-xl text-white">PALPITES DA RODADA</h1>
      </div>
      {/*PANEL*/}
      <div className="mx-2 rounded-xl bg-zinc-700">
        <div className="flex">
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
        </div>
        <div className="px-1">
          <Divider className="bg-yellow-400" />
        </div>
        <div className="mx-1 my-2">
          {matches.map((match, index) => (
            <MatchItem key={index} matchData={match} />
          ))}
        </div>
        <div className="m-3"></div>
      </div>
      <Button className="m-2 bg-yellow-600">
        <span className="font-semibold">Enviar Palpites</span>
      </Button>
    </div>
  );
};

export default RoundPanel;
