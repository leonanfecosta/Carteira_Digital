import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import style from '../styles/Register.module.css';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
    setBtnDisabled(!(username.length >= 3 && password && regex.test(password)));
  }, [username, password]);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/user/register', {
        username,
        password,
      });
      navigate('/login');
    } catch (error: AxiosError | any) {
      if (error.response as AxiosError) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className={style.register}>
      <div className={style.leftRegister}>
        <h1>Cadastre-se e tenha a carteira da nova geração</h1>
        <h2>É para todas as idades!</h2>
      </div>
      <form className={style.rightRegister}>
        <div className={style.cardRegister}>
          <h1>REGISTRO</h1>
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

            {error && <p className={style.error}>Usuário ja existe</p>}

            {password && (
              <ul>
                <li>Deve conter no mínimo 8 caracteres</li>
                <li>Deve conter pelo menos uma letra maiúscula</li>
                <li>Deve conter pelo menos um número</li>
              </ul>
            )}

            <Button
              type="submit"
              name="Registrar"
              disabled={btnDisabled}
              onClick={handleRegister}
              className={style.btnRegister}
            />

            <p>
              Já tem uma conta? <Link to="/login"> Faça login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
