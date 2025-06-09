import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import errorMessages from './error/pt.json'

const successNotification = (successMessage) => {
  const customId = successMessage
  const massage = 'Operação realizada com sucesso!'

  return toast.success(successMessage ?? massage, {
    position: 'top-center',
    autoClose: 5000,
    toastId: customId,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

const errorNotification = (error) => {
  const customId = error

  const msg = errorMessages[error?.response?.data?.key]
    ? errorMessages[error?.response?.data?.key]
    : error

  const massage = 'Erro ao realizar a operação!'

  return toast.error(msg ?? massage, {
    position: 'top-center',
    autoClose: 10000,
    toastId: customId,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export { successNotification, errorNotification }
