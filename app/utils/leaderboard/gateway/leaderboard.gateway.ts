import LeaderBoard from "../entity/leaderboard";

export default interface LeaderBoardGateway{
    find(id: string): Promise<LeaderBoard>;
    generate(user: LeaderBoard): Promise<void>;
}