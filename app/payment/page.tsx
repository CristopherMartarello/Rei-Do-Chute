"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import { LuCopy } from "react-icons/lu";

const Payment = () => {

  const handleCodeCopy = () => {
    var codeToCopy = '00020126360014BR.GOV.BCB.PIX0114+554899847280152040000530398654042.005802BR5919Nathan Will Martins6009SAO PAULO62140510w8kI5OiF9T6304BBF6';
    
  }

  return (
    <div className="flex flex-col p-2 w-full bg-neutral-900 h-screen justify-center items-center">
      <Card className="bg-zinc-700">
        <CardHeader className="flex gap-3 bg-yellow-600">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="/pixlogo.png"
            width={40}
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Pagamento com Pix</h1>
          </div>
        </CardHeader>
        <Divider className="bg-zinc-900"/>
        <CardBody>
          <Image
            alt="qr code pix"
            height={500}
            radius="sm"
            src="/qr_code.png"
            width={500}
          />
          <div className="flex items-center justify-center bg-white my-4 p-3 rounded-md">
            <span className="text-black">Valor da entrada: R$ 2,00</span>
          </div>
          <div className="flex mb-4 items-center justify-center">
            <Divider className="mx-2 w-20 bg-zinc-900"/>
            <span>ou</span>
            <Divider className="mx-2 w-20 bg-zinc-900"/>
          </div>
          <Button className="bg-yellow-600 border-zinc-900" variant="bordered">
            <LuCopy />
            Copiar código Pix
          </Button>  
        </CardBody>
        <Divider className="bg-zinc-900"/>
        <CardFooter className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <span className="text-white text-xs text-center">Rei do chute - Todos os direitos reservados</span>
          </div>
        </CardFooter>
      </Card>

    </div>
  );
};

export default Payment;
