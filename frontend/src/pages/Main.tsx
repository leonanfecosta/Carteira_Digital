import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Header from '../components/Header';
import { IAccount, IUser } from '../interfaces/user.interface';
import BalanceCard from '../components/BalanceCard';
import TransferCard from '../components/TransferCard';
import convertNumber from '../utils/convertNumber';
import style from '../styles/Main.module.css';
import { useNavigate } from 'react-router-dom';
import TransferTable from '../components/TransferTable';
import { ITransactionInfo } from '../interfaces/transactions.interface';

export default function Main() {
  const navigate = useNavigate();
  const [user, _setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem('user') as string)
  );
  const [account, setAccount] = useState<IAccount | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState<ITransactionInfo[]>([]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/account', {
        headers: {
          Authorization: user?.token as string,
        },
      });
      setAccount(response.data);
      return response.data as IAccount;
    } catch (error: AxiosError | any) {
      if (
        error.response.data.message === 'Token not found' ||
        error.response.data.message === 'Invalid token' ||
        error.response.data.message === 'Expired or invalid token'
      ) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  }, [navigate, user]);

  const getTransactions = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/transaction/filter',
        {
          headers: {
            Authorization: user?.token as string,
          },
        }
      );
      setTransactions(response.data);
    } catch (error: AxiosError | any) {
      console.log(error);
    }
  }, [user]);

  const handleTransfer = useCallback(async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/transaction',
        {
          recipient,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: user?.token as string,
          },
        }
      );
      fetchUserInfo();
      getTransactions();
      setRecipient('');
      setAmount('');
      setError('');
      window.alert('Transferência realizada com sucesso!');
      return response.data;
    } catch (error: AxiosError | any) {
      switch (error.response.data.message) {
        case 'You can not send money to yourself':
          setError('Você não pode enviar dinheiro para você mesmo');
          setAmount('');
          setRecipient('');
          break;
        case 'User not found':
          setError('Usuário não encontrado');
          setAmount('');
          setRecipient('');
          break;
        case 'Insufficient funds':
          setError('Saldo insuficiente');
          setAmount('');
          setRecipient('');
          break;
        default:
          setError('Erro ao transferir');
          setAmount('');
          setRecipient('');
          break;
      }
    }
  }, [amount, recipient, user, fetchUserInfo]);

  useEffect(() => {
    fetchUserInfo();
    getTransactions();
  }, [fetchUserInfo, getTransactions]);

  return (
    <div>
      <Header username={user?.username as string} />
      <div className={style.main}>
        <div className={style.leftSide}>
          <BalanceCard
            balance={
              account ? convertNumber(account.account.balance) : 'Carregando...'
            }
          />
        </div>
        <div className={style.rightSide}>
          <TransferCard
            receiver={recipient}
            setReceiver={setRecipient}
            amount={amount}
            setAmount={setAmount}
            handleTransfer={handleTransfer}
            error={error}
          />
        </div>
      </div>
      <div className={style.table}>
        <TransferTable
          username={user?.username as string}
          transactions={transactions}
        />
      </div>
    </div>
  );
}
