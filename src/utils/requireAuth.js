import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useValidateToken } from "services/requests/useValidateToken";

const RequireAuth = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.token;
 
  const isLogged = token ? true : false;

/*   const {
    data,
    error,
    isFetching,
  } = useValidateToken(token); */
  
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
