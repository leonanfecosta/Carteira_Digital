import { useNavigate } from 'react-router-dom';
import logo from '../assets/imagens/logo-ngcash-branco.88c5860.svg'
import Button from './Button';
import style from '../styles/Header.module.css';

interface HeaderProps {
  username: string;
}

export default function Header( { username }: HeaderProps) {
  const navigate = useNavigate();
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
        <h3>{`Bem vindo, ${username}`}</h3>
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