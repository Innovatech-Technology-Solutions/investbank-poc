/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Camera, CircleNotch, DownloadSimple, File, XCircle } from '@phosphor-icons/react';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import {SyntheticBaseEvent } from './dto/CommonInterface.dto';
import { cloneDeep } from 'lodash';
import { ATTACHMENT_INTERFACE, DEFAULT_MAX_FILE_SIZE } from './constants/commomInterfaces';
import {
  alertWithIcon,
  base64Download,
  getBase64,
  getResponseMessage,
  isValidResponse,
} from './utils/Commonutils';
import { useGetInterfaceByIDQuery } from './services/hostApiServices';
import emitMessage from './services/emitMessage';
import Button from './Button';
import useLanguage from './hooks/useLanguage';
import {
  useDeletAttachmentbyAttachmentIDMutation,
  useGetAttachmentConfigByAttachmentIDQuery,
  useLazyDownloadFileQuery,
  useUploadAttchmentMutation,
} from './services/hostApiServices';
import { Tooltip } from 'antd';
import AsterikMandatory from './AsterikMandatory';
import ConfirmationModal from './ConfirmationModal';
import React from 'react';
import Loader from './Loader';
interface IAttachmentsPorps {
  readOnly?: boolean;
  files?: any[];
  manualTitle?: string;
  manualSectionName?: string;
  attachmentID: string | null | undefined;
  requestId: string;
  isFieldAttachments?: boolean;
  filterWithMaster?: boolean;
  type: string;
  source: string;
  imagePreview?: boolean;
  applicantId?: string;
  setIsUploadedRequiredAttachments?: Dispatch<SetStateAction<boolean>>;
  isUploadedRequiredAttachments?: boolean;
  gridClassName?: string;
  isCameraCapture?: boolean;
}

