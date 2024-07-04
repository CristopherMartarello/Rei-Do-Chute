import UserTips from "../entity/user-tips";
import UserTipsGateway from "../gateway/user-tips.gateway";
import { FindUserTipsUseCaseInputDTO, FindUserTipsUseCaseOutputDTO, GenerateUserTipsUseCaseInputDTO, GenerateUserTipsUseCaseOutputDTO } from "./user-tips.dto";

export default class UserTipsUseCase{
    private _userTipsRepository: UserTipsGateway

    constructor(userRepository: UserTipsGateway) {
        this._userTipsRepository = userRepository
    }

    async executeFind(input: FindUserTipsUseCaseInputDTO): Promise<FindUserTipsUseCaseOutputDTO>{
        const result = await this._userTipsRepository.find(input.id)

        return{
            tips: result.tips,
        }
    }

    async executeGenerate(input: GenerateUserTipsUseCaseInputDTO): Promise<GenerateUserTipsUseCaseOutputDTO>{
        const user = new UserTips({
            id: input.id,
            tips: input.tips
        });

        await this._userTipsRepository.generate(user)

        return {
            tips: user.tips
        }
    }
}