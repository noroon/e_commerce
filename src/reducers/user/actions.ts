import USER_ACTION_TYPES from './types';
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from '../reducer.utils';
import { AdditionalInfos, UserData } from '../../utils/firebase';
import { User } from 'firebase/auth';

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserData
>;

export type GoogleSignInRequest =
  Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_REQUEST>;

export type EmailSignInRequest = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_REQUEST,
  { email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILURE,
  Error
>;

export type SignUpRequest = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_REQUEST,
  { email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: User; additionalDetails: AdditionalInfos }
>;

export type SignUpFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILURE,
  Error
>;

export type SignOutRequest = Action<USER_ACTION_TYPES.SIGN_OUT_REQUEST>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILURE,
  Error
>;

export const checkUserSession = withMatcher((): CheckUserSession => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
});

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
});

export const googleSignInRequest = withMatcher((): GoogleSignInRequest => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_REQUEST);
});

export const emailSignInRequest = withMatcher(
  (email: string, password: string): EmailSignInRequest => {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_REQUEST, {
      email,
      password,
    });
  },
);

export const signInSuccess = withMatcher(
  (user: UserData & { id: string }): SignInSuccess => {
    return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
  },
);

export const signInFailure = withMatcher((error: Error): SignInFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);
});

export const signUpRequest = withMatcher(
  (email: string, password: string, displayName: string): SignUpRequest => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_REQUEST, {
      email,
      password,
      displayName,
    });
  },
);

export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInfos): SignUpSuccess => {
    return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
      user,
      additionalDetails,
    });
  },
);

export const signUpFailure = withMatcher((error: Error): SignUpFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);
});

export const signOutRequest = withMatcher((): SignOutRequest => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_REQUEST);
});

export const signOutSuccess = withMatcher((): SignOutSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
});

export const signOutFailure = withMatcher((error: Error): SignOutFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);
});
