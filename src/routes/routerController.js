import { Route, Routes } from "react-router-dom";
import MainTemplate from "components/templates/main/main";
import RequireAuth from "utils/requireAuth";

import Login from "pages/login/login";
import Home from "pages/home/home";
import Driver from "pages/driver/driver";
import User from "pages/user/user";
import Truck from "pages/truck/truck";
import Cart from "pages/cart/cart";
import Permission from "pages/permission/permission";
import FinancialStatement from "pages/financialStatement/financialStatement";

const RouterController = () => {
  const initialPage = () => {
    return <Home />;
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<MainTemplate />}>
          <Route path="/" element={initialPage()} />
          <Route path="/home" element={<Home />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/user" element={<User />} />
          <Route path="/truck" element={<Truck />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/financial" element={<FinancialStatement />} />
          <Route path="/permission" element={<Permission />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterController;
