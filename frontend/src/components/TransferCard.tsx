import { SetStateAction } from 'react';
import Input from './Input';
import Button from './Button';
import style from '../styles/TransferCard.module.css';

interface TransferCardProps {
  amount: number | string;
  receiver: string;
  setAmount: React.Dispatch<SetStateAction<string>>;
  setReceiver: (receiver: string) => void;
  handleTransfer: () => void;
  error: string;
}

export default function TransferCard({
  receiver,
  setReceiver,
  amount,
  setAmount,
  handleTransfer,
  error,
}: TransferCardProps) {
  return (
    <div className={style.transfer_card}>
      <h1>Transferir</h1>
      <Input
        label="Destinatário"
        name="receiver"
        type="text"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        placeholder="Nome do destinatário"
      />
      <Input
        label="Valor"
        name="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(',', '.') as unknown as string)}
        placeholder="Valor"
      />
      {error && <p className={style.error}>{error}</p>}
      <Button
        type="submit"
        name="Transferir"
        onClick={handleTransfer}
        disabled={receiver === '' || amount === 0}
        className={style.transfer_btn}
      />
    </div>
  );
}
