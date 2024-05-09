/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import CommentBox from './CommentsBox';
import { getResponseMessage, isValidResponse, timeAgo } from './utils/Commonutils';
import ConfirmationModal from './ConfirmationModal';
import { useDeleteCommentMutation } from './services/hostApiServices';
import emitMessage from './services/emitMessage';
import { ArrowBendUpLeft, Chats } from '@phosphor-icons/react';
import useLanguage from './hooks/useLanguage';
// import {
//   ArrowBendUpLeft,
//   CaretDoubleDown,
//   CaretDoubleUp,
//   PencilLine,
//   Trash,
// } from '@phosphor-icons/react';

interface IComment {
  id?: string | null;
  comment?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: string | null;
  requestId?: string | null;
  taggedUsers?: string | null;
  url?: string | null;
  parentCommentId?: string | null;
  children?: any[];
  fullNameEn?:string | null;
  fullNameAr?:string | null;
  profilePic?:any

}

const SingleComment = ({
  comment,
  uiConfiguration,
  setIsCommented,
  requestId,
  getAllCommentsByRequestId,
}: {
  getAllCommentsByRequestId: any;
  comment: IComment;
  uiConfiguration: any;
  index: number;
  setIsCommented: any;
  requestId: any;
}) => {
  const [isCommentBox, setIsCommentBox] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteComment] = useDeleteCommentMutation();
