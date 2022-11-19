interface ButtonProps {
  type: 'submit' | 'button';
  name: string;
  onClick: (event: React.FormEvent) => void;
  disabled: boolean;
  className?: string;
}

export default function Button({ type, name, disabled, onClick, className }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {name}
    </button>
  );
}
