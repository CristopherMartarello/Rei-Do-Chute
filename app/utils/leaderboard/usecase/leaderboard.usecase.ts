import LeaderBoard from "../entity/leaderboard";
import LeaderBoardGateway from "../gateway/leaderboard.gateway";
import { FindLeaderboardUseCaseInputDTO, FindLeaderboardUseCaseOutputDTO, GenerateLeaderBoardUseCaseInputDTO, GenerateLeaderBoardUseCaseOutputDTO } from "./leaderboard.dto";

export default class LeaderBoardUseCase{
    private _leaderBoardRepository: LeaderBoardGateway

    constructor(leaderBoardRepository: LeaderBoardGateway) {
        this._leaderBoardRepository = leaderBoardRepository
    }

    async executeFind(input: FindLeaderboardUseCaseInputDTO): Promise<FindLeaderboardUseCaseOutputDTO>{
        const result = await this._leaderBoardRepository.find(input.id)

        return{
            id: result.id,
            users: result.users,
            hits: result.acertos
        }
    }

    async executeGenerate(input: GenerateLeaderBoardUseCaseInputDTO): Promise<GenerateLeaderBoardUseCaseOutputDTO>{
        const leaderBoard = new LeaderBoard({
            id: input.id,
            users: input.users,
            hits: input.hits
        });

        await this._leaderBoardRepository.generate(leaderBoard)

        return {
            id: leaderBoard.id,
            users: leaderBoard.users,
            hits: leaderBoard.acertos
        }
    }
}