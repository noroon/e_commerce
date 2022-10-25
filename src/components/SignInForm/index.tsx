import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../Form';
import Button from '../Button';

import {
  emailSignInRequest,
  googleSignInRequest,
} from '../../reducers/user/actions';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import './index.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const formFields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    id: 'signInForm01',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    id: 'signInForm02',
  },
];

export default function SignInForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(defaultFormFields);
  const { email, password } = formData;

  const signInWithGoogle = async () => {
    dispatch(googleSignInRequest());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(emailSignInRequest(email, password));
      setFormData(defaultFormFields);
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
        alert('Incorrect password');
      }
      // if ((error as AuthError).code === AuthErrorCodes.INVALID_RECIPIENT_EMAIL) {
      if ((error as AuthError).code === 'auth/user-not-found') {
        alert('No user associated to this email');
      }
      if ((error as AuthError).code === AuthErrorCodes.INVALID_EMAIL) {
        alert('Use a valid email');
      }

      console.log('user creation encountered an error', error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <Form
        handleSubmit={handleSubmit}
        formFields={formFields}
        formData={formData}
        setFormData={setFormData}
      >
        <div className="button-container">
          <Button type="submit">Sign in</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </Form>
    </div>
  );
}
