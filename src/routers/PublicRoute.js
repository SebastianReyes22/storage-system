import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

export const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user.name === 'sistemas') {
    return user.logged ? <Navigate to='/sistemas' /> : children;
  } else {
    return user.logged ? <Navigate to='/admin' /> : children;
  }
};
