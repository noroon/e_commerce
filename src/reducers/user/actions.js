import USER_ACTION_TYPES from './types';
import createAction from '../reducer.utils';

export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};

export const checkUserSession = () => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
};

export const requestGoogleSignIn = () => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_REQUEST);
};

export const requestEmailSignIn = (email, password) => {
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_REQUEST, {
    email,
    password,
  });
};

export const succeedSignIn = (user) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
};

export const failSignIn = (error) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);
};

export const requestSignUp = (email, password, displayName) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_REQUEST, {
    email,
    password,
    displayName,
  });
};

export const succeedSignUp = (user, additionalDetails) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user,
    additionalDetails,
  });
};

export const failSignUp = (error) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);
};

export const requestSignOut = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_REQUEST);
};

export const succeedSignOut = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
};

export const failSignOut = (error) => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);
};