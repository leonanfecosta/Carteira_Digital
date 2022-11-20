import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { IAccount, IUser } from '../interfaces/user.interface';
import BalanceCard from '../components/BalanceCard';
import style from '../styles/Main.module.css';

export default function Main() {
  const [user, setUser] = useState<IUser | null>(null);
  const [account, setAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    const userStorage = JSON.parse(
      localStorage.getItem('user') as string
    ) as IUser;
    setUser(userStorage);
    const fetchUserInfo = async () => {
      const response = await axios.get('http://localhost:3001/user/account', {
        headers: {
          Authorization: userStorage.token,
        },
      });
      setAccount(response.data);
      return response.data as IAccount;
    };
    fetchUserInfo();
  }, []);

  return (
    <div>
      <Header username={user?.username as string} />
      <div className={style.main}>
        <div className={style.leftSide}>
          <BalanceCard
            balance={account ? account.account.balance : 'Carregando...'}
          />
        </div>
        <div className={style.rightSide}>
          <h1>Últimas transações</h1>
        </div>
      </div>
    </div>
  );
}
