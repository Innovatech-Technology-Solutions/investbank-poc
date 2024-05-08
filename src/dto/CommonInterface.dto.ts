import { AxiosResponse } from 'axios';

export type CommonGetResponce<IOutput> = AxiosResponse<CommonResponce<IOutput>>;

export interface CommonResponce<IOutput> {
  output?: IOutput;
  errors?: Error[];
  pageInfo?: PageInfo;
}

export interface PageInfo {
  currentPageNo?: string;
  pageSize?: string;
  totalRecords?: string;
}

export interface IError {
  code?: string;
  detail?: string;
  status?: string;
  id?: string;
  links?: string;
  title?: string;
  source?: string;
  parameter?: string;
  meta?: string;
}

export interface IUiConfigurations {
  UI_LABELS: any;
  BUSINESS_MESSAGES: any;
  DROPDOWNS: any;
  EXTENDED_SETTING: any;
}

export interface IInputDropdownValues {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
  isDisabled?: boolean;
  primarySource?: boolean;
}

export interface SyntheticBaseEvent<E = object, C = any, T = any> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  timeStamp: number;
  type: string;
}

export interface SweetAlertModel {
  isConfirmed: boolean;
  isDenied: boolean;
  isDismissed: boolean;
  value: boolean;
}

export type IApplicantProfile = {
  email?: string;
  firstNameEn?: string;
  lastNameEn?: string;
  address?: string;
  poboxNo?: string;
  firstNameAr?: string;
  lastNameAr?: string;
  uuid?: null;
  userId?: string;
  emiratesId?: string;
  fullNameAr?: string;
  fullNameEn?: string;
  titleEn?: null;
  titleAr?: null;
  emailId2?: null;
  mobileNo?: string;
  mobileNo2?: null;
  gender?: string;
  qualification?: null;
  maritialStatus?: string;
  dateOfBirth?: string;
  dateOfDeath?: null;
  familyNo?: string;
  townNo?: string;
  emirate?: string;
  contractorId?: null;
  consultantId?: null;
  isActive?: boolean;
  createdDate?: null;
  family?: Family[];
  passport?: Passport[];
  bankDetails?: BankDetail[];
  employerDetails?: EmployerDetail[];
  occupation?: null;
  nationality?: null;
  disability?: null;
  personOfDetermination?: null;
};

export type BankDetail = {
  id?: string;
  accountHolderId?: string;
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
  iban?: string;
};

export type EmployerDetail = {
  id?: string;
  applicant?: string;
  employerName?: string;
  desigination?: string;
  sector?: string;
  workCategory?: string;
  annualIncome?: string;
  createdDate?: Date;
  endDate?: Date;
  startDate?: Date;
  isActive?: string;
};

export type Family = {
  id?: string;
  applicant?: string;
  name?: string;
  emiratesId?: null;
  age?: null;
  relationship?: string;
  gender?: null | string;
  parentId?: string;
  divorceDate?: null;
  deathDate?: null;
  martialStatus?: string;
};

export type Passport = {
  passportNumber?: string;
  documentNumber?: null;
  unifiedNumber?: string;
  issuingAuthority?: string;
};

export type IMenu = {
  id?: string;
  name?: string;
  managedBy?: string;
  modules?: IModule[];
  profilePicture?: {
    filePath?: string;
  };
};

export type IModule = {
  id?: string;
  name?: string;
  nameAr?: string;
  parentId?: string;
  isSection?: string;
  routeUrl?: null | string;
  svg?: null;
  icon?: string;
  order?: string;
  features?: IFeature[];
  subModules?: IModule[] | [];
};

export type IFeature = {
  id?: string;
  name?: string;
  type?: string;
  permissionId?: string;
};

export interface IUserDetails {
  userId: string;
  emiratesId?: string;
  lastNameEn?: string;
  lastNameAr?: string;
  firstNameEn?: string;
  firstNameAr?: string;
  fullNameEn?: string;
  fullNameAr?: string;
  emailId?: string;
  mobileNo?: string;
  isActive?: boolean;
  filePath?: string;
}

export interface ISearchUsers {
  firstName?: string;
  email?: string;
  emiratesId?: string;
  userName?: string;
  userId?: string;
  department?: string;
  fullNameAr?: string;
  isActive?: string;
  mobileNo?: string;
  profileType?: string;
  userType?: string;
}
