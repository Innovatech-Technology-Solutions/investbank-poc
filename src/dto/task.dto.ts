

export interface ITasksActions {
    TaskInfo?: TaskInfo;
    TaskData?: TaskData;
}
export interface ITasks {
    Tasks: ITasksActions[]
}

export interface TaskData {
    BusinessDoc?: BusinessDoc;
}

export interface BusinessDoc {
    action?: string;
    childCount?: number;
    interfaceId?: string;
    isChildTask?: string;
    licenceType?: string;
    publicNoticeId?: string;
    requestId?: string;
    requestType?: string;
    status?: string;
    taskConfig?: TaskConfig[];
    processId?: string;
}

export interface TaskConfig {
    actions?: Action[];
    assignee?: string[];
    isParallel?: boolean;
    taskName?: string;
}

export interface Action {
    actionName?: string;
    statusCode?: string;
}

export interface TaskInfo {
    name?: string;
    description?: null;
    createdDate?: string;
    lastModifiedDate?: string;
    taskID?: string;
    customTaskID?: null;
    createdBy?: string;
    lastModifiedBy?: string;
    lastAcceptedBy?: string;
    lastAcceptedDate?: string;
    status?: string;
    priority?: string;
    acceptedByList?: string[];
    assignedToList?: string[];
    errorCode?: null;
    errorMessage?: null;
    taskUrl?: string;
    taskTypeID?: string;
    taskVersionNumber?: number;
    processInstanceID?: string;
    rootProcessInstanceID?: null;
    processModelID?: string;
    processModelVersion?: string;
    stepID?: string;
    processIteration?: string;
    stepIteration?: string;
    delegatedToList?: any[];
    delegatedFromList?: any[];
    isMandatory?: number;
    taskScheduleDate?: null;
}
