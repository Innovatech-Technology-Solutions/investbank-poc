import moment from "moment";
import { TASK_BUTTONS } from "../constants/taskConstants";
import emitMessage from "../services/emitMessage";

export const getEnv = () => {
  /*Needs modification for cases where env variables are injected at build runtime i.e to window obj */
  return import.meta.env;
};

export const getBaseURL = () => getEnv()?.VITE_BASE_URL;
export const logout = (callback?: () => void) => {
  localStorage.clear();
  sessionStorage.clear();
  if (callback) {
    callback();
  }
  
};

export const isValidResponse = (res: any) => {
  return res && res?.status === 200 && res?.data?.errors && res?.data?.errors?.[0]?.code === '0'
    ? true
    : false;
};
export const isValidApiResponse = (apiRes: any) => {
  if (apiRes?.isUninitialized || apiRes?.isLoading || apiRes?.isFetching) return true;
  if (apiRes?.isError) return false;
  return apiRes &&
    apiRes?.isLoading === false &&
    apiRes?.isFetching === false &&
    apiRes?.data?.data?.errors &&
    apiRes?.data?.data?.errors?.[0]?.code === '0'
    ? true
    : false;
};


export const prepareUIConfiguration = (configurations: any) => {
  const uiConfiguration: any = {};
  const languagueList: any[] = (import.meta.env.VITE_LANGUAGES as string)
    ?.replace(/\[|\]/g, '')
    .split(',');

  languagueList.forEach(
    (lang: any) =>
      (uiConfiguration[lang] = {
        UI_LABELS: {},
        BUSINESS_MESSAGES: {},
        DROPDOWNS: {},
        EXTENDED_SETTING: {},
      }),
  );

  //PREPARE UI LBELS
  if (configurations && configurations?.uiLabel && configurations?.uiLabel?.length > 0)
    for (const item of configurations?.uiLabel) {
      for (const label of item?.uiLabelValue || []) {
        if (uiConfiguration[label?.langId?.toUpperCase()])
          uiConfiguration[label?.langId?.toUpperCase()].UI_LABELS[item?.labelId] = label?.value;
      }
    }

  //PREPARE BUSINESS MESSAGE
  if (
    configurations &&
    configurations?.businessMessage &&
    configurations?.businessMessage?.length > 0
  )
    for (const item of configurations?.businessMessage) {
      for (const label of item?.messageValue || []) {
        uiConfiguration[label?.langId].BUSINESS_MESSAGES[label?.businessMessageId] = label?.value;
      }
    }

  //PREPARE EXTENDED SETTING
  if (
    configurations &&
    configurations?.appConfiguration &&
    configurations?.appConfiguration?.length > 0
  )
    for (const item of configurations?.appConfiguration) {
      for (const lang of languagueList) {
        uiConfiguration[lang].EXTENDED_SETTING[item?.keyName] = item?.value;
      }
    }

  //PREPARE DROPDOWN
  configurations?.dropdownMasterDetails?.forEach((dropdown: any) => {
    const dropdownKey = (dropdown?.name as string).toUpperCase()?.replace(' ', '_');
    if (dropdown?.dropdownDetails)
      dropdown?.dropdownDetails?.forEach((dropdownDetail: any) => {
        dropdownDetail?.dropdownValues &&
          dropdownDetail?.dropdownValues?.forEach((dropdownValue: any) => {
            const obj = {
              dropdownKey: dropdownDetail?.dropdownKey,
              id: dropdownDetail?.id,
              value: dropdownValue.dropdownValue,
              setting: dropdownDetail.type,
              isActive: dropdownDetail.isActive,
            };
            uiConfiguration[dropdownValue.langId].DROPDOWNS[dropdownKey] = uiConfiguration[
              dropdownValue.langId
            ].DROPDOWNS[dropdownKey]
              ? uiConfiguration[dropdownValue.langId].DROPDOWNS[dropdownKey]
              : [];
            uiConfiguration[dropdownValue.langId].DROPDOWNS[dropdownKey].push(obj);
          });
      });
  });

  return { ...uiConfiguration };
};

