export interface IUser {
  id: number;
  username: string;
  accountId: string;
  token?: string;
}

export interface IAccount extends IUser {
  account: {
    balance: number;
  };
}
