import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import axios, { AxiosError } from 'axios';
import { IUser } from '../interfaces/user.interface';
import style from '../styles/Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
    setBtnDisabled(!(username && password && regex.test(password)));
  }, [username, password]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post<IUser>(
        'http://localhost:3001/user/login',
        {
          username,
          password,
        }
      );
      const user = result.data as IUser;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (error: AxiosError | any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };
  return (
    <div className={style.login}>
      <div className={style.leftLogin}>
        <h1>BEM VINDO A NG.CASH</h1>
        <h2>A CARTEIRA DA NOVA GERAÇÃO.</h2>
      </div>
      <form className={style.rightLogin}>
        <div className={style.cardLogin}>
          <h1>LOGIN</h1>
          <div className={style.inputContainer}>
            <Input
              label="Nome de Usuário"
              value={username}
              name="username"
              type="text"
              placeholder="Digite seu username"
              onChange={({ target: { value } }) => setUsername(value)}
            />
            <Input
              label="Senha"
              value={password}
              name="password"
              type="password"
              placeholder="Digite sua senha"
              onChange={({ target: { value } }) => setPassword(value)}
            />
              {error && <p className={style.error}>Usuário ou Senha Inválidos</p>}
            <Button
              type="submit"
              name="Entrar"
              disabled={btnDisabled}
              onClick={handleLogin}
              className={style.btnLogin}
            />

            <p>
              <Link to="/register"> Ainda não tenho conta</Link>
            </p>
          </div>
        </div>

        {/* <p>Observações: <br/>
        Seu username deve ter mais de 3 caracteres <br/>
        Sua senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número</p> */}
      </form>
    </div>
  );
}
