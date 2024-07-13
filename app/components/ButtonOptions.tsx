import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

interface ButtonOptionsProps {
  onOptionClick: (option: string) => void;
}

const ButtonOptions = ({ onOptionClick }: ButtonOptionsProps) => {
  return (
    <div className="flex flex-col h-full w-full bg-neutral-900">
      <Card className="m-2 bg-zinc-700">
        <CardBody>
          <div className="flex justify-between gap-1 items-center">
            <Image
              src={"/partidas_aovivo.png"}
              alt={"Logo do Brasileirão"}
              width={155}
              height={155}
              className="object-cover rounded-lg transition duration-300 ease-in-out hover:scale-105"
              onClick={() => onOptionClick("aoVivo")}
            />
            <Image
              src={"/palpites.png"}
              alt={"Logo do Brasileirão"}
              width={155}
              height={155}
              className="object-cover rounded-lg transition duration-300 ease-in-out hover:scale-105"
              onClick={() => onOptionClick("palpites")}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ButtonOptions;
