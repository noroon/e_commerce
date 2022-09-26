import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

const categoriesSelector = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories,
);

export const selectCategories = createSelector(
  [categoriesSelector],
  (categories) => {
    return categories.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  },
);
