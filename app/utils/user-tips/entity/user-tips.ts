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

    addTip(tip: string): void {
        if (!this._tips.includes(tip)) {
          this._tips.push(tip);
          console.log(`Team added: ${tip}`);
        } else {
          console.log(`Team "${tip}" already exists.`);
        }
        console.log(`Current tips: ${this._tips.join(", ")}`);
      }
    
      removeTip(tip: string): void {
        const index = this._tips.indexOf(tip);
        if (index !== -1) {
          this._tips.splice(index, 1);
          console.log(`Team removed: ${tip}`);
        } else {
          console.log(`Team "${tip}" not found.`);
        }
        console.log(`Current tips: ${this._tips.join(", ")}`);
      }
}