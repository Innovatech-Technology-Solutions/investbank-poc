// apiEndpoints.ts

export type EndpointConfig = {
  url: string;
  method: string;
};
export enum RestContract {
  USERSERVICE = '/usermgmt/usermgmtsupport',
}

const constructURL = (path: string, method: string) => {
  return { url: path, method: method };
};
export const ENDPOINTS: Record<string, EndpointConfig> = {
  LOGIN: constructURL(`${RestContract?.USERSERVICE}/Login`, 'GET'),
  PROFILE: constructURL(`${RestContract?.USERSERVICE}/ProfileInformation`, 'GET'),
  INTERFACE: { url: `/admin/adminpermission/getInterfaceDetails`, method: 'GET' },
};
