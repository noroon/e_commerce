import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesDocs } from '../../utils/firebase';
import { failGetCategories, succeedGetCategories } from './actions';
import CATEGORIES_ACTION_TYPES from './types';

export function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesDocs, 'categories');
    yield put(succeedGetCategories(categories));
  } catch (error) {
    yield put(failGetCategories(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.REQUEST, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
