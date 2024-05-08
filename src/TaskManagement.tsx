import { SetStateAction, Dispatch, useEffect, useState, Fragment } from 'react';
import {
  useGetInterfaceByIDQuery,
  useGetTaskActionQuery,
  usePerformActionMutation,
} from './services/hostApiServices';
import { UseFormReturn } from 'react-hook-form';
import { ITasks, TaskConfig, TaskData } from './dto/task.dto';
import {
  getButtonTaskBtnClasses,
  getButtonTaskBtnType,
  getResponseMessage,
  isValidApiResponse,
  isValidResponse,
} from './utils/Commonutils';
import TaskConfirmationModal from './TaskConfirmationModal';
import { UPDATE_REQUEST_DETAILS_TASK_ACTIONS } from '../constants/taskConstants';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { CircleNotch } from '@phosphor-icons/react';
type IProps = {
  taskIdString: string;
  isModal?: boolean;
  updateApiCall?: any;
  postTaskUpdateApiCall?: any;
  isTaskButtonDisable?: boolean;
  isUpdateDetailsOnTaskUpdate?: boolean;
  setTaskName?: Dispatch<SetStateAction<string | undefined>>;
  backURL: string;
  useFormMethods?: UseFormReturn<any> | undefined;
  customComponent?: JSX.Element;
  isLoading?: boolean;
  inputKeyValues?: Object | null;
  customTaskButtonDisable?: string[];
  customComponentByAction?: (action: string) => JSX.Element;
};

