import { Route, Routes } from 'react-router-dom'

import Truck from 'pages/truck'
import Report from 'pages/report'
import Freight from 'pages/freight'
import Login from 'pages/login'
import Home from 'pages/home'
import Driver from 'pages/driver'
import User from 'pages/user'
import Cart from 'pages/cart'
import History from 'pages/history'
import InfoFinancial from 'pages/infoFinancial'
import ForgotPassword from 'pages/forgot-password'
import ForgotPasswordDriver from 'pages/forgot-password-driver'
import CreateUser from '@/pages/user/create'

import RequireAuth from 'utils/requireAuth'
import MainTemplate from 'components/templates/main'
import BaseTokenProtectedRoute from '@/components/atoms/BaseTokenProtectedRoute/BaseTokenProtectedRoute'
import BaseForgotPasswordSuccess from '@/components/molecules/BaseForgotPasswordSuccess/BaseForgotPasswordSuccess'

const RouterController = () => {
  const initialPage = () => {
    return <Home />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/driver/forgot-password"
        element={
          <BaseTokenProtectedRoute>
            <ForgotPasswordDriver />
          </BaseTokenProtectedRoute>
        }
      />
      <Route path="/driver/forgot-password-success" element={<BaseForgotPasswordSuccess />} />

      <Route element={<RequireAuth />}>
        <Route element={<MainTemplate />}>
          <Route path="/" element={initialPage()} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/info-financial/:id" element={<InfoFinancial />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/user" element={<User />} />
          <Route path="/truck" element={<Truck />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/historic" element={<History />} />
          <Route path="/report" element={<Report />} />
          <Route path="/check" element={<Freight />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default RouterController
