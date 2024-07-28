'use client'
import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTipSelection } from "../../app/context/TipsContext";
import { TodayMatch } from "./Home";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MatchItemProps {
  todayMatches: TodayMatch[];
}

const MatchItem = ({ todayMatches }: MatchItemProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { userTips, handleTipSelection } = useTipSelection();

  useEffect(() => {
    console.log(userTips);  
  }, [userTips]);

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

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, `EEEEEE, dd/MM`, { locale: ptBR });
  };

  const handleButtonClick = (team: string, match: TodayMatch) => {
    const teamSelection = selectedTeam === team ? null : team;
    setSelectedTeam(teamSelection);
    handleTipSelection(teamSelection, match);
  };

  return (
    <div className="flex flex-col justify-center items-center p-3 m-[8px] gap-[7px] bg-neutral-900 rounded-xl">
      {todayMatches.map((match) => (
        <div key={match.id} className="flex flex-col justify-center items-center p-3 m-[8px] gap-[7px] bg-neutral-800 rounded-xl">
          <div className="flex justify-between">
            <span className="text-white text-[10px]">
              {capitalizeFirstLetter(formatDate(match.utcDate))} -
              {new Date(match.utcDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} - {match.area.name}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <Image
              src={renderLogoTime(match.homeTeam.name)}
              alt={`Logo do ${match.homeTeam.name}`}
              width={65}
              height={65}
              className="object-cover"
            />
            <span className="m-4 text-white">vs</span>
            <Image
              src={renderLogoTime(match.awayTeam.name)}
              alt={`Logo do ${match.awayTeam.name}`}
              width={65}
              height={65}
              className="object-cover"
            />
          </div>
          <div className="flex justify-center items-center gap-[7px]">
            <ButtonGroup size="sm">
              <Button
                className={`${selectedTeam === match.homeTeam.name ? 'bg-yellow-600' : 'bg-zinc-600'} text-white w-20`}
                onClick={() => handleButtonClick(match.homeTeam.name, match)}
                disabled={!!selectedTeam && selectedTeam !== match.homeTeam.name}>
                {match.homeTeam.name}
              </Button>
              <Divider className="bg-yellow-400" orientation="vertical" />
              <Button
                className={`${selectedTeam === `Empate (${match.homeTeam.name} x ${match.awayTeam.name})` ? 'bg-yellow-600' : 'bg-zinc-600'} text-white w-20`}
                onClick={() => handleButtonClick(`Empate (${match.homeTeam.name} x ${match.awayTeam.name})`, match)}
                disabled={!!selectedTeam && selectedTeam !== `Empate (${match.homeTeam.name} x ${match.awayTeam.name})`}>
                Empate
              </Button>
              <Divider className="bg-yellow-400" orientation="vertical" />
              <Button
                className={`${selectedTeam === match.awayTeam.name ? 'bg-yellow-600' : 'bg-zinc-600'} text-white w-20`}
                onClick={() => handleButtonClick(match.awayTeam.name, match)}
                disabled={!!selectedTeam && selectedTeam !== match.awayTeam.name}>
                {match.awayTeam.name}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchItem;
