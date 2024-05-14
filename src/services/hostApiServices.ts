/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINTS } from "../APIEndpoints/apiEndpoints";
import {
  CommonGetResponce,
  IApplicantProfile,
  IMenu,
  ISearchUsers,
  IUserDetails,
} from "../dto/CommonInterface.dto";
import { isValidResponse, prepareUIConfiguration } from "../utils/Commonutils";
import { httpClient as shellHttpClient } from "./httpClient";

const appCode = import.meta.env.VITE_APPCODE;
export const hostApiServices = shellHttpClient().injectEndpoints({
  endpoints: (builder) => ({
    /* Fetch profile info */
    profile: builder.query({
      query: () => ENDPOINTS.PROFILE,
    }),

    searchUsers: builder.query<
      CommonGetResponce<ISearchUsers[]>,
      { searchKey: string; department?: string; appCode?: string }
    >({
      query: ({ searchKey, department, appCode }) => {
        const queryParams = [];
        if (searchKey) queryParams.push(`search=${searchKey}`);
        if (department) queryParams.push(`department=${department}`);
        if (appCode) queryParams.push(`appCode=${appCode}`);
        const params = queryParams.length ? `?${queryParams.join("&")}` : "";
        return {
          url: `/moei/common/SearchUsers${params}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),

    getSearchInternalUsers: builder.query<
      CommonGetResponce<IUserDetails[]>,
      string
    >({
      query: (searchKey) => ({
        url: `/moei/common/SearchInternalUsers?toSearch=${searchKey}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    /* Get Auth Token  based on UAE Pass state and code params*/
    token: builder.query({
      query: ({ code, state, redirectUri }) => ({
        url: localStorage.getItem("invitationId")
          ? `/moeimgmt/login/UdpLogin?code=${code}&state=${state}&appCode=${appCode}&invitationId=${localStorage.getItem(
              "invitationId"
            )}&redirectUri=${redirectUri}`
          : `/moeimgmt/login/UdpLogin?code=${code}&state=${state}&appCode=${appCode}&redirectUri=${redirectUri}`,
        method: "GET",
        headers: {
          "X-TOKEN-REQ": false,
          // 'x-wn-adminui': true,
        },
      }),
    }),

    getExternaltoken: builder.query({
      query: ({ code, state, redirectUri }) => ({
        url: localStorage.getItem("invitationId")
          ? `/moeimgmt/login/UdpLogin?code=${code}&state=${state}&appCode=${appCode}&invitationId=${localStorage.getItem(
              "invitationId"
            )}&redirectUri=${redirectUri}`
          : `/moeimgmt/login/UdpLogin?code=${code}&state=${state}&appCode=${appCode}&redirectUri=${redirectUri}`,
        method: "GET",
        headers: {
          "X-TOKEN-REQ": false,
          // 'x-wn-adminui': true,
        },
      }),
    }),

    getURLPath: builder.query({
      query: (id) => ({
        url: `/moeiintegration/applink/GetLinkById/${id}`,
        method: "GET",
      }),
    }),

    /* Get Login Configuration*/
    loginConfiguration: builder.query<any, void>({
      query: () => ({
        url: `/moeimgmt/login/LoginConfiguration`,
        method: "GET",
        headers: {
          "X-TOKEN-REQ": false,
        },
      }),
      transformResponse: (response: any) => {
        return {
          ...prepareUIConfiguration(
            response?.data?.output?.interfaceSpecificData
          ),
        };
      },
    }),
    /* Profile Information */
    getProfileInfo: builder.query<CommonGetResponce<IMenu>, void>({
      query: () => ({
        url: `/admin/adminpermission/getMenuPermissions/103`,
        method: "GET",
      }),
    }),
    /* Profile Information */
    getMenuPermissions: builder.query<any, string>({
      query: (menuId) => ({
        url: `/admin/adminpermission/getMenuPermissions/${menuId}`,
        method: "GET",
      }),
    }),

    /* Get Interface Details*/
    getInterfaceByID: builder.query({
      query: (id: string) => ({
        url: `${ENDPOINTS.INTERFACE.url}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return { ...prepareUIConfiguration(response?.data?.output) };
      },
    }),
    /* Get Task By ID*/

    getTaskAction: builder.query({
      query: (taskId: string) => ({
        url: `/taskmanagement/taskaction/getTaskById/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    performAction: builder.mutation({
      query: ({ data, id }) => ({
        url: `/taskmanagement/taskaction/updateTask/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (response) =>
        isValidResponse(response) ? ["Task"] : [],
    }),

    postOtp: builder.mutation({
      query: (data) => ({
        url: `/moeimgmt/login/SendLoginOtp`,
        method: "POST",
        data:
          appCode === "INTERNAL"
            ? {
                ...data,
                type: "INTERNAL",
              }
            : data,
        headers: {
          "X-TOKEN-REQ": false,
        },
      }),
    }),

    verifyOtp: builder.query({
      query: ({ userName, password }) => ({
        url: `/usermgmt/otplogin/OTPLogin`,
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(userName + ":" + password),
          "X-TOKEN-REQ": false,
        },
      }),
    }),

    getMyApplications: builder.query<CommonGetResponce<any>, void>({
      query: (params: any) => ({
        url: `/gateway/Investbankpoc/InvestBankPoc?pageNumber=0&pageSize=1000${
          params ? params : ""
        }`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    downloadRDL: builder.mutation<CommonGetResponce<any>, void>({
      query: (params: any) => ({
        url: `/gateway/Investbankpoc/InvestBankPoc?pageNumber=0&pageSize=1000${
          params ? params : ""
        }&exportAs=pdf`,
        method: "GET",
      }),
    }),

    /* Submit Comment*/
    submitComment: builder.mutation({
      query: (data) => ({
        url: `/ixcommon/comment/Comment`,
        method: "POST",
        data,
      }),
    }),
    /* Update Comment By ID*/
    updateComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/ixcommon/comment/Comment/${id}`,
        method: "PATCH",
        data,
      }),
    }),
    /* Delete Comment By ID*/
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/ixcommon/comment/Comment/${id}`,
        method: "DELETE",
      }),
    }),

    /* Get All Comments by RequestId*/
    getAllCommentsByRequestId: builder.query({
      query: (params) => ({
        url: `/ixcommon/comment/Comment${params}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    /* Get Audit history by ID*/
    getAuditHistoryByID: builder.query({
      query: (id: string) => ({
        url: `/common/audithistory/GetAuditHistoryByReqId?requestId=${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    /* legacy login api*/
    login: builder.query({
      query: (data) => ({
        url: ENDPOINTS.LOGIN.url,
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(data?.userName + ":" + data?.password),
          "X-TOKEN-REQ": false,
          // 'x-wn-adminui': true,
        },
      }),
    }),
    getContentList: builder.mutation({
      query: (data) => ({
        url: `/moei/CMSMenuList/ContentList`,
        method: "POST",
        data,
      }),
    }),
    getZayedReportResult: builder.mutation({
      query: (data) => ({
        url: `/moei/CMSMenuList/ReportResult`,
        method: "POST",
        data,
      }),
    }),
    getLandReportResult: builder.mutation({
      query: (data) => ({
        url: `/moei/CMSMenuList/ReportResult`,
        method: "POST",
        data,
      }),
    }),
    getMarineReportResult: builder.mutation({
      query: (data) => ({
        url: `/moei/CMSMenuList/ReportResult`,
        method: "POST",
        data,
      }),
    }),
    getInfraStructureReportResult: builder.mutation({
      query: (data) => ({
        url: `/moei/CMSMenuList/ReportResult`,
        method: "POST",
        data,
      }),
    }),
    getGeologicalReportResult: builder.mutation({
      query: (data) => ({
        url: `/moei/CMSMenuList/ReportResult`,
        method: "POST",
        data,
      }),
    }),
    getInquiryReportResult: builder.mutation({
      query: (data) => ({
        url: `/moei/CMSMenuList/ReportResult`,
        method: "POST",
        data,
      }),
    }),
    postWorkDetails: builder.mutation({
      query: (data) => ({
        url: `/szhp/employerdetails/EmployerDetails`,
        method: "POST",
        data,
      }),
    }),
    updateWorkDetails: builder.mutation({
      query: ({ data, id }) => ({
        url: `/szhp/employerdetails/EmployerDetails/${id}`,
        method: "PATCH",
        data,
      }),
    }),
    postBankDetails: builder.mutation({
      query: (data) => ({
        url: `/szhp/bankDetails/BankDetails`,
        method: "POST",
        data,
      }),
    }),
    updateBankDetails: builder.mutation({
      query: ({ data, id }) => ({
        url: `/szhp/bankDetails/BankDetails/${id}`,
        method: "PATCH",
        data,
      }),
    }),

    getApplicantProfile: builder.query<
      CommonGetResponce<IApplicantProfile>,
      string
    >({
      query: (id) => {
        console.log("query", id);
        return {
          url: `/szhp/applicantprofile/ApplicantProfile/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),

    deletAttachmentbyAttachmentID: builder.mutation({
      query: (id) => ({
        url: `${
          localStorage.getItem("token")
            ? "/common/attachment/Attachment"
            : "/moeimgmt/supportingservices/deleteAttachment"
        }/${id}`,
        method: "DELETE",
      }),
    }),
    downloadContentByFilePath: builder.query({
      query: ({
        filePath,
        contentType,
      }: {
        filePath: string;
        contentType: string;
      }) => ({
        url: `/common/attachment/GetFileContentByPath?filePath=${filePath}&contentType=application/${contentType}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    getAttachmentConfigByAttachmentID: builder.query({
      query: (id: string) => ({
        url: `${
          localStorage.getItem("token")
            ? "/api/adminmgmt/attachmentConfig/AttachmentConfiguration"
            : "/api/moeimgmt/supportingservices/getAttachmentConfigById"
        }/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    // getAttachmentConfigByAttachmentID: builder.query({
    //   query: (id: string) => ({
    //     url: `${
    //       localStorage.getItem('token')
    //         ? '/api/admin/attachmentconfig/AttachmentConfiguration'
    //         : '/moeimgmt/supportingservices/getAttachmentConfigById'
    //     }/${id}`,
    //     method: 'GET',
    //   }),
    //   keepUnusedDataFor: 0,
    // }),
    getExistingPropertiesById: builder.query({
      query: (id: string) => ({
        url: `/moei/integration/PropertiesByEmirate?id=${id}`,
        method: "GET",
      }),
    }),

    uploadAttchment: builder.mutation({
      query: (data) => ({
        url: localStorage.getItem("token")
          ? "/api/common/attachment/Attachment"
          : "/api/moeimgmt/supportingservices/uploadAttachment",
        method: "POST",
        data,
      }),
    }),

    downloadFile: builder.query({
      query: (id: string) => ({
        url: localStorage.getItem("token")
          ? `/api/common/attachment/Attachment/` + id
          : `/api/moeimgmt/supportingservices/downloadAttachment/` + id,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    postFieldComment: builder.mutation({
      query: (data) => ({
        url: `/adminmgmt/fieldcomments/FieldComments`,
        method: "POST",
        data,
      }),
    }),
    getFieldComments: builder.query<any, string>({
      query: (id) => ({
        url: `/adminmgmt/fieldcomments/FieldComments?requestId=${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getApplicationByReqID: builder.query<any, string>({
      query: (reqId) => ({
        url: `/gateway/Investbankpoc/InvestBankPoc/${reqId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    updateApplicantProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/szhp/applicantprofile/ApplicantProfile/${id}`,
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useGetProfileInfoQuery,
  useGetMenuPermissionsQuery,
  useTokenQuery,
  useGetExternaltokenQuery,
  useGetInterfaceByIDQuery,
  useLazyGetTaskActionQuery,
  useGetTaskActionQuery,
  usePerformActionMutation,
  useUpdateCommentMutation,
  useSubmitCommentMutation,
  useDeleteCommentMutation,
  useLazyGetAllCommentsByRequestIdQuery,
  useGetAuditHistoryByIDQuery,
  useLoginConfigurationQuery,
  useGetContentListMutation,
  useGetZayedReportResultMutation,
  useGetLandReportResultMutation,
  useGetMarineReportResultMutation,
  useGetInfraStructureReportResultMutation,
  useGetGeologicalReportResultMutation,
  useGetInquiryReportResultMutation,
  useLazyVerifyOtpQuery,
  usePostOtpMutation,
  useGetApplicantProfileQuery,
  useDeletAttachmentbyAttachmentIDMutation,
  useUploadAttchmentMutation,
  useDownloadContentByFilePathQuery,
  useGetAttachmentConfigByAttachmentIDQuery,
  useLazyDownloadFileQuery,
  useUpdateApplicantProfileMutation,
  usePostBankDetailsMutation,
  useUpdateBankDetailsMutation,
  usePostWorkDetailsMutation,
  useUpdateWorkDetailsMutation,
  useGetExistingPropertiesByIdQuery,
  useGetURLPathQuery,
  useGetSearchInternalUsersQuery,
  useLazyGetSearchInternalUsersQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useGetMyApplicationsQuery,
  useGetApplicationByReqIDQuery,
  usePostFieldCommentMutation,
  useGetFieldCommentsQuery,
  useDownloadRDLMutation,
} = hostApiServices;
