import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import Image from "next/image";

const MatchItem = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      {/* Logo time 1 */}
      <div className="">
        <Image
          src={"/saopaulo.png"}
          alt={"Logo do São Paulo"}
          width={50}
          height={25}
          className="object-cover"
        />
      </div>
      <ButtonGroup size="sm" className="rounded-sm">
        <Button>São Paulo</Button>
        <Divider orientation="vertical" />
        <Button>Empate</Button>
        <Divider orientation="vertical" />
        <Button>Corinthians</Button>
      </ButtonGroup>
      {/* Logo time 2 */}
      <div className="">
        <Image
          src={"/corinthians.png"}
          alt={"Logo do Corinthians"}
          width={50}
          height={25}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default MatchItem;
