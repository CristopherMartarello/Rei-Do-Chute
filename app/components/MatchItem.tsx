'use client'
import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import Image from "next/image";
import { Match } from "../firebase/matches";
import { useEffect, useState } from "react";
import { useTipSelection } from "../../app/context/TipsContext";

interface MatchItemProps {
  matchData: Match;
}

const MatchItem = ({ matchData }: MatchItemProps) => {
  const [logoTime1, setLogoTime1] = useState("");
  const [logoTime2, setLogoTime2] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [buttonBackgrounds, setButtonBackgrounds] = useState({
    time1: 'bg-zinc-600',
    draw: 'bg-zinc-600',
    time2: 'bg-zinc-600'
  });
  const { userTips, handleTipSelection } = useTipSelection();

  useEffect(() => {
    renderLogoTime1();
    renderLogoTime2();
  }, [matchData]);

  useEffect(() => {
    console.log(userTips);
  }, [userTips]);

  const renderLogoTime1 = () => {
    switch (matchData.time1) {
      case "Athletico-PR":
        setLogoTime1("/times/athletico.png");
        break;
      case "Atlético-GO":
        setLogoTime1("/times/atleticogo.png");
        break;
      case "Atlético-MG":
        setLogoTime1("/times/atleticomg.png");
        break;
      case "Bahia":
        setLogoTime1("/times/bahia.png");
        break;
      case "Botafogo":
        setLogoTime1("/times/botafogo.png");
        break;
      case "Bragantino":
        setLogoTime1("/times/bragantino.png");
        break;
      case "Corinthians":
        setLogoTime1("/times/corinthians.png");
        break;
      case "Criciúma":
        setLogoTime1("/times/criciuma.png");
        break;
      case "Cruzeiro":
        setLogoTime1("/times/cruzeiro.png");
        break;
      case "Cuiaba":
        setLogoTime1("/times/cuiaba.png");
        break;
      case "Flamengo":
        setLogoTime1("/times/flamengo.png");
        break;
      case "Fluminense":
        setLogoTime1("/times/fluminense.png");
        break;
      case "Fortaleza":
        setLogoTime1("/times/fortaleza.png");
        break;
      case "Grêmio":
        setLogoTime1("/times/gremio.png");
        break;
      case "Internacional":
        setLogoTime1("/times/internacional.png");
        break;
      case "Juventude":
        setLogoTime1("/times/juventude.png");
        break;
      case "Palmeiras":
        setLogoTime1("/times/palmeiras.png");
        break;
      case "São Paulo":
        setLogoTime1("/times/saopaulo.png");
        break;
      case "Vasco":
        setLogoTime1("/times/vasco.png");
        break;
      case "Vitória":
        setLogoTime1("/times/vitoria.png");
        break;
      default:
        setLogoTime1("/times/default.png"); 
    }
  };

  const renderLogoTime2 = () => {
    switch (matchData.time2) {
      case "Athletico-PR":
        setLogoTime2("/times/athletico.png");
        break;
      case "Atlético-GO":
        setLogoTime2("/times/atleticogo.png");
        break;
      case "Atlético-MG":
        setLogoTime2("/times/atleticomg.png");
        break;
      case "Bahia":
        setLogoTime2("/times/bahia.png");
        break;
      case "Botafogo":
        setLogoTime2("/times/botafogo.png");
        break;
      case "Bragantino":
        setLogoTime2("/times/bragantino.png");
        break;
      case "Corinthians":
        setLogoTime2("/times/corinthians.png");
        break;
      case "Criciúma":
        setLogoTime2("/times/criciuma.png");
        break;
      case "Cruzeiro":
        setLogoTime2("/times/cruzeiro.png");
        break;
      case "Cuiaba":
        setLogoTime2("/times/cuiaba.png");
        break;
      case "Flamengo":
        setLogoTime2("/times/flamengo.png");
        break;
      case "Fluminense":
        setLogoTime2("/times/fluminense.png");
        break;
      case "Fortaleza":
        setLogoTime2("/times/fortaleza.png");
        break;
      case "Grêmio":
        setLogoTime2("/times/gremio.png");
        break;
      case "Internacional":
        setLogoTime2("/times/internacional.png");
        break;
      case "Juventude":
        setLogoTime2("/times/juventude.png");
        break;
      case "Palmeiras":
        setLogoTime2("/times/palmeiras.png");
        break;
      case "São Paulo":
        setLogoTime2("/times/saopaulo.png");
        break;
      case "Vasco":
        setLogoTime2("/times/vasco.png");
        break;
      case "Vitória":
        setLogoTime2("/times/vitoria.png");
        break;
      default:
        setLogoTime2("/times/default.png"); 
    }
  };

  const handleButtonClick = (team: string, matchData: Match) => {
    if (selectedTeam === team || selectedTeam === `Empate (${matchData.time1} x ${matchData.time2})`) {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(team);
    }
    handleTipSelection(team, matchData);
  };

  return (
    <div className="flex flex-col justify-center items-center p-3 m-[8px] gap-[7px] bg-neutral-900 rounded-xl">
      <div className="flex justify-between">
        <span className="text-white text-[10px]">
          {matchData.data} - {matchData.hora}h - {matchData.estadio}
        </span>
      </div>
      <div className="flex items-center mb-4">
        {/* Logo time 1 */}
        {logoTime1 && (
          <Image
            src={logoTime1}
            alt={"Logo do Time 1"}
            width={65}
            height={65}
            className="object-cover"
          />
        )}
        <span className="m-4 text-white">vs</span>
        {/* Logo time 2 */}
        {logoTime2 && (
          <Image
            src={logoTime2}
            alt={"Logo do Time 2"}
            width={65}
            height={65}
            className="object-cover"
          />
        )}
      </div>
      <div className="flex justify-center items-center gap-[7px]">
        <ButtonGroup size="sm">
          <Button
            className={`${selectedTeam === matchData.time1 ? 'bg-yellow-600' : 'bg-zinc-600'} text-white w-20`}
            onClick={() => handleButtonClick(matchData.time1, matchData)}
            disabled={!!selectedTeam && selectedTeam !== matchData.time1}>
            {matchData.time1}
          </Button>
          <Divider className="bg-yellow-400" orientation="vertical" />
          <Button
            className={`${selectedTeam === `Empate (${matchData.time1} x ${matchData.time2})` ? 'bg-yellow-600' : 'bg-zinc-600'} text-white w-20`}
            onClick={() => handleButtonClick(`Empate (${matchData.time1} x ${matchData.time2})`, matchData)}
            disabled={!!selectedTeam && selectedTeam !== `Empate (${matchData.time1} x ${matchData.time2})`}>
            Empate
          </Button>
          <Divider className="bg-yellow-400" orientation="vertical" />
          <Button
            className={`${selectedTeam === matchData.time2 ? 'bg-yellow-600' : 'bg-zinc-600'} text-white w-20`}
            onClick={() => handleButtonClick(matchData.time2, matchData)}
            disabled={!!selectedTeam && selectedTeam !== matchData.time2}>
            {matchData.time2}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default MatchItem;
