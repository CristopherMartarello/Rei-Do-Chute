import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import MatchItem from "./MatchItem";
import { Match, MatchDoc } from "../firebase/matches";
import { useEffect, useState } from "react";
import { addTipsToUser, getUserByAuthId } from "../firebase/user";
import { useTipSelection } from "../context/TipsContext";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface RoundPanelProps {
  matchData: MatchDoc[];
}

const RoundPanel = ({ matchData }: RoundPanelProps) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const { userTips } = useTipSelection();
  const { userAuth } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (matchData && matchData.length > 0) {
      setMatches(Object.values(matchData[0].partidas));
    }
  }, [matchData]);

  useEffect(() => {
    if (matches.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [matches]);

  const handleModalSubmitAlert = () => {
    if (userTips.tips.length !== 10) {
      toast.warning('Você deve selecionar um palpite de todos os jogos.', {
        position: "top-center",
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }
    setLoading(true);
    onOpen();
    setLoading(false);
  }

  const handleTipsSubmit = async () => {
    try {
      setLoading(true);    
      const now = dayjs();
      const cutoffDateTime = dayjs('2024-07-12T09:30:00');

      if (now.isAfter(cutoffDateTime)) {
        toast.warning('A rodada fechou às 09:30h do dia 12/07.', {
          position: "top-center",
          autoClose: 5000,
        });
        onClose();
        setLoading(false);
        return;
      }

      if (!userAuth) return;
      const userDoc = await getUserByAuthId(userAuth.uid);
      await addTipsToUser(userDoc.id, userTips);
      onClose();
      router.push("/payment");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-900">
      <ToastContainer />
      {/*PANEL*/}
      <div className="m-2 rounded-xl bg-zinc-700">
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
      <Button className="m-2 bg-yellow-600" isLoading={loading} onClick={handleModalSubmitAlert}>
        <span className="font-semibold">Enviar Palpites</span>
      </Button>
      <Modal
        size={"sm"}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmar seus palpites?</ModalHeader>
              <ModalBody>
                <p>
                  Tem certeza que deseja confirmar os seus palpites para esse rodada?
                  Não será possível editar ou alterar até o final da rodada.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Voltar
                </Button>
                <Button color="primary" onClick={handleTipsSubmit} isLoading={loading}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RoundPanel;
