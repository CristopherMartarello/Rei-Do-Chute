import UserTips from "../../user-tips/entity/user-tips";
import User from "../../user/entity/user";
import LeaderBoard from "../entity/leaderboard";
import { GenerateLeaderBoardUseCaseInputDTO, GenerateLeaderBoardUseCaseOutputDTO } from "./leaderboard.dto";
import LeaderBoardUseCase from "./leaderboard.usecase";

const userTips1 = new UserTips({
    id: "123",
    tips: [
        { matchId: "match1", selectedTeam: "Team A" },
        { matchId: "match2", selectedTeam: "Team B" },
        { matchId: "match3", selectedTeam: "Draw (Team C vs Team D)" }
    ],
})
const userTips2 = new UserTips({
    id: "234",
    tips: [
        { matchId: "match1", selectedTeam: "Team B" },
        { matchId: "match2", selectedTeam: "Team C" },
        { matchId: "match3", selectedTeam: "Draw (Team A vs Team E)" }
    ],
})
const userTips3 = new UserTips({
    id: "345",
    tips: [
        { matchId: "match1", selectedTeam: "Team A" },
        { matchId: "match2", selectedTeam: "Team C" },
        { matchId: "match3", selectedTeam: "Draw (Team A vs Team E)" }
    ],
})

const user1 = new User({
    id: "123", name: "Name 1", email: "x@x.com",
    password: "123", titles: 3, profile: "user1", actualTips: userTips1,
})
const user2 = new User({
    id: "234", name: "Name 3", email: "x@x.com",
    password: "234", titles: 4, profile: "user2", actualTips: userTips2,
})
const user3 = new User({
    id: "345", name: "Name 3", email: "x@x.com",
    password: "345", titles: 1, profile: "user3", actualTips: userTips3,
})

const leaderBoard = new LeaderBoard({
    id: "123",
    users: [user1, user2, user3],
    hits: [6, 7, 4],
})

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(leaderBoard)),
        generate: jest.fn(),
    };
};

describe("Process leaderboard usecase unit test", () => {
    it("should find a leaderboard", async () => {
        const leaderboardRepository = MockRepository()
        const usecase = new LeaderBoardUseCase(leaderboardRepository)

        const input = {
            id: "123"
        }

        const result = await usecase.executeFind(input)

        expect(leaderboardRepository.find).toHaveBeenCalledWith(input.id);
        expect(result.id).toEqual(leaderBoard.id)
        expect(result.users).toEqual(leaderBoard.users)
        expect(result.hits).toEqual(leaderBoard.acertos)
    });

    it("should generate a user", async () => {
        const leaderboardRepository = MockRepository()
        const usecase = new LeaderBoardUseCase(leaderboardRepository)

        const input: GenerateLeaderBoardUseCaseInputDTO = {
            id: "123",
            users: [
                user1, user2, user3
            ],
            hits: [
                6, 7, 4
            ]
        }

        const result = await usecase.executeGenerate(input)

        const expectedOutput: GenerateLeaderBoardUseCaseOutputDTO = {
            id: expect.any(String),
            users: [
                user1, user2, user3
            ],
            hits: [
                6, 7, 4
            ]
        }

        expect(leaderboardRepository.generate).toHaveBeenCalledWith(expect.any(LeaderBoard));
        expect(result.id).toEqual(expectedOutput.id)
        expect(result.users).toEqual(expectedOutput.users)
        expect(result.hits).toEqual(expectedOutput.hits)
    });
});