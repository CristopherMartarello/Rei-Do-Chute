import User from "../entity/user";

export default interface UserGateway{
    find(id: string): Promise<User>;
    generate(user: User): Promise<void>;
}