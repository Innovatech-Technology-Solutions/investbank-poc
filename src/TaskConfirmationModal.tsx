import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useRef } from 'react';
import Modal from './Modal';
import { CircleNotch } from '@phosphor-icons/react';
import { Tag } from 'antd';
import React from 'react';

type IProps = {
  show: boolean;
  handleClose: any;
  action: string;
  performAction: (action: string, comments: string) => void;
  uiConfiguration: any;
  loading: boolean;
  CustomComponent?: JSX.Element;
  buttonName?: string;
  customComponentByAction?: (action: string) => JSX.Element;
};
const TaskConfirmationModal = ({
  action,
  show,
  handleClose,
  performAction,
  uiConfiguration,
  CustomComponent,
  buttonName,
  customComponentByAction,
  loading,
}: IProps) => {
  const methods = useForm({ mode: 'all', reValidateMode: 'onSubmit' });
  console.log;
  const editor = useRef<any>();

  const onRectQuillChange = (e: any) => {
    const pattern = /^<p><br><\/p>/; // Regular expression to match "<p></p>"
    if (pattern.test(e)) {
      return null;
    }
    return e;
  };
console.log(uiConfiguration)
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'mention',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
  ];
  console.log('action here,', action);
  console.log('buttonName here,', buttonName);
  return (
    <>
      {show ? (
        <Modal
          confirmTitle={uiConfiguration?.UI_LABELS?.OKAY || 'Okay'}
          loadingLabel={
            <>
              <CircleNotch className='animate-spin' /> {uiConfiguration?.UI_LABELS?.OKAY || 'Okay'}
            </>
          }
          cancelTitle={uiConfiguration?.UI_LABELS?.CANCEL || 'Cancel'}
          onConfirm={() => performAction(action, methods?.getValues('message'))}
          onCancel={handleClose}
          isLoading={loading}
          isDisabled={!methods?.formState?.isValid || loading}
          body={
            <>
              {(action === 'RESUBMIT' ||
                action === 'RESUBMITTED' ||
                action === 'RESUBMMIT' ||
                action === 'ADD_ADJUSTMENTS') && (
                <p className='text-aeblack-100'>
                  {uiConfiguration?.UI_LABELS?.YOU_ARE_ABOUT_TO_}{' '}
 <Tag color='cyan'>
                    {uiConfiguration?.UI_LABELS[action] || action}
                
                  </Tag>  
                  {uiConfiguration?.UI_LABELS?.CLICK_OK_TO_PROCEED}
                </p>
              )}
              {(action === 'MORE_INFO' || action === 'MORE_INFO_INT') && (
                <p className='text-aeblack-100'>
                  {uiConfiguration?.UI_LABELS?.YOU_ARE_ABOUT_TO_||'You are about to'}{' '}
                  <span className='text-aeblack-100'>
                   <Tag color='blue'> {uiConfiguration?.UI_LABELS[action] || action}</Tag>
                  </span>
                  {uiConfiguration?.UI_LABELS?.FOR_THIS_REQUEST_PLEASE_COMPOSE_MSG_TO_CONTINUE}
                </p>
              )}
              {(action === 'APPROVE' || action === 'APPROVED') && (
                <span className='text-aeblack-100'>
                  {uiConfiguration?.UI_LABELS?.YOU_ARE_ABOUT_TO_}{' '}
                  {buttonName === 'CANCEL_APPLICATION' ? (
                    <span className='text-aeblack-100'>
                      {uiConfiguration?.UI_LABELS['CANCEL_APPLICATION_INFO'] || action}
                    </span>
                  ) : (
                    <span className='text-aeblack-100'>
                      <Tag color='green'>                      {uiConfiguration?.UI_LABELS[action] || action}
</Tag>
                    </span>
                  )}
                  {/* <span>{uiConfiguration?.UI_LABELS?.TO}</span>{' '} */}
                  {uiConfiguration?.UI_LABELS?.CLICK_OK_TO_PROCEED}
                </span>
              )}
              {(action === 'REJECT' || action === 'REJECTED') && (
                <p className='text-aeblack-100'>
                  {uiConfiguration?.UI_LABELS?.YOU_ARE_ABOUT_TO_}{' '}
                  {buttonName === 'REMOVE_FROM_CACELLATION' ? (
                    <span className='text-aeblack-100'>
                      {uiConfiguration?.UI_LABELS['REMOVE_FROM_CANCELLATION_INFO'] || action}
                    </span>
                  ) : (
                    <span className='text-aeblack-100'>
                      <Tag color='red'> 
                      {uiConfiguration?.UI_LABELS[action] || action}
                      </Tag>
                    </span>
                  )}
                  {uiConfiguration?.UI_LABELS?.FOR_THIS_REQUEST_PLEASE_COMPOSE_MSG_TO_CONTINUE}
                </p>
              )}
              {(action === 'SUBMIT' || action === 'SUBMITED') && (
                <p className='text-aeblack-100'>
                  {uiConfiguration?.UI_LABELS?.YOU_ARE_ABOUT_TO_}{' '}
                  <span className='text-aeblack-100'>
                    {uiConfiguration?.UI_LABELS[action] || action}
                  </span>{' '}
                  {uiConfiguration?.UI_LABELS?.CLICK_OK_TO_PROCEED}
                </p>
              )}
              {(action === 'CANCEL' || action === 'CANCELLED') && (
                <p className='text-aeblack-100'>
                  {uiConfiguration?.UI_LABELS?.YOU_ARE_ABOUT_TO_}{' '}
                  <span className='text-aeblack-100'>
                    {uiConfiguration?.UI_LABELS[action] || action}
                  </span>{' '}
                  {uiConfiguration?.UI_LABELS?.CLICK_OK_TO_PROCEED}
                </p>
              )}
              {/* SZHP Task Buttons */}
              {(action === 'SOCIAL' || action === 'TECHNICAL' || action === 'EXTEND') && (
                <p>
                  {uiConfiguration?.UI_LABELS?.YOU_ARE_ABOUT_TO_}{' '}
                  <span className='text-aeblack-100'>
                    {uiConfiguration?.UI_LABELS[action] || action}
                  </span>{' '}
                  <span className='text-aeblack-100'>
                    {uiConfiguration?.UI_LABELS[action] || action}
                  </span>{' '}
                  {uiConfiguration?.UI_LABELS?.CLICK_OK_TO_PROCEED}
                </p>
              )}
              {CustomComponent}
              {customComponentByAction && customComponentByAction(action)}
              <div className='mt-5'>
                <span className='font-bold text-aeblack-100'>
                  {uiConfiguration?.UI_LABELS?.COMMENTS || 'Comments'}
                </span>
                <Controller
                  control={methods.control}
                  {...methods.register('message' as string, {
                    validate: {
                      required: (value) =>
                        !value ? action !== 'MORE_INFO' && action !== 'REJECTED' : true,
                    },
                  })}
                  render={({ field: { onChange } }) => (
                    <ReactQuill

                      ref={editor as unknown as any}
                      id='message'
                      onChange={(e: any) => {
                        onChange(onRectQuillChange(e));
                      }}
                      className={`${methods.formState.errors['message'] ? 'text-aeblack-100' : 'text-aeblack-100'}`}
                      modules={modules}
                      formats={formats}
                    />
                  )}
                />
              </div>
            </>
          }
          closeOnEsc={false}
        />
      ) : null}
    </>
  );
};

export default TaskConfirmationModal;
