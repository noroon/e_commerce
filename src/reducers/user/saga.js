import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  createUserDocFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase';
import {
  failSignIn,
  failSignUp,
  succeedSignIn,
  succeedSignUp,
  succeedSignOut,
  failSignOut,
} from './actions';

import USER_ACTION_TYPES from './types';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocFromAuth,
      userAuth,
      additionalDetails,
    );
    yield put(succeedSignIn({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(failSignIn(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(failSignIn(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password,
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(failSignIn(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(failSignIn(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password,
    );
    yield put(succeedSignUp(user, { displayName }));
  } catch (error) {
    yield put(failSignUp(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(succeedSignOut());
  } catch (error) {
    yield put(failSignOut(error))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInRequest() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle);
}

export function* onEmailSignInRequest() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_REQUEST, signInWithEmail);
}

export function* onSignUpRequest() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_REQUEST, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutRequest() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_REQUEST, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInRequest),
    call(onEmailSignInRequest),
    call(onSignUpRequest),
    call(onSignUpSuccess),
    call(onSignOutRequest),
  ]);
}
