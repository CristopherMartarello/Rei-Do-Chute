import UserTips from "../entity/user-tips";
import UserTipsUseCase from "./user-tips.usecase";
import { GenerateUserTipsUseCaseInputDTO, GenerateUserTipsUseCaseOutputDTO } from "./user-tips.dto";

const userTips = new UserTips({
    id: "123",
    tips: [
        { matchId: "match1", selectedTeam: "Team A" },
        { matchId: "match2", selectedTeam: "Team B" },
        { matchId: "match3", selectedTeam: "Draw (Team C vs Team D)" }
    ],
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
            tips: [
              { matchId: "match1", selectedTeam: "Team A" },
              { matchId: "match2", selectedTeam: "Team B" },
              { matchId: "match3", selectedTeam: "Draw (Team C vs Team D)" }
            ],
          };

        const result = await usecase.executeGenerate(input)

        const expectedOutput: GenerateUserTipsUseCaseOutputDTO = {
            tips: [
                { matchId: "match1", selectedTeam: "Team A" },
                { matchId: "match2", selectedTeam: "Team B" },
                { matchId: "match3", selectedTeam: "Draw (Team C vs Team D)" }
              ],
        }

        expect(userRepository.generate).toHaveBeenCalledWith(expect.any(UserTips));
        expect(result.tips).toEqual(expectedOutput.tips)
    });
});