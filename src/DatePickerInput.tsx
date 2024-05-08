import { ConfigProvider, DatePicker, DatePickerProps } from 'antd';
import clsx from 'clsx';

interface DatePickerInputProps {
  label?: string;
  showLabel?: boolean;
  errorMessage?: string;
  isError?: boolean;
  className?: string;
  requiredLabel?: boolean;
  errorPrefix?: string;
}

const DatePickerInput = ({
  errorMessage,
  requiredLabel = false,
  isError,
  status,
  label,
  showLabel = true,
  errorPrefix = 'Error:',
  className = '',
  ...restPros
}: DatePickerInputProps & DatePickerProps) => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#cba344', colorBorder: '#cba344' } }}>
      <div className={clsx('aegov-form-control w-full', isError && 'control-error', className)}>
        {requiredLabel && (
          <label htmlFor='date_input' className='flex justify-start items-start text-justify'>
            {label}
            <span className='text-[red] text-[16px] ml-1 pb-1'>*</span>
          </label>
        )}
        {!requiredLabel && showLabel && <label htmlFor='date_input'>{label}</label>}
        <div className='form-control-input'>
          <DatePicker
            className={`w-full ${className}`}
            status={status ? status : isError ? 'error' : ''}
            format={'DD/MM/YYYY'}
            size='large'
            {...restPros}
          />
        </div>
        {isError && errorMessage && <span className='error-message'>{errorPrefix && <strong>{errorPrefix}</strong>} {errorMessage}</span>}
      </div>
    </ConfigProvider>
  );
};
export default DatePickerInput;
