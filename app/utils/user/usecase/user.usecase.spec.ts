import UserTips from "../../user-tips/entity/user-tips";
import User from "../entity/user";
import { GenerateUseCaseInputDTO, GenerateUseCaseOutputDTO } from "./user.dto";
import UserUseCase from "./user.usecase";

const userTips = new UserTips({
    id: "123",
    tips: [
        { matchId: "match1", selectedTeam: "Team A" },
        { matchId: "match2", selectedTeam: "Team B" },
        { matchId: "match3", selectedTeam: "Draw (Team C vs Team D)" }
    ],
})

const user = new User({
    id: "123",
    name: "Name 1",
    email: "x@x.com",
    password: "123",
    titles: 3,
    profile: "user",
    actualTips: userTips
})

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(user)),
        generate: jest.fn(),
    };
};

describe("Process user usecase unit test", () => {
    it("should find a user", async () => {
        const userRepository = MockRepository()
        const usecase = new UserUseCase(userRepository)

        const input = {
            id: "123"
        }

        const result = await usecase.executeFind(input)

        expect(userRepository.find).toHaveBeenCalledWith(input.id);
        expect(result.id).toEqual(user.id)
        expect(result.name).toEqual(user.name)
        expect(result.email).toEqual(user.email)
        expect(result.password).toEqual(user.password)
        expect(result.titles).toEqual(user.titles)
        expect(result.actualTips).toEqual(user.actualTips)
    });

    it("should generate a user", async () => {
        const userRepository = MockRepository()
        const usecase = new UserUseCase(userRepository)

        const input: GenerateUseCaseInputDTO = {
            id: "123",
            name: "Name 1",
            email: "x@x.com",
            password: "123",
            titles: 0,
            profile: "User",
            actualTips: userTips
        }

        const result = await usecase.executeGenerate(input)

        const expectedOutput: GenerateUseCaseOutputDTO = {
            id: expect.any(String),
            name: "Name 1",
            email: "x@x.com",
            password: "123",
            profile: "User",
            actualTips: userTips
        }

        expect(userRepository.generate).toHaveBeenCalledWith(expect.any(User));
        expect(result.id).toEqual(expectedOutput.id)
        expect(result.name).toEqual(expectedOutput.name)
        expect(result.email).toEqual(expectedOutput.email)
        expect(result.password).toEqual(expectedOutput.password)
        expect(result.profile).toEqual(expectedOutput.profile)
        
    });
});