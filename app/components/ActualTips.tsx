"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";
import { useAuthContext } from "../context/AuthContext";
import { getActualTipsFromUser, getUserByAuthId, updateUserTipCount } from "../firebase/user";
import { TodayMatch } from "./Home";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RiCloseCircleFill, RiCheckboxCircleFill } from "react-icons/ri";

interface UserTip {
  matchId: string;
  selectedTeam: string;
}

interface LiveMatchesProps {
  todayMatches: TodayMatch[];
}

const ActualTips = ({ todayMatches }: LiveMatchesProps) => {
  const [actualTips, setActualTips] = useState<UserTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [correctTips, setCorrectTips] = useState(0);
  const { userAuth } = useAuthContext();

  useEffect(() => {
    const fetchUserTips = async () => {
      if (userAuth) {
        try {
          setLoading(true);
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

  useEffect(() => {
    const interval = setInterval(() => {   
      const lastMatch = todayMatches[9];
      if (lastMatch && lastMatch.status === 'FINISHED') {
        const lastMatchDate = new Date(lastMatch.utcDate);
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - lastMatchDate.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        
        if (hoursDifference >= 2.5) {
          console.log("passaram-se 2,5 horas");
          checkUserTips();
        }
      }
    }, 1 * 60 * 1000);
  
    return () => clearInterval(interval);
  }, [todayMatches, actualTips]);
  
  const checkUserTips = () => {
    let correctCount = 0;
  
    todayMatches.forEach((match, index) => {
      if (match.status === "FINISHED" && actualTips[index]) {
        const homeScore = match.score.fullTime.home;
        const awayScore = match.score.fullTime.away;
        const winningTeam =
          homeScore > awayScore
            ? match.homeTeam.name
            : awayScore > homeScore
            ? match.awayTeam.name
            : "DRAW";
  
        const tip = actualTips[index];
        const selectedTeam = tip.selectedTeam.includes("Empate") ? "DRAW" : tip.selectedTeam;
        if (selectedTeam === winningTeam || (winningTeam === "DRAW" && selectedTeam === "DRAW")
        ) {
          correctCount++;
        }
      }
    });
  
    setCorrectTips(correctCount);
  
    // if (userAuth) {
    //   try {
    //     updateUserTipCount(userAuth.uid, correctCount);
    //   } catch (error) {
    //     console.error(`Erro ao atualizar o contador de palpites para o usuário ${userAuth.uid}:`, error);
    //   }
    // }
  };
  


  const renderLogoTime = (team: string) => {
    switch (team) {
      case "CA Paranaense":
        return "/times/athletico.png";
      case "AC Goianiense":
        return "/times/atleticogo.png";
      case "CA Mineiro":
        return "/times/atleticomg.png";
      case "EC Bahia":
        return "/times/bahia.png";
      case "Botafogo FR":
        return "/times/botafogo.png";
      case "RB Bragantino":
        return "/times/bragantino.png";
      case "SC Corinthians Paulista":
        return "/times/corinthians.png";
      case "Criciúma EC":
        return "/times/criciuma.png";
      case "Cruzeiro EC":
        return "/times/cruzeiro.png";
      case "Cuiabá EC":
        return "/times/cuiaba.png";
      case "CR Flamengo":
        return "/times/flamengo.png";
      case "Fluminense FC":
        return "/times/fluminense.png";
      case "Fortaleza EC":
        return "/times/fortaleza.png";
      case "Grêmio FBPA":
        return "/times/gremio.png";
      case "SC Internacional":
        return "/times/internacional.png";
      case "EC Juventude":
        return "/times/juventude.png";
      case "SE Palmeiras":
        return "/times/palmeiras.png";
      case "São Paulo FC":
        return "/times/saopaulo.png";
      case "CR Vasco da Gama":
        return "/times/vasco.png";
      case "EC Vitória":
        return "/times/vitoria.png";
      default:
        return "/times/default.png";
    }
  };

  const renderConfrontTip = (homeTeam: string, awayTeam: string) => {
    const matchingTip = actualTips.find((tip) => {
      const matchHome = tip.selectedTeam === homeTeam;
      const matchAway = tip.selectedTeam === awayTeam;
      return matchHome || matchAway;
    });

    if (matchingTip) {
      return (
        <Image
          src={renderLogoTime(matchingTip.selectedTeam)}
          alt={"Logo do time escolhido"}
          width={60}
          height={60}
        />
      );
    } else {
      return <span className="flex bg-yellow-400 w-14 h-14 text-center justify-center items-center text-3xl text-black">E</span>
    }
  };

  const renderTags = (match: TodayMatch) => {
    switch (match.status) {
      case 'FINISHED':
        return <span className="font-semibold text-xs bg-zinc-700 px-2 py-1 rounded-md text-white">Encerrado</span>;
      case 'PAUSED':
        return <span className="break-bar font-semibold text-xs bg-zinc-700 px-2 py-1 rounded-md text-white">Intervalo</span>
      case 'TIMED':
        return (
          <span className="font-semibold text-xs bg-zinc-700 px-2 py-1 rounded-md text-white space-x-2">
            <span>{capitalizeFirstLetter(formatDate(match.utcDate))}</span>
            <span>
              {new Date(match.utcDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
        );
      case 'IN_PLAY':
        return <span className="font-semibold text-xs live-bar px-2 py-1 rounded-md text-white">Ao vivo</span>
    }
  }

  const renderResult = (matchWinner: TodayMatch) => {
    if (matchWinner.status !== 'FINISHED') {
      return;
    }

    const iconSize = "h-4 w-4";
    const spanClasses = "flex w-14 px-2 py-1 rounded-md text-white font-semibold text-xs items-center justify-center";
  
    if (matchWinner.score.winner === 'HOME_TEAM') {
      const result = actualTips.find((tip) => tip.selectedTeam === matchWinner.homeTeam.name);
      return result ? (
        <span className={`${spanClasses} bg-green-500`}>
          <RiCheckboxCircleFill className={`mx-1 ${iconSize}`} />
        </span>
      ) : (
        <span className={`${spanClasses} bg-red-500`}>
          <RiCloseCircleFill className={`mx-1 ${iconSize}`} />
        </span>
      );
    } else if (matchWinner.score.winner === 'AWAY_TEAM') {
      const result = actualTips.find((tip) => tip.selectedTeam === matchWinner.awayTeam.name);
      return result ? (
        <span className={`${spanClasses} bg-green-500`}>
          <RiCheckboxCircleFill className={`mx-1 ${iconSize}`} />
        </span>
      ) : (
        <span className={`${spanClasses} bg-red-500`}>
          <RiCloseCircleFill className={`mx-1 ${iconSize}`} />
        </span>
      );
    } else if (matchWinner.score.winner === 'DRAW') {
      const result = actualTips.find((tip) => tip.selectedTeam === `Empate (${matchWinner.homeTeam.name} x ${matchWinner.awayTeam.name})`);
      return result ? (
        <span className={`${spanClasses} bg-green-500`}>
          <RiCheckboxCircleFill className={`mx-1 ${iconSize}`} />
        </span>
      ) : (
        <span className={`${spanClasses} bg-red-500`}>
          <RiCloseCircleFill className={`mx-1 ${iconSize}`} />
        </span>
      );
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, `EEEEEE, dd/MM`, { locale: ptBR });
  };

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
                  Meus Palpites da Rodada
                </span>
              </div>
            </div>
          </div>
          <div className="m-1">
            <Divider className="bg-yellow-400" />
          </div>
          <div className="flex flex-col space-y-1 items-center justify-center">
            {todayMatches
              .filter(
                (match) =>
                  match.competition.name === "Campeonato Brasileiro Série A"
              )
              .map((match) => (
                <div
                  key={match.id}
                  className="flex flex-col p-3 mt-3 gap-[10px] bg-neutral-800 rounded-xl w-full max-w-md"
                >
                  <div className="flex justify-between items-center text-gray-400 text-xs px-2">
                    <span className="text-yellow-400 text-xs">
                      Rodada {match.matchday} - Série A
                    </span>
                    <span className="flex items-center text-gray-400 text-xs space-x-1">
                      {renderTags(match)}{renderResult(match)}
                    </span>
                  </div>
                  <div className="px-1">
                    <Divider className="bg-zinc-700" />
                  </div>
                  <div className="flex flex-col px-2">
                    <div className="flex flex-col justify-between text-white mb-2 gap-2">
                      <div className="flex font-semibold mt-2 gap-2 text-sm truncate justify-between">
                        <div className="flex flex-col gap-2 text-sm truncate justify-between">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Image
                                src={renderLogoTime(match.homeTeam.name)}
                                alt={"Home team Logo"}
                                width={25}
                                height={25}
                              />
                              <span className="font-semibold text-sm truncate">
                                {match.homeTeam.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Image
                                src={renderLogoTime(match.awayTeam.name)}
                                alt={"Away team Logo"}
                                width={25}
                                height={25}
                              />
                              <span className="font-semibold text-sm truncate">
                                {match.awayTeam.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        {renderConfrontTip(
                          match.homeTeam.name,
                          match.awayTeam.name
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ActualTips;