const TaskManagement = ({
  taskIdString,
  isModal = false,
  updateApiCall,
  postTaskUpdateApiCall,
  setTaskName,
  isTaskButtonDisable = false,
  isUpdateDetailsOnTaskUpdate,
  backURL,
  customComponent,
  isLoading,
  inputKeyValues,
  customTaskButtonDisable,
  customComponentByAction,
}: IProps) => {
  const { data: uiData } = useGetInterfaceByIDQuery('803');
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language];

  const navigate = useNavigate();
  const id = taskIdString?.split(',')?.[0]?.split('/')?.[0] as string;
  const taskApiRes = useGetTaskActionQuery(id, {
    skip: !taskIdString,
  });
  const { data: taskInfo, isSuccess } = taskApiRes;
  if (!isValidApiResponse(taskApiRes)) {
    emitMessage(getResponseMessage(taskInfo, uiConfiguration) || 'Something went wrong', 'error');
  }

  const [performActionApi, result] = usePerformActionMutation();

  const [taskConfig, setTaskConfig] = useState<any[]>([]);
  const [taskData, setTaskData] = useState<TaskData>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [action, setAction] = useState<string>();
  const [disableTaskActions, setDisableTaskActions] = useState<string[]>([]);
  const [buttonName, setButtonName] = useState<string>();
  const prepareTaskButtons = (tasks: ITasks) => {
    let taskName: string = tasks?.Tasks[0]?.TaskInfo?.name as string;
    taskName = taskName?.includes(' - ') ? taskName?.split(' - ')?.[0] : taskName;

    if (setTaskName) {
      setTaskName(taskName);
    }
    const filteredTaskConfig: TaskConfig[] =
      tasks?.Tasks[0]?.TaskData?.BusinessDoc?.taskConfig?.filter(
        (task) => task.taskName === taskName,
      ) as TaskConfig[];
    const taskConfig: any[] = filteredTaskConfig?.map((task) =>
      task?.actions?.filter(
        (action) => action.actionName !== 'QUEUED' && action.actionName !== 'QARAR_APPROVED',
      ),
    ) as any[];
    setTaskConfig(taskConfig);
    setTaskData(tasks?.Tasks[0]?.TaskData as TaskData);
  };

  useEffect(() => {
    if (taskInfo && isSuccess && isValidResponse(taskInfo)) {
      prepareTaskButtons(taskInfo?.data?.TaskInformation);
    }
  }, [taskInfo]);

  useEffect(() => {
    setDisableTaskActions(customTaskButtonDisable || []);
  }, [customTaskButtonDisable]);

  const openCommentsModal = (action: string) => {
    setAction(action);
    setShowModal(true);
  };

  const perFormAction = async (input: any) => {
    try {
      const res = await performActionApi({ data: input, id: id }).unwrap();
      if (isValidResponse(res)) {
        emitMessage(
          getResponseMessage(res, uiConfiguration) || 'Task Updated Successfully',
          'success',
        );
        console.log(postTaskUpdateApiCall, 'postTaskUpdateApiCall');
        if (postTaskUpdateApiCall) {
          console.log(postTaskUpdateApiCall, 'postTaskUpdateApiCall 111111');
          postTaskUpdateApiCall();
        }
        setShowModal(false);
        navigate(backURL);
      } else {
        // emitMessage(getResponseMessage(res, uiConfiguration) || 'Something went wrong', 'error');
      }
    } catch (err) {
      // emitMessage(getResponseMessage(err, uiConfiguration) || 'Something went wrong', 'error');
    }
  };

  const onModalButtonClick = async (action: string, comments: string) => {
    let input: any = {
      comments,
      action,
    };
    if (inputKeyValues) {
      for (let key in inputKeyValues) {
        input[key] = (inputKeyValues as Record<string, any>)?.[key];
      }
    }

    const checkConditionForUpdate =
      UPDATE_REQUEST_DETAILS_TASK_ACTIONS.includes(action) &&
      updateApiCall &&
      isUpdateDetailsOnTaskUpdate
        ? true
        : false;
    console.log(
      {
        checkConditionForUpdate,
        action,
        updateApiCall,
        isUpdateDetailsOnTaskUpdate,
        actions: UPDATE_REQUEST_DETAILS_TASK_ACTIONS,
        includes: UPDATE_REQUEST_DETAILS_TASK_ACTIONS.includes(action),
      },
      'checkConditionForUpdate',
    );
    if (checkConditionForUpdate) {
      updateApiCall(action, taskData?.BusinessDoc?.processId)
        .then((result: any) => {
          console.log(result, 'result checkConditionForUpdate');
          if (result) {
            perFormAction(input);
          }
        })
        .catch((error: any) => {
          // emitMessage(error, 'error');
        });
    } else {
      perFormAction(input);
    }
  };

  const checkButtonDisabled = (buttonName: string, action: string) => {
    if (disableTaskActions && disableTaskActions.length > 0) {
      if (disableTaskActions.includes(buttonName)) {
        return true;
      }
    }
    if (UPDATE_REQUEST_DETAILS_TASK_ACTIONS.includes(action)) {
      if (isTaskButtonDisable) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      {id ? (
        <>
          <div>
            {taskConfig &&
              taskConfig?.length > 0 &&
              taskConfig?.map((config, index) => (
                <Fragment key={index}>
                  <div
                    className={
                      isModal
                        ? 'flex justify-start py-2 gap-2 max-sm:flex-col'
                        : 'flex justify-end gap-2 max-sm:flex-col'
                    }
                  >
                    {config?.map((button: any, i: number) => {
                      return (
                        <Button
                          disabled={checkButtonDisabled(button?.button, button?.actionName)}
                          key={i}
                          onClick={() => {
                            openCommentsModal(button?.actionName);
                            setButtonName(button?.button);
                          }}
                          styleVariant={getButtonTaskBtnType(button?.button)}
                          className={getButtonTaskBtnClasses(button?.button)}
                        >
                          {uiConfiguration?.UI_LABELS[button?.button] || button?.button}
                          {(isLoading || result?.isLoading) &&
                            UPDATE_REQUEST_DETAILS_TASK_ACTIONS.includes(button?.button) && (
                              <CircleNotch className='animate-spin' />
                            )}
                        </Button>
                      );
                    })}
                  </div>
                </Fragment>
              ))}
          </div>
        </>
      ) : null}

      {showModal ? (
        <TaskConfirmationModal
          loading={isLoading || result?.isLoading}
          buttonName={buttonName}
          uiConfiguration={uiConfiguration}
          CustomComponent={customComponent}
          customComponentByAction={customComponentByAction}
          action={action as string}
          performAction={onModalButtonClick}
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      ) : null}
    </>
  );
};

export default TaskManagement;
