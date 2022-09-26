import CATEGORIES_ACTION_TYPES from './types';
import createAction from '../../reducer/reducer.utils';
import { getCategoriesDocs } from './../../utils/firebase/index';

const requestGetCategories = () => {
  return createAction(CATEGORIES_ACTION_TYPES.REQUEST);
};
const succeedGetCategories = (categories) => {
  return createAction(CATEGORIES_ACTION_TYPES.SUCCESS, categories);
};
const failGetCategories = (error) => {
  return createAction(CATEGORIES_ACTION_TYPES.FAILURE, error);
};

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(requestGetCategories());

  try {
    const categories = await getCategoriesDocs('categories');
    dispatch(succeedGetCategories(categories));
  } catch (error) {
    dispatch(failGetCategories(error));
  }
};
