import { MatchDoc } from "../firebase/matches";
import Header from "./Header";
import RoundPanel from "./RoundPanel";
import { useEffect, useState } from "react";

interface HomeProps {
  matchData: MatchDoc[];
}

const Home = ({ matchData }: HomeProps) => {
  const [showRoundPanel, setShowRoundPanel] = useState(true);

  useEffect(() => {
    if (matchData.length > 0 && matchData[0].partidas.length > 0) {
      const now = new Date();
      const data = matchData[0].partidas[0].data;
      const hora = matchData[0].partidas[0].hora;
      const matchDate = formatDateTime(data, hora);
      const isAfterMatch = now > matchDate;

      if (isAfterMatch) {
        setShowRoundPanel(false);
      }
    }
  }, [matchData]);

  const formatDateTime = (data: string, hora: string): Date => {
    const [dia, mes] = data.split('/');
    const [horaStr, minutoStr] = hora.split(':');

    const ano = new Date().getFullYear();
    const formattedDate = new Date(ano, parseInt(mes) - 1, parseInt(dia), parseInt(horaStr), parseInt(minutoStr));
    
    return formattedDate;
  };

  return (
    <div>
      {showRoundPanel ? (
        <>
          <Header />
          <RoundPanel matchData={matchData}/>
        </>
      ) : (
        <div>Não foi possível entrar. A rodada já está acontecendo.</div>
      )}
    </div>
  );
};

export default Home;
