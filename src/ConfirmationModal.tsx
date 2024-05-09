/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { AlertSVG } from './constants/SVGS';

type ConfirmationModalProps = {
  uiConfiguration?: any;
  title: ReactNode;
  icon?: ReactNode;
  content: ReactNode;
  confirmTitle?: string;
  cancelTitle?: string;
  showCancel?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  isLoading?:boolean
};

const ConfirmationModal = ({
  uiConfiguration,
  title,
  icon = <AlertSVG />,
  content,
  confirmTitle = uiConfiguration?.UI_LABELS?.CONFIRM || 'Confirm',
  cancelTitle = uiConfiguration?.UI_LABELS?.CANCEL || 'Cancel',
  showCancel = false,
  onCancel = () => {},
  onConfirm = () => {},
  isLoading=false
}: ConfirmationModalProps) => {
  return (
    <>
      <div
        id='modal-simple-alert'
        tabIndex={-1}
        aria-hidden='true'
        className='aegov-modal justify-center items-center flex z-[9999]'
        role='dialog'
      >
        <div className='relative sm:w-full sm:max-w-lg max-h-full'>
          <div className='aegov-modal-wrapper py-4 md:py-5 xl:py-8 px-4 xl:px-6'>
            <div>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-start justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                  {icon}
                </div>
                <div className='text-center mt-0 sm:text-left'>
                  <h3 className='text-lg font-bold text-aeblack-950' id='modal-title'>
                    {title}
                  </h3>
                  <div className='mt-3'>
                    <p className='text-base font-normal text-aeblack-500 mb-0'>{content}</p>
                  </div>
                </div>
              </div>
              <div className='mt-4 sm:mt-6 sm:flex sm:flex-row-reverse sm:gap-4'>
                <button disabled={isLoading} onClick={onConfirm} className='aegov-btn btn-xs btn-red w-full sm:w-auto'>
                  {confirmTitle}
                </button>
                {showCancel ? (
                  <button
                    onClick={onCancel}
                    data-modal-hide='modal-simple-alert'
                    className='aegov-btn  btn-xs btn-outline mt-3 sm:mt-0 w-full sm:w-auto'
                  >
                    {cancelTitle}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div modal-backdrop='' className='aegov-modal-backdrop'></div>
    </>
  );
};

export default ConfirmationModal;