export const footerData = [
  {
    title: {
      en: 'About this Website',
      ar: 'عن الموقع',
    },
    subElements: [
      {
        title: {
          en: 'Privacy Policy',
          ar: 'سياسة الخصوصية',
        },
        redirectPath: 'MOEI_PRIVACY_POLICY',
      },
      {
        title: {
          en: 'Terms and Conditions',
          ar: 'الشروط والأحكام',
        },
        redirectPath: 'MOEI_TERMS_CONDITIONS',
      },
      {
        title: {
          en: 'Disclaimer',
          ar: 'إخلاء المسؤولية',
        },
        redirectPath: 'MOEI_DISCLAIMER',
      },
      {
        title: {
          en: 'Copyright',
          ar: 'حقوق النسخ',
        },
        redirectPath: 'MOEI_COPYRIGHT',
      },
      {
        title: {
          en: 'Glossary',
          ar: 'المصطلحات',
        },
        redirectPath: 'MOEI_GLOSSARY',
      },
    ],
    parentPath: '/about',
  },
  {
    title: {
      en: 'About',
      ar: 'عن الوزارة',
    },
    subElements: [
      {
        title: {
          en: 'E-Services Help',
          ar: 'للمساعدة في الخدمات',
        },
        redirectPath: 'MOEI_ESERVICES_HELP',
      },

     
      {
        title: {
          en: 'Metaverse',
          ar: 'ميتافيرس',
        },
        redirectPath: 'MOEI_METAVERSE',
      },
      {
        title: {
          en: 'Careers',
          ar: 'الوظائف',
        },
        redirectPath: 'MOEI_CAREERS',
      },
    ],
    parentPath: '/about',
  },
  {
    title: {
      en: 'Quick links',
      ar: 'الروابط السريعة',
    },
    subElements: [
      {
        title: {
          en: 'Laws & Policies',
          ar: 'القوانين والتشريعات',
        },
        redirectPath: 'MOEI_LAW_POLICY',
      },
      {
        title: {
          en: 'FAQS',
          ar: 'الأسئلة الشائعة',
        },
        redirectPath: 'MOEI_FAQS',
      },
      {
        title: {
          en: 'Accessibility',
          ar: 'إمكانية الوصول',
        },
        redirectPath: 'MOEI_ACCESSIBILITY',
      },
      {
        title: {
          en: 'Employees Email',
          ar: 'بريد الموظفين',
        },
        redirectPath: 'MOEI_EMPLOYEE_EMAIL',
      },
      {
        title: {
          en: 'Sitemap',
          ar: 'خريطة الموقع',
        },
        redirectPath: 'MOEI_SITEMAP',
      },
      {
        title: {
          en: 'Builder',
          ar: 'المقاولين والاستشاريين',
        },
        redirectPath: 'MOEI_BUILDER',
      },
      {
        title: {
          en: 'Archive',
          ar: 'التلعيب',
        },
        redirectPath: 'MOEI_ARCHIVE',
      },
      {
        title: {
          en: 'Gamification',
          ar: 'الأرشيف',
        },
        redirectPath: 'MOEI_GAMIFICATION',
      },
    ],
    parentPath: '/about',
  },
  // {
  //   title: {
  //     en: ' ',
  //     ar: ' ',
  //   },
  //   subElements: [

  //     {
  //       title: {
  //         en: 'Sitemap',
  //         ar: '',
  //       },
  //       redirectPath: 'MOEI_SITEMAP',
  //     },
  //     {
  //       title: {
  //         en: 'Builder',
  //         ar: '',
  //       },
  //       redirectPath: 'MOEI_BUILDER',
  //     },
  //     {
  //       title: {
  //         en: 'Archive',
  //         ar: '',
  //       },
  //       redirectPath: 'MOEI_ARCHIVE',
  //     },
  //     {
  //       title: {
  //         en: 'Gamification',
  //         ar: '',
  //       },
  //       redirectPath: 'MOEI_GAMIFICATION',
  //     },
  //   ],
  //   parentPath: '/about',
  // }
  // Add more items as needed
];
export const getResponseMessage = (res: any, uiConfiguration?: any) => {
  return (
    res?.data?.errors &&
    res?.status != 401 &&
    (uiConfiguration?.BUSINESS_MESSAGES?.[
      res?.data?.errors?.[0]?.description ||
        res?.data?.errors?.[0]?.detail ||
        res?.data?.errors?.[0]?.message ||
        res?.data?.errors?.[0]?.title
    ] ||
      res?.data?.errors?.[0]?.description ||
      res?.data?.errors?.[0]?.detail ||
      res?.data?.errors?.[0]?.message ||
      res?.data?.errors?.[0]?.title)
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getButtonTaskBtnType = (taskStats: string) => {
  console.log(taskStats);
  switch (taskStats) {
    case TASK_BUTTONS.REJECT:
    case TASK_BUTTONS.REJECTED:
      return 'outline';

    case TASK_BUTTONS.MORE_INFO:

    case TASK_BUTTONS.NEED_MORE_INFORMATION:
    case TASK_BUTTONS.CHANGE_REQ:
      return 'soft';

    default:
      return '';
  }
};
export const getButtonTaskBtnClasses = (taskStats: string) => {
  switch (taskStats) {
    case TASK_BUTTONS.REJECT:
    case TASK_BUTTONS.REJECTED:
      return '!border-aered-500 !text-aered-500 hover:!bg-aered-500 hover:!text-whitely-100';

    case TASK_BUTTONS.NEED_MORE_INFORMATION:
    case TASK_BUTTONS.MORE_INFO:

    case TASK_BUTTONS.CHANGE_REQ:
      return '!bg-amber-500 !border !border-[#92722a]';

    default:
      return '';
  }
};
export const timeAgo = (date: string): string => {
  const now = moment();
  const inputDate = moment(date);

  const duration = moment.duration(now.diff(inputDate));

  const daysAgo = Math.floor(duration.asDays());
  const hoursAgo = Math.floor(duration.asHours());

  if (daysAgo > 1) {
    return `${daysAgo} days ago`;
  } else if (daysAgo === 1) {
    return '1 day ago';
  } else if (hoursAgo > 1) {
    return `${hoursAgo} hours ago`;
  } else if (hoursAgo === 1) {
    return '1 hour ago';
  } else {
    return 'Less than an hour ago';
  }
};
export const listToTree = (list1: any[]) => {
  const list = structuredClone(list1);

  try {
    const map: any = {};
    let node: any;
    const roots: any = [];
    let i;

    for (i = 0; i < list?.length; i += 1) {
      map[list[i]?.id] = i; // initialize the map
      list[i] = Object.assign({}, list?.[i], { children: [] }); // make the object extensible
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentCommentId && node.parentCommentId !== '0') {
        if (list[map?.[node?.parentCommentId] as any]?.children) {
          list[map?.[node?.parentCommentId] as any]?.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    return roots;
  } catch (err: any) {
    emitMessage(err, 'error');
  }
};
export const alertWithIcon = async (
  icon: 'success' | 'error' | 'warning' | 'info' | 'question',
  title?: string,
  message?: string,
  showConfirmButton: boolean = false,
  showCancelButton: boolean = false,
  confirmButtonText?: string,
  cancelButtonText?: string,
): Promise<SweetAlertModel> => {
  const result = await Swal.fire({
    title: title,
    text: message,
    icon: icon,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: showConfirmButton,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    customClass: {
      confirmButton: 'btn btn-primary mx-1 my-0',
      cancelButton: 'btn btn-secondary mx-1 my-0',
    },
  }).then((result: any) => result as SweetAlertModel);
  return result as SweetAlertModel;
};
// ******************* END for Atert message and conifirmations popup *******************

export const getBase64 = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export const base64Download = (content: any, fileName: any) => {
  const blob = dataURLtoBlob(content);
  const objUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = objUrl;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const dataURLtoBlob = (dataurl: any): Blob => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const commoncode_download = (
  content: any,
  fileName: any,
  onSuccess: any = () => {},
  onFailure: any = () => {},
) => {
  try {
    const blob = dataURLtoBlob(content);
    const objUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = objUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    onSuccess();
  } catch (error) {
    onFailure();
  }
};
