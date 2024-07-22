import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { TodayMatch } from "./Home";
import Image from "next/image";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface LiveMatchesProps {
  todayMatches: TodayMatch[];
}

const LiveMatches = ({ todayMatches }: LiveMatchesProps) => {
  const getScore = (score: number | null) => (score === null ? 0 : score);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, `EEEEEE, dd/MM`, { locale: ptBR });
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

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-900">
      <Card className="m-2 bg-zinc-700">
        <CardBody>
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
                  className="flex flex-col p-3 mt-2 gap-[10px] bg-neutral-800 rounded-xl w-full max-w-md"
                >
                  <div className="flex justify-between items-center text-gray-400 text-xs px-2">
                    <span className="text-yellow-400 text-xs">
                      Rodada {match.matchday} - Série A
                    </span>
                    {match.status === "TIMED" ? (
                      <span className="font-semibold text-xs bg-zinc-700 px-2 py-1 rounded-md space-x-2 text-white">
                        <span>
                          {capitalizeFirstLetter(formatDate(match.utcDate))}
                        </span>
                        <span>
                          {new Date(match.utcDate).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </span>
                    ) : match.status === "FINISHED" ? (
                      <span className="font-semibold text-xs bg-zinc-700 px-2 py-1 rounded-md text-white">Encerrado</span>
                    ) : match.status === "PAUSED" ? (
                      <span className="break-bar font-semibold text-xs bg-zinc-700 px-2 py-1 rounded-md text-white">Intervalo</span>
                    ) : match.status === "IN_PLAY" ? (
                      <span className="font-semibold text-xs live-bar px-2 py-1 rounded-md text-white">Ao vivo</span>
                    ) : match.status === "POSTPONED" ? (
                      <span className="font-semibold text-xs bg-red-950 px-2 py-1 rounded-md text-white">Adiado TBD</span>
                    ) : null}
                  </div>
                  <div className="px-1">
                    <Divider className="bg-zinc-700" />
                  </div>
                  <div className="flex flex-col px-2">
                    <div className="flex flex-col justify-between text-white mb-2 gap-2">
                      <div className="flex flex-col font-semibold mt-2 gap-2 text-sm truncate">
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
                          <span className="flex font-semibold items-center justify-center w-6 h-6 bg-yellow-400 text-black">
                            {getScore(match.score.fullTime.home)}
                          </span>
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
                          <span className="flex font-semibold items-center justify-center w-6 h-6 bg-yellow-400 text-black">
                            {getScore(match.score.fullTime.away)}
                          </span>
                        </div>
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

export default LiveMatches;
