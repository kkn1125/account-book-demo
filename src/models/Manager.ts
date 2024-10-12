import { AccountBook } from "./AccountBook";

export class Manager {
  defaultBookName: string = "my account";
  accountBooks: Map<string, AccountBook> = new Map();

  constructor(bookManager?: Manager) {
    if (bookManager) {
      const defaultBookName = bookManager.defaultBookName;
      const accountBooks = bookManager.accountBooks;

      this.defaultBookName = defaultBookName;

      if (accountBooks instanceof Map) {
        this.accountBooks = accountBooks;
      } else {
        this.accountBooks = new Map(
          Object.entries(bookManager.accountBooks).map(
            ([label, accountBook]) => [label, new AccountBook(accountBook)]
          )
        );
      }
    } else {
      if (this.accountBooks.size === 0) {
        this.accountBooks.set(this.defaultBookName, new AccountBook());
      }
    }
  }

  orderedKeys() {
    return this.orderedBooks().map(([label]) => label);
  }

  orderedBooks() {
    return [...this.accountBooks.entries()].sort(
      ([_label1, book1], [_label2, book2]) => {
        return book1.createdAt > book2.createdAt ? 1 : -1;
      }
    );
  }

  load() {
    if ("ABM" in localStorage) {
      const data = localStorage.getItem("ABM");
      if (data) {
        try {
          const bookManager = JSON.parse(data) as Manager;
          const manager = new Manager(bookManager);
          console.log("load manager");
          return manager;
        } catch (error) {
          console.log(error);
          throw new Error("not found data or not allowed json form");
        }
      }
    }
  }

  save() {
    const json = this.toJSON();
    localStorage.setItem("ABM", JSON.stringify(json));
  }

  toJSON() {
    const manager = {
      defaultBookName: this.defaultBookName,
      accountBooks: Object.fromEntries(
        [...this.accountBooks.entries()].map(([name, accountBook]) => [
          name,
          accountBook.toJSON(),
        ])
      ),
    };
    return manager;
  }

  rename(originName: string, rename: string) {
    const accountBook = this.accountBooks.get(originName);
    if (accountBook) {
      this.accountBooks.delete(originName);
      this.accountBooks.set(rename, accountBook);
    }
  }

  countDuplicateLabel(label: string) {
    return [...this.accountBooks.keys()].reduce(
      (acc, cur) => (cur.match(label) ? (acc += 1) : acc),
      0
    );
  }

  getBook(label: string) {
    return this.accountBooks.get(label);
  }

  getMaxBookCount() {
    let maxBookNumber = 0;
    for (const label of this.accountBooks.keys()) {
      const numberString = +(label.replace(this.defaultBookName, "") || 0);
      if (numberString > 0 && maxBookNumber < numberString) {
        maxBookNumber = numberString;
      }
    }
    return maxBookNumber + 1;
  }

  getBookName(label: string = this.defaultBookName): string {
    const count = this.countDuplicateLabel(label);
    if (count > 0) {
      const newBookName = this.defaultBookName + this.getMaxBookCount();
      return newBookName;
    } else {
      return this.defaultBookName;
    }
  }

  addAccountBook(label: string, accountBook: AccountBook) {
    if (this.accountBooks.has(label)) {
      throw new TypeError("already exists account book label", {
        cause: label,
      });
    }
    this.accountBooks.set(label, accountBook);
  }

  deleteAccountBook(label: string) {
    if (this.accountBooks.has(label)) {
      this.accountBooks.delete(label);
    } else {
      throw new TypeError("not found account book", { cause: label });
    }
  }
}
