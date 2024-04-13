import { Route, Routes } from 'react-router-dom'
import { Report } from 'pages/report'
import { Truck } from 'pages/truck'
import { Check } from 'pages/check'
import { InfoFinancial } from 'pages/infoFinancial'

import MainTemplate from 'components/templates/main'
import RequireAuth from 'utils/requireAuth'
import Login from 'pages/login/login'
import Home from 'pages/home'
import Driver from 'pages/driver'
import User from 'pages/user'
import Cart from 'pages/cart'
import History from 'pages/history'

const RouterController = () => {
  const initialPage = () => {
    return <Home />
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<MainTemplate />}>
          <Route path="/" element={initialPage()} />
          <Route path="/home" element={<Home />} />
          <Route path="/info-financial/:id" element={<InfoFinancial />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/user" element={<User />} />
          <Route path="/truck" element={<Truck />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/historic" element={<History />} />
          <Route path="/report" element={<Report />} />
          <Route path="/check" element={<Check />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default RouterController
