import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  styleVariant?: 'outline' | 'soft' | 'link' | 'secondary' | '';
  sizeVariant?: 'xs' | 'base' | 'sm' | 'lg';
  className?: string;
};

const Button = ({
  children,
  styleVariant,
  sizeVariant = 'sm',
  className,
  disabled = false,
  ...restProps
}: ButtonProps) => {
  const styleClass = styleVariant ? `btn-${styleVariant}` : '';
  const sizeClass = sizeVariant ? `btn-${sizeVariant}` : '';
  const classNames = `aegov-btn ${styleClass} ${sizeClass} ${className}`;
  return (
    <button
      disabled={disabled}
      aria-label={`${children}`}
      aria-disabled={disabled}
      className={classNames.trim()}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
