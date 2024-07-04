import { Button } from "@nextui-org/react";

interface HomeProps {
    logout: () => void
}

const Home = ({logout}: HomeProps) => {
    return (
        <div>
            <div>Oi, você está logado! (exibir os palpites da rodada)</div>
            <Button onClick={logout}>Deslogar</Button>
        </div>
    );
}
 
export default Home;