import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/imagens/logo-ngcash-branco.88c5860.svg'
import { IUser } from '../interfaces/user.interface';
import Button from './Button';
import style from '../styles/Header.module.css';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect (() => {
    const user = localStorage.getItem('user');
    setUser(JSON.parse(user as string));

  }, []);

  return (
    <header className={style.header}>
      <nav>
        <img
          src={logo}
          alt="Logo NgCash"
          className={style.logo}
        />
      </nav>

      <div className={style.menu}>
        <h3>{`Bem vindo, ${user?.username}`}</h3>
        <Button
          type='button'
          name='Sair'
          disabled={false}
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}
          className={style.btnLogOut}
        />
      </div>
    </header>
  );
}