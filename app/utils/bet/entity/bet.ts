import UserTips from "../../user-tips/entity/user-tips";
import User from "../../user/entity/user";

type BetProps = {
    id: string;
    user: User;
    user_tips: UserTips;
}

export default class Bet{
    private _id: string;
    private _user: User;
    private _user_tips: UserTips;

    constructor(props: BetProps){
        this._id = props.id;
        this._user = props.user;
        this._user_tips = props.user_tips;
    }

    get id(): string {
        return this._id
    }

    get user(): User {
        return this._user
    }

    get user_tips(): UserTips {
        return this._user_tips
    }
}