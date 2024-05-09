import { MOEI_COMMON } from '../constants/commomInterfaces';
import emitMessage from '../services/emitMessage';
import { useGetInterfaceByIDQuery, useGetMenuPermissionsQuery } from '../services/hostApiServices';
import { isAllowedAction } from '../services/permission/isAllowed';
import { getMenuId, getResponseMessage, isValidApiResponse } from '../utils/Commonutils';
import useLanguage from './useLanguage';

function usePermissions(permissionKey: any) {
  const { data: uiData } = useGetInterfaceByIDQuery(MOEI_COMMON);
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language]?.UI_LABELS;

  const profileApiRes = useGetMenuPermissionsQuery(getMenuId()!, {
    skip: getMenuId() ? false : true,
  });
  const { data } = profileApiRes;
  if (!isValidApiResponse(profileApiRes)) {
    emitMessage(getResponseMessage(data, uiConfiguration), 'error');
  }

  const isAllowed = (permissionId: string) => {
    return isAllowedAction(data?.data?.output?.modules, permissionKey, permissionId);
  };

  return { profileApiRes, uiConfiguration, isAllowed };
}
export default usePermissions;
