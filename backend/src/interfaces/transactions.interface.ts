export interface ITransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: Date;
}

export interface ITransactionInfo extends ITransaction {
  debitedAccount?: {
    id: number;
    userAccount: {
      id: number;
      username: string;
    };
  };
  creditedAccount?: {
    id: number;
    userAccount: {
      id: number;
      username: string;
    };
  };
}