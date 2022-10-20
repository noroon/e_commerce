import { createSelector } from 'reselect';
import { UserState } from './reducer';
import { RootState } from '../store';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const currentUserSelector = createSelector(
  selectUserReducer,
  (user) => user.currentUser,
);
