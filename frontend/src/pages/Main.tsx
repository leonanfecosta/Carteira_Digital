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
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem('user') as string)
  );
  const [account, setAccount] = useState<IAccount | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState<ITransactionInfo[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [cashInFilter, setCashInFilter] = useState('');
  const [cashOutFilter, setCashOutFilter] = useState('');
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('');

  const verifyFilter = useCallback(() => {
    if (cashInFilter || cashOutFilter || date) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }
  }, [cashInFilter, date, cashOutFilter]);

  const handleFilter = useCallback(() => {
    if (!cashInFilter && !cashOutFilter && isFiltering) {
      setFilter('date');
    } else if (!cashInFilter && !date && isFiltering) {
      setFilter('cash-out');
    } else if (!cashOutFilter && !date && isFiltering) {
      setFilter('cash-in');
    } else if (!cashInFilter && isFiltering) {
      setFilter('date and cash-out');
    } else if (!cashOutFilter && isFiltering) {
      setFilter('date and cash-in');
    } else {
      setFilter('');
    }
  }, [cashInFilter, cashOutFilter, date, isFiltering]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/account', {
        headers: {
          Authorization: user?.token as string,
        },
      });
      setAccount(response.data);
      // setUser(response.data.user);
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
      verifyFilter();
      handleFilter();
      const response = await axios.get(
        'http://localhost:3001/transaction/filter',
        {
          headers: {
            Authorization: user?.token as string,
          },
          params: {
            filter: filter ? filter : '',
            date: date ? date : '',
          },
        }
      );
      setTransactions(response.data);
    } catch (error: AxiosError | any) {
      console.log(error);
    }
  }, [user, verifyFilter, date, filter, handleFilter]);

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
  }, [amount, recipient, user, fetchUserInfo, getTransactions]);

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
        <h1>Histórico de Transações</h1>
        <div>
          <input
            type="radio"
            value="Cash-In"
            name="filter"
            onChange={({ target }) => {
              setCashInFilter(target.value);
              setCashOutFilter('');
            }}
          />
          Cash-In
          <input
            type="radio"
            value="Cash-Out"
            name="filter"
            onChange={({ target }) => {setCashOutFilter(target.value); setCashInFilter('');}}
          />
          Cash-Out
          <input type="date" onChange={({ target }) => setDate(target.value)} />
        </div>
        <TransferTable
          username={user?.username as string}
          transactions={transactions}
        />
      </div>
    </div>
  );
}
