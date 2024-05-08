import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import AsterikMandatory from './AsterikMandatory';

interface InputTextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  id: string;
  name: string;
  label?: string;
  isError: boolean;
  errorMessage?: string;
  errorPrefix?: string;
  sizeVariant?: 'xs' | 'sm' | 'base' | 'lg';
  placeholder?: string;
  isSecondary?: boolean;
  disabled?: boolean;
  isMandatory?:boolean
}
const TextArea = ({
  label,
  isError,
  sizeVariant = 'sm',
  errorPrefix = 'Error:',
  errorMessage,
  name,
  id,
  rows,
  isSecondary = false,
  isMandatory=false,
  placeholder,
  disabled,
  className,
  ...rest
}: InputTextAreaProps) => {
  const rootClassName = clsx(
    'aegov-form-control',
    sizeVariant && `control-${sizeVariant}`,
    isError && 'control-error',
    isSecondary && 'control-secondary',
  );

  return (
    <div className={rootClassName}>
      {label && <label htmlFor={id}>{label}{isMandatory?<AsterikMandatory/>:null}</label>}
      <div className='form-control-input'>
        <textarea
          id={id}
          name={name}
          aria-disabled={disabled}
          rows={rows || 4}
          placeholder={placeholder || 'Enter your description'}
          className={className}
          {...rest}
        />
      </div>
      {isError && errorMessage && errorMessage?.length > 0 ? (
        <span className='error-message'>
          {errorPrefix && <strong>{errorPrefix}</strong>} {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default TextArea;
