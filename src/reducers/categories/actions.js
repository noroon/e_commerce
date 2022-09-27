import CATEGORIES_ACTION_TYPES from './types';
import createAction from '../reducer.utils';

export const requestGetCategories = () => {
  return createAction(CATEGORIES_ACTION_TYPES.REQUEST);
};

export const succeedGetCategories = (categories) => {
  return createAction(CATEGORIES_ACTION_TYPES.SUCCESS, categories);
};

export const failGetCategories = (error) => {
  return createAction(CATEGORIES_ACTION_TYPES.FAILURE, error);
};
