/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import 'quill-mention';
// import { Card } from 'antd';
// import { CardContent } from '@mui/material';
import CommentBox from './CommentsBox';
import { useLazyGetAllCommentsByRequestIdQuery } from './services/hostApiServices';
import { getResponseMessage, isValidResponse, listToTree } from './utils/Commonutils';
// import { Card } from 'antd';
import emitMessage from './services/emitMessage';
import { CircleNotch } from '@phosphor-icons/react';

type IProps = {
  requestId: string;
  uiConfiguration: any;
};
const CommentsSection = ({ requestId, uiConfiguration }: IProps) => {
  const [allCommentsList, setAllCommentsList] = useState<IComment[]>([]);
  // const [isCommentBox, setIsCommentBox] = useState<boolean>(true);
  const [isCommented, setIsCommented] = useState<boolean>(false);
  const [getAllCommentsByRequestId, HistoryCommentsResponse] =
    useLazyGetAllCommentsByRequestIdQuery();
  const getComments = () => {
    getAllCommentsByRequestId(`?requestId=${requestId}`)
      .unwrap()
      .then((res) => {
        if (isValidResponse(res)) {
          const allCommentsList = listToTree(res?.data?.output || []);
          setAllCommentsList(allCommentsList);
        } else {
          emitMessage(getResponseMessage(res),'error');
        }
      })
      .catch((err:any) => {
        emitMessage(err?.message ,'error');

      });
  };
  useEffect(() => {
    getComments();
  }, [isCommented]);

  return (
    <>
          {!HistoryCommentsResponse?.isLoading &&
            !HistoryCommentsResponse?.isFetching &&
            allCommentsList?.map((comment: IComment, i: number) => (
              <div className='py-3' key={i}>
                <SingleComment
                  getAllCommentsByRequestId={() => getComments()}
                  requestId={requestId}
                  index={i}
                  uiConfiguration={uiConfiguration}
                  setIsCommented={setIsCommented}
                  comment={comment}
                />
              </div>
            ))}

          {HistoryCommentsResponse?.isLoading ||
            (HistoryCommentsResponse?.isFetching && (
              <div className='flex p-2 align-items-center justify-content-between'>
                {/* <Loader message={uiConfiguration?.UI_LABELS?.COMMENTS_ARE_LOADING || "Comments are loading"} /> */}
                <div className='flex justify-center gap-2 items-center'>
                <CircleNotch className='animate-spin'/> 
                <div>
                {uiConfiguration?.UI_LABELS?.COMMENTS_ARE_LOADING || "Comments are loading"}
              </div>
              </div>
              </div>
            ))}

          <div>
            <CommentBox
              getAllCommentsByRequestId={() => getComments()}
              uiConfiguration={uiConfiguration}
              setIsCommented={setIsCommented}
              loading={HistoryCommentsResponse?.isLoading || HistoryCommentsResponse?.isFetching}
              isNew={true}
              requestId={requestId}
            />
          </div>
    </>
  );
};

export default CommentsSection;
