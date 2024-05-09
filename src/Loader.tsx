import { CircleNotch } from '@phosphor-icons/react';
import React from 'react';
import { ReactNode } from 'react';

/**
 * Renders the preloader
 */
interface ILoaderProps {
  message?: string;
  spinColor?: string;
  spinSize?: string;
  loadingImg?: boolean;
  icon?: ReactNode;
}
const Loader = ({
  message,
  spinColor = '#7c5e24',
  spinSize = '1.3rem',
  loadingImg = false,
  icon = (
    <CircleNotch className='animate-spin mx-2' style={{ fontSize: spinSize, color: spinColor }} />
  ),
}: ILoaderProps) => {
  return (
    <span className={message ? 'flex items-center gap-2' : ''}>
      {loadingImg ? <img style={{ width: '36px' }} src={'UAELOADER'} /> : icon}
      {message && <span className='loading-animation'>{message}</span>}
    </span>
  );
};

export default Loader;
