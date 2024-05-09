import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../context/AuthProvider';

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Oops! useAuth must be used within an AuthProvider');
  return context;
};
export default AuthContext;
