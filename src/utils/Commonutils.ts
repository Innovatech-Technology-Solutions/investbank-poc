
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