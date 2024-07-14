'use client'

import { useEffect, useState } from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";
import { useAuthContext } from "../context/AuthContext";
import { getActualTipsFromUser, getUserByAuthId } from "../firebase/user";

interface UserTip {
  matchId: string;
  selectedTeam: string;
}

const ActualTips = () => {
  const [actualTips, setActualTips] = useState<UserTip[]>([]);
  const [loading, setLoading] = useState(true);
  const { userAuth } = useAuthContext();

  useEffect(() => {
    const fetchUserTips = async () => {
      if (userAuth) {
        try {
          const user = await getUserByAuthId(userAuth.uid);
          const tips = await getActualTipsFromUser(user.id);
          setActualTips(tips || []);
        } catch (error) {
          console.error("Erro ao buscar palpites do usuário:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserTips();
  }, [userAuth]);

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-neutral-900">
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
          <div className="mt-4">
            {actualTips.length > 0 ? (
              <div className="text-white">
                {/* Tem que alterar o design mas é contigo, só deixei assim, por que as informações já tao de bandeja */}
                <h2>Suas Apostas:</h2>
                <ul>
                  {actualTips.map((tip, index) => (
                    <li key={index}>
                      Match ID: {tip.matchId}, Selected Team: {tip.selectedTeam}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-white h-64">
                <Image
                  src={"/AvisoApostaNaoEncontrada.png"}
                  alt={"Aviso Aposta Nao Encontrada"}
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ActualTips;
