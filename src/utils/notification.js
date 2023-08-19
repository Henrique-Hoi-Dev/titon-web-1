import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mgsError from "./error/en.json";

const successNotification = (successMessage, msg) => {
  const customId = successMessage;
  const massage = "Operação realizada com sucesso!" ?? msg;

  return toast.success(successMessage ?? massage, {
    position: "top-right",
    autoClose: 5000,
    toastId: customId,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const errorNotification = (errorMessage) => {
  const customId = errorMessage;

  console.log(
    "🚀 ~ file: notification.js:25 ~ errorNotification ~ mgsError.THIS_CPF_ALREADY_EXISTS:",
    mgsError.THIS_CPF_ALREADY_EXISTS
  );

  return toast.error(mgsError[errorMessage], {
    position: "top-right",
    autoClose: 5000,
    toastId: customId,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export { errorNotification, successNotification };
