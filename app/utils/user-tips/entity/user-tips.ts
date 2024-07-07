type UserTipsProps = {
    id: string;
    tips: string[];
}

export default class UserTips {
    private _id: string;
    private _tips: string[];

    constructor(props: UserTipsProps){
        this._id = props.id;
        this._tips = props.tips;
    }

    get id(): string{
        return this._id;
    }

    get tips(): string[]{
        return this._tips;
    }
}