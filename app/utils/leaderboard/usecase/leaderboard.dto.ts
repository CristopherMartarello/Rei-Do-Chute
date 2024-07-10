import User from "../../user/entity/user";

export interface FindLeaderboardUseCaseInputDTO{
    id: string;
}

export interface FindLeaderboardUseCaseOutputDTO{
    id: string;
    users: User[];
    hits: number[];
}

export interface GenerateLeaderBoardUseCaseInputDTO{
    id: string;
    users: User[];
    hits: number[];
}

export interface GenerateLeaderBoardUseCaseOutputDTO{
    id: string;
    users: User[];
    hits: number[];
}