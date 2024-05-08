import { ReactNode } from 'react';
import clsx from 'clsx';
import Button from './Button';

type Modalprops = {
  confirmTitle?: ReactNode;
  cancelTitle?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  body?: ReactNode;
  footer?: ReactNode;
  showFooter?: boolean;
  closeOnEsc?: boolean;
  modalWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  modalClassName?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingLabel?: ReactNode;
};

type ModalFooterProps = Omit<Modalprops, 'body' | 'footer' | 'closeOnEsc'>;

export const ModalBackDrop = () => <div modal-backdrop='' className='aegov-modal-backdrop'></div>;

export const ModalFooter = ({
  confirmTitle,
  cancelTitle,
  onConfirm,
  onCancel,
  isDisabled = false,
  isLoading = false,
  loadingLabel = null,
}: ModalFooterProps) => {
  return (
    <div className='mt-4 flex flex-row-reverse gap-4'>
      <Button onClick={onConfirm} disabled={isDisabled || isLoading}>
        {isLoading && loadingLabel ? loadingLabel : confirmTitle}
      </Button>
      {cancelTitle && (
        <Button onClick={onCancel} data-modal-hide='modal-simple-alert' styleVariant='outline'>
          {cancelTitle}
        </Button>
      )}
    </div>
  );
};
const Modal = ({
  confirmTitle,
  cancelTitle,
//   closeOnEsc = true,
  body,
  onCancel = () => {},
  onConfirm = () => {},
  modalWidth,
  isDisabled = false,
  isLoading = false,
  loadingLabel = null,
  showFooter = true,
  modalClassName,
  footer = (
    <ModalFooter
      confirmTitle={confirmTitle}
      cancelTitle={cancelTitle}
      onCancel={onCancel}
      onConfirm={onConfirm}
      isDisabled={isDisabled}
      isLoading={isLoading}
      loadingLabel={loadingLabel}
    />
  ),
}: Modalprops) => {
//   const handleModalClose = () => {
//     if (closeOnEsc) onCancel();
//   };

//   useKeyBoardTrigger(handleModalClose, [KEYS?.escape]);

  return (
    <>
      <div
        id='modal-simple'
        tabIndex={-1}
        aria-hidden='true'
        className='aegov-modal z-50 justify-center items-center flex'
        role='dialog'
      >
        <div
          className={clsx(
            'relative',
            'sm:w-full',
            modalWidth ? `max-w-${modalWidth}` : 'max-w-xl',
            'max-h-full',
            modalClassName,
          )}
        >
          <div className='aegov-modal-wrapper bg-whitely-100 py-4 md:py-5 xl:py-8 px-4 xl:px-6'>
            <div>
              <div>{body}</div>
              {showFooter && footer}
            </div>
          </div>
        </div>
      </div>
      <ModalBackDrop />
    </>
  );
};

export default Modal;
