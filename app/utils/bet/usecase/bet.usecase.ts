import Bet from "../entity/bet";
import BetGateway from "../gateway/bet.gateway";
import { FindBetUseCaseInputDTO, FindBetUseCaseOutputDTO, GenerateBetUseCaseInputDTO, GenerateBetUseCaseOutputDTO } from "./bet.dto";

export default class BetUseCase{
    private _betRepository: BetGateway

    constructor(betRepository: BetGateway) {
        this._betRepository = betRepository
    }

    async executeFind(input: FindBetUseCaseInputDTO): Promise<FindBetUseCaseOutputDTO>{
        const result = await this._betRepository.find(input.id)

        return{
            id: result.id,
            user: result.user,
            user_tips: result.user_tips
        }
    }

    async executeGenerate(input: GenerateBetUseCaseInputDTO): Promise<GenerateBetUseCaseOutputDTO>{
        const bet = new Bet({
            id: input.id,
            user: input.user,
            user_tips: input.user_tips
        });

        await this._betRepository.generate(bet)

        return {
            id: bet.id,
            user: bet.user,
            user_tips: bet.user_tips
        }
    }
}