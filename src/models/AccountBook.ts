import { Account } from "./Account";

export class AccountBook {
  accounts: Account[] = [];
  createdAt: Date = new Date();
  updatedAt!: Date;

  constructor(accountBook?: AccountBook) {
    if (accountBook) {
      this.accounts = accountBook.accounts.map((account) =>
        Object.assign(new Account(), account)
      );
      this.createdAt = new Date(accountBook.createdAt);
      this.updatedAt = new Date(accountBook.updatedAt);
    }
  }

  addAccount(account: Pick<Account, IncludeProps>) {
    this.accounts.push(new Account(account));
  }

  toJSON() {
    const book = {
      accounts: this.accounts.map((account) => account.toJSON()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
    return book;
  }
}
