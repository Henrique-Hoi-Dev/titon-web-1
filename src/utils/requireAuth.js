import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token;

  const isLogged = token ? true : false;

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
