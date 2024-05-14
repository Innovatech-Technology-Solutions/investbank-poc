import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from './hooks/useAuth';
import useCustomEvent from './hooks/useCustomEvent';
import { useLoginConfigurationQuery } from './services/hostApiServices';
import useLanguage from './hooks/useLanguage';
import React from 'react';

const SessionExpiryModal = () => {
  const [show, setShow] = useState(false);
  const { logout } = useAuth();
  const {language}=useLanguage()
const{data}=useLoginConfigurationQuery()
const uiConfiguration=data?.[language]?.UI_LABELS
  useCustomEvent('unauthorized', () => setShow(true));
  return show &&!window?.location?.pathname?.endsWith('login')&&!window?.location?.pathname?.endsWith('legacy-login') ? (
    <ConfirmationModal
      confirmTitle={uiConfiguration?.['OKAY']||'Okay'}
      onConfirm={() => logout()}
      showCancel={false}
      content={uiConfiguration?.['SESSION_EXPIRED_PROMPT']||'Oops! It looks like your session has expired.Please log in again to continue.'}
      title={uiConfiguration?.['SESSION_EXPIRED']||'Session Expired'}
    />
  ) : null;
};

export default SessionExpiryModal;
