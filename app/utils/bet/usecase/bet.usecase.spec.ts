import UserTips from "../../user-tips/entity/user-tips";
import User from "../../user/entity/user";
import Bet from "../entity/bet";
import { GenerateBetUseCaseInputDTO, GenerateBetUseCaseOutputDTO } from "./bet.dto";
import BetUseCase from "./bet.usecase";

const user1 = new User({
    id: "123", name: "Name 1", email: "x@x.com",
    password: "123", titles: 3, profile: "user1",
})

const userTips = new UserTips({
    id: "123",
    tips: [
        { matchId: "match1", selectedTeam: "Team A" },
        { matchId: "match2", selectedTeam: "Team B" },
        { matchId: "match3", selectedTeam: "Draw (Team C vs Team D)" }
    ],
})

const bet = new Bet({
    id: "123",
    user: user1,
    user_tips: userTips,
})

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(bet)),
        generate: jest.fn(),
    };
};

describe("Process leaderboard usecase unit test", () => {
    it("should find a leaderboard", async () => {
        const betRepository = MockRepository()
        const usecase = new BetUseCase(betRepository)

        const input = {
            id: "123"
        }

        const result = await usecase.executeFind(input)

        expect(betRepository.find).toHaveBeenCalledWith(input.id);
        expect(result.id).toEqual(bet.id)
        expect(result.user).toEqual(bet.user)
        expect(result.user_tips).toEqual(bet.user_tips)
    });

    it("should generate a user", async () => {
        const betRepository = MockRepository()
        const usecase = new BetUseCase(betRepository)

        const input: GenerateBetUseCaseInputDTO = {
            id: "123",
            user: user1,
            user_tips: userTips
        }

        const result = await usecase.executeGenerate(input)

        const expectedOutput: GenerateBetUseCaseOutputDTO = {
            id: expect.any(String),
            user: user1,
            user_tips: userTips
        }

        expect(betRepository.generate).toHaveBeenCalledWith(expect.any(Bet));
        expect(result.id).toEqual(expectedOutput.id)
        expect(result.user).toEqual(expectedOutput.user)
        expect(result.user_tips).toEqual(expectedOutput.user_tips)
    });
});