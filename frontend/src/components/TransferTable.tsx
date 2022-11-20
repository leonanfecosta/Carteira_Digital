import { ITransactionInfo } from '../interfaces/transactions.interface';
import moment from 'moment';
import convertNumber from '../utils/convertNumber';
export interface TransferTableProps {
  transactions: ITransactionInfo[];
  username: string;
}

export default function TransferTable({
  transactions,
  username,
}: TransferTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Remetente</th>
          <th>Destinatário</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>
              {transaction.debitedAccount?.userAccount.username === username
                ? 'Você'
                : transaction.debitedAccount?.userAccount.username}
            </td>
            <td>
              {transaction.creditedAccount?.userAccount.username === username
                ? 'Você'
                : transaction.creditedAccount?.userAccount.username}
            </td>
            <td>{convertNumber(transaction.value)}</td>
            <td>
              {
                moment(transaction.createdAt).format(
                  'DD/MM/YYYY'
                ) as unknown as string
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
