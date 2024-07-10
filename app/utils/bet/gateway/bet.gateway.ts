import Bet from "../entity/bet";

export default interface BetGateway{
    find(id: string): Promise<Bet>;
    generate(user: Bet): Promise<void>;
}