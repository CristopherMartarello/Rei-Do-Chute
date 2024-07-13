import { Card, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";

const ActualTips = () => {
  return (
    <div className="flex flex-col h-full w-full bg-neutral-900">
      <Card className="m-2 bg-zinc-700">
        <CardBody>
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
        </CardBody>
      </Card>
    </div>
  );
};

export default ActualTips;