const Attachments = ({
  setIsUploadedRequiredAttachments,
  readOnly = false,
  files,
  attachmentID,
  filterWithMaster = false,
  requestId,
  isFieldAttachments,
  type,
  source,
  applicantId,
  imagePreview = false,
  gridClassName,
  isCameraCapture = false,
}: IAttachmentsPorps) => {
  const [allAttachmentsToUpload, setAllAttachmentsToUpload] = useState<any[]>([]);
  console.log('filese', files, attachmentID);
  const [reqId, setReqId] = useState<any>(requestId);
  const [sections, setSections] = useState<any>();
  const { language } = useLanguage();
  const { data: attachmentInterface } = useGetInterfaceByIDQuery(ATTACHMENT_INTERFACE);
  const uiConfiguration = attachmentInterface?.[language?.toUpperCase() || 'EN'];
  const [removeMetatData, setRemoveMetatData] = useState({
    id: '',
    parentIndex: '',
    attchmentIndex: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fp=(id)=>''
  const [uploadAttachemt] = useUploadAttchmentMutation();
  const { data: attachmentsTypeDataResponse, refetch } = useGetAttachmentConfigByAttachmentIDQuery(
    attachmentID ? attachmentID : '',
    {
      skip: !attachmentID,
    },
  );
  const attachmentsTypeData = attachmentsTypeDataResponse?.data?.output;
  useEffect(() => {
    setReqId(requestId);
    refetch();
  }, [requestId]);

  useEffect(() => {
    if (attachmentsTypeData?.length > 0) prepareData(attachmentsTypeData);
  }, [attachmentsTypeData]);
  const [loadedFile, setLoadedFile] = useState('');
  const getUploadedFiles = (attachmentsToUpload: any[]) => {
    let result: any[] = (attachmentsToUpload || [])?.filter(
      (ele: any) => !!ele?.attachmentDetails?.attachmentNames,
    );

    if (result && result?.some((attachment: any) => attachment?.uploadedAttachments)) {
      result = result?.map((attachment: any) => ({
        ...attachment,
        uploadedAttachments: attachment?.uploadedAttachments
          ? [...attachment?.uploadedAttachments]
          : [],
      }));
    } else {
      if (files && files?.length > 0) {
        files = files?.filter((ele: any) => ele.id != null || ele.cloneId != null);
        const uplodedFiles = files?.map((file: any) => ({ ...file, isUploaded: true }));
        result = result?.map((attachment: any) => ({
          ...attachment,
          uploadedAttachments: [...uplodedFiles],
        }));
      }
    }
    return result || [];
  };
  console.log('sections', sections);

  const prepareAttachmentHeirarchy = (attachmentsToUpload: any[]) => {
    const parent = attachmentsToUpload?.find((attachment: any) => attachment?.parentId == null);
    // setTitle(parent?.moduleName);
    const attachmentsToUploadWithUploadedFiles = getUploadedFiles(attachmentsToUpload);
    const noOfRequiredAttachemnts = attachmentsToUpload?.filter(
      (el: any) => el?.attachmentDetails && el?.isRequired === '1',
    ).length;
    const noOfUploadedAttachemnts = attachmentsToUploadWithUploadedFiles?.filter(
      (attachment) => attachment?.isRequired === '1' && attachment?.uploadedAttachments?.length > 0,
    ).length;
    setIsUploadedRequiredAttachments &&
      setIsUploadedRequiredAttachments(noOfUploadedAttachemnts === noOfRequiredAttachemnts);
    prepareSections(
      attachmentsToUpload?.filter((el: any) => el?.parentId === parent?.id),
      attachmentsToUploadWithUploadedFiles,
      // attachmentsToUpload,
    );
  };

  const prepareSections = (sections: any[], attachmentsToUpload: any[]) => {
    let sectionList: any[] = [];
    sections?.forEach((el: any) => {
      sectionList.push({
        id: el?.id,
        parentId: el?.parentId,
        name: el?.serviceName,
        attachments: attachmentsToUpload?.filter((doc: any) => doc.parentId == el?.id),
      });
    });
    setSections((_data: any) => [...sectionList]);
  };

  const prepareData = (attachmentsToUpload: any[]) => {
    prepareAttachmentHeirarchy(attachmentsToUpload);
    setAllAttachmentsToUpload(getUploadedFiles(attachmentsToUpload));
  };

  const fileChangeHandler = async (
    event: SyntheticBaseEvent,
    id: any,
    allowedFileTypes: string,
    allowedFileSize: string,
    attachment: any,
    allAttachmentsListIndex: number,
    reqId: string,
  ) => {
    let filesToUpload: any = cloneDeep(allAttachmentsToUpload);
    if (!filesToUpload[allAttachmentsListIndex]['uploadedAttachments']) {
      filesToUpload[allAttachmentsListIndex]['uploadedAttachments'] = [];
    }

    if (
      attachment?.maxFilesAllowed &&
      event.target &&
      event.target.files?.length > Number(attachment?.maxFilesAllowed)
    ) {
      alertWithIcon(
        'warning',
        'Not allowed to upload',
        `Cannot upload more then ${attachment?.maxFilesAllowed} files`,
        true,
        false,
        'Okay',
      );
      return;
    }
    if (event.target && event.target.files[0]) {
      Array.from(event.target.files).forEach(async (selectedFile: any, _fileIndex: number) => {
        // Check file type
        if (
          attachment?.allowedFileTypes &&
          !attachment?.allowedFileTypes?.split(',').includes(selectedFile?.type)
        ) {
          alertWithIcon(
            'warning',
            'Not allowed to upload',
            `Allowed types : ${allowedFileTypes}`,
            true,
            false,
            'Okay',
          );
          return;
        }

        // Check file size
        if (
          attachment?.allowedFileSize &&
          parseInt(attachment?.allowedFileSize || DEFAULT_MAX_FILE_SIZE) * 1e6 < selectedFile.size
        ) {
          alertWithIcon(
            'warning',
            'Not allowed to upload',
            `Maximum file size should be less than or equal to ${
              allowedFileSize || DEFAULT_MAX_FILE_SIZE
            } MB`,
            true,
            false,
            'Okay',
          );
          return;
        }

        const base64string = await getBase64(selectedFile);
        const data: any = {
          attachmentTypeId: id,
          requestId: reqId,
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          isUploaded: false,
          fileSize: selectedFile.size.toString(),
          source: source,
          type: type,
          applicantId: applicantId,
          attachment: { content: base64string },
          index: filesToUpload[allAttachmentsListIndex]['uploadedAttachments'].length,
        };

        //Setting files before upload
        filesToUpload[allAttachmentsListIndex]['uploadedAttachments'].push(data);
        const dataUpdated = cloneDeep(filesToUpload);
        setAllAttachmentsToUpload((_data) => [...dataUpdated]);
        let attachmentsTypeDataTemp: any = cloneDeep(attachmentsTypeData);

        dataUpdated?.forEach((att: any) => {
          attachmentsTypeDataTemp = attachmentsTypeDataTemp?.map((data: any) =>
            data?.id == att?.id ? (data = att) : data,
          );
        });
        prepareAttachmentHeirarchy(attachmentsTypeDataTemp);
        try {
          const res: any = await uploadAttachemt(data).unwrap();
          if (isValidResponse(res)) {
            emitMessage(
              uiConfiguration?.BUSINESS_MESSAGES['1099'] ||
                getResponseMessage(res, uiConfiguration),
              'success',
            );
            data['id'] = res?.data?.output?.id;
            data['isUploaded'] = true;
            data['isRequired'] = attachment?.isRequired;
            (filesToUpload[allAttachmentsListIndex]['uploadedAttachments'] || ([] as Array<any>))[
              data?.index
            ] = data;
            const dataUpdated = cloneDeep(filesToUpload);
            setAllAttachmentsToUpload((_data) => [...dataUpdated]);
            let attachmentsTypeDataTemp: any = cloneDeep(attachmentsTypeData);
            dataUpdated?.forEach((att: any) => {
              attachmentsTypeDataTemp = attachmentsTypeDataTemp?.map((data: any) =>
                data?.id == att?.id ? (data = att) : data,
              );
            });
            prepareAttachmentHeirarchy(attachmentsTypeDataTemp);
          } else {
            emitMessage(getResponseMessage(res, uiConfiguration) || 'Something went wrong');
          }
        } finally {
          data['isUploaded'] = true;
        }
      });
    }
  };

  const [deleteAttachement, deleteRes] = useDeletAttachmentbyAttachmentIDMutation();
  const removeAttachment = async (id: any, parentIndex: any, attchmentIndex: any) => {
    const res = await deleteAttachement(id).unwrap();
    if (isValidResponse(res)) {
      let file = cloneDeep(allAttachmentsToUpload);
      file[parentIndex]?.uploadedAttachments?.splice(attchmentIndex, 1);
      file[parentIndex].uploadedAttachments = file[parentIndex]?.uploadedAttachments?.filter(
        (item: any) => item.id !== id,
      );
      // removing the file from state
      setAllAttachmentsToUpload([...file]);
      emitMessage(getResponseMessage(res, uiConfiguration), 'success');
      let attachmentsTypeDataTemp: any = cloneDeep(attachmentsTypeData);
      file?.forEach((att: any) => {
        attachmentsTypeDataTemp = attachmentsTypeDataTemp?.map((data: any) =>
          data?.id === att?.id ? (data = att) : data,
        );
      });
      prepareAttachmentHeirarchy(attachmentsTypeDataTemp);
    } else {
      emitMessage(getResponseMessage(res, uiConfiguration), 'error');
    }
  };
  const removeFile = (id: any, parentIndex: any, attchmentIndex: any) => {
    setRemoveMetatData({
      id,
      parentIndex,
      attchmentIndex,
    });
    setShowDeleteModal(true);
  };

  const [downloadFile, { isLoading, isFetching }] = useLazyDownloadFileQuery();
  const download = async (id: string) => {
    const res: any = await downloadFile(id).unwrap();
    if (isValidResponse(res)) {
      if (res?.data?.output && res?.data?.output.length > 0) {
        base64Download(
          `data:${res?.data?.output[0]?.fileType};base64,${res?.data?.output?.[0]?.attachment?.content}`,
          res?.data?.output?.[0]?.fileName,
        );
        setLoadedFile('');
      } else {
        emitMessage(
          uiConfiguration?.UI_LABELS?.NO_ATTACHMENT_FOUND || 'No Attachment Found',
          'error',
        );
        setLoadedFile('');
      }
    } else {
      emitMessage(getResponseMessage(res, uiConfiguration));
      setLoadedFile('');
    }
  };

  return (
    <>
      {!isFieldAttachments ? (
        <Fragment key={`${reqId}`}>
          {sections &&
            sections?.map((section: any, i: any) => {
              return (
                <div key={i} style={{ overflow: 'auto' }} className='w-full'>
                  <div className={fp('w-full !text-start')}>
                    <div
                      className={`grid gap-2 ${gridClassName ? gridClassName : ' grid-cols-1 md:grid-cols-2'}`}
                    >
                      {section?.attachments?.length > 0 &&
                        section?.attachments?.map((attachment: any, i: number) => {
                          return (
                            <div
                              key={`${attachment?.id}-${i + 1}-${reqId}`}
                              className='flex flex-col items-start gap-1'
                            >
                              <div
                                className={fp(
                                  'grey_color !py-3 !px-1 flex flex-col gap-1 items-start justify-start',
                                )}
                              >
                                <div className='flex gap-1 items-start'>
                                  <Tooltip
                                    title={
                                      attachment?.attachmentDetails?.attachmentNames
                                        ? attachment?.attachmentDetails?.attachmentNames[
                                            language === 'EN' ? 1 : 0
                                          ]?.name
                                        : ''
                                    }
                                  >
                                    <div className='line-clamp-1  text-ellipsis font-[500]'>
                                      {attachment?.attachmentDetails?.attachmentNames
                                        ? attachment?.attachmentDetails?.attachmentNames[
                                            language === 'EN' ? 1 : 0
                                          ]?.name
                                        : ''}{' '}
                                    </div>
                                  </Tooltip>
                                  <>
                                    {attachment?.isRequired === '1' && !readOnly && (
                                      <span className={fp('req-attachment')}>
                                        <AsterikMandatory />
                                      </span>
                                    )}
                                  </>
                                </div>
                                {imagePreview && (
                                  <div>
                                    <div className={fp('flex flex-col gap-1 items-start')}>
                                      {(
                                        attachment?.uploadedAttachments?.filter((e: any) =>
                                          filterWithMaster && e?.attachmentMasterId
                                            ? e?.attachmentMasterId ==
                                              attachment?.attachmentMasterId
                                            : e?.attachmentTypeId == attachment?.id,
                                        ) || []
                                      )?.map((file: any, index: number) => {
                                        return (
                                          <div
                                            key={`${attachment?.id}-${i + 1}-${reqId}-${index}`}
                                            className='flex flex-col items-start mt-2 gap-2 justify-center'
                                          >
                                            {file?.attachment?.content ? (
                                              <img
                                                className='!max-w-[100px] !w-[100px]'
                                                src={`${file?.attachment?.content}`}
                                                
                                                alt='Attachment Image'
                                              />
                                            ) : (
                                              <img
                                                className='!max-w-[100px] !w-[100px]'
                                                src={`${import.meta.env?.VITE_BASE_URL}/ixcommon/supporting/GetFileContentByPath?filePath=${file?.filePath}`}
                                              
                                                alt='Attachment Image 3'
                                              />
                                            )}

                                            <>
                                              {!file.isUploaded && <Loader />}
                                              {file.isUploaded && (
                                                <div
                                                  key={index}
                                                  className={fp('flex p-1 mt-1 flex-col')}
                                                  style={{ borderRadius: '5px', gap: '5px' }}
                                                >
                                                  <div
                                                    className={fp(
                                                      'w-full flex flex-row justify-between items-center',
                                                    )}
                                                  >
                                                    <div
                                                      className={fp(
                                                        'flex flex-row gap-1 items-center',
                                                      )}
                                                    >
                                                      {!readOnly &&
                                                        (!deleteRes?.isLoading ? (
                                                          <XCircle
                                                            onClick={() => {
                                                              removeFile(file?.id, i, index);
                                                            }}
                                                            className={fp(
                                                              'cursor-pointer text-aered-500 h-5 w-5',
                                                            )}
                                                          />
                                                        ) : (
                                                          <CircleNotch
                                                            className='animate-spin'
                                                            color='#e01f1f'
                                                            size={16}
                                                          />
                                                        ))}

                                                      <Tooltip
                                                        title={
                                                          file?.fileName ||
                                                          file?.data?.name ||
                                                          file?.data?.fileName
                                                        }
                                                      >
                                                        <div
                                                          className='underline text-[#00ABEB] cursor-pointer text-[0.8rem] capitalize line-clamp-1 text-ellipsis w-max'
                                                          onClick={() => {
                                                            download(file?.id);
                                                            setLoadedFile(file?.id);
                                                          }}
                                                        >
                                                          {file?.fileName ||
                                                            file?.data?.name ||
                                                            file?.data?.fileName}
                                                        </div>
                                                      </Tooltip>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                              {readOnly &&
                                                (!attachment?.uploadedAttachments ||
                                                  attachment?.uploadedAttachments?.length == 0) && (
                                                  <div className={fp('flex flex-row gap-1')}>
                                                    {uiConfiguration?.UI_LABELS
                                                      ?.NO_ATTACHMENTS_FOUND ||
                                                      'No Attachment Found'}
                                                  </div>
                                                )}
                                            </>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className={fp('attachment-color cursor-pointer')}>
                                {!readOnly && (
                                  <div
                                    onClick={() =>
                                      document.getElementById(`${reqId}-${attachment?.id}`)?.click()
                                    }
                                    className={fp('flex flex-row gap-1 items-center aegov-link')}
                                  >
                                    {' '}
                                    <div className='aegov-form-control aegov-file-input-control'>
                                      <label
                                        htmlFor='file-uploader-01'
                                        className='file-input-label aegov-btn btn-secondary btn-sm'
                                      >
                                        {isCameraCapture ? (
                                          <Camera />
                                        ) : (
                                          <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 256 256'
                                            className='file-summary w-5 h-5'
                                          >
                                            <rect width='256' height='256' fill='none' />
                                            <line
                                              x1='128'
                                              y1='152'
                                              x2='128'
                                              y2='40'
                                              fill='none'
                                              stroke='currentColor'
                                              stroke-linecap='round'
                                              stroke-linejoin='round'
                                              stroke-width='16'
                                            />
                                            <path
                                              d='M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152'
                                              fill='none'
                                              stroke='currentColor'
                                              stroke-linecap='round'
                                              stroke-linejoin='round'
                                              stroke-width='16'
                                            />
                                            <polyline
                                              points='88 80 128 40 168 80'
                                              fill='none'
                                              stroke='currentColor'
                                              stroke-linecap='round'
                                              stroke-linejoin='round'
                                              stroke-width='16'
                                            />
                                          </svg>
                                        )}
                                        {isCameraCapture
                                          ? uiConfiguration?.UI_LABELS?.CLICK_TO_CAPTURE ||
                                            'Click to  Capture'
                                          : uiConfiguration?.UI_LABELS?.UPLOAD_FILE ||
                                            'Upload File'}{' '}
                                      </label>
                                      {!isCameraCapture ? (
                                        <input
                                          id={`${reqId}-${attachment?.id}`}
                                          className={fp('form-control')}
                                          type='file'
                                          accept={attachment?.allowedFileTypes || '*'}
                                          multiple={true}
                                          name='file'
                                          onInput={(e) =>
                                            fileChangeHandler(
                                              e,
                                              attachment?.id,
                                              attachment?.allowedFileTypes,
                                              attachment?.allowedFileSize,
                                              attachment,
                                              i,
                                              reqId,
                                            )
                                          }
                                          onClick={(e: any) => (e.target.value = null)}
                                          style={{ display: 'none' }}
                                        />
                                      ) : (
                                        <input
                                          id={`${reqId}-${attachment?.id}`}
                                          className={fp('form-control')}
                                          type='file'
                                          accept={attachment?.allowedFileTypes || '*'}
                                          multiple={true}
                                          name='file'
                                          capture='environment'
                                          onInput={(e) =>
                                            fileChangeHandler(
                                              e,
                                              attachment?.id,
                                              attachment?.allowedFileTypes,
                                              attachment?.allowedFileSize,
                                              attachment,
                                              i,
                                              reqId,
                                            )
                                          }
                                          onClick={(e: any) => (e.target.value = null)}
                                          style={{ display: 'none' }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                )}
                                {!imagePreview && (
                                  <div className={fp('flex flex-col')} key={i}>
                                    {(
                                      attachment?.uploadedAttachments?.filter((e: any) =>
                                        filterWithMaster && e?.attachmentMasterId
                                          ? e?.attachmentMasterId == attachment?.attachmentMasterId
                                          : e?.attachmentTypeId == attachment?.id,
                                      ) || []
                                    )?.map((file: any, index: number) => {
                                      return (
                                        <div key={`${attachment?.id}-${i + 1}-${reqId}-${index}`}>
                                          {!file.isUploaded && (
                                            // <TbLoaderQuarter className={fp('spinner-new m-2')} />
                                            <Loader />
                                          )}

                                          {file.isUploaded && (
                                            <div
                                              key={index}
                                              className={fp('flex p-1 mt-1 flex-col')}
                                              style={{ borderRadius: '5px', gap: '5px' }}
                                            >
                                              <div
                                                className={fp(
                                                  'w-full flex flex-row justify-between items-center',
                                                )}
                                              >
                                                <div
                                                  className={fp('flex flex-row gap-1 items-center')}
                                                >
                                                  {!readOnly && (
                                                    <XCircle
                                                      onClick={() => removeFile(file?.id, i, index)}
                                                      className={fp(
                                                        'cursor-pointer text-aered-500 h-5 w-5',
                                                      )}
                                                    />
                                                  )}
                                                  <div
                                                    className={fp('attachment-color')}
                                                    onClick={() => {
                                                      download(file?.id);
                                                      setLoadedFile(file?.id);
                                                    }}
                                                  >
                                                    {' '}
                                                    <div className={'flex gap-2'}>
                                                      <div className='underline text-[#00ABEB] cursor-pointer  text-[0.8rem] capitalize line-clamp-1 text-ellipsis w-max'>
                                                        {file?.fileName ||
                                                          file?.data?.name ||
                                                          file?.data?.fileName}
                                                      </div>
                                                      <div className='pt-1'>
                                                        {(isLoading || isFetching) &&
                                                        loadedFile === file?.id ? (
                                                          <CircleNotch
                                                            className='animate-spin'
                                                            color='#e01f1f'
                                                            size={16}
                                                          />
                                                        ) : (
                                                          <DownloadSimple
                                                            color='#e01f1f'
                                                            size={16}
                                                          />
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                    {readOnly &&
                                      !imagePreview &&
                                      (!attachment?.uploadedAttachments ||
                                        attachment?.uploadedAttachments?.length == 0) && (
                                        <div className={fp('flex flex-row gap-1')}>
                                          {uiConfiguration?.UI_LABELS?.NO_ATTACHMENTS_FOUND ||
                                            'No Attachment Found'}
                                        </div>
                                      )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
        </Fragment>
      ) : (
        <div key={`${reqId}`}>
          {allAttachmentsToUpload?.map((attachment: any, i: number) => {
            return (
              <div key={i}>
                {!readOnly && (
                  <Button
                    type='button'
                    onClick={() => document.getElementById(`${reqId}-${attachment?.id}`)?.click()}
                    className={
                      'flex flex-row gap-1 items-center cursor-pointer !bg-transparent !shadow-none translate-x-[-1rem]'
                    }
                  >
                    <div className='aegov-form-control aegov-file-input-control'>
                      <label
                        htmlFor='file-uploader-01'
                        className='file-input-label aegov-btn btn-secondary btn-sm'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 256 256'
                          className='file-summary w-5 h-5'
                        >
                          <rect width='256' height='256' fill='none' />
                          <line
                            x1='128'
                            y1='152'
                            x2='128'
                            y2='40'
                            fill='none'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='16'
                          />
                          <path
                            d='M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152'
                            fill='none'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='16'
                          />
                          <polyline
                            points='88 80 128 40 168 80'
                            fill='none'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='16'
                          />
                        </svg>
                        {uiConfiguration?.UI_LABELS?.CLICK_TO_ATTCHMENT || 'Click to attach'}{' '}
                      </label>
                      <input
                        id={`${reqId}-${attachment?.id}`}
                        className={fp('form-control')}
                        type='file'
                        accept={attachment?.allowedFileTypes}
                        multiple={true}
                        name='file'
                        onInput={(e) =>
                          fileChangeHandler(
                            e,
                            attachment?.id,
                            attachment?.allowedFileTypes,
                            attachment?.allowedFileSize,
                            attachment,
                            i,
                            reqId,
                          )
                        }
                        style={{ display: 'none' }}
                      />
                    </div>
                  </Button>
                )}
                <div
                  className={
                    'flex flex-row gap-1  max-sm:max-w-[10rem] lg:max-w-[30rem] overflow-x-auto max-w-[20rem]'
                  }
                  key={i}
                >
                  {(
                    attachment?.uploadedAttachments?.filter((e: any) =>
                      filterWithMaster && e?.attachmentMasterId
                        ? e?.attachmentMasterId == attachment?.attachmentMasterId
                        : e?.attachmentTypeId == attachment?.id,
                    ) || []
                  )?.map((file: any, index: number) => {
                    return (
                      <div
                        key={`${attachment?.id}-${i + 1}-${reqId}-${index}`}
                        className='flex flex-col items-start mt-2 gap-2 justify-between'
                      >
                        {imagePreview && file?.attachment?.content ? (
                          <img
                            className='!max-w-[100px] !w-[100px]'
                            src={`${file?.attachment?.content}`}
                            alt='Attachment Image1'
                          />
                        ) : (
                          imagePreview && (
                            <img
                              className='!max-w-[100px] !w-[100px]'
                              src={`${import.meta.env?.VITE_BASE_URL}/ixcommon/supporting/GetFileContentByPath?filePath=${file?.filePath}`}
                              alt='Attachment Image2'
                            />
                          )
                        )}
                        {!file.isUploaded && <Loader />}
                        {file.isUploaded && (
                          <div
                            key={index}
                            className={fp('flex flex-column  p-1')}
                            style={{ background: '#fcfcfd', borderRadius: '5px' }}
                          >
                            <div className={fp('w-full flex flex-row justify-between')}>
                              <div className={fp('flex flex-row gap-2 items-center')}>
                                <File
                                  color='rgb(146 114 42)'
                                  className={fp(
                                    'icon-dual icon-xs me-1 cursor-pointer text-aegold-600',
                                  )}
                                />
                                <Tooltip
                                  title={file?.fileName || file?.data?.name || file?.data?.fileName}
                                >
                                  <div
                                    className={
                                      'attachment-color underline text-[#00ABEB] cursor-pointer  text-[0.8rem] capitalize line-clamp-1 text-ellipsis max-w-[15rem] w-max'
                                    }
                                    onClick={() => download(file?.id)}
                                  >
                                    {' '}
                                    {file?.fileName || file?.data?.name || file?.data?.fileName}
                                  </div>
                                </Tooltip>
                              </div>
                              {!readOnly && (
                                <XCircle
                                  onClick={() => removeFile(file.id, i, index)}
                                  className={fp('cursor-pointer text-aered-500 h-5 w-5')}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {readOnly &&
                    (attachment?.uploadedAttachments?.length == 0 ||
                      !attachment?.uploadedAttachments) && (
                      <div className={fp('flex flex-row gap-1')}>
                        {uiConfiguration?.UI_LABELS?.NO_ATTACHMENTS_FOUND || 'No Attachment Found'}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {showDeleteModal && (
        <ConfirmationModal
          confirmTitle={uiConfiguration?.UI_LABELS?.OKAY || 'Okay'}
          cancelTitle={uiConfiguration?.UI_LABELS?.CANCEL || 'Cancel'}
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          onConfirm={() => {
            removeAttachment(
              removeMetatData?.id,
              removeMetatData?.parentIndex,
              removeMetatData?.attchmentIndex,
            );
          }}
          title={uiConfiguration?.UI_LABELS?.DELETE_ATTAVHMENT || 'Delete Attachment'}
          content={'You are about to delete a attachment.Clcik okay to proceed'}
        />
      )}
    </>
  )
        }
export default Attachments