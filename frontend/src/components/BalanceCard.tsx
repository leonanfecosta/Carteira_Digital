import style from '../styles/BalanceCard.module.css';

interface BalanceCardProps {
  balance: number | string;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className={style.balance_card}>
      <h1>Saldo atual</h1>
      <h2>R$ {balance}</h2>
    </div>
  );
}