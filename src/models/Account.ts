import { v4 } from "uuid";

export const InOut = {
  In: "in",
  Out: "out",
};
export type InOut = (typeof InOut)[keyof typeof InOut];

export class Account {
  id: string = "account-" + v4();
  purpose: string = "";
  cost: number = 0;
  inOut: InOut = InOut.Out;
  memo: string = "";

  constructor(props?: {
    purpose: string;
    cost: number;
    inOut: InOut;
    memo: string;
  }) {
    if (props) {
      const { purpose, cost, inOut, memo } = props;
      this.purpose = purpose;
      this.cost = cost;
      this.inOut = inOut;
      this.memo = memo;
    }
  }

  toJSON() {
    return {
      id: this.id,
      purpose: this.purpose,
      cost: this.cost,
      inOut: this.inOut,
      memo: this.memo,
    };
  }
}
