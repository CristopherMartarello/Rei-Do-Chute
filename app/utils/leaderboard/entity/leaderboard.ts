import User from "../../user/entity/user";

type leaderBoardProps = {
    id: string;
    users: User[];
    hits: number[];
}

export default class LeaderBoard {
    private _id: string;
    private _users: User[];
    private _hits: number[];

    constructor(props: leaderBoardProps){
        this._id = props.id;
        this._users = props.users;
        this._hits = props.hits;
    }

    get id(): string {
        return this._id
    }

    get users(): User[] {
        return this._users
    }

    get acertos(): number[] {
        return this._hits
    }    
}