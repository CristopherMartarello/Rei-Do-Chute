import UserTips from "../../user-tips/entity/user-tips";

export interface FindUserUseCaseInputDTO{
    id: string;
}

export interface FindUserUseCaseOutputDTO{
    id: string;
    name: string;
    email: string;
    password: string;
    titles: number;
    profile: string;
    actualTips: UserTips;
}

export interface GenerateUseCaseInputDTO{
    id: string;
    name: string;
    email: string;
    password: string;
    titles: number,
    profile: string;
    actualTips: UserTips;
}

export interface GenerateUseCaseOutputDTO{
    id: string;
    name: string;
    email: string;
    password: string;
    profile: string;
    actualTips: UserTips;
}