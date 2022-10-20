import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';

import {
  createUserDocFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
  createAuthUserWithEmailAndPassword,
  AdditionalInfos,
} from '../../utils/firebase';
import {
  signInFailure,
  signUpFailure,
  signInSuccess,
  signUpSuccess,
  signOutSuccess,
  signOutFailure,
  EmailSignInRequest,
  SignUpRequest,
  SignUpSuccess,
} from './actions';

import USER_ACTION_TYPES from './types';

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInfos,
) {
  try {
    const userSnapshot = yield* call(
      createUserDocFromAuth,
      userAuth,
      additionalDetails,
    );

    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }),
      );
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInRequest) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password,
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;

    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpRequest) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password,
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signUpFailure(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailure(error as Error));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInRequest() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle);
}

export function* onEmailSignInRequest() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_REQUEST, signInWithEmail);
}

export function* onSignUpRequest() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_REQUEST, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutRequest() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_REQUEST, signOut);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInRequest),
    call(onEmailSignInRequest),
    call(onSignUpRequest),
    call(onSignUpSuccess),
    call(onSignOutRequest),
  ]);
}
