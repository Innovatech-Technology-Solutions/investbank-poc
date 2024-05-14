import { Link } from 'react-router-dom';
import useLanguage from './hooks/useLanguage';
import React from 'react';

type LanguageModalprops = {
  isVisible: boolean;
  onClose: () => void;
};
const LanguageModal = ({ isVisible = false, onClose = () => {} }: LanguageModalprops) => {
  const { changeLanguage } = useLanguage();
  return isVisible ? (
    <>
      <div
        id='modal-lang'
        tabIndex={-1}
        aria-hidden='true'
        className='aegov-modal z-[60] justify-center items-center flex'
        role='dialog'
      >
        <div className='relative sm:w-full sm:max-w-sm max-h-full'>
          <div className='aegov-modal-wrapper py-4 md:py-5 xl:py-8 px-4 xl:px-6'>
            <button
              onClick={onClose}
              type='button'
              className='aegov-modal-close top-2 end-2'
              data-modal-hide='modal-lang'
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div>
              <div className='lang-header !mb-0 p-[14px]'>
                <Link
                  to='#'
                  onClick={() => {
                    onClose();
                    changeLanguage('EN');
                  }}
                  className='lang-primary'
                >
                  English
                </Link>
                <span className='lang-primary-divider'></span>
                <Link
                  to='#'
                  onClick={() => {
                    onClose();
                    changeLanguage('AR');
                  }}
                  className='lang-primary font-notokufi'
                >
                  عربي
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div modal-backdrop='' className='aegov-modal-backdrop'></div>
    </>
  ) : null;
};

export default LanguageModal;
