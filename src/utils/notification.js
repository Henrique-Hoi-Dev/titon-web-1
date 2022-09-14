import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successNotification = (successMessage) => {
  const customId = successMessage;
  const msg = "Operação realizada com sucesso!"


  return toast.success(successMessage ?? msg, {
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


  return toast.error(errorMessage, {
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

export { errorNotification, successNotification};
