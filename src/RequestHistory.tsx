/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { Card } from '@mui/material';
import { useGetAuditHistoryByIDQuery } from './services/hostApiServices';
import orderBy from 'lodash/orderBy';

type IProps = {xw
  requestId: string;
  uiConfiguration: any;
  allActivitiesData?: any;
};

export const convertTaskNameToLabel = (taskName: string) => {
  return taskName ? taskName?.replaceAll(' - ', '_').replaceAll(' ', '_').toUpperCase() : taskName;
};

const RequestHistory = ({ requestId, uiConfiguration, allActivitiesData }: IProps) => {
  const { data, isLoading: isAuditLoading } = useGetAuditHistoryByIDQuery(requestId!, {
    skip: allActivitiesData,
  });

  const auditData = allActivitiesData
    ? allActivitiesData
    : orderBy(data?.data?.auditHistory, 'queuedDate', 'desc') || [];

  if ((!allActivitiesData || allActivitiesData?.length === 0) && !requestId) return null;

  const getActionclassName = (action: string) => {
    if (action == 'APPROVED') return 'task-approved';
    if (action == 'REJECTED') return 'task-rejected';
    if (action == 'MORE_INFO') return 'task-moreinfo';
    return 'task-commonaction';
  };

  return (
    <Card className='pl-8 pr-3 md:pl-14 md:pr-14 py-5 text-sm'>
      <>
        <div>
          {!isAuditLoading && auditData && auditData?.length > 0 && (
            <ol className='relative border-s border-gray-200 dark:border-gray-700'>
              {(auditData || []).map((item: any, index: any) => {
                return (
                  <div className='ms-4' key={index}>
                    <div className='absolute w-3 h-3 bg-[#ebaf73] rounded-full mt-1.5 -start-[6.5px]'></div>
                    <div className='pb-5'>
                      <div className='flex'>
                        <div className='flex-grow'>
                          {item?.taskAction != 'SUBMITTED' && (
                            <h6 className='text-[14px] mt-1 mb-2 '>
                              {uiConfiguration?.UI_LABELS?.TASK || 'Task'}
                              <span style={{ color: '#4d82c9' }} className='mx-1'>
                                {uiConfiguration?.UI_LABELS[
                                  convertTaskNameToLabel(item?.taskName!)
                                ] ||
                                  item?.taskName ||
                                  '-'}
                              </span>{' '}
                              {uiConfiguration?.UI_LABELS?.WAS_ASSIGNED_ON || 'was assigned on'}{' '}
                              <span style={{ color: '#bf7b7b' }}>
                                {item?.taskAction === 'SUBMITTED' || item?.taskAction === 'INITIAL'
                                  ? moment(item?.taskCompletedDate)?.format(
                                      'ddd DD-MMM-YYYY HH:mm A',
                                    )
                                  : moment(item?.queuedDate)?.format('ddd DD-MMM-YYYY HH:mm A')}
                              </span>
                            </h6>
                          )}
                          {item?.taskAction == 'ADD_ADJUSTMENTS' ? (
                            <li className='text-[14px] mt-1'>
                              {' '}
                              <span className={getActionclassName(item?.taskAction as string)}>
                                {uiConfiguration?.UI_LABELS[item?.taskAction as string] ||
                                  item?.taskAction}
                              </span>{' '}
                              {uiConfiguration?.UI_LABELS?.UPDATED_BY || 'updated by'}{' '}
                              {item?.actedBy} {uiConfiguration?.UI_LABELS?.ON || 'on'}{' '}
                              <span style={{ color: '#bf7b7b' }}>
                                {moment(item?.taskCompletedDate)?.format('ddd DD-MMM-YYYY HH:mm A')}{' '}
                              </span>
                            </li>
                          ) : item?.taskAction == 'MORE_INFO' ||
                            item?.taskAction == 'CHANGE_REQ' ? (
                            <li className='text-[14px] mt-1'>
                              {' '}
                              <span className={getActionclassName(item?.taskAction as string)}>
                                {uiConfiguration?.UI_LABELS[item?.taskAction as string] ||
                                  item?.taskAction}
                              </span>{' '}
                              {uiConfiguration?.UI_LABELS?.REQUESTED_BY || 'requested by'}{' '}
                              {item?.actedBy} {uiConfiguration?.UI_LABELS?.ON || 'on'}{' '}
                              <span style={{ color: '#bf7b7b' }}>
                                {moment(item?.taskCompletedDate)?.format('ddd DD-MMM-YYYY HH:mm A')}{' '}
                              </span>
                            </li>
                          ) : item?.taskAction == 'SUBMITTED' ? (
                            <li className='text-[14px] mt-1'>
                              {uiConfiguration?.UI_LABELS?.REQUEST_HAS_BEEN || 'Request has been'}{' '}
                              <span className={getActionclassName(item?.taskAction as string)}>
                                {uiConfiguration?.UI_LABELS[item?.taskAction as string] ||
                                  item?.taskAction}
                              </span>{' '}
                              {uiConfiguration?.UI_LABELS?.BY || 'by'} {item?.actedBy || '-'}{' '}
                              {uiConfiguration?.UI_LABELS?.ON || 'on'}{' '}
                              <span style={{ color: '#bf7b7b' }}>
                                {moment(item?.taskCompletedDate)?.format('ddd DD-MMM-YYYY HH:mm A')}{' '}
                              </span>
                            </li>
                          ) : item?.taskAction == 'QUEUED' ? (
                            ''
                          ) : (
                            <li className='text-[14px] mt-1'>
                              {uiConfiguration?.UI_LABELS?.TASK_HAS_BEEN || 'Task has been'}{' '}
                              <span className={getActionclassName(item?.taskAction as string)}>
                                {uiConfiguration?.UI_LABELS[item?.taskAction as string] ||
                                  item?.taskAction}
                              </span>{' '}
                              {uiConfiguration?.UI_LABELS?.BY || 'by'} {item?.actedBy || '-'}{' '}
                              {uiConfiguration?.UI_LABELS?.ON || 'on'}{' '}
                              <span style={{ color: '#bf7b7b' }}>
                                {moment(item?.taskCompletedDate)?.format('ddd DD-MMM-YYYY HH:mm A')}{' '}
                              </span>
                            </li>
                          )}
                          {item?.comments && (
                            <div
                              className='text-gray-600 text-[14px] history-comment w-100 my-1 [&>p]:mb-0'
                              dangerouslySetInnerHTML={{ __html: item?.comments as string }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ol>
          )}
        </div>
      </>
    </Card>
  );
};

export default RequestHistory;
