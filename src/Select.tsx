/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import AsterikMandatory from './AsterikMandatory';

interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  id: string;
  name: string;
  label: string;
  size?: 'sm' | 'base' | 'lg';
  options: any;
  errorMessage?: string;
  isError?: boolean;
  disabled?: boolean;
  disableLabel?: boolean;
  enableMultiSelect?: boolean;
  enablePlaceHolder?: boolean;
  enableAutoComplete?: boolean;
  className?: string;
  isMandatory?:boolean
}

const Select = ({
  id,
  name,
  label,
  options,
  size,
  isError,
  errorMessage,
  disabled,
  enableAutoComplete = false,
  enablePlaceHolder = true,
  enableMultiSelect = false,
  disableLabel = false,
  isMandatory=false,
  className,
  ...rest
}: SelectProps) => {
 
  return (
    <div
      className={clsx(
        'aegov-form-control w-full',
        size && `control-${size}`,
        isError && 'control-error',
        className,
      )}
    >
      {!disableLabel && <label htmlFor={id}>{label}{isMandatory?<AsterikMandatory/>:null}</label>}
      <div className='form-control-input'>
        <select
          id={id}
          name={name}
          disabled={disabled}
          multiple={enableMultiSelect}
          autoComplete={enableAutoComplete ? 'select-name' : 'off'}
          aria-disabled={disabled ? 'true' : 'false'}
          {...rest}
        >
          {enablePlaceHolder && <option value=''>{'select an option'}</option>}
          {options?.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option?.label}
            </option>
          ))}
        </select>
      </div>
      {isError && errorMessage && <span className='error-message'>{isError && errorMessage}</span>}
    </div>
  );
};
export default Select;
