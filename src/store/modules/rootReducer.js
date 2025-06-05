import { combineReducers } from 'redux';

import auth from './auth/authSlice';
import financial from './financial/financialSlice';
import user from './user/userSlice';
import cart from './cart/cartSlice';
import credit from './credit/creditSlice';
import driver from './driver/driverSlice';
import freight from './freight/freightSlice';
import location from './location/locationSlice';
import truck from './truck/truckSlice';

export default combineReducers({
  auth,
  user,
  driver,
  freight,
  truck,
  cart,
  credit,
  location,
  financial
});
