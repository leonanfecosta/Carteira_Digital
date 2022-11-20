import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/imagens/logo-ngcash-branco.88c5860.svg'
import { IUser } from '../interfaces/user.interface';
import Button from './Button';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect (() => {
    const user = localStorage.getItem('user');
    setUser(JSON.parse(user as string));

  }, []);

  return (
    <header className="header">
      <nav>
        <img
          src={logo}
          alt="Logo NgCash"
          className="header__logo"
          style={{ width: '100px' }}
        />
      </nav>

      <div className="header__content">
        <h3 className="header__title">{`Bem vindo, ${user?.username}`}</h3>
        <Button
          type='button'
          name='Sair'
          disabled={false}
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}
        />
      </div>
    </header>
  );
}