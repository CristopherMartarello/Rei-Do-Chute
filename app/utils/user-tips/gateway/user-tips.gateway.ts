import UserTips from "../entity/user-tips";

export default interface UserTipsGateway{
    find(id: string): Promise<UserTips>;
    generate(user: UserTips): Promise<void>;
}