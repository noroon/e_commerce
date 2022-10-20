import { all, call } from 'typed-redux-saga/macro';
import { categoriesSaga } from './categories/saga';
import { userSaga } from './user/saga';

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSaga)]);
}
