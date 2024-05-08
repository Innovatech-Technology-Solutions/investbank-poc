/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  };
  const getUser=()=> decodeToken(localStorage.getItem("token") as any) as any;

  export const isSales=()=>getUser()&& getUser().role&&getUser().role.length>0&&getUser().role.includes(
      "IB_SALES_TEAM"
    )
    export const isOperation=()=>getUser()&& getUser().role&&getUser().role.length>0&&getUser().role.includes(
      "IB_BANK_OPR_TEAM"
    )