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
}

export interface GenerateUseCaseInputDTO{
    id: string;
    name: string;
    email: string;
    password: string;
    titles: number,
    profile: string;
}

export interface GenerateUseCaseOutputDTO{
    id: string;
    name: string;
    email: string;
    password: string;
    profile: string;
}