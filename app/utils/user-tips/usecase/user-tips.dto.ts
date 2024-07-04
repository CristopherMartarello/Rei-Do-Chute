export interface FindUserTipsUseCaseInputDTO{
    id: string;
}

export interface FindUserTipsUseCaseOutputDTO{
    tips: string[];
}

export interface GenerateUserTipsUseCaseInputDTO{
    id: string;
    tips: string[];
}

export interface GenerateUserTipsUseCaseOutputDTO{
    tips: string[];
}