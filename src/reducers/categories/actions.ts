import CATEGORIES_ACTION_TYPES, { Category } from './types';
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from '../reducer.utils';

export type RequestGetCategories = Action<CATEGORIES_ACTION_TYPES.REQUEST>;

export type SucceedGetCategories = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.SUCCESS,
  Category[]
>;

export type FailGetCategories = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FAILURE,
  Error
>;

export const requestGetCategories = withMatcher((): RequestGetCategories => {
  return createAction(CATEGORIES_ACTION_TYPES.REQUEST);
});

export const succeedGetCategories = withMatcher((
  categories: Category[],
): SucceedGetCategories => {
  return createAction(CATEGORIES_ACTION_TYPES.SUCCESS, categories);
});

export const failGetCategories = withMatcher((error: Error): FailGetCategories => {
  return createAction(CATEGORIES_ACTION_TYPES.FAILURE, error);
});
