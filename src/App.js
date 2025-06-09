import React from 'react'
import api from 'services/api'
import RouterController from 'routes/routerController'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { errorNotification } from 'utils/notification'
import { signOut } from 'store/modules/auth/authSlice'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusText = error.response

      if (
        statusText?.data?.key === 'VERIFY_TOKEN_ERROR_EXPIRED' ||
        statusText?.data?.key === 'INVALID_TOKEN'
      ) {
        dispatch(signOut())
        navigate('/login')
        window.location.reload()
      }

      if (error) {
        errorNotification(error)
      }

      return Promise.reject(error)
    }
  )

  return <RouterController />
}

export default App
