type UserTip = {
  matchId: string;
  selectedTeam: string;
};

type UserTipsProps = {
  id: string;
  tips: UserTip[];
}

export default class UserTips {
  private _id: string;
  private _tips: UserTip[];

  constructor(props: UserTipsProps) {
    this._id = props.id;
    this._tips = props.tips;
  }

  get id(): string {
    return this._id;
  }

  get tips(): UserTip[] {
    return this._tips;
  }

  addTip(tip: UserTip): void {
    if (!this._tips.includes(tip)) {
      this._tips.push(tip);
      console.log(`Team added: ${tip.selectedTeam}`);
    } else {
      console.log(`Team "${tip.selectedTeam}" already exists.`);
    }
    console.log(`Current tips: ${this._tips.map(t => t.selectedTeam).join(", ")}`);
  }

  removeTip(tip: UserTip): void {
    const index = this._tips.findIndex(t => t.matchId === tip.matchId);
    if (index !== -1) {
      this._tips.splice(index, 1);
      console.log(`Tip removed: ${tip.selectedTeam} for match ${tip.matchId}`);
    } else {
      console.log(`Tip not found for match ${tip.matchId}`);
    }
    console.log(`Current tips: ${this._tips.map(t => t.selectedTeam).join(", ")}`);
  }
}