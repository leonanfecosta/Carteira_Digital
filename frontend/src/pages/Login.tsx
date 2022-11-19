import Button from '../components/Button';

export default function Login() {
  return (
    <div>
      <h1>BEM VINDO A NG.CASH</h1>
      <h2>A CARTEIRA DA NOVA GERAÇÃO.</h2>
      <Button
        type="submit"
        name="Login"
        disabled={false}
        onClick={() => console.log('Login')}
      />
    </div>
  );
}
