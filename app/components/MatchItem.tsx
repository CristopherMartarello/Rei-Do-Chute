import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import Image from "next/image";

const MatchItem = () => {
  return (
    <div className="flex w-full justify-center">
      <ButtonGroup className="rounded-sm">
        {/* Logo time 1 */}
        <div className="px-2">
            <Image src={"/saopaulo.png"} alt={"Logo do São Paulo"} width={50} height={50} className="object-cover"/>
        </div>
        <Button>São Paulo</Button> {/* PEGAR OS DADOS DO BANCO*/}
        <Divider orientation="vertical"/>
        <Button>Empate</Button>
        <Divider orientation="vertical"/>
        <Button>Corinthians</Button>
        {/* Logo time 2 */}
        <div className="px-2">
            <Image src={"/corinthians.png"} alt={"Logo do Corinthians"} width={50} height={50} className="object-cover"/>
        </div>
      </ButtonGroup>
    </div>
  );
};

export default MatchItem;
