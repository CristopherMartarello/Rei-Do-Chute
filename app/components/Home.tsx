import { Match, MatchDoc } from "../firebase/matches";
import Header from "./Header";
import RoundPanel from "./RoundPanel";

interface HomeProps {
  matchData: MatchDoc[];
}

const Home = ({ matchData }: HomeProps) => {
  return (
    <div>
      <Header />
      <RoundPanel matchData={matchData}/>
    </div>
  );
};

export default Home;
