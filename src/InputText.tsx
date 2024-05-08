/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from 'react';
import AsterikMandatory from './AsterikMandatory';

interface InputTextProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  isError: boolean;
  showLabel?: boolean;
  errorMessage?: string;
  errorPrefix?: string;
  sizeVariant?: 'xs' | 'sm' | 'base' | 'lg';
  id: string;
  value: string;
  name: string;
  placeholder?: string;
  isSecondary?: boolean;
  disabled?: boolean;
  type?: string;
  prefixIcon?: ReactNode;
  suffxIcon?: ReactNode;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isMandatory?: boolean;
  isAutocomplete?: any;
  onlyNumeric?: boolean;
}
const InputText = ({
  label,
  isError,
  showLabel = true,
  sizeVariant = 'sm',
  errorPrefix = 'ERROR',
  errorMessage,
  value,
  name,
  id,
  isSecondary = false,
  placeholder,
  disabled,
  prefixIcon,
  suffxIcon,
  isMandatory = false,
  isAutocomplete,
  onInputChange = () => {},
  type = 'text',
  onlyNumeric = false,
  ...rest
}: InputTextProps) => {
  const rootClassName = clsx(
    'aegov-form-control',
    sizeVariant && `control-${sizeVariant}`,
    isError && 'control-error',
    isSecondary && 'control-secondary',
  );
  const onlyNumerics = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check for numeric keys, backspace, and arrow keys
    const allowedKeys = ['Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    const isDigit = event.key >= '0' && event.key <= '9';
    if (!isDigit && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };
 

  return (
    <div className={rootClassName + ' ' + rest.className}>
      {showLabel && label && (
        <label htmlFor={id}>
          {label}
          {isMandatory ? <AsterikMandatory/>: null}
        </label>
      )}
      <div className='form-control-input'>
        {prefixIcon ? (
          <span className='control-prefix'>
            <div>{prefixIcon}</div>
          </span>
        ) : null}
        {/* <span className='control-prefix'>{prefixIcon ? <div>{prefixIcon}</div> : null}</span> */}
        <input
          autoComplete={isAutocomplete}
          value={value}
          placeholder={placeholder}
          name={name}
          id={id}
          className={rest?.className}
          onChange={onInputChange}
          type={type}
          aria-disabled={disabled}
          disabled={disabled}
          onKeyDown={type === 'number' && onlyNumeric ? onlyNumerics : undefined}
          {...rest}
        />
        {suffxIcon ? (
          <span className='control-suffix'>
            <div>{suffxIcon}</div>
          </span>
        ) : null}
        {/* <span className='control-suffix'>{suffxIcon ? <div>{suffxIcon}</div> : null}</span> */}
      </div>
      {isError && errorMessage && errorMessage?.length > 0 ? (
        <span className='error-message'>
          {errorPrefix && <strong>{ errorPrefix}</strong>} {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default InputText;
