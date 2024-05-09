/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactQuill from 'react-quill';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import 'quill-mention';
import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { getResponseMessage, isValidResponse } from './utils/Commonutils';
import { useSubmitCommentMutation, useUpdateCommentMutation } from './services/hostApiServices';
import Button from './Button';
import emitMessage from './services/emitMessage';

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
}

interface CommentBoxProps {
  uiConfiguration: any;
  loading?: boolean;
  isNew: boolean;
  requestId?: string;
  parentCommentId?: string;
  comment?: IComment;
  setIsCommentBox?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommented: React.Dispatch<React.SetStateAction<boolean>>;
  getAllCommentsByRequestId: () => void;
}

const CommentBox = ({
  uiConfiguration,
  loading,
  isNew,
  requestId,
  parentCommentId,
  setIsCommented,
  setIsCommentBox,
  comment,
  getAllCommentsByRequestId,
}: CommentBoxProps) => {
  const [taggerUsers, setTaggedUsers] = useState<string>();
  const isEdit = comment?.id ? true : false;
  const [updateComment] = useUpdateCommentMutation();
  const [submitComment] = useSubmitCommentMutation();
  useEffect(() => {
    if (comment?.comment)
      editor?.current?.editor?.clipboard?.dangerouslyPasteHTML(comment?.comment);
  }, []);

  const editor = useRef<any>();

  const validationSchema = Yup.object().shape({
    comment: Yup.string().required('Required'),
  });
  const useFormMethods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  // const atValues = [
  //   { id: 'qq_1', value: 'Fredrik Sundqvist' },
  //   { id: 'qq_2', value: 'Patrik Sjölin' },
  // ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean'],
    ],
    // mention: {
    //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    //   mentionDenotationChars: ['@'],
    //   source: function (searchTerm: any, renderList: any) {
    //     let values: any = atValues;
    //     if (searchTerm.length === 0) {
    //       renderList(values, searchTerm);
    //     } else {
    //       const matches: any = [];
    //       for (let i = 0; i < values.length; i++)
    //         if (values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
    //           matches.push(values[i]);
    //       renderList(matches, searchTerm);
    //     }
    //   },
    // },
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

  const onRectQuillChange = (e: any) => {
    const pattern = /^<p><br><\/p>/; // Regular expression to match "<p></p>"
    if (pattern.test(e)) {
      return null;
    }
    return e.replace(/p>/g, 'span>');
  };

  const getCommentObj = (data: any): IComment => {
    return {
      id: null,
      comment: data?.comment,
      parentCommentId: !isNew ? parentCommentId : null,
      requestId: requestId,
      taggedUsers: taggerUsers,
      url: window.location.href,
    };
  };

  const update = async () => {
    const obj = {
      id: comment?.id,
      comment: useFormMethods.getValues('comment'),
      parentCommentId: !isNew ? parentCommentId : null,
      requestId: requestId,
      taggedUsers: taggerUsers,
      url: window.location.href,
    };
    try {
      const res: any = await updateComment({ data: obj, id: comment?.id }).unwrap();
      if (isValidResponse(res)) {
        setIsCommented(true);
        editor?.current?.editor?.clipboard?.dangerouslyPasteHTML(`<p></p>`);
        getAllCommentsByRequestId();
        // setIsCommentBox(false)
        emitMessage(
          getResponseMessage(res, uiConfiguration) || 'Comment added successfully',
          'success',
        );
      } else {
        emitMessage(
          getResponseMessage(res, uiConfiguration) ||
            uiConfiguration?.UI_LABELS?.SOMETHING_WENT_WRONG,
          'error',
        );
      }
    } catch (error) {}
  };

  const onSubmit = async (data: any) => {
    if (isEdit) {
      update();
      return;
    }
    const comment = getCommentObj(data);
    try {
      const res: any = await submitComment(comment).unwrap();
      if (isValidResponse(res)) {
        setIsCommented(true);
        useFormMethods.reset();
        getAllCommentsByRequestId();
        // setIsCommentBox(false)
        editor?.current?.editor?.clipboard?.dangerouslyPasteHTML(`<p></p>`);

        emitMessage(
          getResponseMessage(res, uiConfiguration) || 'Comment added successfully',
          'success',
        );
      } else {
        emitMessage(
          getResponseMessage(res, uiConfiguration) ||
            uiConfiguration?.UI_LABELS?.SOMETHING_WENT_WRONG,
          'error',
        );
      }
    } catch (error) {}
  };

  const setMentionsUsers = (delta: any) => {
    let mentionUsers =
      delta.ops
        ?.filter((ele: any) => ele?.insert?.mention)
        ?.map((element: any) => element?.insert?.mention?.id) || [];
    setTaggedUsers(mentionUsers?.toString());
  };

  return (
    <form>
      <div className='flex gap-2 mt-2 ml-4'>
        <div style={{ width: '100%' }}>
          <Controller
            control={useFormMethods.control}
            name={'comment'}
            render={({ field: { onChange } }) => (
              <ReactQuill
                ref={editor as unknown as any}
                onChange={(e: any) => {
                  onChange(onRectQuillChange(e));
                }}
                modules={modules}
                formats={formats}
                onKeyUp={() => {
                  if (editor?.current?.editor) {
                    const delta = editor?.current?.editor?.getContents();
                    setMentionsUsers(delta);
                  }
                }}
              />
            )}
          />
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-4'>
        <Button
          type='reset'
          styleVariant='outline'
          onClick={() => setIsCommentBox && setIsCommentBox(false)}
        >
          {uiConfiguration?.UI_LABELS?.CANCEL || 'Cancel'}
        </Button>
        <Button
          className='btn btn-primary'
          disabled={loading || !useFormMethods?.formState?.isValid}
          onClick={useFormMethods.handleSubmit(onSubmit)}
        >
          {uiConfiguration?.UI_LABELS?.SUBMIT || 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default CommentBox;
