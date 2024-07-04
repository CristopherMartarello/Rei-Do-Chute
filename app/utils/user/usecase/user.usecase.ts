import User from "../entity/user";
import UserGateway from "../gateway/user.gateway";
import { FindUserUseCaseInputDTO, FindUserUseCaseOutputDTO, GenerateUseCaseInputDTO, GenerateUseCaseOutputDTO } from "./user.dto";

export default class UserUseCase{
    private _userRepository: UserGateway

    constructor(userRepository: UserGateway) {
        this._userRepository = userRepository
    }

    async executeFind(input: FindUserUseCaseInputDTO): Promise<FindUserUseCaseOutputDTO>{
        const result = await this._userRepository.find(input.id)

        return{
            id: result.id,
            name: result.name,
            email: result.email,
            password: result.password,
            titles: result.titles,
            profile: result.profile,
        }
    }

    async executeGenerate(input: GenerateUseCaseInputDTO): Promise<GenerateUseCaseOutputDTO>{
        const user = new User({
            id: input.id,
            name: input.name,
            email: input.email,
            password: input.password,
            titles: input.titles,
            profile: input.profile
        });

        await this._userRepository.generate(user)

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            profile: user.profile
        }
    }
}