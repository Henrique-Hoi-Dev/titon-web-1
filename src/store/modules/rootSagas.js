import { all } from 'redux-saga/effects';

import authSaga from './auth/authSaga';
import financialSaga from './financial/financialSaga';
import userSaga from './user/userSaga';
import cartSaga from './cart/cartSaga';
import creditSaga from './credit/creditSaga';
import driverSaga from './driver/driverSaga';
import freightSaga from './freight/freightSaga';
import locationSaga from './location/locationSaga';
import truckSaga from './truck/truckSaga';

export default function* rootSaga() {
  return yield all([
    authSaga(),
    financialSaga(),
    userSaga(),
    cartSaga(),
    creditSaga(),
    driverSaga(),
    freightSaga(),
    locationSaga(),
    truckSaga()
  ]);
}
