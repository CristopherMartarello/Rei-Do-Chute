import { Divider } from "@nextui-org/react";
import Image from "next/image";
import MatchItem from "./MatchItem";

const RoundPanel = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-zinc-900">
      {/*MAIN TITLE*/}
      <div className="flex justify-center m-8">
        <h1 className="font-semibold text-xl text-white">
          PALPITES DA RODADA
        </h1>
      </div>
      {/*PANEL*/}
      <div className="mx-4 rounded-xl bg-zinc-700">
        <div className="flex">
          <div className="flex items-center py-2 px-4 w-full">
            <Image
              src={"/LogoBrasileirao2024.png"}
              alt={"Logo do Brasileirão"}
              width={50}
              height={50}
              className="object-cover"
            />
            <div className="m-4">
              <span className="font-semibold text-lg text-yellow-400">
                Brasileirão 2024
              </span>
            </div>
          </div>
        </div>
        <div className="px-2">
            <Divider className="bg-yellow-400"/>
        </div>
        <div className=" p-3">
            <MatchItem />
        </div>
      </div>
    </div>
  );
};

export default RoundPanel;
