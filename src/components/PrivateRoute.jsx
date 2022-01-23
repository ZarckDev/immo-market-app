import { Navigate, Outlet } from 'react-router-dom';

//hook
import { useAuthStatus } from '../hooks/useAuthStatus';

// components
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  // outlet is the nested route

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
