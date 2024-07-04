import UserTips from "../entity/user-tips";
import UserTipsUseCase from "./user-tips.usecase";
import { GenerateUserTipsUseCaseInputDTO, GenerateUserTipsUseCaseOutputDTO } from "./user-tips.dto";

const userTips = new UserTips({
    id: "123",
    tips: ["Flamengo", "Palmeiras", "Internacional", "Vasco", "Bahia", "Cuiabá", "Fortaleza", "Cruzeiro", "Atlético MG", "Botafogo"],
})

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(userTips)),
        generate: jest.fn(),
    };
};

describe("Process user usecase unit test", () => {
    it("should find a user", async () => {
        const userRepository = MockRepository()
        const usecase = new UserTipsUseCase(userRepository)

        const input = {
            id: "123"
        }

        const result = await usecase.executeFind(input)

        expect(userRepository.find).toHaveBeenCalledWith(input.id);
        expect(result.tips).toEqual(userTips.tips)
    });

    it("should generate a user", async () => {
        const userRepository = MockRepository()
        const usecase = new UserTipsUseCase(userRepository)

        const input: GenerateUserTipsUseCaseInputDTO = {
            id: "123",
            tips: ["Flamengo", "Palmeiras", "Internacional", "Vasco", "Bahia", "Cuiabá", "Fortaleza", "Cruzeiro", "Atlético MG", "Botafogo"],
        }

        const result = await usecase.executeGenerate(input)

        const expectedOutput: GenerateUserTipsUseCaseOutputDTO = {
            tips: ["Flamengo", "Palmeiras", "Internacional", "Vasco", "Bahia", "Cuiabá", "Fortaleza", "Cruzeiro", "Atlético MG", "Botafogo"],
        }

        expect(userRepository.generate).toHaveBeenCalledWith(expect.any(UserTips));
        expect(result.tips).toEqual(expectedOutput.tips)
    });
});