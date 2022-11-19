interface ButtonProps {
  type: 'submit' | 'button';
  name: string;
  onClick: () => void;
  disabled: boolean;
}

export default function Button({ type, name, disabled, onClick }: ButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {name}
    </button>
  );
}