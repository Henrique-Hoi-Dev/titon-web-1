import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "services/api";
import { errorNotification } from "utils/notification";
import { signOut } from "store/modules/auth/actions";

import RouterController from "routes/routerController";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusText = error.response;

      if (
        statusText?.data?.error === "Unauthorized" ||
        statusText?.data?.error === "jwt expired" ||
        statusText?.data?.error === "invalid token" ||
        statusText?.data?.error === "INVALID_TOKEN"
      ) {
        dispatch(signOut());
        navigate("/login");
        window.location.reload();
      }

      if (statusText?.data?.error) {
        errorNotification(statusText?.data?.error);
      }

      return Promise.reject(error);
    }
  );

  return <RouterController />;
}

export default App;
