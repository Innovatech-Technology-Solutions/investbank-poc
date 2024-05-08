// import { useSelector } from "react-redux";

interface Menu {
  id: string;
  name: string;
  isSection: string;
  parentId: string;
  routeUrl: string | null;
  svg: string | null;
  icon: string | null;
  order: string;
  menuId: string;
  features: ModuleFeature[];
  subModules: Menu[];
}

interface ModuleFeature {
  id: string;
  name: string;
  description: string;
  moduleId: string | null;
  isEnable: boolean;
}

export const isAllowedAction = (menu: any, page: any, permissionId: any) => {
  try {
    let currentMenu: any = menu ? getMenu(menu, page['MODULE_ID']) : null;
    return currentMenu &&
      currentMenu?.features?.find((feature: any) => feature?.permissionId == permissionId)
      ? true
      : false;
  } catch (e: any) {
    return false;
  }
};

const getMenu: any = (menus: Menu[], id: string) => {
  for (const item of menus) {
    if (item.id === id) {
      return item;
    }
    if (item.subModules) {
      const foundItem = getMenu(item.subModules, id);
      if (foundItem) {
        return foundItem;
      }
    }
  }
  return undefined;
};
