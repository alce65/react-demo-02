import type { PropsWithChildren } from "react";

type ButtonVariant = 'primary' | 'secondary';
type Size = 'small' | 'medium' | 'large';


type ButtonProps = PropsWithChildren<{
    variant: ButtonVariant;
    size: Size;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>


export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onClick,
  children,
}) => {
  return (
    <button className={`btn ${variant} ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};
