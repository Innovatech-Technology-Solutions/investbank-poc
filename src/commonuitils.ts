import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  };