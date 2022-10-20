import { AnyAction } from 'redux';

import { Category } from './types';
import {
  failGetCategories,
  requestGetCategories,
  succeedGetCategories,
} from './actions';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction,
) => {
  if (requestGetCategories.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (succeedGetCategories.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }

  if (failGetCategories.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }

  return state;
};
