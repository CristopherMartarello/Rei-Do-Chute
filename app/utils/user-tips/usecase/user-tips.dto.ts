import UserTips from "../entity/user-tips";

export interface FindUserTipsUseCaseInputDTO{
    id: string;
}

export interface FindUserTipsUseCaseOutputDTO{
    tips: UserTip[];
}

export interface GenerateUserTipsUseCaseInputDTO{
    id: string;
    tips: UserTip[];
}

export interface UserTip {
    matchId: string;
    selectedTeam: string;
  }

export interface GenerateUserTipsUseCaseOutputDTO{
    tips: UserTip[];
}