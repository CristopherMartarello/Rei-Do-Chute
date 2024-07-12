"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import { FaPix } from "react-icons/fa6";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";
import { useState } from "react";

const Payment = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCopyToClipboard = () => {
    var codeToCopy =
      "00020126360014BR.GOV.BCB.PIX0114+554899847280152040000530398654042.005802BR5919Nathan Will Martins6009SAO PAULO62140510w8kI5OiF9T6304BBF6";
    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Falha ao copiar o texto: ", err);
      });
  };

  const handleInformationModal = () => {
    onOpen();
  };

  return (
    <div className="flex flex-col p-2 w-full bg-neutral-900 h-screen justify-center items-center">
      <Card className="bg-zinc-700">
        <CardHeader className="flex gap-3 px-4 items-center bg-yellow-600">
          <FaPix className="w-7 h-7" />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Pagamento com Pix</h1>
          </div>
        </CardHeader>
        <Divider className="bg-zinc-900" />
        <CardBody className="flex space-y-3 items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center px-6 justify-between bg-white w-full p-2 rounded-lg">
              <span className="font-semibold text-sm">
                Valor da entrada: R$ 2,00
              </span>
              <BsFillQuestionCircleFill
                onClick={() => handleInformationModal()}
              />
            </div>
          </div>
          <div className="flex flex-col p-1">
            <span className="font-semibold text-xs m-1 text-yellow-600">
              QR Code
            </span>
            <Image
              alt="qr code pix"
              height={250}
              radius="sm"
              src="/qr_code.png"
              width={250}
            />
          </div>
          <div className="flex items-center justify-center">
            <Divider className="mx-2 w-20 bg-zinc-900" />
            <span>ou</span>
            <Divider className="mx-2 w-20 bg-zinc-900" />
          </div>
          {isCopied === false ? (
            <Button
              className="bg-yellow-600 w-full"
              onClick={() => handleCopyToClipboard()}
            >
              <LuCopy />
              <span className="font-semibold">Copiar código Pix</span>
            </Button>
          ) : (
            <Button
              className="bg-green-600 w-full"
              onClick={() => handleCopyToClipboard()}
            >
              <LuCopyCheck />
              <span className="font-semibold">Código copiado com sucesso!</span>
            </Button>
          )}
        </CardBody>
        <Divider className="bg-zinc-900" />
        <CardFooter className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="/LogoReiDoChute.png"
              width={40}
            />
            <span className="text-white text-xs text-center">
              Rei do chute - Todos os direitos reservados
            </span>
          </div>
        </CardFooter>
      </Card>
      <Modal
        size={"sm"}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        hideCloseButton
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Informações de pagamento
              </ModalHeader>
              <ModalBody className="text-sm space-y-4">
                <div className="flex items-start gap-4 p-4 bg-zinc-100 rounded-lg shadow-md">
                  <TbCircleNumber1Filled className="w-7 h-7 text-yellow-600" />
                  <p className="flex-1">
                    Entre no app ou site do seu banco e escolha a opção de
                    pagamento via Pix.
                  </p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-zinc-100 rounded-lg shadow-md">
                  <TbCircleNumber2Filled className="w-7 h-7 text-yellow-600" />
                  <p className="flex-1">
                    Escaneie o código QR ou copie e cole o código de pagamento.
                  </p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-zinc-100 rounded-lg shadow-md">
                  <TbCircleNumber3Filled className="w-7 h-7 text-yellow-600" />
                  <p className="flex-1">
                    Após prosseguir, é só torcer e aguardar os resultados dos palpites!
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-yellow-600"
                  variant="light"
                  onPress={onClose}
                >
                  Entendi!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Payment;
