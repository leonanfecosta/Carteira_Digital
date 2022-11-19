interface InputProps {
  label: string;
  value: string;
  name: string;
  type: 'text' | 'password';
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
    <div className="input">
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