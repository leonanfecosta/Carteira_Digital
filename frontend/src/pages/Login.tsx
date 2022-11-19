import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    const regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
    setBtnDisabled(!(username && password && regex.test(password)));
  }, [username, password]);
  return (
    <div>
      <h1>BEM VINDO A NG.CASH</h1>
      <h2>A CARTEIRA DA NOVA GERAÇÃO.</h2>
      <form>
        <Input
          label="Username"
          value={username}
          name="username"
          type="text"
          placeholder="Digite seu username"
          onChange={({ target: { value }}) => setUsername(value)}
        />
        <Input
          label="Password"
          value={password}
          name="password"
          type="password"
          placeholder="Digite sua senha"
          onChange={({ target: { value }}) => setPassword(value)}
        />
        <Button
          type="submit"
          name="Entrar"
          disabled={btnDisabled}
          onClick={() => {}}
        />

        <p><Link to='/register'> Ainda não tenho conta</Link></p>

        <p>Observações: <br/>
        Seu username deve ter mais de 3 caracteres <br/>
        Sua senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número</p>
      </form>
    </div>
  );
}
