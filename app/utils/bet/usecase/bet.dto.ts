import UserTips from "../../user-tips/entity/user-tips";
import User from "../../user/entity/user";

export interface FindBetUseCaseInputDTO{
    id: string;
}

export interface FindBetUseCaseOutputDTO{
    id: string;
    user: User;
    user_tips: UserTips;
}

export interface GenerateBetUseCaseInputDTO{
    id: string;
    user: User;
    user_tips: UserTips;
}

export interface GenerateBetUseCaseOutputDTO{
    id: string;
    user: User;
    user_tips: UserTips;
}