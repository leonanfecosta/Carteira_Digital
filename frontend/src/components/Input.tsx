import styles from '../styles/Login.module.css';

interface InputProps {
  label: string;
  value: string | number;
  name: string;
  type: 'text' | 'password' | 'number';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function Input({
  label,
  value,
  name,
  type,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}