const {language}=useLanguage()
  const handleDelete = async () => {
    try {
      const res = await deleteComment(comment?.id).unwrap();
      if (isValidResponse(res)) {
        getAllCommentsByRequestId();
        setShowDeleteModal(false);
        emitMessage(getResponseMessage(res, uiConfiguration) || 'Comment deleted', 'success');
      } else {
        emitMessage(getResponseMessage(res, uiConfiguration) || 'Something went wrong', 'error');
      }
    } catch (error: any) {
      emitMessage(error?.data || 'Something went wrong', 'error');
    }
  };

  return (
    <div>
      <article className='text-base bg-white rounded-lg dark:bg-gray-900 my-2'>
        <footer className='flex justify-between items-center mb-2 mt-4'>
          <div className='flex items-center'>
            <span className='inline-flex text-sm text-[#2c99ff] items-center mr-3 gap-3 !mb-0 text-grey-900 dark:text-white font-semibold'>
              <div className='aegov-avatar avatar-rounded avatar-xs'>
                {comment?.profilePic?.length>0?
                
                <img
                src={`${import.meta.env?.VITE_BASE_URL}/ixcommon/supporting/GetFileContentByPath?filePath=${comment?.profilePic}&contentType=image/png`}

                alt={'ICON'}
                onError={(e) => (e.currentTarget.src = '/assets/FallbackUserImage.svg')}
              />:
                <img className='no-user' src='' alt='Image Not Found' />}
              </div>{' '}
              {language==='EN'?comment?.fullNameEn:comment?.fullNameAr}
            </span>
            <span className='text-gray-600 text-sm dark:text-gray-400 font-normal'>
              {comment.parentCommentId ? uiConfiguration?.UI_LABELS?.REPLIED_TO_A_COMMENT || 'replied to a comment' : uiConfiguration?.UI_LABELS?.ADDED_A_COMMENT || 'added a comment'}
            </span>
            <span className=' !mb-0 text-sm text-gray-600 dark:text-gray-400'>
              <time title={timeAgo(comment?.lastModifiedDate || (comment?.createdDate as string))}>
                - {timeAgo(comment?.lastModifiedDate || (comment?.createdDate as string))}
              </time>
            </span>
          </div>
        </footer>

        {!isEdit && (
          <Fragment>
            <span
              className='p-3 text-xs font-normal bg-opacity-30 bg-[#e8e8e8] w-full rounded-lg inline-block min-h-20 br-5'
              dangerouslySetInnerHTML={{
                __html: comment?.comment?.replaceAll('<p>', 'span>') as string,
              }}
            ></span>
            <div className='flex items-center space-x-2 mt-2'>
              {!isCommentBox && !isEdit && (
                <>
                  <ArrowBendUpLeft size={18} className='text-[#9f9f9f]' />
                  <button
                    onClick={() => setIsCommentBox((isCommentBox) => !isCommentBox)}
                    type='button'
                    className='flex items-center text-sm text-[#9f9f9f] hover:underline font-medium'
                  >
                    {uiConfiguration?.UI_LABELS?.REPLY || 'Reply' } 
                  </button>

                  <div
                    style={{
                      width: '1.5px',
                      height: '15px',
                      background: '#BCBCBC',
                    }}
                  ></div>

                  {comment && comment?.children && comment?.children?.length > 0 && (
                    <>
                      <Chats size={16} className='text-[#9f9f9f]' />
                      <button
                        onClick={() => setShowReplies((showReplies) => !showReplies)}
                        type='button'
                        className='flex items-center text-sm text-[#9f9f9f] hover:underline font-medium'
                      >
                        {showReplies
                          ? uiConfiguration?.UI_LABELS?.HIDE_ALL_REPLIES || 'Hide all Replies'
                          : uiConfiguration?.UI_LABELS?.SHOW_ALL_REPLIES || 'Show all Replies'}
                      </button>
                    </>
                  )}

                  {comment && comment?.children && comment?.children?.length > 0 && (
                    <div
                      style={{
                        width: '1.5px',
                        height: '15px',
                        background: '#BCBCBC',
                      }}
                    ></div>
                  )}
                </>
              )}

              <button
                onClick={() => setIsEdit((isEdit) => !isEdit)}
                type='button'
                className='text-sm text-[#9f9f9f] hover:underline font-medium'
              >
                {uiConfiguration?.UI_LABELS?.EDIT || 'Edit' }  
              </button>
              <div
                style={{
                  width: '1.5px',
                  height: '15px',
                  background: '#BCBCBC',
                }}
              ></div>
              <button
                onClick={() => setShowDeleteModal(true)}
                type='button'
                className='text-sm text-[#9f9f9f] hover:underline font-medium'
              >
                 {uiConfiguration?.UI_LABELS?.DELETE || 'Delete' }  
              </button>
            </div>
          </Fragment>
        )}
      </article>

      {isEdit && (
        <CommentBox
          getAllCommentsByRequestId={getAllCommentsByRequestId}
          comment={comment}
          uiConfiguration={uiConfiguration}
          isNew={false}
          setIsCommentBox={setIsEdit}
          requestId={comment?.requestId!}
          parentCommentId={comment?.parentCommentId!}
          setIsCommented={setIsCommented}
        />
      )}

      {isCommentBox && (
        <Fragment>
          <CommentBox
            getAllCommentsByRequestId={getAllCommentsByRequestId}
            uiConfiguration={uiConfiguration}
            isNew={false}
            requestId={comment?.requestId!}
            parentCommentId={comment?.id!}
            setIsCommentBox={setIsCommentBox}
            setIsCommented={setIsCommented}
          />
        </Fragment>
      )}

      {showReplies && (
        <div className='w-100 mt-3 ml-10'>
          {comment?.children &&
            comment?.children?.length > 0 &&
            comment?.children?.map((childComment: IComment, i: number) => (
              <Fragment key={i}>
                <SingleComment
                  getAllCommentsByRequestId={getAllCommentsByRequestId}
                  requestId={requestId}
                  index={i}
                  uiConfiguration={uiConfiguration}
                  setIsCommented={setIsCommented}
                  comment={childComment}
                />
              </Fragment>
            ))}
        </div>
      )}

      {showDeleteModal ? (
        <ConfirmationModal
          title={uiConfiguration?.UI_LABELS?.DELETE_CONFIRMATION || 'Delete Confirmation'}
          content={uiConfiguration?.UI_LABELS?.ARE_YOU_SURE_DO_YOU_WANT_TO_DELETE_THIS_COMMENT || 'Are you sure,Do you really want to delete this comment ?' } 
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          showCancel={true}
          uiConfiguration={uiConfiguration}
          
        />
      ) : null}
    </div>
  );
};

export default SingleComment;
