import UserTips from "../../user-tips/entity/user-tips";

type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    titles: number;
    profile: string;
    actualTips: UserTips;
}

export default class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private _titles: number;
    private _profile: string;
    private _actualTips: UserTips;

    constructor(props: UserProps) {
        this._id = props.id;
        this._name = props.name;
        this._email = props.email;
        this._password = props.password;
        this._titles = props.titles;
        this._profile = props.profile;
        this._actualTips = props.actualTips;
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get email(): string {
        return this._email
    }

    get password(): string {
        return this._password
    }

    get titles(): number {
        return this._titles
    }

    get profile(): string {
        return this._profile
    }

    get actualTips(): UserTips {
        return this._actualTips
    }
}